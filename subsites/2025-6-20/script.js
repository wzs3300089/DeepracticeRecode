// PromptX | 提示词优化技巧和设计原则 - 交互脚本
// 基于PETA-OS Website技术架构

console.log('🚀 PromptX脚本开始加载...');

// 全局变量
let sidebar, navLinks, sections, progressBar;
let isInitialized = false;

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

// 平滑滚动到指定区域
function scrollToSection(sectionId) {
    console.log('📍 滚动到区域:', sectionId);
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80; // 留出顶部空间
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
        
        // 更新导航状态
        updateActiveNavigation(sectionId);
    } else {
        console.warn('⚠️ 未找到目标区域:', sectionId);
    }
}

// 更新活动导航项
function updateActiveNavigation(activeId) {
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === activeId) {
            link.classList.add('active');
        }
    });
}

// 更新导航和进度条
function updateNavigationAndProgress() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = (scrollTop / documentHeight) * 100;
    
    // 更新进度条
    if (progressBar) {
        progressBar.style.width = `${Math.min(scrollProgress, 100)}%`;
    }
    
    // 检测当前可视区域的section
    let activeSection = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
            activeSection = section.id;
        }
    });
    
    // 更新导航状态
    if (activeSection) {
        updateActiveNavigation(activeSection);
    }
}

// 侧边栏切换功能
function toggleSidebar() {
    console.log('🔄 切换侧边栏状态开始');
    if (!sidebar) {
        console.error('❌ 侧边栏元素未找到');
        return;
    }

    const mainContent = document.querySelector('.main-content');
    const isMobile = window.innerWidth <= 1024;
    const currentTransform = window.getComputedStyle(sidebar).transform;
    const currentStyleTransform = sidebar.style.transform;

    console.log('📊 当前状态:', {
        isMobile,
        currentTransform,
        currentStyleTransform,
        windowWidth: window.innerWidth
    });

    const isHidden = currentTransform.includes('translateX(-') || currentStyleTransform.includes('translateX(-');

    console.log('🔍 侧边栏当前状态:', isHidden ? '隐藏' : '显示');

    if (isHidden) {
        // 显示侧边栏
        sidebar.style.transform = 'translateX(0)';
        if (isMobile) {
            sidebar.classList.add('active');
        } else {
            sidebar.classList.remove('active');
            // PC端：显示侧边栏时恢复margin-left
            if (mainContent) {
                mainContent.style.marginLeft = 'var(--sidebar-width)';
            }
        }
        console.log('✅ 侧边栏已显示');
    } else {
        // 隐藏侧边栏
        sidebar.style.transform = 'translateX(-100%)';
        if (isMobile) {
            sidebar.classList.remove('active');
        } else {
            sidebar.classList.add('active');
            // PC端：隐藏侧边栏时移除margin-left
            if (mainContent) {
                mainContent.style.marginLeft = '0';
            }
        }
        console.log('✅ 侧边栏已隐藏');
    }

    // 更新控制按钮显示状态
    setTimeout(() => {
        updateControlsVisibility();
    }, 50);
}

// 更新控制按钮显示状态
function updateControlsVisibility() {
    const controls = document.querySelector('.sidebar-collapsed-controls');
    const mobileBack = document.querySelector('.mobile-back-home');
    const isMobile = window.innerWidth <= 1024;

    if (!sidebar) return;

    // 统一使用transform检测
    const transform = window.getComputedStyle(sidebar).transform;
    const styleTransform = sidebar.style.transform;
    const isSidebarHidden = transform.includes('translateX(-') || styleTransform.includes('translateX(-');

    if (controls) {
        // 无论PC端还是移动端：侧边栏隐藏时显示控制按钮，显示时隐藏控制按钮
        controls.style.display = isSidebarHidden ? 'flex' : 'none';
    }

    if (mobileBack) {
        if (isMobile) {
            // 移动端：侧边栏隐藏时显示返回按钮
            mobileBack.style.display = isSidebarHidden ? 'block' : 'none';
        } else {
            // PC端：不显示移动端返回按钮
            mobileBack.style.display = 'none';
        }
    }

    console.log('🎛️ 更新控制按钮显示:', {
        isMobile,
        isSidebarHidden,
        transform: transform,
        styleTransform: styleTransform,
        controlsDisplay: controls ? controls.style.display : 'null',
        mobileBackDisplay: mobileBack ? mobileBack.style.display : 'null'
    });
}

