let slideIndex = 1;
showSlides(slideIndex);

// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const closeMenu = document.querySelector('.close-menu');
    const mobileMenu = document.querySelector('.mobile-menu');
    const menuItems = document.querySelectorAll('.mobile-menu ul li');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
        });
    }

    if (closeMenu && mobileMenu) {
        closeMenu.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            closeMobileMenu();
        });
    }

    // Close menu when clicking menu items
    menuItems.forEach(item => {
        item.addEventListener('click', closeMobileMenu);
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (mobileMenu && mobileMenu.classList.contains('active')) {
            if (!mobileMenu.contains(e.target) && e.target !== menuToggle) {
                closeMobileMenu();
            }
        }
    });
});

function closeMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    if (mobileMenu) {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }
}

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) {slideIndex = 1}    
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";  
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "flex";  
    dots[slideIndex-1].className += " active";
}
async function updateLeetCodeStats() {
    try {
      const response = await fetch("https://alfa-leetcode-api.onrender.com/userProfile/Santhana_krishnan");
      const data = await response.json();

      // Update problem counts
      document.getElementById("total-solved").textContent = data.totalSolved;
      document.getElementById("easy-solved").textContent = data.easySolved;
      document.getElementById("medium-solved").textContent = data.mediumSolved;
      document.getElementById("hard-solved").textContent = data.hardSolved;

      // Update top topics
      const topicsContainer = document.getElementById("top-topics");
      topicsContainer.innerHTML = ""; // Clear existing badges

      const topTopics = data.topTopics || ["Arrays", "String", "DP", "DSA"]; // fallback
      topTopics.forEach(topic => {
        const badge = document.createElement("div");
        badge.className = "badge";
        badge.textContent = topic;
        topicsContainer.appendChild(badge);
      });
    } catch (error) {
      console.error("Failed to fetch LeetCode data:", error);
    }
  }

  // Call the function when the page loads
  window.addEventListener("DOMContentLoaded", updateLeetCodeStats);
