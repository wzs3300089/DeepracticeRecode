// AI辅助软件开发流程实践 - 交互脚本
// 基于PETA-OS Website技术架构

console.log('🚀 AI辅助软件开发流程实践 - 2025年6月29日直播');

// DOM元素
const sidebar = document.getElementById('sidebar');
const sidebarToggle = document.getElementById('sidebar-toggle');
const navLinks = document.querySelectorAll('.nav-link');
const readingProgress = document.getElementById('reading-progress');
const sections = document.querySelectorAll('.content-section, #hero');

// 侧边栏切换功能
function toggleSidebar() {
    console.log('🔄 toggleSidebar 函数被调用');
    const sidebarElement = document.getElementById('sidebar');
    if (sidebarElement) {
        const isMobile = window.innerWidth <= 1024;
        const wasActive = sidebarElement.classList.contains('active');

        if (isMobile) {
            // 移动端：直接控制transform，不依赖CSS类
            const currentTransform = window.getComputedStyle(sidebarElement).transform;
            const isCurrentlyHidden = currentTransform.includes('translateX(-') || sidebarElement.style.transform.includes('translateX(-');

            if (isCurrentlyHidden) {
                // 当前隐藏，显示侧边栏
                sidebarElement.style.transform = 'translateX(0)';
                sidebarElement.classList.add('active');
                console.log('📱 移动端：显示侧边栏');
            } else {
                // 当前显示，隐藏侧边栏
                sidebarElement.style.transform = 'translateX(-100%)';
                sidebarElement.classList.remove('active');
                console.log('📱 移动端：隐藏侧边栏');
            }
        } else {
            // PC端：也使用直接transform控制（避免内联样式覆盖CSS类）
            const currentTransform = window.getComputedStyle(sidebarElement).transform;
            const isCurrentlyHidden = currentTransform.includes('translateX(-') || sidebarElement.style.transform.includes('translateX(-');

            if (isCurrentlyHidden) {
                // 当前隐藏，显示侧边栏
                sidebarElement.style.transform = 'translateX(0)';
                sidebarElement.classList.remove('active');
                console.log('🖥️ PC端：显示侧边栏');
            } else {
                // 当前显示，隐藏侧边栏
                sidebarElement.style.transform = 'translateX(-100%)';
                sidebarElement.classList.add('active');
                console.log('🖥️ PC端：隐藏侧边栏');
            }
        }

        // 检查最终状态
        const finalTransform = window.getComputedStyle(sidebarElement).transform;
        const rect = sidebarElement.getBoundingClientRect();
        console.log('📱 最终状态:', {
            transform: finalTransform,
            left: rect.left,
            className: sidebarElement.className,
            visible: rect.left > -rect.width
        });

        // 更新控制按钮的显示状态
        updateControlsVisibility();
    } else {
        console.error('❌ 无法找到侧边栏元素');
    }
}

// 更新控制按钮的显示状态
function updateControlsVisibility() {
    const sidebarElement = document.getElementById('sidebar');
    const collapsedControls = document.querySelector('.sidebar-collapsed-controls');
    const mobileBackHome = document.querySelector('.mobile-back-home');
    const isMobile = window.innerWidth <= 1024;

    if (!sidebarElement) return;

    let isSidebarHidden;

    // 统一使用transform检测（避免CSS类和内联样式冲突）
    const currentTransform = window.getComputedStyle(sidebarElement).transform;
    const styleTransform = sidebarElement.style.transform;
    isSidebarHidden = currentTransform.includes('translateX(-') || styleTransform.includes('translateX(-');

    console.log('🔄 更新控制按钮显示状态:', {
        isMobile,
        isSidebarHidden,
        transform: window.getComputedStyle(sidebarElement).transform,
        screenWidth: window.innerWidth
    });

    if (isMobile) {
        // 移动端：侧边栏隐藏时显示控制按钮和返回按钮
        if (collapsedControls) {
            collapsedControls.style.display = isSidebarHidden ? 'flex' : 'none';
        }
        if (mobileBackHome) {
            mobileBackHome.style.display = isSidebarHidden ? 'block' : 'none';
        }
    } else {
        // 桌面端：侧边栏隐藏时显示控制按钮
        if (collapsedControls) {
            collapsedControls.style.display = isSidebarHidden ? 'flex' : 'none';
        }
        if (mobileBackHome) {
            mobileBackHome.style.display = 'none'; // 桌面端不显示移动端返回按钮
        }
    }
}

