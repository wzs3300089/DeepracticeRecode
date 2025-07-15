// DOM元素
const sidebar = document.getElementById('sidebar');
const sidebarToggle = document.getElementById('sidebar-toggle');
const navLinks = document.querySelectorAll('.nav-link');
const readingProgress = document.getElementById('reading-progress');
const sections = document.querySelectorAll('.content-section');

// 侧边栏切换功能
function toggleSidebar() {
    sidebar.classList.toggle('active');
}

// 侧边栏点击事件
if (sidebarToggle) {
    sidebarToggle.addEventListener('click', toggleSidebar);
}

// 点击主内容区域关闭侧边栏（移动端）
document.querySelector('.main-content').addEventListener('click', () => {
    if (window.innerWidth <= 1024) {
        sidebar.classList.remove('active');
    }
});

// 阻止侧边栏内部点击事件冒泡
sidebar.addEventListener('click', (e) => {
    e.stopPropagation();
});

// 平滑滚动到指定区块
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 80; // 考虑固定导航的高度
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
        
        // 移动端关闭侧边栏
        if (window.innerWidth <= 1024) {
            sidebar.classList.remove('active');
        }
    }
}

// 导航链接点击事件
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const sectionId = link.getAttribute('data-section');
        scrollToSection(sectionId);
    });
});

// 滚动监听 - 更新活跃导航和阅读进度
function updateNavigationAndProgress() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = (scrollTop / documentHeight) * 100;
    
    // 更新阅读进度条
    if (readingProgress) {
        readingProgress.style.width = `${Math.min(scrollProgress, 100)}%`;
    }
    
    // 更新活跃导航项
    let activeSection = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
            activeSection = section.id;
        }
    });
    
    // 更新导航链接状态
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === activeSection) {
            link.classList.add('active');
        }
    });
}

// 节流函数
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// 滚动事件监听（节流处理）
window.addEventListener('scroll', throttle(updateNavigationAndProgress, 16));

// 窗口大小改变事件
window.addEventListener('resize', () => {
    if (window.innerWidth > 1024) {
        sidebar.classList.remove('active');
    }
});

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    updateNavigationAndProgress();

    // 添加页面加载动画
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in-out';

    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);

    // 初始化动画观察器
    initializeAnimations();

    // 修复返回首页链接路径
    fixBackHomeLinks();
});

// 动画观察器
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // 观察所有需要动画的元素
    const animatedElements = document.querySelectorAll(
        '.concept-card, .comparison-card, .criticism-card, .memory-type, .demo-step, .thinking-type, .knowledge-layer'
    );
    
    animatedElements.forEach(el => {
        el.classList.add('animate-element');
        observer.observe(el);
    });
}

// 添加动画样式
const animationStyles = `
    .animate-element {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease-out;
    }
    
    .animate-element.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .animate-element:nth-child(2) {
        transition-delay: 0.1s;
    }
    
    .animate-element:nth-child(3) {
        transition-delay: 0.2s;
    }
    
    .animate-element:nth-child(4) {
        transition-delay: 0.3s;
    }
`;

// 动态添加动画样式
const styleSheet = document.createElement('style');
styleSheet.textContent = animationStyles;
document.head.appendChild(styleSheet);

// 键盘导航支持
document.addEventListener('keydown', (e) => {
    // ESC键关闭侧边栏
    if (e.key === 'Escape') {
        sidebar.classList.remove('active');
    }
    
    // 方向键导航
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault();
        const currentActive = document.querySelector('.nav-link.active');
        if (currentActive) {
            const allLinks = Array.from(navLinks);
            const currentIndex = allLinks.indexOf(currentActive);
            let nextIndex;
            
            if (e.key === 'ArrowUp') {
                nextIndex = currentIndex > 0 ? currentIndex - 1 : allLinks.length - 1;
            } else {
                nextIndex = currentIndex < allLinks.length - 1 ? currentIndex + 1 : 0;
            }
            
            const nextSection = allLinks[nextIndex].getAttribute('data-section');
            scrollToSection(nextSection);
        }
    }
});

// 触摸手势支持（移动端）
let touchStartX = 0;
let touchStartY = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
});

document.addEventListener('touchend', (e) => {
    if (!touchStartX || !touchStartY) return;
    
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    
    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;
    
    // 水平滑动距离大于垂直滑动距离
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // 向右滑动打开侧边栏
        if (deltaX > 50 && touchStartX < 50) {
            sidebar.classList.add('active');
        }
        // 向左滑动关闭侧边栏
        else if (deltaX < -50 && sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
        }
    }
    
    touchStartX = 0;
    touchStartY = 0;
});

// 工具函数：防抖
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

// 搜索功能（如果需要的话）
function initializeSearch() {
    const searchInput = document.getElementById('search-input');
    if (!searchInput) return;
    
    const searchHandler = debounce((query) => {
        if (query.length < 2) return;
        
        // 简单的内容搜索
        const content = document.querySelectorAll('h1, h2, h3, h4, p');
        content.forEach(element => {
            const text = element.textContent.toLowerCase();
            if (text.includes(query.toLowerCase())) {
                element.classList.add('search-highlight');
            } else {
                element.classList.remove('search-highlight');
            }
        });
    }, 300);
    
    searchInput.addEventListener('input', (e) => {
        searchHandler(e.target.value);
    });
}

// 暗色主题切换（可选功能）
function initializeThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;
    
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

// 返回首页函数
function goBackHome() {
    const currentPath = window.location.pathname;
    const currentHost = window.location.origin;

    // 检测当前页面路径
    if (currentPath.includes('/peta-os-website/')) {
        // 如果在子目录中，返回上级目录的index.html
        window.location.href = '../index.html';
    } else if (currentPath.includes('peta-os-website')) {
        // 处理其他可能的路径情况
        const pathParts = currentPath.split('/');
        const petaIndex = pathParts.indexOf('peta-os-website');
        if (petaIndex > 0) {
            const parentPath = pathParts.slice(0, petaIndex).join('/');
            window.location.href = parentPath + '/index.html';
        } else {
            window.location.href = '../index.html';
        }
    } else {
        // 如果在根目录或其他情况，尝试返回根目录
        window.location.href = './index.html';
    }
}

// 修复返回首页链接路径（保留原函数以防需要）
function fixBackHomeLinks() {
    // 这个函数现在主要用于调试和备用
    console.log('Current path:', window.location.pathname);
    console.log('Current href:', window.location.href);
}

// 导出全局函数供HTML使用
window.scrollToSection = scrollToSection;
window.toggleSidebar = toggleSidebar;
window.goBackHome = goBackHome;
window.fixBackHomeLinks = fixBackHomeLinks;
