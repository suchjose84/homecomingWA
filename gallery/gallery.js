
//GALLERY
// OLD IMAGES (1–41)
const oldImages = [];

for (let i = 1; i <= 40; i++) {
  oldImages.push(`alumni-old-${i}.jpg`);
}

// NEW IMAGES (adjust count if needed)
const newImages = [];

for (let i = 1; i <= 37; i++) {
  newImages.push(`alumni-new-${i}.jpg`);
}

// RENDER FUNCTION
function renderGallery(images, folder, containerId) {
  const container = document.getElementById(containerId);

  images.forEach(file => {
    const img = document.createElement("img");
    img.src = `/assets/alumni-pics/${folder}/${file}`;
    img.alt = "";
    img.loading = "lazy";
    container.appendChild(img);
  });
}

// 🔥 RUN BOTH
renderGallery(oldImages, "alumni-olds", "oldGallery");
renderGallery(newImages, "alumni-new", "newGallery");


// ==========================
// 🎥 VIDEO FIX (NO ECHO - FINAL)
// ==========================

const videos = document.querySelectorAll(".video-grid video");
const modal = document.getElementById("videoModal");
const modalVideo = document.getElementById("modalVideo");
const closeBtn = document.querySelector(".close-modal");

// 🔥 HARD STOP FUNCTION
function stopAllVideos() {
  videos.forEach(v => {
    v.pause();
    v.currentTime = 0;
    v.muted = true;          // 🔥 force mute
  });

  if (modalVideo) {
    modalVideo.pause();
    modalVideo.currentTime = 0;
    modalVideo.src = "";
    modalVideo.muted = true; // 🔥 prevent overlap
  }
}

// 🔥 CLICK → OPEN MODAL
videos.forEach(video => {
  video.addEventListener("click", () => {

    stopAllVideos(); // 🔥 HARD RESET EVERYTHING

    if (!modal || !modalVideo) return;

    const source = video.querySelector("source");

    modal.style.display = "flex";

    modalVideo.src = source.src;
    modalVideo.muted = false; // 🔥 only modal has sound

    modalVideo.play().catch(() => {});
  });
});

// 🔥 CLOSE MODAL
function closeModal() {
  if (!modal || !modalVideo) return;

  modal.style.display = "none";

  modalVideo.pause();
  modalVideo.currentTime = 0;
  modalVideo.src = "";
  modalVideo.muted = true;
}

// BUTTON CLOSE
if (closeBtn) {
  closeBtn.addEventListener("click", closeModal);
}

// CLICK OUTSIDE
if (modal) {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });
}