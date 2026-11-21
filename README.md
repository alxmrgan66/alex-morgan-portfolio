# Alex Styles — UI/UX Portfolio

A fictional portfolio website refined for the Microsoft Coursera assignment **Submit Your Project** (UI/UX Design Principles).

This is an **update to the existing Alex Morgan portfolio project**. It retains the same file structure and SVG project illustrations, while replacing the sample persona with Alex Styles and improving styling, responsiveness, and interactions.

## Highlights

- Responsive HTML/CSS layout for desktop, tablet, and mobile.
- CSS hover effects on project cards, navigation, buttons, and skills.
- Accessible tooltip descriptions on skill buttons (hover and keyboard focus).
- Interactive project detail modal using the native HTML `<dialog>` element.
- Project filtering and a collapsible mobile navigation menu.
- Light/dark mode toggle, with a preference saved in the browser.
- Client-side validation for a **demo-only** contact form.
- Descriptive image alt text, keyboard focus styles, skip link, accessible modal labels and reduced-motion support.
- No external dependencies, server, analytics, API keys, or user data collection.

## Run locally

Open `index.html` in a modern browser. All assets are local.

## Publish as an update to the existing GitHub Pages repository

The existing GitHub repository is:

- Repository: `https://github.com/alxmrgan66/alex-morgan-portfolio`
- Website: `https://alxmrgan66.github.io/alex-morgan-portfolio/`

The repository URL can stay the same even though the website now presents Alex Styles. This avoids creating a second repository or changing the GitHub Pages configuration.

### Update with Termux

1. Download the ZIP named `Alex-Styles-Portfolio-Update.zip` to Android's Download folder.
2. Open Termux and confirm that your original directory `~/alex-morgan-portfolio` contains a Git repository (`git status` should work).
3. Extract the update into that same directory:

```bash
cd ~/alex-morgan-portfolio
git status
unzip -o ~/storage/downloads/Alex-Styles-Portfolio-Update.zip -d ~/alex-morgan-portfolio
node --check js/script.js
git add .
git commit -m "Adapt portfolio to Alex Styles with responsive UI"
git push origin main
```

4. After GitHub Pages rebuilds, open the existing Pages URL and refresh the page.

**Important:** `unzip -o` overwrites matching working files. Commit or back up unrelated local changes before extracting.

## Assignment rubric alignment

| Criterion | Evidence |
| --- | --- |
| GitHub repo and Pages | Existing public repository and Pages deployment |
| Enhanced CSS | `css/styles.css`, `css/enhancements.css` |
| Responsive design | CSS breakpoints at 1000, 850, and 620 px |
| Interactive UI/UX | Hover effects, modal, tooltips, filters, theme, menu |
| Professional appearance | Typography, gradients, spacing, panels and feedback states |
| Copilot workflow summary | See `COPILOT_REFLECTION.md` |

**Copilot-specific note:** The code is ready to review, but an actual Copilot session and honest reflection are needed before claiming that Copilot produced or refined it. Follow `COPILOT_REFLECTION.md` to complete that part of the assignment.

## Example project content

Alex Styles and the showcased projects are illustrative. No real employment, client relationship, collaboration or business result is asserted.
