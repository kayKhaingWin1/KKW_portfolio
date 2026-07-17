# Portfolio Taste Skill — UI Rules (React + JS)

> 本文件是这个作品集项目的 **UI/设计宪法**。所有改动组件、写新页面、调样式时都必须遵守。
> 参考并落地 `.agents/skills/design-taste-frontend`（taste-skill，已通过 `npx skills add` 安装）的方法论。


---

## 0. Brief Inference（读一下房间）
Reading this as: 面向招聘方的开发者个人作品集，premium / Apple-y 语言，倾向于 Tailwind + framer-motion + 真玻璃折射（SVG displacement），不倾向任何 3D 引擎。

---

## 1. Tech Stack（已锁定）
- **React 19 + JS**（非 TS）；函数组件 + Hooks。Vite 构建。
- **Tailwind CSS 3.4**：样式唯一主力。
- **动效**：`framer-motion`。
- **玻璃系统**：`src/components/GlassSurface.jsx`（SVG `feDisplacementMap` 折射 + `backdrop-filter`，随 `.dark` class 主题切换）是全站玻璃材质的唯一实现，取代早期的 `LiquidGlass.jsx`；`@guochenwang/lggc` 的 `lggc` 工具类仅做轻量兜底。
- **图标**：`lucide-react`（项目已依赖，`strokeWidth` 统一为 `1.5`）。
- **禁止**：任何 3D 引擎（`three`/`@react-three/*`/GLSL/`.glb`/`.vrm`）参与首屏或常驻渲染。**唯一例外**：`src/components/fx/Ferrofluid.jsx`（`ogl` WebGL canvas）经明确批准用于 `Background.jsx` 首屏英雄区背景，仅限该处，不授权其他任何 3D/WebGL 用法。

---

## 2. Core Visual Concept — Ethereal Glass（暗色以太玻璃）
- **字体**：Apple 原生字体栈 `-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", system-ui, sans-serif`（零额外网络请求，最贴近 iOS/macOS 观感）。
- **文字色**：标题 `#F5F5F7`（Apple 官方灰白）/ 浅色主题 `#1D1D1F`，正文 `zinc-400`（浅色主题 `zinc-600`）。
- **强调色**：香槟金 Champagne Gold，Tailwind 自定义 `gold` 色阶（`gold-300 #E8C766` / `gold-400 #D4AF37` / `gold-500 #C9A227` / `gold-600 #9C7A17`，定义于 `tailwind.config.js`），取代早期的 Electric Indigo。全站仍只锁定这一个强调色相。

---

## 10. Responsive — Mobile-First
- 基础类写手机端，`md:`/`lg:`/`xl:` 逐级增强。
- 非对称网格、rotate/overlap 效果在 `<768px` 一律回退为单列纵向堆叠（`grid-cols-1 w-full`）。
- 可点区域 ≥44px；任何宽度不出现横向滚动。

---

## Definition of Done
1. 全站单一强调色（champagne gold），无彩虹渐变文字。
2. 无 3D/Canvas 依赖（`Background.jsx` 的 Ferrofluid 英雄背景除外，见 §1），首屏其余部分保持轻量。
3. 每个 section 布局家族不重复，非对称、对齐网格、留白充足。
4. 动效只用 transform/opacity，弹簧物理，尊重 reduced-motion。
5. 无 em-dash，eyebrow 未超限，无 AI 陈词滥调。
6. CTA 不换行、对比度达标、全站同一意图只有一个文案。
7. 手机 / 平板 / 桌面三端验证，无横向滚动。
