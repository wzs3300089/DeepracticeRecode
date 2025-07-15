// import { initToolbar } from '@stagewise/toolbar'; // 已屏蔽stagewise相关代码

// Main JavaScript for Deepractice Static Site

// initToolbar({
//   plugins: [],
// }); // 已屏蔽stagewise相关代码

document.addEventListener('DOMContentLoaded', function() {
    // Initialize smooth scrolling for anchor links
    initSmoothScrolling();
    
    // Initialize search functionality
    initSearch();
    
    // Initialize category filters
    initCategoryFilters();
    
    // Initialize animations
    initAnimations();
});

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Search functionality
function initSearch() {
    const searchInput = document.querySelector('.search-input');

    if (searchInput) {
        // 实时搜索功能
        searchInput.addEventListener('input', debounce(function(e) {
            const searchTerm = e.target.value.toLowerCase().trim();
            performSearch(searchTerm);
        }, 300));

        // 回车键搜索
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                const searchTerm = e.target.value.toLowerCase().trim();
                performSearch(searchTerm);
            }
        });
    }
}

// 执行搜索功能
function performSearch(searchTerm) {
    const featuredCards = document.querySelectorAll('.featured-card');
    const gridCards = document.querySelectorAll('.cards-grid .card');
    const allCards = [...featuredCards, ...gridCards];

    let visibleCount = 0;

    allCards.forEach(card => {
        const shouldShow = searchInCard(card, searchTerm);

        if (shouldShow) {
            card.style.display = 'block';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
            visibleCount++;

            // 高亮搜索结果
            highlightSearchTerm(card, searchTerm);
        } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                if (card.style.opacity === '0') {
                    card.style.display = 'none';
                }
            }, 300);
        }
    });

    // 显示搜索结果统计
    updateSearchStats(searchTerm, visibleCount, allCards.length);
}

// 在卡片中搜索
function searchInCard(card, searchTerm) {
    if (!searchTerm) return true; // 空搜索显示所有

    // 搜索标题
    const titleElement = card.querySelector('.featured-title, .card-title');
    const title = titleElement ? titleElement.textContent.toLowerCase() : '';

    // 搜索描述
    const descElement = card.querySelector('.featured-description, .card-description');
    const description = descElement ? descElement.textContent.toLowerCase() : '';

    // 搜索标签
    const tagElements = card.querySelectorAll('.featured-tags .tag, .card-tags .tag');
    const tags = Array.from(tagElements).map(tag => tag.textContent.toLowerCase()).join(' ');

    // 模糊搜索匹配
    return title.includes(searchTerm) ||
           description.includes(searchTerm) ||
           tags.includes(searchTerm);
}

// 高亮搜索词
function highlightSearchTerm(card, searchTerm) {
    if (!searchTerm) {
        // 清除之前的高亮
        clearHighlights(card);
        return;
    }

    const elementsToHighlight = card.querySelectorAll('.featured-title, .card-title, .featured-description, .card-description, .tag');

    elementsToHighlight.forEach(element => {
        const originalText = element.textContent;
        const highlightedText = originalText.replace(
            new RegExp(`(${escapeRegExp(searchTerm)})`, 'gi'),
            '<mark class="search-highlight">$1</mark>'
        );

        if (highlightedText !== originalText) {
            element.innerHTML = highlightedText;
        }
    });
}

// 清除高亮
function clearHighlights(card) {
    const highlights = card.querySelectorAll('.search-highlight');
    highlights.forEach(highlight => {
        const parent = highlight.parentNode;
        parent.replaceChild(document.createTextNode(highlight.textContent), highlight);
        parent.normalize();
    });
}

// 转义正则表达式特殊字符
function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// 更新搜索统计
function updateSearchStats(searchTerm, visibleCount, totalCount) {
    let statsElement = document.querySelector('.search-stats');

    if (!statsElement) {
        statsElement = document.createElement('div');
        statsElement.className = 'search-stats';

        const searchContainer = document.querySelector('.search-container');
        if (searchContainer) {
            searchContainer.appendChild(statsElement);
        }
    }

    if (searchTerm) {
        statsElement.innerHTML = `
            <div class="search-stats-content">
                <span class="search-results">找到 ${visibleCount} 个结果</span>
                ${searchTerm ? `<span class="search-term">关键词: "${searchTerm}"</span>` : ''}
            </div>
        `;
        statsElement.style.display = 'block';
    } else {
        statsElement.style.display = 'none';
    }
}

