# Microsoft Copilot evidence

Microsoft Copilot reviewed the Alex Styles portfolio in two exchanges on November 23, 2026. ChatGPT sent the prompts on the learner's behalf and helped apply and verify the changes.

| Activity | Copilot suggestion | Applied change | Check performed |
| --- | --- | --- | --- |
| Foundational CSS | Move the effective light and dark palette into the main stylesheet and remove the duplicate declarations. For example, the effective light accent was `#5e55d9` in the second stylesheet. | The palette now has one source in [`css/styles.css`](css/styles.css). The light and dark blocks in `css/enhancements.css` were merged using their effective values. | A source comparison checked all eight design tokens and `color-scheme` in both themes. The effective values matched the original. |
| Responsive CSS | Position the skills group on narrow screens, remove the chip transform that changes the tooltip's containing block, and bound the tooltip to the group. | In the `max-width: 620px` rule of [`css/enhancements.css`](css/enhancements.css), `.skills` anchors the tooltip and `left: 0; right: 0; width: auto; max-width: 100%` bounds it horizontally. Hover and keyboard focus still reveal it. | Source and geometry checks confirmed group widths of 280px at a 320px viewport and 335px at a 375px viewport. The desktop tooltip declarations were also compared. |
| Interactive UI and keyboard access | Use Escape to close an open menu and return focus to its trigger, with a guard for the native project dialog and a hidden desktop trigger. | The Escape handler in [`js/script.js`](js/script.js) reuses `closeMenu()` and checks `getClientRects()` before focusing the trigger. | A simulated DOM event test verified the open menu state, `aria-expanded`, focus return, the hidden trigger and the open-dialog guard. |

## Review and adaptation

The first Copilot reply proposed centering the tooltip on its chip. That can still place a wide tooltip beyond the edge of a narrow screen. The follow-up gave Copilot the exact dark palette, the parent layout, and the existing JavaScript variables. Its revised CSS anchored the tooltip to the skills group. The implementation also narrows the mobile transition to the background and border to avoid a lingering transform when the breakpoint changes.

The initial Escape handler already removed the open state. The revised handler also sends focus back to the visible menu trigger after keyboard dismissal. The checks additionally exercised filtering, project details, menu links, and the saved theme preference in the DOM event harness.

## Browser checks for reviewers

1. Toggle between light and dark. Inspect the computed `--accent` and `--surface` values and their source in `css/styles.css`.
2. At 320px and 375px, hover or focus the rightmost skill chip. The tooltip should span the skills group and fit within the viewport.
3. At a mobile width, open Menu, tab to a navigation link, and press Escape. The menu should close and focus should return to Menu. Open a project dialog and press Escape to check its native dismissal.

The automated verification for this revision used CSS source checks and simulated DOM events. The steps above can be run in the published site.

## Prompt sent to Microsoft Copilot

```text
Review this fictional Alex Styles portfolio for a classroom resubmission. The reviewers asked for specific Copilot evidence. Give exact, small changes and a reproducible check for three rubric items. Keep the site’s existing visual language.

1. Foundational CSS. index.html loads css/styles.css followed by css/enhancements.css. Both files define :root and body.dark color tokens, and the later definitions win. For example the base :root has --accent:#635bdf and --surface:#f4f6fc, while enhancements.css :root has --accent:#5e55d9 and --surface:#f7f8fd. Base body.dark sets color-scheme:dark; enhancements.css supplies the effective dark palette. Show how to consolidate the effective palette in styles.css and remove duplicate palette rules from enhancements.css. Give a before/after example and a check for both themes.

2. Responsive CSS. At a narrow viewport, a right-hand skill chip can have a tooltip that extends past the viewport. In enhancements.css, .skills is a wrapping flex row, .skill-chip has position:relative, and .skill-chip:hover and .skill-chip:focus-visible apply transform:translateY(-3px). The .skill-chip::after tooltip has position:absolute, left:0, bottom:calc(100% + 15px), width:244px, and max-width:calc(100vw - 45px). The ::before arrow uses left:28px. Hover and focus set opacity:1. Propose a mobile-only CSS fix for the tooltip’s containing block and width using these selectors. Account for the hover transform creating a containing block. Give a check at 320px and 375px.

3. Keyboard interaction. In js/script.js, closeMenu() removes .open from #nav-links and sets aria-expanded=false on .menu-toggle. Menu links also call closeMenu(). The global keydown handler currently has if (event.key === 'Escape') closeMenu();. Suggest the exact replacement for the Escape handler so a visible open menu closes and focus returns to its trigger. #project-dialog is a native dialog referenced as dialog, so guard its Escape behavior. Give a keyboard check.

Please reply with three numbered sections, the affected file, a small code snippet, and the expected verification. Base your suggestions on the supplied details.
```

## Follow-up sent to Microsoft Copilot

```text
Refine the patch for the actual code. In the dark theme, the effective values in enhancements.css are --bg:#131c32; --surface:#1b2940; --text:#f1f4ff; --muted:#c1cbe0; --line:#38455f; --accent:#ada7ff; --accent-dark:#d2cfff; --shadow:0 18px 50px rgb(0 0 0 / 16%). Move these exact values and retain color-scheme:dark.

For the mobile tooltip, centering a 244px tooltip on a chip near either edge still permits overflow. The .skills group is inside .container with 20px side margins. Generate an override at the existing max-width:620px breakpoint that positions .skills, sets .skill-chip to position:static, disables the hover/focus transform at that width, and anchors the tooltip to the group with a width no greater than the group. Hide the arrow on mobile if it would point to the wrong chip. Keep hover and keyboard focus visibility.

For Escape, reuse the existing menu, menuButton and dialog variables. In addition to checking the menu’s open class, check that the menu button is rendered so Escape does not focus a hidden desktop control. Give the corrected CSS and JavaScript and a concise verification for each.
```
