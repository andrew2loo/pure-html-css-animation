# Pure CSS/SVG Scroll Animation — 3×3 Icon Grid

A lightweight demo that showcases a **3 rows × 3 columns** grid (9 icons) where **icons fade in one by one on scroll**, and **connecting lines** draw progressively to indicate relationships between modules. Built for a clean, library-free web implementation using **HTML + CSS + SVG** (minimal JS allowed only for scroll detection if needed).

---

## Goals

- Display **9 AutoCount-related app icons** in a 3×3 grid.
- On **scroll into view**, each icon **fades in sequentially** (top-left → bottom-right).
- After the icons appear, **connecting lines** (SVG paths) **draw** between them in a specified order to show system flow/integration.
- **No external libraries**. Prefer **pure HTML/CSS/SVG**. JS allowed only for scroll triggers (e.g., `IntersectionObserver`) if absolutely necessary.
- Works well in **Dreamweaver** and with **Cursor.com** (developer assistant) for code generation/refinement.

---

## Content: 9 Icon Names (AutoCount Ecosystem)

> If any official product names differ, replace them accordingly. Where current product lineup is insufficient, future/expansion ideas are included to complete the 9.

1. **AutoCount Accounting**  
2. **AutoCount POS**  
3. **AutoCount Cloud Accounting**  
4. **AutoCount Payroll**  
5. **AutoCount e-Invoicing**  
6. **AutoCount eCommerce**  
7. **AutoCount Inventory & Warehouse**  
8. **AutoCount Mobile Sales (SFA)**  
9. **AutoCount Analytics (BI Dashboard)**  

- You can treat #7–#9 as current or **future product** directions if needed (Inventory/WMS, mobile sales force app, analytics/BI).

---

## Interaction & Animation Requirements

### 1) Scroll Trigger
- The animation should **start only when the grid enters the viewport**.
- Use **CSS-only** where possible. If scroll detection requires it, allow minimal **JS** (e.g., `IntersectionObserver`) to add an `in-view` class to the container.

### 2) Icon Appearance (Fade-in)
- Icons **fade in sequentially** from the first row to the last (left → right).
- Each icon’s animation should:
  - Start with `opacity: 0`
  - Animate to `opacity: 1` over ~**600–900ms**
  - Use **staggered delays** (e.g., 150–250ms increments) so they appear **one by one**.
- Optional micro-motion (still pure CSS): slight **scale** or **translate** (e.g., `transform: translateY(8px) → 0`) for a smoother, modern feel.

### 3) Connecting Lines (SVG)
- After the **final icon** appears, begin **drawing lines** between modules using **SVG paths**.
- Lines should **draw progressively** using `stroke-dasharray` / `stroke-dashoffset` technique.
- Line draw duration per segment: **800–1200ms**, with a **100–200ms** delay between segments.
- **Order of connections (example)**:
  1. Accounting → e-Invoicing  
  2. Accounting → POS  
  3. POS → Inventory & Warehouse  
  4. Cloud Accounting → Analytics (BI Dashboard)  
  5. Payroll → Analytics  
  6. eCommerce → Inventory & Warehouse  
  7. Mobile Sales (SFA) → Accounting  
  8. Accounting → Analytics  
- Use **two or three brand-friendly stroke colors** to differentiate flows (e.g., blue, magenta, teal).

### 4) Timing Summary (example)
- Fade-in sequence total: ~**2.5–3.5s** for all 9 icons.
- Line drawing sequence total: ~**6–8s** (depending on number of segments).
- Entire animation completes within **10–12s** after entering view.

---

## Visual & Layout Specifications

- **Grid**: 3 rows × 3 columns; centered within a **responsive container** (e.g., max-width 1080–1280px).
- **Spacing**: Even gutter between cards/icons; maintain consistent margins on mobile.
- **Card/Icon Style**:
  - **Rounded** cards with light shadow.
  - **Colorful** gradient or solid accent per icon (distinct but cohesive).
  - Clear **label text** under or inside each icon (e.g., “AutoCount POS”).
- **Background**: Transparent or light (white). Ensure **sufficient contrast**.
- **Lines**: SVG on a **separate layer** positioned behind labels but above background.

---

## Accessibility

- Provide **text labels** (visible) for each icon.
- Ensure **color contrast** meets WCAG AA where practical.
- If JS is used, **no essential content** should depend solely on animation to be understandable.
- Consider `prefers-reduced-motion` to **disable or shorten** animations for users who prefer less motion.

---

## Responsiveness

- **Desktop** (≥1024px): 3×3 grid (3 columns).
- **Tablet** (~768–1023px): allowed to **collapse to 3×3 but tighter gutters**; or switch to **3×3 with smaller cards**.
- **Mobile** (≤767px): **2 columns** or **1 column** fallback.  
  - If layout shifts, **line paths may be simplified or disabled** on small screens. It’s acceptable to **only animate fade-ins** on mobile to keep it clean.

---

## Performance Requirements

- **No external libraries** (no GSAP, no jQuery, no icon frameworks).
- **SVG paths** should be optimized (avoid overly complex curves).
- Use **CSS transforms** (GPU-friendly) for icon micro-motion.
- Keep total CSS/SVG under reasonable size; **no large images** required.

---

## File & Project Structure (no code in this README; for reference only)

```
pure-html-css-animation/
├─ index.html           # container markup for grid + svg layer
├─ style.css            # styles & keyframe animations
├─ script.js            # (optional) minimal JS for scroll detection
└─ assets/
   └─ icons/            # SVG or inline paths for each product icon (optional)
```

- **Dreamweaver** users can open the folder and preview directly.
- **Cursor.com** users can ask the assistant to generate boilerplate files **following these requirements**.

---

## Acceptance Criteria

- [ ] 3×3 grid appears centered and responsive.
- [ ] On scroll into view, icons **fade in sequentially**, visibly one by one.
- [ ] After all icons appear, SVG lines **draw in the specified order**.
- [ ] Animation runs **once** per page load (replay optional if scrolled away/back).
- [ ] Works in latest **Chrome, Edge, Safari**; degrades gracefully in Firefox if needed.
- [ ] No external libraries; minimal JS only if required for scroll trigger.

---

## Optional Enhancements (later)

- **Hover tooltips** with a one-line description of each product.
- **Replay** button to restart the animation.
- **Theme switch**: light/dark backgrounds with adjusted colors.
- **Data-driven layout**: JSON config to define labels and connection routes.

---

## Notes

- If AutoCount’s **official product naming** requires updates, replace labels accordingly before design finalization.
- If strict “no-JS” policy is enforced, the scroll trigger can be approximated with CSS `:has()` and container queries where supported, but **IntersectionObserver** remains the most robust cross-browser solution.

---

## License

This project is licensed under the **MIT License** — you are free to use, modify, and distribute this project for personal or commercial purposes as long as the copyright notice below is included.

```
MIT License

Copyright (c) 2025 Andrew Loo

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
```
---

**End of requirements.**