// 初始化侧边栏状态
function initializeSidebarState() {
    console.log('🔧 初始化侧边栏状态...');

    const sidebarElement = document.getElementById('sidebar');
    if (sidebarElement) {
        const isMobile = window.innerWidth <= 1024;

        if (isMobile) {
            // 移动端：强制隐藏
            sidebarElement.classList.remove('active');
            sidebarElement.style.transform = 'translateX(-100%)';

            console.log('📱 移动端：设置侧边栏为隐藏状态');

            // 验证隐藏效果
            setTimeout(() => {
                const rect = sidebarElement.getBoundingClientRect();
                console.log('📱 验证移动端隐藏:', {
                    left: rect.left,
                    isHidden: rect.left < -200
                });
            }, 100);
        } else {
            // PC端：确保显示，移除active类（因为active=隐藏）
            sidebarElement.classList.remove('active');
            sidebarElement.style.transform = 'translateX(0)';

            console.log('🖥️ PC端：设置侧边栏为显示状态');

            // 验证显示效果
            setTimeout(() => {
                const rect = sidebarElement.getBoundingClientRect();
                console.log('🖥️ 验证PC端显示:', {
                    left: rect.left,
                    isVisible: rect.left >= 0
                });
            }, 100);
        }

        console.log('📱 当前侧边栏类名:', sidebarElement.className);
        console.log('📱 当前屏幕宽度:', window.innerWidth);
        console.log('📱 是否移动端:', isMobile);

        // 初始化控制按钮显示状态
        setTimeout(() => updateControlsVisibility(), 100);
    }
}

// 强化的侧边栏事件绑定
function initializeSidebarEvents() {
    console.log('🔧 初始化侧边栏事件绑定...');

    // 多次尝试绑定，确保成功
    let attempts = 0;
    const maxAttempts = 5;

    function attemptBinding() {
        attempts++;
        console.log(`🔄 第${attempts}次尝试绑定事件...`);

        const sidebarElement = document.getElementById('sidebar');
        const sidebarToggleElement = document.getElementById('sidebar-toggle');
        const mainContent = document.querySelector('.main-content');

        console.log('🔍 DOM元素检查:');
        console.log('- 侧边栏元素:', sidebarElement);
        console.log('- 切换按钮元素:', sidebarToggleElement);
        console.log('- 主内容区域:', mainContent);

        if (sidebarToggleElement) {
            // 强制移除所有可能的事件监听器
            const newButton = sidebarToggleElement.cloneNode(true);
            sidebarToggleElement.parentNode.replaceChild(newButton, sidebarToggleElement);

            // 多重事件绑定策略
            const clickHandler = function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('🔘 侧边栏切换按钮被点击 - 事件类型:', e.type);
                console.log('🔘 点击位置:', e.clientX, e.clientY);
                console.log('🔘 目标元素:', e.target);
                toggleSidebar();
            };

            // 方法1: addEventListener
            newButton.addEventListener('click', clickHandler);

            // 方法2: onclick属性
            newButton.onclick = clickHandler;

            // 添加标记，防止紧急绑定覆盖
            newButton.setAttribute('data-main-bound', 'true');

            // 方法4: 鼠标事件作为备用
            newButton.addEventListener('mousedown', function(e) {
                console.log('🖱️ 鼠标按下事件触发');
                setTimeout(() => toggleSidebar(), 10);
            });

            // 添加视觉反馈
            newButton.addEventListener('mouseenter', function() {
                console.log('🖱️ 鼠标悬停在按钮上');
                newButton.style.opacity = '0.8';
            });

            newButton.addEventListener('mouseleave', function() {
                newButton.style.opacity = '1';
            });

            console.log('✅ 侧边栏切换事件绑定成功 (多重策略)');

            // 测试按钮是否可点击
            const buttonRect = newButton.getBoundingClientRect();
            console.log('📏 按钮位置和尺寸:', {
                x: buttonRect.x,
                y: buttonRect.y,
                width: buttonRect.width,
                height: buttonRect.height,
                visible: buttonRect.width > 0 && buttonRect.height > 0
            });

            return true; // 绑定成功
        } else {
            console.error(`❌ 第${attempts}次尝试：未找到侧边栏切换按钮`);

            if (attempts < maxAttempts) {
                setTimeout(attemptBinding, 200 * attempts); // 递增延迟
                return false;
            }
        }

        // 绑定展开按钮事件
        const expandButton = document.getElementById('sidebar-expand');
        if (expandButton) {
            const expandClickHandler = function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('🔘 侧边栏展开按钮被点击');
                toggleSidebar();
            };

            expandButton.addEventListener('click', expandClickHandler);
            expandButton.onclick = expandClickHandler;

            // 添加视觉反馈
            expandButton.addEventListener('mouseenter', function() {
                expandButton.style.opacity = '0.8';
            });
            expandButton.addEventListener('mouseleave', function() {
                expandButton.style.opacity = '1';
            });

            console.log('✅ 侧边栏展开按钮事件绑定成功');
        } else {
            console.warn('⚠️ 未找到侧边栏展开按钮');
        }

        // 其他事件绑定
        if (mainContent) {
            mainContent.addEventListener('click', () => {
                if (window.innerWidth <= 1024 && sidebarElement) {
                    sidebarElement.classList.remove('active');
                    console.log('📱 移动端点击主内容区域，关闭侧边栏');
                    updateControlsVisibility();
                }
            });
        }

        if (sidebarElement) {
            sidebarElement.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        }

        // 测试侧边栏功能
        testSidebarFunctionality();
        return true;
    }

    // 开始尝试绑定
    setTimeout(attemptBinding, 100);
}

