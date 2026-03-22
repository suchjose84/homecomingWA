// ==========================
// COUNTDOWN
// ==========================
const eventDate = new Date(2026, 3, 18, 13, 0, 0);

function tick() {
  const diff = eventDate - new Date();
  if (diff <= 0) return;

  const s = Math.floor(diff / 1000);

  document.getElementById('d').textContent = Math.floor(s / 86400);
  document.getElementById('h').textContent = String(Math.floor((s % 86400) / 3600)).padStart(2, '0');
  document.getElementById('m').textContent = String(Math.floor((s % 3600) / 60)).padStart(2, '0');
  document.getElementById('s').textContent = String(s % 60).padStart(2, '0');
}

tick();
setInterval(tick, 1000);

// YEAR
document.getElementById('year').textContent = new Date().getFullYear();


// ==========================
// VIDEO SLIDESHOW + AUDIO CONTROL
// ==========================
document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll('.video-slider video');
  let current = 0;

  // 🔊 GLOBAL AUDIO STATE
  let isMuted = true;

  function playVideo(index) {
    slides.forEach((video, i) => {
      video.pause();
      video.currentTime = 0;
      video.classList.remove('active');

      // always reset to muted first
      video.muted = true;
    });

    const currentVideo = slides[index];
    currentVideo.classList.add('active');

    // ✅ apply global mute state
    if (!isMuted) {
      currentVideo.muted = false;
      currentVideo.volume = 1;
    }

    currentVideo.play().catch(() => {});
  }

  // move to next video when one ends
  slides.forEach((video, index) => {
    video.addEventListener('ended', () => {
      current = (index + 1) % slides.length;
      playVideo(current);
    });
  });

  // stop all videos first (extra safety)
  slides.forEach(video => video.pause());

  // start first video
  playVideo(current);


  // ==========================
  // UNMUTE BUTTON
  // ==========================
  const unmuteBtn = document.getElementById("unmuteBtn");

  if (unmuteBtn) {
    unmuteBtn.addEventListener("click", () => {
      isMuted = !isMuted;

      const active = document.querySelector('.video-slider video.active');

      if (active) {
        active.muted = isMuted;
        active.volume = 1;
      }

      unmuteBtn.textContent = isMuted ? "🔊" : "🔇";
    });
  }
});