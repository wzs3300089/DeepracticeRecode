(() => {
  // js/main.js
  document.addEventListener("DOMContentLoaded", function() {
    initSmoothScrolling();
    initSearch();
    initCategoryFilters();
    initAnimations();
  });
  function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach((link) => {
      link.addEventListener("click", function(e) {
        e.preventDefault();
        const targetId = this.getAttribute("href");
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
        }
      });
    });
  }
  function initSearch() {
    const searchInput = document.querySelector(".search-input");
    if (searchInput) {
      searchInput.addEventListener("input", debounce(function(e) {
        const searchTerm = e.target.value.toLowerCase().trim();
        performSearch(searchTerm);
      }, 300));
      searchInput.addEventListener("keypress", function(e) {
        if (e.key === "Enter") {
          e.preventDefault();
          const searchTerm = e.target.value.toLowerCase().trim();
          performSearch(searchTerm);
        }
      });
    }
  }
  function performSearch(searchTerm) {
    const featuredCards = document.querySelectorAll(".featured-card");
    const gridCards = document.querySelectorAll(".cards-grid .card");
    const allCards = [...featuredCards, ...gridCards];
    let visibleCount = 0;
    allCards.forEach((card) => {
      const shouldShow = searchInCard(card, searchTerm);
      if (shouldShow) {
        card.style.display = "block";
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
        visibleCount++;
        highlightSearchTerm(card, searchTerm);
      } else {
        card.style.opacity = "0";
        card.style.transform = "translateY(20px)";
        setTimeout(() => {
          if (card.style.opacity === "0") {
            card.style.display = "none";
          }
        }, 300);
      }
    });
    updateSearchStats(searchTerm, visibleCount, allCards.length);
  }
  function searchInCard(card, searchTerm) {
    if (!searchTerm) return true;
    const titleElement = card.querySelector(".featured-title, .card-title");
    const title = titleElement ? titleElement.textContent.toLowerCase() : "";
    const descElement = card.querySelector(".featured-description, .card-description");
    const description = descElement ? descElement.textContent.toLowerCase() : "";
    const tagElements = card.querySelectorAll(".featured-tags .tag, .card-tags .tag");
    const tags = Array.from(tagElements).map((tag) => tag.textContent.toLowerCase()).join(" ");
    return title.includes(searchTerm) || description.includes(searchTerm) || tags.includes(searchTerm);
  }
  function highlightSearchTerm(card, searchTerm) {
    if (!searchTerm) {
      clearHighlights(card);
      return;
    }
    const elementsToHighlight = card.querySelectorAll(".featured-title, .card-title, .featured-description, .card-description, .tag");
    elementsToHighlight.forEach((element) => {
      const originalText = element.textContent;
      const highlightedText = originalText.replace(
        new RegExp(`(${escapeRegExp(searchTerm)})`, "gi"),
        '<mark class="search-highlight">$1</mark>'
      );
      if (highlightedText !== originalText) {
        element.innerHTML = highlightedText;
      }
    });
  }
  function clearHighlights(card) {
    const highlights = card.querySelectorAll(".search-highlight");
    highlights.forEach((highlight) => {
      const parent = highlight.parentNode;
      parent.replaceChild(document.createTextNode(highlight.textContent), highlight);
      parent.normalize();
    });
  }
  function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }
  function updateSearchStats(searchTerm, visibleCount, totalCount) {
    let statsElement = document.querySelector(".search-stats");
    if (!statsElement) {
      statsElement = document.createElement("div");
      statsElement.className = "search-stats";
      const searchContainer = document.querySelector(".search-container");
      if (searchContainer) {
        searchContainer.appendChild(statsElement);
      }
    }
    if (searchTerm) {
      statsElement.innerHTML = `
            <div class="search-stats-content">
                <span class="search-results">\u627E\u5230 ${visibleCount} \u4E2A\u7ED3\u679C</span>
                ${searchTerm ? `<span class="search-term">\u5173\u952E\u8BCD: "${searchTerm}"</span>` : ""}
            </div>
        `;
      statsElement.style.display = "block";
    } else {
      statsElement.style.display = "none";
    }
  }
  function initCategoryFilters() {
    const filterButtons = document.querySelectorAll(".category-filters .btn");
    const cards = document.querySelectorAll(".card");
    filterButtons.forEach((button) => {
      button.addEventListener("click", function() {
        filterButtons.forEach((btn) => {
          btn.classList.remove("btn-primary");
          btn.classList.add("btn-outline");
        });
        this.classList.remove("btn-outline");
        this.classList.add("btn-primary");
        const filterText = this.textContent.trim();
        cards.forEach((card) => {
          if (filterText === "\u5168\u90E8") {
            card.style.display = "block";
          } else {
            const cardBadges = card.querySelectorAll(".badge");
            let shouldShow = false;
            cardBadges.forEach((badge) => {
              if (badge.textContent.includes(filterText)) {
                shouldShow = true;
              }
            });
            card.style.display = shouldShow ? "block" : "none";
          }
        });
      });
    });
  }
  function initAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px"
    };
    const observer = new IntersectionObserver(function(entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target;
          element.classList.add("animate-in");
          const delay = Array.from(element.parentNode.children).indexOf(element) * 100;
          setTimeout(() => {
            element.style.opacity = "1";
            element.style.transform = "translateY(0) scale(1)";
          }, delay);
        }
      });
    }, observerOptions);
    const animatedElements = document.querySelectorAll(".card, .featured-card, .content-section, .stat-item");
    animatedElements.forEach((element, index) => {
      element.style.opacity = "0";
      element.style.transform = "translateY(30px) scale(0.95)";
      element.style.transition = "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)";
      observer.observe(element);
    });
    const buttons = document.querySelectorAll(".btn");
    buttons.forEach((button) => {
      button.addEventListener("click", function(e) {
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
        this.appendChild(ripple);
        setTimeout(() => {
          ripple.remove();
        }, 600);
      });
      button.addEventListener("mouseenter", function() {
        if (!this.disabled) {
          this.style.transform = "translateY(-3px) scale(1.02)";
        }
      });
      button.addEventListener("mouseleave", function() {
        if (!this.disabled) {
          this.style.transform = "translateY(0) scale(1)";
        }
      });
    });
    if (!document.querySelector("#ripple-styles")) {
      const style = document.createElement("style");
      style.id = "ripple-styles";
      style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
      document.head.appendChild(style);
    }
    initPageLoadAnimation();
  }
  function initPageLoadAnimation() {
    const heroTitle = document.querySelector(".hero-title");
    const heroDescription = document.querySelector(".hero-description");
    const statsContainer = document.querySelector(".stats-container");
    if (heroTitle) {
      heroTitle.style.animation = "fadeInUp 1s ease-out 0.2s both";
    }
    if (heroDescription) {
      heroDescription.style.animation = "fadeInUp 1s ease-out 0.4s both";
    }
    if (statsContainer) {
      statsContainer.style.animation = "fadeInUp 1s ease-out 0.6s both";
    }
  }
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
  window.addEventListener("scroll", debounce(function() {
    const header = document.querySelector(".header, .peta-header");
    if (header) {
      if (window.scrollY > 100) {
        header.style.backgroundColor = "rgba(255, 255, 255, 0.95)";
        header.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.15)";
      } else {
        header.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
        header.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.1)";
      }
    }
  }, 10));
  function initNewsletter() {
    const newsletterForm = document.querySelector(".newsletter-form");
    if (newsletterForm) {
      newsletterForm.addEventListener("submit", function(e) {
        e.preventDefault();
        const emailInput = this.querySelector('input[type="email"]');
        const email = emailInput.value;
        if (email) {
          alert(`\u611F\u8C22\u8BA2\u9605\uFF01\u90AE\u7BB1\uFF1A${email}`);
          emailInput.value = "";
        }
      });
    }
  }
  document.addEventListener("DOMContentLoaded", function() {
    initNewsletter();
  });
  function initImageLoading() {
    const images = document.querySelectorAll("img");
    images.forEach((img) => {
      img.addEventListener("load", function() {
        this.style.opacity = "1";
      });
      img.addEventListener("error", function() {
        this.style.opacity = "0.5";
        console.log("Failed to load image:", this.src);
      });
      img.style.opacity = "0";
      img.style.transition = "opacity 0.3s ease";
    });
  }
  document.addEventListener("DOMContentLoaded", function() {
    initImageLoading();
  });
  document.addEventListener("keydown", function(e) {
    if (e.key === "Escape") {
      console.log("ESC pressed");
    }
    if (e.key === "Enter" && e.target.classList.contains("btn")) {
      e.target.click();
    }
  });
  function initAccessibility() {
    const focusableElements = document.querySelectorAll("button, a, input, [tabindex]");
    focusableElements.forEach((element) => {
      element.addEventListener("focus", function() {
        this.style.outline = "2px solid #3b82f6";
        this.style.outlineOffset = "2px";
      });
      element.addEventListener("blur", function() {
        this.style.outline = "none";
      });
    });
  }
  document.addEventListener("DOMContentLoaded", function() {
    initAccessibility();
  });
  function initLazyLoading() {
    if ("IntersectionObserver" in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove("lazy");
            imageObserver.unobserve(img);
          }
        });
      });
      const lazyImages = document.querySelectorAll("img[data-src]");
      lazyImages.forEach((img) => imageObserver.observe(img));
    }
  }
  document.addEventListener("DOMContentLoaded", function() {
    initLazyLoading();
  });
  console.log("%c\u6B22\u8FCE\u6765\u5230 Deepractice \u76F4\u64AD\u8BB0\u5F55\u7F51\u7AD9\uFF01", "color: #3b82f6; font-size: 16px; font-weight: bold;");
  console.log("%c\u8FD9\u662F\u4E00\u4E2A\u9759\u6001\u590D\u523B\u7248\u672C\uFF0C\u5C55\u793A\u4E86\u539F\u59CB Next.js \u5E94\u7528\u7684\u8BBE\u8BA1\u548C\u529F\u80FD\u3002", "color: #6b7280; font-size: 14px;");
})();
