import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      react(),
      {
        name: 'api-vision-proxy',
        configureServer(server) {
          server.middlewares.use('/api/analyze-vision', async (req, res) => {
            if (req.method !== 'POST') {
              res.statusCode = 405
              res.end(JSON.stringify({ error: 'Method Not Allowed' }))
              return
            }

            let body = ''
            req.on('data', (chunk) => {
              body += chunk.toString()
            })

            req.on('end', async () => {
              try {
                const { imageUrl } = JSON.parse(body || '{}')
                const geminiKey = env.GEMINI_API_KEY || process.env.GEMINI_API_KEY
                const openAiKey = env.OPENAI_API_KEY || process.env.OPENAI_API_KEY

                if (!imageUrl) {
                  res.statusCode = 400
                  res.end(JSON.stringify({ error: 'Missing imageUrl' }))
                  return
                }

                // 1. Try Gemini API if server key present
                if (geminiKey && imageUrl.startsWith('data:image/')) {
                  const base64Data = imageUrl.split(',')[1]
                  const mimeType = imageUrl.split(';')[0].replace('data:', '') || 'image/jpeg'

                  const apiResp = await fetch(
                    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`,
                    {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        contents: [
                          {
                            parts: [
                              {
                                text: `이미지에 나온 주방 용기의 재질 및 전자레인지 사용 안전성을 분석하여 반드시 다음 JSON 형식으로만 응답하세요:
{
  "material": "용기 재질 (예: PP 플라스틱, 내열 유리, 세라믹, 멜라민 수지, 스테인리스 스틸 등)",
  "materialCode": "재질 코드 (PP, GLASS, CERAMIC, MELAMINE, STAINLESS 등)",
  "grade": "safe | caution | danger 중 하나",
  "gradeTitle": "안전 등급 제목 (예: 전자레인지 사용 가능)",
  "gradeDesc": "안전 등급 설명",
  "maxTemp": 내열권장온도숫자(예: 120, 180, 200, 70 등),
  "bpaStatus": "BPA 상태 (Free, N/A, Unsafe 중 하나)",
  "confidence": 신뢰도숫자(85~99),
  "checklist": [
    {"name": "점검항목1", "status": "pass|fail|warn", "text": "상세설명"},
    {"name": "점검항목2", "status": "pass|fail|warn", "text": "상세설명"},
    {"name": "점검항목3", "status": "pass|fail|warn", "text": "상세설명"}
  ],
  "aiComment": "맞춤형 AI 가열 조언 및 주의사항 (2~3문장)"
}`,
                              },
                              {
                                inline_data: {
                                  mime_type: mimeType,
                                  data: base64Data,
                                },
                              },
                            ],
                          },
                        ],
                      }),
                    }
                  )

                  if (apiResp.ok) {
                    const data = (await apiResp.json()) as any
                    const textResp = data.candidates?.[0]?.content?.parts?.[0]?.text
                    if (textResp) {
                      const cleanJsonStr = textResp.replace(/```json/g, '').replace(/```/g, '').trim()
                      res.setHeader('Content-Type', 'application/json')
                      res.end(cleanJsonStr)
                      return
                    }
                  }
                }

                // 2. Try OpenAI API if server key present
                if (openAiKey && imageUrl.startsWith('data:image/')) {
                  const apiResp = await fetch('https://api.openai.com/v1/chat/completions', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      Authorization: `Bearer ${openAiKey}`,
                    },
                    body: JSON.stringify({
                      model: 'gpt-4o-mini',
                      messages: [
                        {
                          role: 'user',
                          content: [
                            {
                              type: 'text',
                              text: '이미지의 주방 용기 재질과 전자레인지 사용 안전성을 분석하고 JSON 형식(material, materialCode, grade, gradeTitle, gradeDesc, maxTemp, bpaStatus, confidence, checklist, aiComment)으로만 답변하세요.',
                            },
                            {
                              type: 'image_url',
                              image_url: { url: imageUrl },
                            },
                          ],
                        },
                      ],
                      response_format: { type: 'json_object' },
                    }),
                  })

                  if (apiResp.ok) {
                    const data = (await apiResp.json()) as any
                    const content = data.choices?.[0]?.message?.content
                    if (content) {
                      res.setHeader('Content-Type', 'application/json')
                      res.end(content)
                      return
                    }
                  }
                }

                // If no keys configured or API calls failed
                res.statusCode = 503
                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify({ error: 'No server API key configured or API calls failed' }))
              } catch (err: any) {
                res.statusCode = 500
                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify({ error: err?.message || 'Server proxy error' }))
              }
            })
          })
        },
      },
    ],
  }
})