// 响应式处理
function handleResize() {
    const isMobile = window.innerWidth <= 1024;
    const mainContent = document.querySelector('.main-content');

    if (!sidebar) return;

    if (isMobile) {
        // 移动端：默认隐藏，margin-left始终为0
        sidebar.style.transform = 'translateX(-100%)';
        sidebar.classList.remove('active');
        if (mainContent) {
            mainContent.style.marginLeft = '0';
        }
    } else {
        // PC端：默认显示，恢复margin-left
        sidebar.style.transform = 'translateX(0)';
        sidebar.classList.remove('active');
        if (mainContent) {
            mainContent.style.marginLeft = 'var(--sidebar-width)';
        }
    }

    // 延迟更新控制按钮状态，确保DOM更新完成
    setTimeout(() => {
        updateControlsVisibility();
    }, 100);

    console.log('📱 响应式调整:', isMobile ? '移动端' : 'PC端');
}

// 初始化函数
function initializeApp() {
    console.log('🔧 开始初始化应用...');
    
    // 获取DOM元素
    sidebar = document.getElementById('sidebar');
    navLinks = document.querySelectorAll('.nav-link');
    sections = document.querySelectorAll('.content-section, .hero-section');
    progressBar = document.getElementById('reading-progress');
    
    // 验证关键元素
    if (!sidebar) {
        console.error('❌ 侧边栏元素未找到');
        return;
    }
    
    if (navLinks.length === 0) {
        console.error('❌ 导航链接未找到');
        return;
    }
    
    if (sections.length === 0) {
        console.error('❌ 内容区域未找到');
        return;
    }
    
    console.log('✅ DOM元素获取成功:', {
        sidebar: !!sidebar,
        navLinks: navLinks.length,
        sections: sections.length,
        progressBar: !!progressBar
    });
    
    // 绑定导航链接点击事件
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = link.getAttribute('data-section');
            if (sectionId) {
                scrollToSection(sectionId);
            }
        });
    });
    
    // 绑定侧边栏切换按钮
    const sidebarToggle = document.getElementById('sidebar-toggle');
    if (sidebarToggle) {
        // 标记为主要绑定
        sidebarToggle.setAttribute('data-main-bound', 'true');
        sidebarToggle.addEventListener('click', toggleSidebar);
        console.log('✅ 侧边栏切换按钮绑定成功');
    }
    
    // 绑定扩展按钮
    const expandBtn = document.getElementById('sidebar-expand');
    if (expandBtn) {
        // 移除可能存在的onclick属性，使用addEventListener
        expandBtn.removeAttribute('onclick');
        expandBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('🔘 扩展按钮被点击');
            toggleSidebar();
        });
        console.log('✅ 侧边栏扩展按钮绑定成功');
    } else {
        console.warn('⚠️ 未找到sidebar-expand按钮');
    }
    
    // 绑定滚动事件（使用16ms节流）
    window.addEventListener('scroll', throttle(updateNavigationAndProgress, 16));
    
    // 绑定窗口大小变化事件
    window.addEventListener('resize', throttle(handleResize, 100));
    
    // 设置初始状态
    handleResize();

    // 初始化导航状态
    updateNavigationAndProgress();

    // 确保控制按钮状态正确
    setTimeout(() => {
        updateControlsVisibility();
    }, 100);
    
    // 暴露全局函数
    window.scrollToSection = scrollToSection;
    window.toggleSidebar = toggleSidebar;
    window.updateControlsVisibility = updateControlsVisibility;
    
    isInitialized = true;
    console.log('🎉 PromptX应用初始化完成!');
}

// 等待DOM加载完成
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    // DOM已经加载完成，直接初始化
    setTimeout(initializeApp, 100);
}

// 页面卸载时清理事件监听器
window.addEventListener('beforeunload', () => {
    if (isInitialized) {
        window.removeEventListener('scroll', updateNavigationAndProgress);
        window.removeEventListener('resize', handleResize);
        console.log('🧹 事件监听器已清理');
    }
});

console.log('📄 PromptX脚本加载完成');