// 综合测试侧边栏功能
function testSidebarFunctionality() {
    console.log('🧪 开始综合测试侧边栏功能...');

    const sidebarElement = document.getElementById('sidebar');
    const sidebarToggleElement = document.getElementById('sidebar-toggle');

    console.log('📋 基础元素检查:');
    console.log('- 侧边栏元素存在:', !!sidebarElement);
    console.log('- 切换按钮存在:', !!sidebarToggleElement);

    if (sidebarElement) {
        console.log('- 侧边栏当前类名:', sidebarElement.className);
        console.log('- 侧边栏是否激活:', sidebarElement.classList.contains('active'));

        const sidebarStyles = window.getComputedStyle(sidebarElement);
        console.log('- 侧边栏transform:', sidebarStyles.transform);
        console.log('- 侧边栏position:', sidebarStyles.position);
        console.log('- 侧边栏z-index:', sidebarStyles.zIndex);
    }

    if (sidebarToggleElement) {
        console.log('📋 按钮详细检查:');
        console.log('- 切换按钮类名:', sidebarToggleElement.className);

        const buttonStyles = window.getComputedStyle(sidebarToggleElement);
        console.log('- 按钮display:', buttonStyles.display);
        console.log('- 按钮position:', buttonStyles.position);
        console.log('- 按钮z-index:', buttonStyles.zIndex);
        console.log('- 按钮pointer-events:', buttonStyles.pointerEvents);
        console.log('- 按钮visibility:', buttonStyles.visibility);

        const buttonRect = sidebarToggleElement.getBoundingClientRect();
        console.log('- 按钮位置:', {
            x: buttonRect.x,
            y: buttonRect.y,
            width: buttonRect.width,
            height: buttonRect.height,
            top: buttonRect.top,
            right: buttonRect.right,
            bottom: buttonRect.bottom,
            left: buttonRect.left
        });

        // 检查事件监听器
        console.log('- 按钮onclick属性:', sidebarToggleElement.onclick);
        console.log('- 按钮data-emergency-bound:', sidebarToggleElement.getAttribute('data-emergency-bound'));
    }

    console.log('📋 屏幕和环境检查:');
    console.log('- 屏幕宽度:', window.innerWidth);
    console.log('- 是否移动端:', window.innerWidth <= 1024);
    console.log('- 用户代理:', navigator.userAgent);

    // 手动测试函数
    window.testToggle = function() {
        console.log('🔧 手动测试侧边栏切换...');
        toggleSidebar();
    };

    window.testButtonClick = function() {
        console.log('🔧 手动测试按钮点击...');
        const btn = document.getElementById('sidebar-toggle');
        if (btn) {
            console.log('🔧 模拟点击按钮...');
            btn.click();
        } else {
            console.error('❌ 按钮不存在');
        }
    };

    window.testEmergencyToggle = function() {
        console.log('🚨 测试紧急备用切换...');
        if (window.emergencyToggleSidebar) {
            window.emergencyToggleSidebar();
        } else {
            console.error('❌ 紧急备用函数不存在');
        }
    };

    window.forceToggle = function() {
        console.log('💪 强制切换侧边栏...');
        const sidebar = document.getElementById('sidebar');
        if (sidebar) {
            sidebar.classList.toggle('active');
            console.log('💪 强制切换完成，新状态:', sidebar.classList.contains('active'));
            updateControlsVisibility();
        }
    };

    window.testExpandButton = function() {
        console.log('🔧 测试展开按钮...');
        const expandBtn = document.getElementById('sidebar-expand');
        const controls = document.querySelector('.sidebar-collapsed-controls');
        const sidebar = document.getElementById('sidebar');
        const isMobile = window.innerWidth <= 1024;

        console.log('🔧 当前环境:', {
            isMobile,
            screenWidth: window.innerWidth
        });

        if (expandBtn) {
            console.log('🔧 展开按钮存在');
            console.log('🔧 按钮样式:', {
                display: window.getComputedStyle(expandBtn).display,
                visibility: window.getComputedStyle(expandBtn).visibility,
                opacity: window.getComputedStyle(expandBtn).opacity
            });

            if (controls) {
                console.log('🔧 控制容器样式:', {
                    display: window.getComputedStyle(controls).display,
                    visibility: window.getComputedStyle(controls).visibility
                });

                // 强制显示控制按钮进行测试
                controls.style.display = 'flex';
                console.log('🔧 强制显示控制按钮，然后点击...');
            }

            if (sidebar) {
                const rect = sidebar.getBoundingClientRect();
                console.log('🔧 侧边栏当前状态:', {
                    left: rect.left,
                    transform: window.getComputedStyle(sidebar).transform,
                    className: sidebar.className
                });
            }

            expandBtn.click();
        } else {
            console.error('❌ 展开按钮不存在');
        }
    };

    window.debugSidebarState = function() {
        const sidebar = document.getElementById('sidebar');
        const isMobile = window.innerWidth <= 1024;
        const hasActive = sidebar ? sidebar.classList.contains('active') : false;

        console.log('🐛 侧边栏状态调试:');
        console.log('- 屏幕宽度:', window.innerWidth);
        console.log('- 是否移动端:', isMobile);
        console.log('- 侧边栏存在:', !!sidebar);
        console.log('- 有active类:', hasActive);

        if (sidebar) {
            const styles = window.getComputedStyle(sidebar);
            console.log('- transform:', styles.transform);
            console.log('- 实际是否可见:', styles.transform !== 'translateX(-100%)');
        }

        const controls = document.querySelector('.sidebar-collapsed-controls');
        const mobileBack = document.querySelector('.mobile-back-home');
        console.log('- 控制按钮显示:', controls ? controls.style.display : 'null');
        console.log('- 移动端返回按钮显示:', mobileBack ? mobileBack.style.display : 'null');
    };

    // 移动端隐藏功能测试
    window.testMobileHide = function() {
        console.log('📱 测试移动端隐藏功能...');
        const sidebar = document.getElementById('sidebar');
        if (!sidebar) {
            console.error('❌ 侧边栏不存在');
            return;
        }

        const isMobile = window.innerWidth <= 1024;
        console.log('📱 当前是否移动端:', isMobile);
        console.log('📱 当前侧边栏类名:', sidebar.className);

        // 强制设置为显示状态（移动端需要active类）
        if (isMobile) {
            sidebar.classList.add('active');
            console.log('📱 强制设置为显示状态（添加active类）');
        }

        setTimeout(() => {
            const rect1 = sidebar.getBoundingClientRect();
            const transform1 = window.getComputedStyle(sidebar).transform;
            console.log('📱 显示状态 - 位置:', rect1.left, '变换:', transform1);

            // 切换到隐藏状态
            sidebar.classList.toggle('active');
            console.log('📱 切换到隐藏状态，新类名:', sidebar.className);

            setTimeout(() => {
                const rect2 = sidebar.getBoundingClientRect();
                const transform2 = window.getComputedStyle(sidebar).transform;
                console.log('📱 隐藏状态 - 位置:', rect2.left, '变换:', transform2);

                if (Math.abs(rect1.left - rect2.left) > 100) {
                    console.log('✅ 移动端隐藏功能正常工作！位置变化:', rect1.left, '->', rect2.left);
                } else {
                    console.error('❌ 移动端隐藏功能异常！位置没有明显变化');
                }
            }, 500);
        }, 100);
    };

    console.log('💡 可用的测试命令:');
    console.log('   testToggle() - 直接调用切换函数');
    console.log('   testButtonClick() - 模拟侧边栏内按钮点击');
    console.log('   testExpandButton() - 模拟展开按钮点击');
    console.log('   testEmergencyToggle() - 测试紧急备用函数');
    console.log('   forceToggle() - 强制切换侧边栏');
    console.log('   debugSidebarState() - 调试侧边栏状态');
    console.log('   testMobileHide() - 测试移动端隐藏功能');
}

