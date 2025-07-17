# Deepractice Mermaid 集成指南

## 概述

本指南介绍如何在 Deepractice 项目中使用统一的 Mermaid 图表支持。我们提供了一个完整的解决方案，支持 Mermaid 10.3.0+ 版本，包含自动初始化、主题定制和响应式设计。

## 快速开始

### 1. 引入必要文件

在 HTML 页面中引入 Mermaid 支持文件：

```html
<!DOCTYPE html>
<html>
<head>
    <!-- 引入 Mermaid 主题样式 -->
    <link rel="stylesheet" href="/css/mermaid-theme.css">
</head>
<body>
    <!-- 页面内容 -->
    
    <!-- 引入 Mermaid 支持脚本 -->
    <script src="/js/mermaid-support.js"></script>
</body>
</html>
```

### 2. 基础使用

#### 方法一：HTML 标记（推荐）

```html
<div class="mermaid">
graph TD
    A[开始] --> B{是否理解?}
    B -->|是| C[继续学习]
    B -->|否| D[重新阅读]
    D --> B
</div>
```

#### 方法二：JavaScript 调用

```javascript
// 自动初始化（页面加载时）
document.addEventListener('DOMContentLoaded', async () => {
    await initMermaid();
});

// 手动初始化
await initMermaid({
    theme: 'default',
    startOnLoad: false
});

// 动态添加图表
await addMermaidChart('#chart-container', `
graph LR
    A --> B
    B --> C
    C --> A
`, 'my-chart-id');
```

## 支持的图表类型

### 1. 流程图 (Flowchart)

```html
<div class="mermaid">
flowchart TD
    A[方形] --> B(圆角)
    A --> C{菱形}
    B --> D[结果1]
    C -->|是| D
    C -->|否| E[结果2]
</div>
```

### 2. 序列图 (Sequence Diagram)

```html
<div class="mermaid">
sequenceDiagram
    participant A as 用户
    participant B as 系统
    participant C as 数据库
    
    A->>B: 发送请求
    B->>C: 查询数据
    C-->>B: 返回结果
    B-->>A: 响应数据
</div>
```

### 3. 甘特图 (Gantt Chart)

```html
<div class="mermaid">
gantt
    title 项目时间线
    dateFormat  YYYY-MM-DD
    section 设计阶段
    需求分析      :done,    des1, 2024-01-01,2024-01-05
    UI设计        :active,  des2, 2024-01-06, 3d
    section 开发阶段
    前端开发      :         dev1, after des2, 5d
    后端开发      :         dev2, after des2, 5d
</div>
```

### 4. 饼图 (Pie Chart)

```html
<div class="mermaid">
pie title 技术栈分布
    "JavaScript" : 35
    "Python" : 25
    "Java" : 20
    "Go" : 15
    "其他" : 5
</div>
```

### 5. 类图 (Class Diagram)

```html
<div class="mermaid">
classDiagram
    class Animal {
        +String name
        +int age
        +makeSound()
    }
    class Dog {
        +String breed
        +bark()
    }
    Animal <|-- Dog
</div>
```

### 6. 状态图 (State Diagram)

```html
<div class="mermaid">
stateDiagram-v2
    [*] --> 待处理
    待处理 --> 处理中 : 开始处理
    处理中 --> 已完成 : 处理完成
    处理中 --> 失败 : 处理失败
    失败 --> 待处理 : 重新处理
    已完成 --> [*]
</div>
```

### 7. 思维导图 (Mindmap)

```html
<div class="mermaid">
mindmap
  root((Deepractice))
    PETA-OS
      认知架构
      记忆系统
      状态引擎
    DPML
      结构化
      基于共识
      约而不束
    技术栈
      HTML5
      CSS3
      JavaScript
</div>
```

## 高级配置

### 自定义主题

```javascript
await initMermaid({
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
    }
});
```

### 流程图配置

```javascript
await initMermaid({
    flowchart: {
        useMaxWidth: true,
        htmlLabels: true,
        curve: 'basis'
    }
});
```

### 序列图配置

```javascript
await initMermaid({
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
    }
});
```

## API 参考

### MermaidSupport 类

#### 方法

- `init(customConfig)` - 初始化 Mermaid
- `renderAllCharts()` - 渲染页面中所有图表
- `renderChart(element, id)` - 渲染单个图表
- `addChart(selector, definition, id)` - 动态添加图表
- `updateTheme(theme)` - 更新主题
- `getSupportedChartTypes()` - 获取支持的图表类型

#### 全局函数

- `initMermaid(config)` - 初始化 Mermaid
- `renderMermaidChart(element, id)` - 渲染图表
- `addMermaidChart(selector, definition, id)` - 添加图表

### 配置选项

```javascript
{
    startOnLoad: false,           // 是否自动开始
    theme: 'default',            // 主题名称
    themeVariables: {},          // 主题变量
    flowchart: {},               // 流程图配置
    sequence: {},                // 序列图配置
    gantt: {}                    // 甘特图配置
}
```

## 样式定制

### CSS 类名

- `.mermaid` - 原始 Mermaid 元素
- `.mermaid-container` - 图表容器
- `.mermaid-error` - 错误显示
- `.mermaid-loading` - 加载状态

### 主题支持

支持深色主题：

```css
[data-theme="dark"] .mermaid-container {
    background: #1f2937;
    border-color: #374151;
    color: #f9fafb;
}
```

## 最佳实践

### 1. 性能优化

- 使用懒加载：只在需要时初始化 Mermaid
- 避免在同一页面放置过多复杂图表
- 使用适当的图表类型

### 2. 可访问性

- 为图表添加适当的 `alt` 属性
- 使用语义化的图表标题
- 确保颜色对比度符合标准

### 3. 响应式设计

- 图表会自动适应容器宽度
- 在移动设备上使用简化的图表
- 考虑横向滚动的用户体验

### 4. 错误处理

- 验证图表语法
- 提供友好的错误信息
- 实现降级方案

## 故障排除

### 常见问题

1. **图表不显示**
   - 检查是否正确引入了 CSS 和 JS 文件
   - 确认网络连接正常（CDN 加载）
   - 查看浏览器控制台错误信息

2. **语法错误**
   - 使用 Mermaid 官方文档验证语法
   - 检查缩进和特殊字符
   - 使用在线编辑器测试

3. **样式问题**
   - 检查 CSS 文件是否正确加载
   - 确认主题配置正确
   - 查看元素的实际样式

### 调试技巧

```javascript
// 启用调试模式
await initMermaid({
    logLevel: 'debug',
    startOnLoad: false
});

// 检查初始化状态
console.log('Mermaid initialized:', mermaidSupport.isInitialized);

// 获取支持的图表类型
console.log('Supported charts:', mermaidSupport.getSupportedChartTypes());
```

## 更新日志

- **v1.0.0** - 初始版本，支持 Mermaid 10.3.0+
- 支持所有主要图表类型
- 响应式设计和主题定制
- 自动初始化和错误处理

## 参考资源

- [Mermaid 官方文档](https://mermaid.js.org/)
- [Mermaid 在线编辑器](https://mermaid.live/)
- [Deepractice 项目文档](../README.md)
