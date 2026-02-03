# Motion + Design System (Hyper-Magnificent, Enterprise-Safe)

## Goals
- Convey system state and cause/effect (not decoration).
- Make complex operations feel calm, predictable, and reversible.
- Preserve performance, accessibility, and low cognitive load.

## Motion principles
1. **State-driven motion**: animations reflect real state transitions (loading → success → error).
2. **No infinite motion by default**: avoid constant background animations.
3. **Responsiveness first**: transitions must not block user input.
4. **Reduced-motion compliance**: provide a reduced-motion mode that removes transforms and parallax.

## Recommended micro-interactions
- **Wizard step transitions**: subtle slide/fade; preserve focus; never reflow wildly.
- **Progress visualization**: deterministic stepper + streaming log snippet.
- **Action confirmations**: “impact preview” card → confirm token gate → execution → verification → audit link.
- **Alerts**: severity chip + pulse-once highlight (not continuous) + clear “acknowledge” affordance.
- **Streaming logs**: smooth append with capped buffer; allow pause; show reconnect indicator.

## Component guidelines
- **Cards**: consistent spacing; high information density without clutter.
- **Tables**: sticky headers; virtualization for large sets; keyboard navigation.
- **Forms**: schema-driven; inline validation; deterministic defaults.

## Performance budget (targets)
- Initial web load: fast enough to feel immediate on a typical laptop.
- Streaming logs: stable at high volume; capped memory; no layout thrash.
- Charts: lightweight; avoid heavy real-time animations; snapshot polling preferred.

## Accessibility
- Support keyboard-only operation.
- Respect OS contrast settings.
- ARIA labels for controls and streamed regions.
- Reduced-motion mode: disable non-essential transitions.

## Design tokens (conceptual, model-agnostic)
Define tokens for:
- spacing scale
- typography scale
- border radius
- elevation/shadows
- semantic colors (success/warn/error/info)
- focus ring and hover states

Deliverables
- `docs/09-motion-and-design-system.md` (this file)
- component inventory + naming conventions (in UI wireframes doc)