// 平滑滚动到指定区块
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 80; // 考虑固定导航的高度
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });

        console.log('🎯 滚动到区块:', sectionId);

        // 移动端关闭侧边栏
        if (window.innerWidth <= 1024 && sidebar) {
            sidebar.classList.remove('active');
        }
    } else {
        console.warn('⚠️ 未找到区块:', sectionId);
    }
}

// 导航链接点击事件
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const sectionId = link.getAttribute('data-section');
        if (sectionId) {
            scrollToSection(sectionId);
        }
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

    // 如果在页面顶部，默认选中hero区块
    if (scrollTop < 100) {
        activeSection = 'hero';
    } else {
        // 查找当前可见的区块
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;

            if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
                activeSection = section.id;
            }
        });
    }

    // 如果没有找到活跃区块，默认选中hero
    if (!activeSection) {
        activeSection = 'hero';
    }

    // 更新导航链接状态
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === activeSection) {
            link.classList.add('active');
        }
    });
}

// 节流函数 - 16ms确保60fps性能
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
    if (window.innerWidth > 1024 && sidebar) {
        sidebar.classList.remove('active');
    }
});

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎉 页面加载完成，开始初始化...');

    // 初始化侧边栏状态
    initializeSidebarState();

    // 初始化侧边栏事件绑定
    initializeSidebarEvents();

    // 监听窗口大小变化
    window.addEventListener('resize', () => {
        console.log('📏 窗口大小变化，重新初始化侧边栏状态');
        setTimeout(() => {
            initializeSidebarState();
        }, 100);
    });

    // 额外的状态检查和修复
    setTimeout(() => {
        const sidebar = document.getElementById('sidebar');
        if (sidebar) {
            const isMobile = window.innerWidth <= 1024;
            const rect = sidebar.getBoundingClientRect();

            if (isMobile) {
                // 移动端：确保隐藏
                if (rect.left > -200) {
                    console.log('⚠️ 检测到移动端侧边栏未正确隐藏，强制修复...');
                    sidebar.style.transform = 'translateX(-100%)';
                    sidebar.classList.remove('active');
                    updateControlsVisibility();
                    console.log('✅ 移动端侧边栏隐藏状态已修复');
                }
            } else {
                // PC端：确保显示
                if (rect.left < -50) {
                    console.log('⚠️ 检测到PC端侧边栏未正确显示，强制修复...');
                    sidebar.style.transform = 'translateX(0)';
                    sidebar.classList.remove('active');
                    updateControlsVisibility();
                    console.log('✅ PC端侧边栏显示状态已修复');
                }
            }
        }
    }, 500);

    // 初始化导航和进度
    updateNavigationAndProgress();

    // 添加页面加载动画
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in-out';

    setTimeout(() => {
        document.body.style.opacity = '1';
        console.log('✨ 页面淡入动画完成');
    }, 100);

    // 初始化动画观察器
    initializeAnimations();

    // 修复返回首页链接路径
    fixBackHomeLinks();

    console.log('🎯 所有功能初始化完成');
});

