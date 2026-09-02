/* modal.js */
// Helper module for modals if needed
const Modal = {
  open(elementId) {
    const el = document.getElementById(elementId);
    if (el) el.classList.add('open');
  },
  close(elementId) {
    const el = document.getElementById(elementId);
    if (el) el.classList.remove('open');
  }
};
