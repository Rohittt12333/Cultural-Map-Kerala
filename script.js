// Debug-enabled version with hover color fix and side menu
window.addEventListener("DOMContentLoaded", () => {
  console.log("✅ JS loaded — DOM fully parsed.");

  // Check if the SVG exists
  const svgElement = document.querySelector("svg");
  if (!svgElement) {
    console.error("❌ SVG not found in DOM. Make sure your <svg> is inline in HTML.");
    return;
  } else {
    console.log("✅ SVG found:", svgElement);
  }

  // Select all districts (SVG elements with an ID)
  const districts = document.querySelectorAll("svg [id]");
  console.log(`✅ Found ${districts.length} districts in SVG.`);

  if (districts.length === 0) {
    console.warn("⚠️ No <path> or <g> elements with IDs found in the SVG. Check your SVG file in Figma or editor.");
  }

  // Overlay elements
  const overlay = document.getElementById("video-overlay");
  const video = document.getElementById("district-video");
  const closeBtn = document.getElementById("close-btn");

  console.log("Overlay:", overlay);
  console.log("Video element:", video);
  console.log("Close button:", closeBtn);

  // Side menu elements
  const menu = document.getElementById("district-menu");
  const menuTitle = document.getElementById("menu-title");
  const menuInfo = document.getElementById("menu-info");

  // Sample videos mapping
  const videos = {
    Alappuzha: "videos/alappuzha.mp4",
    Kollam: "videos/vid1.mp4",
    Ernakulam: "videos/ernakulam.mp4",
  };

  // Sample district info
  const districtInfo = {
    Alappuzha: "Famous for backwaters and coir industry.",
    Kollam: "Known for cashew processing and beaches.",
    Ernakulam: "Heart of Kerala’s commerce and Kochi city.",
    // Add the rest of the districts here...
  };

  // Add events to each district
  districts.forEach((district) => {
    console.log(`🎯 Adding listener to: ${district.id}`);

    // Store original fill
    const originalFill = district.getAttribute("fill") || "transparent";

    // Hover event
    district.addEventListener("mouseenter", () => {
      console.log(`🟢 Hovered: ${district.id}`);

      // Bring district to front
      district.parentNode.appendChild(district);

      // Change fill color (semi-opaque green)
      district.setAttribute("fill", "rgba(0,200,0,0.7)");
      district.setAttribute("cursor", "pointer");

      // Update side menu
      if (menu && menuTitle && menuInfo) {
        menuTitle.textContent = district.id;
        menuInfo.textContent = districtInfo[district.id] || "No info available";
        menu.classList.remove("hidden");
        menu.classList.add("visible");
      }
    });

    // Remove hover color
    district.addEventListener("mouseleave", () => {
      district.setAttribute("fill", originalFill);

      // Hide side menu
      if (menu) {
        menu.classList.remove("visible");
        menu.classList.add("hidden");
      }
    });

    // Click event
    district.addEventListener("click", () => {
      console.log(`🟡 Clicked: ${district.id}`);
      const videoSrc = videos[district.id];
      if (videoSrc) {
        console.log(`🎬 Loading video: ${videoSrc}`);
        // Show overlay and load video
        if (overlay && video) {
          overlay.classList.remove("hidden");
          video.src = videoSrc;
          video.play();
        }
      } else {
        console.warn(`⚠️ No video assigned for ${district.id}`);
      }
    });
  });

  // Close button for overlay
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      overlay.classList.add("hidden");
      video.pause();
      video.src = "";
    });
  }

  // Check GSAP
  if (typeof gsap === "undefined") {
    console.error("❌ GSAP not loaded. Check your CDN link in HTML.");
  } else {
    console.log("✅ GSAP loaded successfully.");
  }
});
