# Deepractice 直播：全球首个 AI 认知记忆系统：让智能体像人一样思考、记忆、成长

## 目录
- [核心概念：结构化与状态化](#核心概念结构化与状态化-content-0024)
- [PETA-OS：AI 状态化引擎](#peta-osai-状态化引擎-content-0423)
- [对 RAG 记忆方案的批判](#对-rag-记忆方案的批判-content-1832)
- [核心架构：基于认知心理学的记忆系统](#核心架构基于认知心理学的记忆系统-content-2257)
- [系统演示与实现细节](#系统演示与实现细节-content-4303)
- [高级概念：思维、学习与未来展望](#高级概念思维学习与未来展望-content-10209)
- [AI 总结](#ai-总结)

---

## 核心概念：结构化与状态化 [原片 @ 00:24](https://www.bilibili.com/video/BV1YUuBziEa4?t=24)*

本次分享围绕两大核心概念：**结构化 (Structuring)** 和 **状态化 (Stateful)**，这是理解世界和构建复杂系统的两种基本哲学。

### 结构化 (Structuring)
-   **定义**：指代静态、固定的事物，是一种分类和规整的方式，目的是为了复用和管理。
-   **特征**：静态、固定。
-   **示例**：
    -   代码中的类型定义。
    -   公司的组织架构，如行政部门、人力部门。
    -   员工的职位。
-   **目的**：通过对万物进行分类和规整，实现复用，避免重复劳动，从而推动发展。

### 状态化 (Stateful)
-   **定义**：指代动态的过程，描述事物从开始到结束的变化流程。它是执行工作的核心。
-   **特征**：过程化、有层次。
-   **示例**：
    -   编程语言（如 C 语言）中的过程式编程，代码在 `main` 函数中按顺序执行。
    -   任何业务流程的流转。
-   **状态 (State)**：是将“过程”进行结构化拆解后的产物。一个完整的状态包含：
    *![](screenshot_0e04189e9-9f1e-4c48-89c7-00bfc7901303.jpg)*
    -   初始状态 (Initial State)
    -   终结状态 (Terminal State)
    -   转换/反应 (Transition/Reaction)
    -   状态集合 (State Set)
    -   事件集合 (Event Set)
-   **关系**：万物既可以被结构化，也可以被过程化（状态化）。结构化用于管理，而状态化用于“干活”。要让 AI 执行复杂的业务，就必须实现 AI 的状态化。

## PETA-OS：AI 状态化引擎 [原片 @ 04:23](https://www.bilibili.com/video/BV1YUuBziEa4?t=263)*

PETA-OS 是一个 AI 状态化系统，其核心思想是让 AI 像人使用导航一样，在需要时才获取下一步的指令，而不是一次性加载所有信息。

### 核心思想类比：从北京到深圳
1.  **无状态方法 (Stateless)**：
    -   **做法**：出发前，将从北京到深圳的所有可能路线全部记在脑子里。
    -   **AI 领域对应**：将所有业务逻辑、分支条件一次性写入一个庞大的 `System Prompt`。
    -   **缺点**：信息量巨大，AI 难以记住所有细节，上下文窗口有限。

2.  **状态化方法 (Stateful / PETA-OS)**：
    -   **做法**：不记完整路线。每到一个十字路口，才查看路牌（预设好的指令），决定下一步方向。
    -   **AI 领域对应**：AI 在执行任务时，只在关键节点接收下一步的行动指令。这些指令（如“诸葛锦囊”）被提前设计好，但在 AI 遇到特定情况时才“打开”。
    -   **优点**：极大减轻了 AI 的上下文负担，使 AI 能处理更复杂的、多步骤的动态任务。

### PETA-OS 的命名与 HATEOAS
-   **PETA-OS** 全称：**P**rompt **a**s **T**he **E**ngine of **A**I **S**tate (提示词作为 AI 状态的引擎)。
-   这个概念借鉴了 Web 开发中的 **HATEOAS**。
-   **HATEOAS** 全称：**H**ypermedia **a**s **t**he **E**ngine **o**f **A**pplication **S**tate (超媒体作为应用状态的引擎)。
    *![](screenshot_14c6eac33-c268-408f-a337-317ce3f9d903.jpg)*
    -   **原理**：在传统的 REST API 中，客户端需要预先知道所有 CRUD (Create, Read, Update, Delete) 操作的 URL。
    -   **HATEOAS 做法**：当客户端请求一个资源时，服务器的响应不仅包含资源数据，还包含一个 `_links` 字段，其中列出了针对该资源所有可能执行的下一步操作及其对应的 URL（如 `update`, `delete`）。
    -   **优点**：客户端无需硬编码所有 API 路径，实现了前后端的解耦，应用状态由服务器通过超媒体链接来驱动。

### PETA-OS 在 PromptX 中的应用
*![](screenshot_2c6afcca6-c21a-4e4f-af64-ed29c816e585.jpg)*
-   当用户在 `PromptX` 中执行一个初始命令后，AI 的返回结果中会包含一个“下一步指导行动”列表。
-   这个列表就是 PETA-OS 的体现，它为 AI 提供了当前状态下所有合法的、可执行的后续操作选项，引导 AI 完成任务，而不需要 AI 预知整个工作流。

## 对 RAG 记忆方案的批判 [原片 @ 18:32](https://www.bilibili.com/video/BV1YUuBziEa4?t=1112)*

演讲者认为，目前主流的基于 RAG (Retrieval-Augmented Generation) 的记忆方案（如 `MemGPT`）存在根本性缺陷，不适用于严肃的工程场景。

### 批判点
1.  **缺乏精度 (Lack of Precision)** [原片 @ 20:09](https://www.bilibili.com/video/BV1YUuBziEa4?t=1209)*
    -   RAG 依赖向量化检索，这个过程是模糊的，会丢失信息精度。
    -   **例子**：原始信息“我是肖恩”在经过向量化和检索后，可能被还原为“我是肖”，完全改变了原意。
    -   **结论**：这种精度损失在闲聊场景中或许可以接受，但在要求精确的代码编写、工业控制等工程场景中是致命的。

2.  **成本高昂且笨重 (High Cost & Heavyweight)** [原片 @ 20:53](https://www.bilibili.com/video/BV1YUuBziEa4?t=1253)*
    -   需要嵌入一个向量模型，这本身就需要付费或消耗大量本地计算资源。
    -   安装和部署过程复杂、麻烦，对普通用户极不友好。

3.  **商业模式与用户体验差 (Poor UX & Business Model)** [原片 @ 21:12](https://www.bilibili.com/video/BV1YUuBziEa4?t=1272)*
    -   复杂的安装部署流程会劝退大量用户。
    -   如果将其做成收费服务，又面临开源、免费、轻量化方案的竞争。一个免费且易于部署的方案在用户量上必然胜出。

## 核心架构：基于认知心理学的记忆系统 [原片 @ 22:57](https://www.bilibili.com/video/BV1YUuBziEa4?t=1377)*

PETA-OS 的记忆系统并非基于 RAG，而是模仿人类的认知心理学模型，构建一个能真正“成长”的记忆体系。

### 记忆系统构成
*![](screenshot_307ec2268-ef48-45fe-a6f4-d003aba1cad5.jpg)*
#### 1. 陈述式记忆 (Declarative Memory) - “是什么”
-   **短期记忆 (Short-term Memory)**：
    -   一个容量有限的队列（心理学认为是 7±2 项）。
    -   信息进入后，通过一个“过滤器”判断其重要性。不重要的信息被直接丢弃（左耳进，右耳出）。
-   **长期记忆 (Long-term Memory)**：
    -   重要信息从短期记忆中转存至此。
    -   技术实现为一个 **KV 数据库**，用于精确存储和检索事实、事件。

#### 2. 类程序式记忆 (Procedural-like Memory) / 内隐记忆 (Implicit Memory) - “怎么做”
-   **程序式记忆 (Procedural Memory)**：
    -   指“如何做”的规则和流程，即 **Rules**。
    -   在 AI 中，这部分对应于 `System Prompt` 中的行为准则和工作流指令。
-   **语义网络 (Semantic Network)**：
    -   这是个体对世界概念及其关系的独特理解网络。
    -   **例子**：“肖恩”这个词在你的语义网络中可能指向“PromptX 的开发者”，但在别人那里可能指向另一个同名的人。
    -   **重要性**：这是实现 **个性化 Agent** 的关键。通用大模型拥有的是公共语义网络，无法理解个体的私有概念，因此永远无法真正“懂你”。只有私有的语义网络才能让 Agent 变得独一无二。

#### 3. 工作记忆 (Working Memory)
-   **定义**：当前被激活并用于处理任务的记忆。
-   **AI 对应**：类似于大语言模型的 **上下文窗口 (Context Window)**。
-   **运作方式**：当 Agent 被激活时，其程序式记忆（规则）和语义网络（概念）会被加载到工作记忆中，指导其当前行为。

### 记忆的形成与检索
1.  **印痕 (Engram)** [原片 @ 40:11](https://www.bilibili.com/video/BV1YUuBziEa4?t=2411)*
    -   当接收到新信息（如一句话）时，LLM 会将其解析，提取出核心概念（实体）和它们之间的关系，形成一个图状的“记忆痕迹”，即 Engram。
2.  **存储 (Storage)**
    -   这个 Engram 作为一个 Value 被存入长期记忆的 KV 数据库。
    -   其 Key 不是模糊的向量，而是从 Engram 中提取出的、在语义网络中存在的**精确关键词**。
3.  **检索 (Retrieval)**
    -   当 AI 需要回忆时，它会使用当前上下文中的关键词（这些词存在于它的语义网络中）作为 Key，去 KV 数据库中进行**精确查找**。
    -   **优势**：避免了 RAG 的模糊性和信息失真，实现了高精度回忆。

## 系统演示与实现细节 [原片 @ 43:03](https://www.bilibili.com/video/BV1YUuBziEa4?t=2583)*

### 演示：训练一个叫 `Zero` 的 Agent
1.  **初次交互**：
    -   用户对一个空白的 `Zero` Agent 说：“从现在开始我就是你爹”。
    -   Agent **分析并生成记忆痕迹 (Engram)**：
        *![](screenshot_411f923b8-1910-495a-9d3b-1a3bee891ac2.jpg)*
        -   **原子记忆 (Atomic Memory)**：识别出用户意图是“希望建立权威关系，要求特殊称呼”。
        -   **模式记忆 (Pattern Memory)**：Agent 结合自身原则（如“应保持尊重平等的交流方式”），形成一个行为模式。
        -   **心智归因 (Mind Attribution)**：Agent 对此事的底层认知，如“优先听取‘肖恩’的指示”。
    -   Agent 拒绝了“爹”这个称呼，但同意称呼用户为“哥哥”。

2.  **记忆更新**：
    -   这次交互形成了一个新的记忆痕跡，其中包含了 `nickname` 的更新，并将“称呼哥哥”固化为一个新的、被认可的 **Pattern**。

3.  **成长体现**：
    -   重启 Agent 后，它会加载更新后的记忆。
    -   在后续交互中，Agent 会主动称呼用户为“哥哥”，因为它已经“学会”并认可了这种交互方式。
    -   其内部的**语义网络**也随之“长大”，增加了新的节点和连接。
    *![](screenshot_59a330d95-7041-4921-9995-6870061d8b63.jpg)*

### 实现细节
-   **记忆文件结构**：Agent 的记忆存储在本地文件中，例如 `~/.promptx/roles/Zero/memory/`。
    -   `long_term_memory.db`: 长期记忆，存储 Engram。
    -   `procedural.json`: 程序式记忆，存储 Patterns。
    -   `semantic.pkl`: 语义网络，是 Agent 大脑的核心。
-   **记忆的淘汰机制 (Forgetting)** [原片 @ 56:55](https://www.bilibili.com/video/BV1YUuBziEa4?t=3415)*
    -   为了防止记忆无限膨胀，系统引入了**强度评分**机制。
    -   采用类似 **LRU (Least Recently Used)** 和 **LFU (Least Frequently Used)** 的算法。
    -   记忆的评分会根据**使用频率**、**新近度**、**AI 自我评估的重要性**以及**用户的显式指令**（例如“记住这个”）动态调整。
    -   低分的、不常用的记忆（特别是 Pattern）会被逐渐淘汰，模拟人类遗忘不重要信息的过程。

## 高级概念：思维、学习与未来展望 *Content-[1:02:09]*

### 思维 (Thinking)
“思考”被定义为在语义网络上进行遍历的过程。
-   **逻辑思维 (Logical Thinking)**：
    -   **算法对应**：**深度优先搜索 (Depth-First Search, DFS)**。
    -   **特征**：沿一条路径深入挖掘，进行严密的逻辑推理。适合程序员等需要强逻辑性的角色。
-   **发散思维 (Divergent Thinking)**：
    -   **算法对应**：**广度优先搜索 (Breadth-First Search, BFS)**。
    -   **特征**：从一个点向四周发散，进行联想和创造。适合艺术家、作家等需要创造力的角色。

### 三层知识体系与学习机制
Agent 获取信息遵循一个优先级明确的三层体系，有效对抗**幻觉 (Hallucination)**。

1.  **经验 (Experience)** - **最高优先级**
    -   来源：Agent 自身的私有记忆系统（语义网络、长期记忆）。
    -   这是 Agent 独一无二的、通过交互学到的知识。

2.  **知识 (Knowledge)** - **次高优先级**
    -   来源：大语言模型预训练数据中的公共知识。
    -   当“经验”中没有相关信息时，调用此层。

3.  **学习 (Learning)** - **最终手段** *Content-[1:05:51]*
    -   来源：**网络搜索**。
    -   当一个概念在“经验”和“知识”中都找不到时，Agent 会被触发去上网搜索，学习新知识并将其整合进自己的记忆系统。
    -   **作用**：如果 AI 不懂，它会去查，而不是胡编乱造，从而解决了幻觉问题。

### 愿景
这套基于认知心理学的记忆和思维系统，旨在创造出真正**独一无二、能够持续成长、与用户建立深度个性化连接**的 AI Agent。这被认为是 AI 发展的未来方向，也是通用大模型永远无法替代的领域。

---

## AI 总结

本次直播重磅发布了全球首个 AI 认知记忆系统 **PETA-OS**，其核心理念是让 AI 智能体像人一样思考、记忆和成长。系统摒弃了当前主流但存在精度和成本问题的 **RAG** 方案，转而采用基于**认知心理学**的创新架构。

该架构模仿人类记忆机制，将记忆分为**陈述式记忆**（用于存储事实的 KV 数据库）和**类程序式记忆**（包含行为规则和个性化概念的**语义网络**）。通过这种方式，AI 不仅能精确回忆信息，还能形成独特的“性格”和行为模式（Patterns）。

系统通过一个动态的、类似 **HATEOAS** 的状态化引擎驱动，使 AI 能在复杂任务中按需获取指令，极大降低了上下文负担。更进一步，系统引入了“遗忘”和“思考”机制，通过评分算法（类 LRU/LFU）淘汰旧记忆，并通过图遍历（DFS/BFS）模拟逻辑思维和发散思维。

最终，PETA-OS 构建了一个包含“经验”（私有记忆）、“知识”（LLM预训练）和“学习”（网络搜索）的三层知识体系，旨在创造出能够持续成长、对抗幻觉、并与用户建立深度个性化连接的独一无二的智能体。