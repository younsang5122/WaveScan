import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../css/common.css';
import '../../css/scan.css';

export const ScanPage: React.FC = () => {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [statusText, setStatusText] = useState('용기를 프레임 안에 맞춰주세요');

  useEffect(() => {
    let stream: MediaStream | null = null;
    async function startCamera() {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        try {
          stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: { ideal: 'environment' } },
            audio: false,
          });
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            await videoRef.current.play().catch(() => {});
          }
        } catch (e) {
          console.warn('Camera access error or permission denied:', e);
        }
      }
    }
    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const handleShutter = () => {
    if (videoRef.current && videoRef.current.videoWidth > 0) {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
          const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
          sessionStorage.setItem('scannedImage', dataUrl);
        }
      } catch (err) {
        console.warn('Canvas snapshot failed:', err);
      }
    }

    setIsAnalyzing(true);
    setStatusText('스캔 중... 용기를 가만히 유지하세요');

    setTimeout(() => {
      navigate('/scan-result?new=true');
    }, 1800);
  };

  const handleAlbumClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (evt) => {
        if (evt.target?.result) {
          sessionStorage.setItem('scannedImage', evt.target.result as string);
        }
        setIsAnalyzing(true);
        setTimeout(() => {
          navigate('/scan-result?upload=true');
        }, 1500);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="scan-page">
      <main className="main-content">
        <div className="scan-viewfinder">
          {/* Camera BG */}
          <div className="camera-feed">
            <video ref={videoRef} autoPlay playsInline muted />
          </div>

          {/* Scan frame */}
          <div className="scan-frame-wrap">
            <div className="scan-frame">
              <div className="scan-frame-corner tl"></div>
              <div className="scan-frame-corner tr"></div>
              <div className="scan-frame-corner bl"></div>
              <div className="scan-frame-corner br"></div>
              <div className="scan-line"></div>
              <div className="scan-guide-inner">
                <div className="scan-guide-dot"></div>
              </div>
            </div>

            <div className="scan-status">
              <div className="scan-status-text">{statusText}</div>
              <div className="scan-status-hint">용기 전체가 보이도록 거리를 조절하세요</div>
            </div>
          </div>

          {/* Analyzing overlay */}
          <div className={`scan-analyzing ${isAnalyzing ? 'visible' : ''}`}>
            <div className="analyzing-ring"></div>
            <div className="analyzing-text">AI 분석 중...</div>
            <div className="analyzing-sub">용기 재질과 안전성을 확인하고 있어요</div>
          </div>

          {/* Bottom controls */}
          <div className="scan-controls">
            <Link to="/home" className="scan-ctrl-btn" title="뒤로">
              <i className="fa-solid fa-xmark"></i>
            </Link>

            <button className="shutter-btn" onClick={handleShutter} title="스캔">
              <div className="shutter-inner">
                <i className="fa-solid fa-camera"></i>
              </div>
            </button>

            <button className="album-preview" onClick={handleAlbumClick} title="앨범">
              <i className="fa-regular fa-image"></i>
            </button>
          </div>
        </div>
      </main>

      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
    </div>
  );
};

export default ScanPage;
