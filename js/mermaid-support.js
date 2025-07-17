/**
 * Deepractice Mermaid 统一支持模块
 * 支持 Mermaid 10.3.0+ 版本的图表解析和显示
 * 
 * 使用方法:
 * 1. 在HTML中引入此文件
 * 2. 调用 initMermaid() 初始化
 * 3. 使用 <div class="mermaid">图表代码</div> 或 renderMermaidChart() 方法
 */

class MermaidSupport {
    constructor() {
        this.mermaid = null;
        this.isInitialized = false;
        this.config = {
            startOnLoad: false,
            theme: 'default',
            themeVariables: {
                primaryColor: '#7c3aed',
                primaryTextColor: '#ffffff',
                primaryBorderColor: '#5b21b6',
                lineColor: '#6b7280',
                sectionBkgColor: '#f3f4f6',
                altSectionBkgColor: '#e5e7eb',
                gridColor: '#d1d5db',
                secondaryColor: '#ddd6fe',
                tertiaryColor: '#ede9fe'
            },
            flowchart: {
                useMaxWidth: true,
                htmlLabels: true,
                curve: 'basis'
            },
            sequence: {
                diagramMarginX: 50,
                diagramMarginY: 10,
                actorMargin: 50,
                width: 150,
                height: 65,
                boxMargin: 10,
                boxTextMargin: 5,
                noteMargin: 10,
                messageMargin: 35,
                mirrorActors: true,
                bottomMarginAdj: 1,
                useMaxWidth: true
            },
            gantt: {
                titleTopMargin: 25,
                barHeight: 20,
                fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
                fontSize: 11,
                gridLineStartPadding: 35,
                bottomPadding: 5,
                leftPadding: 75,
                topPadding: 50,
                rightPadding: 40
            }
        };
    }

    /**
     * 初始化 Mermaid
     * @param {Object} customConfig - 自定义配置
     * @returns {Promise<boolean>} 初始化是否成功
     */
    async init(customConfig = {}) {
        if (this.isInitialized) {
            console.log('Mermaid already initialized');
            return true;
        }

        try {
            // 动态加载 Mermaid ESM 模块
            const mermaidModule = await import('https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs');
            this.mermaid = mermaidModule.default;

            // 合并配置
            const finalConfig = this.mergeConfig(customConfig);
            
            // 初始化 Mermaid
            this.mermaid.initialize(finalConfig);
            this.isInitialized = true;

            console.log('Mermaid initialized successfully with config:', finalConfig);
            
            // 自动渲染页面中的 mermaid 图表
            await this.renderAllCharts();
            
            return true;
        } catch (error) {
            console.error('Failed to initialize Mermaid:', error);
            return false;
        }
    }

    /**
     * 合并配置
     * @param {Object} customConfig - 自定义配置
     * @returns {Object} 合并后的配置
     */
    mergeConfig(customConfig) {
        return {
            ...this.config,
            ...customConfig,
            themeVariables: {
                ...this.config.themeVariables,
                ...(customConfig.themeVariables || {})
            }
        };
    }

    /**
     * 渲染所有页面中的 Mermaid 图表
     * @returns {Promise<void>}
     */
    async renderAllCharts() {
        if (!this.isInitialized) {
            console.warn('Mermaid not initialized. Call init() first.');
            return;
        }

        const mermaidElements = document.querySelectorAll('.mermaid');
        
        for (let i = 0; i < mermaidElements.length; i++) {
            const element = mermaidElements[i];
            await this.renderChart(element, `mermaid-${Date.now()}-${i}`);
        }
    }

