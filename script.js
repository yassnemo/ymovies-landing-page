document.addEventListener("DOMContentLoaded", function () {
  // Button interactions with enhanced effects
  document.querySelectorAll(".btn-primary").forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();

      // Create ripple effect
      const ripple = document.createElement("span");
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
      `;

      this.style.position = "relative";
      this.style.overflow = "hidden";
      this.appendChild(ripple);

      setTimeout(() => ripple.remove(), 600);

      // Show project action notification
      setTimeout(() => {
        showNotification("🎬 Opening YMovies project...", "success");
      }, 300);
    });
  });

  // Secondary button interactions
  document.querySelectorAll(".btn-secondary").forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      showNotification("📝 Source code coming soon!", "info");
    });
  });

  // Tech stack item interactions
  document.querySelectorAll(".tech-item").forEach((item) => {
    item.addEventListener("click", function () {
      const tech = this.textContent;
      const messages = {
        'Python': '🐍 Python powers the machine learning algorithms',
        'React': '⚛️ React creates the dynamic user interface',
        'Flask': '🌶️ Flask serves as the backend API framework',
        'Pandas': '🐼 Pandas handles data processing and analysis',
        'Scikit-learn': '🤖 Scikit-learn provides ML model implementations',
        'PostgreSQL': '🐘 PostgreSQL stores user data and preferences'
      };
      
      const message = messages[tech] || `${tech} is a key technology in YMovies`;
      showNotification(message, "info");
    });
  });

  // Notification system
  function showNotification(message, type = "info") {
    // Remove existing notification
    const existing = document.querySelector(".notification");
    if (existing) existing.remove();

    const notification = document.createElement("div");
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
      <div class="notification-content">
        <span>${message}</span>
        <button class="notification-close">&times;</button>
      </div>
    `;

    // Styles
    const styles = `
      .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 10000;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.75rem;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
        transform: translateX(400px);
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        max-width: 350px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
      }
      .notification.show {
        transform: translateX(0);
      }
      .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
      }
      .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0.8;
        transition: opacity 0.2s;
        line-height: 1;
      }
      .notification-close:hover {
        opacity: 1;
      }
    `;

    if (!document.querySelector("#notification-styles")) {
      const styleSheet = document.createElement("style");
      styleSheet.id = "notification-styles";
      styleSheet.textContent = styles;
      document.head.appendChild(styleSheet);
    }

    document.body.appendChild(notification);
    requestAnimationFrame(() => notification.classList.add("show"));

    // Close functionality
    notification
      .querySelector(".notification-close")
      .addEventListener("click", () => {
        notification.classList.remove("show");
        setTimeout(() => notification.remove(), 300);
      });

    // Auto remove
    setTimeout(() => {
      if (notification.parentNode) {
        notification.classList.remove("show");
        setTimeout(() => notification.remove(), 300);
      }
    }, 4000);
  }

  function getNotificationColor(type) {
    switch (type) {
      case "success":
        return "linear-gradient(135deg, #10b981, #059669)";
      case "error":
        return "linear-gradient(135deg, #ef4444, #dc2626)";
      case "info":
        return "linear-gradient(135deg, #3b82f6, #2563eb)";
      default:
        return "linear-gradient(135deg, #6b7280, #4b5563)";
    }
  }

  // Add CSS ripple animation
  const rippleStyles = `
    @keyframes ripple {
      to {
        transform: scale(2);
        opacity: 0;
      }
    }
  `;

  if (!document.querySelector("#ripple-styles")) {
    const styleSheet = document.createElement("style");
    styleSheet.id = "ripple-styles";
    styleSheet.textContent = rippleStyles;
    document.head.appendChild(styleSheet);
  }

  // Smooth scroll behavior for any future anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  console.log("🎬 YMovies landing page loaded successfully!");
});

