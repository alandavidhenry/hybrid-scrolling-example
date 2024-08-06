const stickySections = [...document.querySelectorAll(".sticky")];
const scrollSections = stickySections.map((section) =>
  section.querySelector(".scroll_section")
);

let ticking = false;
let lastScrollY = window.scrollY;

// Adjust these values to control scrolling behavior
const scrollDuration = 1; // How long the sticky section stays active
const scrollSpeed = 3.5; // How fast the horizontal scroll moves (0-1, lower is slower)

document.documentElement.style.setProperty("--scroll-duration", scrollDuration);

function updateTransforms() {
  stickySections.forEach((section, index) => {
    const offsetTop = section.parentElement.offsetTop;
    const scrollSection = scrollSections[index];

    // Calculate progress based on the scroll duration and speed
    let progress =
      (lastScrollY - offsetTop) / (window.innerHeight * scrollDuration);
    progress = Math.max(0, Math.min(progress / scrollSpeed, 1));
    const clampedProgress = progress * 100;

    scrollSection.style.setProperty("--scroll-progress", clampedProgress);
  });

  ticking = false;
}

window.addEventListener("scroll", () => {
  lastScrollY = window.scrollY;
  if (!ticking) {
    window.requestAnimationFrame(updateTransforms);
    ticking = true;
  }
});

// Initial call to set positions
updateTransforms();