    /**
     * 渲染单个 Mermaid 图表
     * @param {HTMLElement|string} element - DOM元素或选择器
     * @param {string} id - 图表ID
     * @returns {Promise<boolean>} 渲染是否成功
     */
    async renderChart(element, id = null) {
        if (!this.isInitialized) {
            console.warn('Mermaid not initialized. Call init() first.');
            return false;
        }

        try {
            const targetElement = typeof element === 'string' 
                ? document.querySelector(element) 
                : element;

            if (!targetElement) {
                console.warn('Mermaid element not found:', element);
                return false;
            }

            const chartDefinition = targetElement.textContent.trim();
            if (!chartDefinition) {
                console.warn('Empty mermaid chart definition');
                return false;
            }

            // 生成唯一ID
            const chartId = id || `mermaid-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
            
            // 验证图表语法
            const isValid = await this.mermaid.parse(chartDefinition);
            if (!isValid) {
                throw new Error('Invalid mermaid syntax');
            }

            // 渲染图表
            const { svg } = await this.mermaid.render(chartId, chartDefinition);

            // 创建容器并插入SVG
            const container = this.createChartContainer(targetElement);
            container.innerHTML = svg;

            // 等待SVG完全加载后再调整尺寸
            setTimeout(() => {
                this.makeResponsive(container);
            }, 100);
            
            console.log(`Mermaid chart rendered successfully: ${chartId}`);
            return true;

        } catch (error) {
            console.error('Failed to render Mermaid chart:', error);
            this.showError(element, error.message);
            return false;
        }
    }

    /**
     * 创建图表容器
     * @param {HTMLElement} originalElement - 原始元素
     * @returns {HTMLElement} 容器元素
     */
    createChartContainer(originalElement) {
        // 如果已经是容器，直接返回
        if (originalElement.classList.contains('mermaid-container')) {
            return originalElement;
        }

        // 创建新容器
        const container = document.createElement('div');
        container.className = 'mermaid-container';
        container.style.cssText = `
            width: 100%;
            text-align: center;
            margin: 1rem 0;
            padding: 1rem;
            background: #ffffff;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            border: 1px solid #e5e7eb;
            overflow-x: auto;
        `;

        // 替换原始元素
        originalElement.parentNode.replaceChild(container, originalElement);
        return container;
    }

    /**
     * 使图表响应式
     * @param {HTMLElement} container - 容器元素
     */
    makeResponsive(container) {
        const svg = container.querySelector('svg');
        if (svg) {
            // 检查是否是小尺寸图表
            const isSmallChart = container.closest('.mermaid-example') || container.closest('.mermaid-small');

            if (isSmallChart) {
                // 获取SVG的实际渲染尺寸
                const bbox = svg.getBBox();
                const svgRect = svg.getBoundingClientRect();

                // 优先使用getBBox，如果失败则使用其他方法
                let originalWidth, originalHeight;

                try {
                    originalWidth = bbox.width || svgRect.width || parseFloat(svg.getAttribute('width')) || 800;
                    originalHeight = bbox.height || svgRect.height || parseFloat(svg.getAttribute('height')) || 600;
                } catch (e) {
                    // 如果getBBox失败，使用viewBox或默认值
                    const viewBox = svg.viewBox.baseVal;
                    originalWidth = viewBox.width || parseFloat(svg.getAttribute('width')) || 800;
                    originalHeight = viewBox.height || parseFloat(svg.getAttribute('height')) || 600;
                }

                // 计算缩放后的尺寸 (scale: 1.0 - 原始大小)
                const scaledWidth = originalWidth * 1.0;
                const scaledHeight = originalHeight * 1.0;

                // 设置容器尺寸以匹配缩放后的图表
                container.style.width = `${Math.ceil(scaledWidth + 32)}px`; // 加上padding (1rem * 2)
                container.style.height = `${Math.ceil(scaledHeight + 32)}px`;
                container.style.minHeight = `${Math.max(200, Math.ceil(scaledHeight + 32))}px`;
                container.style.maxHeight = 'none';
                container.style.overflow = 'hidden';

                console.log(`📐 调整容器尺寸: ${Math.ceil(scaledWidth)}x${Math.ceil(scaledHeight)} (原始: ${Math.ceil(originalWidth)}x${Math.ceil(originalHeight)})`);
            }

            svg.style.maxWidth = '100%';
            svg.style.height = 'auto';
            svg.removeAttribute('width');
            svg.removeAttribute('height');
        }
    }

    /**
     * 显示错误信息
     * @param {HTMLElement|string} element - 元素或选择器
     * @param {string} message - 错误信息
     */
    showError(element, message) {
        const targetElement = typeof element === 'string' 
            ? document.querySelector(element) 
            : element;

        if (targetElement) {
            targetElement.innerHTML = `
                <div class="mermaid-error" style="
                    padding: 1rem;
                    background: #fef2f2;
                    border: 1px solid #fecaca;
                    border-radius: 8px;
                    color: #dc2626;
                    font-family: monospace;
                    font-size: 0.875rem;
                ">
                    <strong>Mermaid 渲染错误:</strong><br>
                    ${message}
                </div>
            `;
        }
    }

    /**
     * 动态添加 Mermaid 图表
     * @param {string} selector - 容器选择器
     * @param {string} chartDefinition - 图表定义
     * @param {string} id - 图表ID
     * @returns {Promise<boolean>} 是否成功
     */
    async addChart(selector, chartDefinition, id = null) {
        const container = document.querySelector(selector);
        if (!container) {
            console.error('Container not found:', selector);
            return false;
        }

        // 创建 mermaid 元素
        const mermaidElement = document.createElement('div');
        mermaidElement.className = 'mermaid';
        mermaidElement.textContent = chartDefinition;
        
        container.appendChild(mermaidElement);
        
        // 渲染图表
        return await this.renderChart(mermaidElement, id);
    }

    /**
     * 获取支持的图表类型
     * @returns {Array<string>} 支持的图表类型列表
     */
    getSupportedChartTypes() {
        return [
            'flowchart', 'sequence', 'class', 'state', 'entity-relationship',
            'user-journey', 'gantt', 'pie', 'requirement', 'gitgraph',
            'mindmap', 'timeline', 'quadrant-chart', 'sankey'
        ];
    }

    /**
     * 更新主题
     * @param {string} theme - 主题名称 ('default', 'dark', 'forest', 'neutral')
     */
    updateTheme(theme) {
        if (this.isInitialized) {
            this.config.theme = theme;
            this.mermaid.initialize(this.config);
            console.log(`Mermaid theme updated to: ${theme}`);
        }
    }
}

// 创建全局实例
const mermaidSupport = new MermaidSupport();

// 导出到全局作用域
window.MermaidSupport = MermaidSupport;
window.mermaidSupport = mermaidSupport;

// 便捷的全局函数
window.initMermaid = (config) => mermaidSupport.init(config);
window.renderMermaidChart = (element, id) => mermaidSupport.renderChart(element, id);
window.addMermaidChart = (selector, definition, id) => mermaidSupport.addChart(selector, definition, id);

// 自动初始化（可选）
document.addEventListener('DOMContentLoaded', () => {
    // 检查是否有 mermaid 元素，如果有则自动初始化
    if (document.querySelector('.mermaid')) {
        console.log('Auto-initializing Mermaid...');
        mermaidSupport.init();
    }
});

console.log('Deepractice Mermaid Support loaded successfully');
