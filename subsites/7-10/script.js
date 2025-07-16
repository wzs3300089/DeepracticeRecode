// 侧边栏切换功能 - 立即定义到全局作用域
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
        sidebar.classList.toggle('active');
    }
}

// 将函数添加到全局作用域
window.toggleSidebar = toggleSidebar;

// DOM元素
const sidebar = document.getElementById('sidebar');
const sidebarToggle = document.getElementById('sidebar-toggle');
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const navLinks = document.querySelectorAll('.nav-link');
const readingProgress = document.getElementById('reading-progress');
const sections = document.querySelectorAll('.content-section, .hero-section');

// 侧边栏点击事件
if (sidebarToggle) {
    sidebarToggle.addEventListener('click', toggleSidebar);
}

// 移动端菜单按钮点击事件
if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', toggleSidebar);
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

// 导航链接点击事件
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const sectionId = link.getAttribute('data-section');
        scrollToSection(sectionId);
    });
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
        const sidebar = document.getElementById('sidebar');
        if (window.innerWidth <= 1024 && sidebar) {
            sidebar.classList.remove('active');
        }
    }
}

// 将函数添加到全局作用域
window.scrollToSection = scrollToSection;



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

// 返回首页函数 - 立即定义到全局作用域
function goBackHome() {
    const currentHref = window.location.href;
    if (currentHref.includes('github.io')) {
        window.location.href = '/DeepracticeRecode/';
    } else {
        window.location.href = '/';
    }
}

// 将函数添加到全局作用域
window.goBackHome = goBackHome;

// 页面初始化
updateNavigationAndProgress();

// 添加动画效果
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
const animateElements = document.querySelectorAll('.concept-card, .comparison-card, .requirement-card, .format-card, .principle-card, .benefit-card');
animateElements.forEach(el => {
    observer.observe(el);
});

// 添加动画样式
const style = document.createElement('style');
style.textContent = `
    .concept-card, .comparison-card, .requirement-card, .format-card, .principle-card, .benefit-card {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease-out;
    }

    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }

    .concept-card:nth-child(1) { transition-delay: 0.1s; }
    .concept-card:nth-child(2) { transition-delay: 0.2s; }
    .concept-card:nth-child(3) { transition-delay: 0.3s; }

    .comparison-card:nth-child(1) { transition-delay: 0.1s; }
    .comparison-card:nth-child(2) { transition-delay: 0.2s; }

    .requirement-card:nth-child(1) { transition-delay: 0.1s; }
    .requirement-card:nth-child(2) { transition-delay: 0.2s; }
    .requirement-card:nth-child(3) { transition-delay: 0.3s; }

    .format-card:nth-child(1) { transition-delay: 0.1s; }
    .format-card:nth-child(2) { transition-delay: 0.2s; }
    .format-card:nth-child(3) { transition-delay: 0.3s; }

    .principle-card:nth-child(1) { transition-delay: 0.1s; }
    .principle-card:nth-child(2) { transition-delay: 0.2s; }
    .principle-card:nth-child(3) { transition-delay: 0.3s; }

    .benefit-card:nth-child(1) { transition-delay: 0.1s; }
    .benefit-card:nth-child(2) { transition-delay: 0.2s; }
`;
document.head.appendChild(style);

// 键盘导航支持
document.addEventListener('keydown', (e) => {
    // ESC键关闭侧边栏
    if (e.key === 'Escape') {
        sidebar.classList.remove('active');
    }
    
    // 空格键或回车键切换侧边栏
    if ((e.key === ' ' || e.key === 'Enter') && e.target === sidebarToggle) {
        e.preventDefault();
        toggleSidebar();
    }
});

// 触摸手势支持（移动端）
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 100;
    const swipeDistance = touchEndX - touchStartX;
    
    // 从左边缘向右滑动打开侧边栏
    if (swipeDistance > swipeThreshold && touchStartX < 50) {
        sidebar.classList.add('active');
    }
    
    // 向左滑动关闭侧边栏
    if (swipeDistance < -swipeThreshold && sidebar.classList.contains('active')) {
        sidebar.classList.remove('active');
    }
}

// 性能优化：预加载关键资源
function preloadResources() {
    // 预加载字体
    const fontLink = document.createElement('link');
    fontLink.rel = 'preload';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap';
    fontLink.as = 'style';
    fontLink.onload = function() {
        this.onload = null;
        this.rel = 'stylesheet';
    };
    document.head.appendChild(fontLink);
}

// 页面可见性API - 优化性能
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // 页面隐藏时暂停动画
        document.body.style.animationPlayState = 'paused';
    } else {
        // 页面显示时恢复动画
        document.body.style.animationPlayState = 'running';
    }
});

// 初始化预加载
preloadResources();
