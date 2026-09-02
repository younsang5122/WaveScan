/* scan.js */

document.addEventListener('DOMContentLoaded', () => {
  const cameraVideo = document.getElementById('cameraVideo');
  const shutterBtn = document.getElementById('shutterBtn');
  const flashBtn = document.getElementById('flashBtn');
  const flipBtn = document.getElementById('flipBtn');
  const albumBtn = document.getElementById('albumBtn');
  const fileInput = document.getElementById('fileInput');
  const zoomBadge = document.getElementById('zoomBadge');
  const statusText = document.getElementById('statusText');
  const analyzingOverlay = document.getElementById('analyzingOverlay');

  let mediaStream = null;

  // Real Camera Stream (getUserMedia)
  async function startCamera() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      console.warn('MediaDevices API is not supported in this environment.');
      return;
    }

    try {
      mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: 'environment' },
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        },
        audio: false
      });

      if (cameraVideo) {
        cameraVideo.srcObject = mediaStream;
        await cameraVideo.play().catch(err => console.warn('Autoplay prevented:', err));
      }
    } catch (err) {
      console.warn('Real camera stream failed or permission denied:', err);
    }
  }

  startCamera();

  // Stop track when leaving page
  window.addEventListener('beforeunload', () => {
    if (mediaStream) {
      mediaStream.getTracks().forEach(track => track.stop());
    }
  });

  let flashOn = false;
  let zoomLevel = 1.0;

  // Flash toggle
  if (flashBtn) {
    flashBtn.addEventListener('click', () => {
      flashOn = !flashOn;
      flashBtn.style.color = flashOn ? '#F59E0B' : 'white';
      showToast(flashOn ? '플래시 ON' : '플래시 OFF');
    });
  }

  // Camera flip / zoom simulate
  if (flipBtn) {
    flipBtn.addEventListener('click', () => {
      zoomLevel = zoomLevel === 1.0 ? 2.0 : 1.0;
      if (zoomBadge) zoomBadge.textContent = `${zoomLevel.toFixed(1)}×`;
      showToast(`줌 ${zoomLevel.toFixed(1)}× 설정`);
    });
  }

  // Shutter action
  if (shutterBtn) {
    shutterBtn.addEventListener('click', () => {
      if (analyzingOverlay) analyzingOverlay.classList.add('visible');
      if (statusText) statusText.textContent = '스캔 중... 용기를 가만히 유지하세요';

      setTimeout(() => {
        window.location.href = 'scan-result.html?new=true';
      }, 1800);
    });
  }

  // Album file upload
  if (albumBtn && fileInput) {
    albumBtn.addEventListener('click', () => {
      fileInput.click();
    });

    fileInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files[0]) {
        if (analyzingOverlay) analyzingOverlay.classList.add('visible');
        setTimeout(() => {
          window.location.href = 'scan-result.html?upload=true';
        }, 1500);
      }
    });
  }
});