// 动画观察器 - 针对软件工程主题的元素
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                console.log('🎬 元素进入视口，触发动画:', entry.target.className);
            }
        });
    }, observerOptions);

    // 观察所有需要动画的元素 - 软件工程主题特定元素
    const animatedElements = document.querySelectorAll(
        '.content-card, .story-card, .tech-item, .task-item, .flow-step, .oes-component, .phase-group, .feature-item, .component'
    );

    animatedElements.forEach(el => {
        el.classList.add('animate-element');
        observer.observe(el);
    });

    console.log(`🎭 已设置 ${animatedElements.length} 个元素的动画观察器`);
}

// 添加动画样式 - 软件工程主题优化
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

    .animate-element:nth-child(5) {
        transition-delay: 0.4s;
    }

    /* 软件工程主题特定动画 */
    .tech-item.animate-in {
        transform: translateY(0) scale(1);
    }

    .task-item.animate-in {
        transform: translateX(0) translateY(0);
    }

    .flow-step.animate-in {
        transform: translateY(0) rotate(0deg);
    }
`;

// 动态添加动画样式
const styleSheet = document.createElement('style');
styleSheet.textContent = animationStyles;
document.head.appendChild(styleSheet);
console.log('🎨 动画样式已添加到页面');

// 键盘导航支持
document.addEventListener('keydown', (e) => {
    // ESC键关闭侧边栏
    if (e.key === 'Escape' && sidebar) {
        sidebar.classList.remove('active');
        console.log('⌨️ ESC键关闭侧边栏');
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
            if (nextSection) {
                scrollToSection(nextSection);
                console.log('⌨️ 键盘导航到:', nextSection);
            }
        }
    }

    // 快捷键支持
    if (e.ctrlKey || e.metaKey) {
        switch(e.key) {
            case 'h':
                e.preventDefault();
                scrollToSection('hero');
                console.log('⌨️ 快捷键跳转到首页');
                break;
            case 'r':
                e.preventDefault();
                scrollToSection('requirements');
                console.log('⌨️ 快捷键跳转到需求分析');
                break;
            case 'j':
                e.preventDefault();
                scrollToSection('user-journey');
                console.log('⌨️ 快捷键跳转到用户旅程');
                break;
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
        if (deltaX > 50 && touchStartX < 50 && sidebar) {
            sidebar.classList.add('active');
            console.log('👆 向右滑动打开侧边栏');
        }
        // 向左滑动关闭侧边栏
        else if (deltaX < -50 && sidebar && sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
            console.log('👆 向左滑动关闭侧边栏');
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

// 返回首页函数 - 智能路径检测
function goBackHome() {
    const currentHref = window.location.href;
    console.log('🏠 准备返回首页，当前URL:', currentHref);

    if (currentHref.includes('github.io')) {
        // GitHub Pages部署环境
        window.location.href = '/DeepracticeRecode/';
        console.log('🌐 GitHub Pages环境，跳转到: /DeepracticeRecode/');
    } else {
        // 本地开发环境
        window.location.href = '../../index.html';
        console.log('💻 本地环境，跳转到: ../../index.html');
    }
}

// 修复返回首页链接路径（调试用）
function fixBackHomeLinks() {
    console.log('🔧 路径调试信息:');
    console.log('  - Current path:', window.location.pathname);
    console.log('  - Current href:', window.location.href);
    console.log('  - Base URI:', document.baseURI);
    console.log('  - Origin:', window.location.origin);
}

// 软件工程主题特定功能
function initializeSoftwareEngineeringFeatures() {
    // 为技术栈卡片添加特殊交互
    const techItems = document.querySelectorAll('.tech-item');
    techItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateX(8px) scale(1.02)';
        });

        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateX(0) scale(1)';
        });
    });

    // 为开发阶段添加进度指示
    const taskItems = document.querySelectorAll('.task-item');
    taskItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            console.log(`📋 点击开发任务 ${index + 1}:`, item.querySelector('h4')?.textContent);
        });
    });

    // 为OES框架组件添加交互提示
    const oesComponents = document.querySelectorAll('.oes-component');
    oesComponents.forEach(component => {
        component.addEventListener('click', () => {
            const title = component.querySelector('h3')?.textContent;
            console.log('🎯 OES框架组件:', title);
        });
    });

    console.log('⚙️ 软件工程主题特定功能已初始化');
}

// 性能监控
function initializePerformanceMonitoring() {
    // 监控滚动性能
    let scrollCount = 0;
    const originalScrollHandler = updateNavigationAndProgress;

    window.updateNavigationAndProgress = function() {
        scrollCount++;
        if (scrollCount % 100 === 0) {
            console.log(`📊 滚动性能监控: 已处理 ${scrollCount} 次滚动事件`);
        }
        return originalScrollHandler.apply(this, arguments);
    };

    // 监控内存使用（如果支持）
    if (performance.memory) {
        setInterval(() => {
            const memory = performance.memory;
            if (memory.usedJSHeapSize > 50 * 1024 * 1024) { // 50MB
                console.warn('⚠️ 内存使用较高:', Math.round(memory.usedJSHeapSize / 1024 / 1024) + 'MB');
            }
        }, 30000); // 每30秒检查一次
    }

    console.log('📈 性能监控已启动');
}

// 增强的页面初始化
document.addEventListener('DOMContentLoaded', () => {
    // 延迟初始化软件工程特定功能
    setTimeout(() => {
        initializeSoftwareEngineeringFeatures();
        initializePerformanceMonitoring();
    }, 500);
});

// 导出全局函数供HTML使用
window.scrollToSection = scrollToSection;
window.toggleSidebar = toggleSidebar;
window.goBackHome = goBackHome;
window.fixBackHomeLinks = fixBackHomeLinks;

console.log('🎉 AI辅助软件开发流程实践 - JavaScript模块加载完成!');
console.log('🔧 全局函数导出状态:');
console.log('- window.toggleSidebar:', typeof window.toggleSidebar);
console.log('- window.scrollToSection:', typeof window.scrollToSection);
console.log('- window.goBackHome:', typeof window.goBackHome);

// 功能测试验证
function runFunctionalTests() {
    console.log('🧪 开始功能测试验证...');

    const tests = [
        {
            name: '侧边栏DOM元素检查',
            test: () => document.getElementById('sidebar') !== null
        },
        {
            name: '导航链接数量检查',
            test: () => document.querySelectorAll('.nav-link').length === 10
        },
        {
            name: '内容区块数量检查',
            test: () => document.querySelectorAll('.content-section').length === 9
        },
        {
            name: '全局函数可用性检查',
            test: () => typeof window.scrollToSection === 'function' &&
                      typeof window.toggleSidebar === 'function' &&
                      typeof window.goBackHome === 'function'
        },
        {
            name: 'CSS变量加载检查',
            test: () => {
                const style = getComputedStyle(document.documentElement);
                return style.getPropertyValue('--primary-color').trim() === '#f59e0b';
            }
        },
        {
            name: '响应式断点检查',
            test: () => {
                // 检查CSS媒体查询是否存在
                const styleSheets = Array.from(document.styleSheets);
                return styleSheets.some(sheet => {
                    try {
                        const rules = Array.from(sheet.cssRules || sheet.rules || []);
                        return rules.some(rule =>
                            rule.type === CSSRule.MEDIA_RULE &&
                            rule.conditionText &&
                            rule.conditionText.includes('max-width')
                        );
                    } catch (e) {
                        return false;
                    }
                });
            }
        }
    ];

    let passedTests = 0;
    tests.forEach(test => {
        try {
            const result = test.test();
            if (result) {
                console.log(`✅ ${test.name}: 通过`);
                passedTests++;
            } else {
                console.warn(`❌ ${test.name}: 失败`);
            }
        } catch (error) {
            console.error(`❌ ${test.name}: 错误 -`, error.message);
        }
    });

    const successRate = (passedTests / tests.length * 100).toFixed(1);
    console.log(`🎯 功能测试完成: ${passedTests}/${tests.length} 通过 (${successRate}%)`);

    if (passedTests === tests.length) {
        console.log('🎉 所有功能测试通过！网站已准备就绪。');
    } else {
        console.warn('⚠️ 部分功能测试失败，请检查相关功能。');
    }

    return { passed: passedTests, total: tests.length, successRate };
}

// 页面完全加载后运行测试
window.addEventListener('load', () => {
    setTimeout(() => {
        runFunctionalTests();
    }, 1000); // 等待1秒确保所有资源加载完成
});