// Category filter functionality
function initCategoryFilters() {
    const filterButtons = document.querySelectorAll('.category-filters .btn');
    const cards = document.querySelectorAll('.card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => {
                btn.classList.remove('btn-primary');
                btn.classList.add('btn-outline');
            });
            
            // Add active class to clicked button
            this.classList.remove('btn-outline');
            this.classList.add('btn-primary');
            
            const filterText = this.textContent.trim();
            
            // Filter cards based on category
            cards.forEach(card => {
                if (filterText === '全部') {
                    card.style.display = 'block';
                } else {
                    const cardBadges = card.querySelectorAll('.badge');
                    let shouldShow = false;
                    
                    cardBadges.forEach(badge => {
                        if (badge.textContent.includes(filterText)) {
                            shouldShow = true;
                        }
                    });
                    
                    card.style.display = shouldShow ? 'block' : 'none';
                }
            });
        });
    });
}

// Animation effects
function initAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                element.classList.add('animate-in');

                // 添加延迟动画效果
                const delay = Array.from(element.parentNode.children).indexOf(element) * 100;
                setTimeout(() => {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0) scale(1)';
                }, delay);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.card, .featured-card, .content-section, .stat-item');

    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px) scale(0.95)';
        element.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(element);
    });

    // Enhanced button effects
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(button => {
        // 添加涟漪效果
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
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

        // 悬停效果
        button.addEventListener('mouseenter', function() {
            if (!this.disabled) {
                this.style.transform = 'translateY(-3px) scale(1.02)';
            }
        });

        button.addEventListener('mouseleave', function() {
            if (!this.disabled) {
                this.style.transform = 'translateY(0) scale(1)';
            }
        });
    });

    // 添加涟漪动画CSS
    if (!document.querySelector('#ripple-styles')) {
        const style = document.createElement('style');
        style.id = 'ripple-styles';
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

    // 页面加载动画
    initPageLoadAnimation();
}

// 页面加载动画
function initPageLoadAnimation() {
    const heroTitle = document.querySelector('.hero-title');
    const heroDescription = document.querySelector('.hero-description');
    const statsContainer = document.querySelector('.stats-container');

    if (heroTitle) {
        heroTitle.style.animation = 'fadeInUp 1s ease-out 0.2s both';
    }

    if (heroDescription) {
        heroDescription.style.animation = 'fadeInUp 1s ease-out 0.4s both';
    }

    if (statsContainer) {
        statsContainer.style.animation = 'fadeInUp 1s ease-out 0.6s both';
    }
}

// Utility function to debounce function calls
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

// Add scroll effect to header
window.addEventListener('scroll', debounce(function() {
    const header = document.querySelector('.header, .peta-header');
    
    if (header) {
        if (window.scrollY > 100) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        }
    }
}, 10));

// Newsletter subscription (placeholder)
function initNewsletter() {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            if (email) {
                alert(`感谢订阅！邮箱：${email}`);
                emailInput.value = '';
            }
        });
    }
}

// Initialize newsletter if form exists
document.addEventListener('DOMContentLoaded', function() {
    initNewsletter();
});

// Add loading animation for images
function initImageLoading() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        img.addEventListener('error', function() {
            this.style.opacity = '0.5';
            console.log('Failed to load image:', this.src);
        });
        
        // Set initial opacity
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
    });
}

// Initialize image loading
document.addEventListener('DOMContentLoaded', function() {
    initImageLoading();
});

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // ESC key to close any open modals or overlays
    if (e.key === 'Escape') {
        // Close any open overlays
        console.log('ESC pressed');
    }
    
    // Enter key on focused buttons
    if (e.key === 'Enter' && e.target.classList.contains('btn')) {
        e.target.click();
    }
});

// Add focus management for accessibility
function initAccessibility() {
    // Add focus indicators
    const focusableElements = document.querySelectorAll('button, a, input, [tabindex]');
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid #3b82f6';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
}

// Initialize accessibility features
document.addEventListener('DOMContentLoaded', function() {
    initAccessibility();
});

// Performance optimization: Lazy load images
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', function() {
    initLazyLoading();
});

// Console welcome message
console.log('%c欢迎来到 Deepractice 直播记录网站！', 'color: #3b82f6; font-size: 16px; font-weight: bold;');
console.log('%c这是一个静态复刻版本，展示了原始 Next.js 应用的设计和功能。', 'color: #6b7280; font-size: 14px;');
