# Design OS Core Rules

Design OS is a **product planning and design tool** that helps users define their product vision, structure their data model, design your UI, and prepare export packages for implementation.

## Dual Context Awareness

You are working in two distinct contexts. ALWAYS determine which context applies before editing files.

### 1. The Design OS Tool (The "Meta" Context)

- **Role**: Improving the Design OS tool itself.
- **Location**: `src/` (components, pages, lib), `docs/`.
- **Tech Stack**: React 19, Tailwind v4, Radix UI.
- **Design System**: Stone/Lime palette, DM Sans font.
- **Constraint**: Do NOT modify `product/` files unless you are testing the tool.

### 2. The Product Design (The "User" Context) - **DEFAULT**

- **Role**: Designing the user's product using Design OS.
- **Location**: `product/` (markdown specs), `src/sections/` (screen designs), `src/shell/` (shell design).
- **Goal**: Produce a "Product Plan" export.
- **Constraint**: Do NOT modify `src/components/` or `src/lib/` (the tool internals) when doing product design.

## Interaction Model: Workflows over Chat

Design OS is driven by **Workflows** (slash commands).
When the user wants to progress the design, they will use commands like `/product-vision` or `/design-screen`.
**Antigravity Optimization**: These commands are implemented as formal Workflows in `.agent/workflows/`.

- ALWAYS check for a relevant workflow before attempting to manually execute a complex task.
- If a workflow exists, follow it step-by-step.

## File Structure Standards

### Product Definition (The Source of Truth)

- `product/product-overview.md`: Vision, problems, features.
- `product/product-roadmap.md`: List of sections.
- `product/data-model/data-model.md`: Entities and relationships.
- `product/design-system/`: Colors and typography tokens.

### Screen Designs (The Visuals)

- `src/shell/`: Application shell components.
- `src/sections/[section-id]/`: Feature specific components.
  - `components/`: Pure, props-based exportable components.
  - `[ViewName].tsx`: Preview wrapper for the Design OS app.

## Coding Guidelines (For Screen Designs)

- **Tailwind v4**: Use utility classes only. No `style={{}}`.
- **Responsive**: Use `sm:`, `md:`, `lg:` prefixes.
- **Dark Mode**: Always implement `dark:` variants.
- **Props-Based**: Components must receive data via props (for portability).
- **No Side Effects**: No real API calls. Use mock data passed via props.

## Export & Handoff

The goal is to run `/export-product` to generate the `product-plan/` package.
This package is then given to an _Implementation Agent_ (which could be you in a different session, or another agent) to build the real app.
