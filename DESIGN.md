---
name: Elinas Welt
description: Minimal visual guide for Elina's browser games.
colors:
  ink: "#253047"
  paper: "#fff7d6"
  canvas: "#ffffff"
  panel: "#8bd3dd"
  sun: "#ffe66d"
  rose: "#d93662"
  success: "#69db7c"
  danger-soft: "#ff9aa2"
  focus: "#31c4ff"
  empty: "#eeeeee"
typography:
  display:
    fontFamily: "Arial, sans-serif"
    fontSize: "clamp(1.8rem, 5vw, 3rem)"
    fontWeight: 700
    lineHeight: 1.1
  body:
    fontFamily: "Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.4
  label:
    fontFamily: "Arial, sans-serif"
    fontSize: "0.95rem"
    fontWeight: 700
rounded:
  sm: "8px"
  md: "10px"
  lg: "14px"
  panel: "18px"
spacing:
  xs: "6px"
  sm: "8px"
  md: "12px"
  lg: "18px"
  xl: "32px"
components:
  button:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "8px 12px"
    height: "44px"
  game-panel:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.ink}"
    rounded: "{rounded.panel}"
    padding: "10px"
---

# Design System: Elinas Welt

## 1. Overview

**Creative North Star: "Toy-Like Browser Games"**

The system is simple, bright, and tactile. `bunte-bausteine` and `mastermind` are the current reference surfaces: bold outlines, chunky controls, primary colors, and clear German labels. `formenmalen` is the older darker-yellow surface and should not steer new work.

**Key Characteristics:**
- High-contrast ink outlines.
- Large touch-friendly controls.
- Flat color fields with small pressed or inset shadows.
- Minimal copy, always close to the action.

## 2. Colors

Use a restrained toy palette: dark ink, warm paper, white canvas, cyan panels, and a few clear action colors.

### Primary
- **Game Ink**: text, borders, and structural outlines.
- **Play Panel**: boards, code areas, and active game surfaces.

### Secondary
- **Sun Action**: start, random, or primary playful actions.
- **Rose Title**: page titles and warm emphasis.
- **Success Green**: positive actions such as checking or confirming.
- **Soft Danger**: clearing, wiping, or reset actions.

### Neutral
- **Paper**: page background.
- **Canvas**: buttons and drawing areas.
- **Empty Field**: unfilled holes, cells, and placeholders.

**The Reference Rule.** Match `bunte-bausteine` and `mastermind` before borrowing from `formenmalen`.

## 3. Typography

**Display Font:** Arial, sans-serif  
**Body Font:** Arial, sans-serif

**Character:** Plain, familiar, and readable. No decorative type; the color and component shapes carry the playfulness.

### Hierarchy
- **Display** (700, responsive clamp, tight line-height): page titles only.
- **Title** (700, about 1.25rem): section labels when needed.
- **Body** (400, 1rem-1.2rem): short instructions and status messages.
- **Label** (700, 0.95rem-1rem): buttons and compact controls.

## 4. Elevation

Depth is physical, not atmospheric: hard offset shadows for raised buttons and panels, inset shadows for holes and fields. Avoid soft ambient card shadows.

### Shadow Vocabulary
- **Raised Control** (`0 4px 0 #253047`): buttons and status boxes.
- **Pressed Control** (`0 1px 0 #253047`): active button state.
- **Inset Field** (`inset 0 -5px 0 rgba(0, 0, 0, 0.12)`): holes, cells, and game pieces.

## 5. Components

### Buttons
- **Shape:** chunky rounded rectangles (14px).
- **Default:** white fill, dark ink border, bold label, hard lower shadow.
- **State:** active buttons move down and reduce the shadow.

### Game Panels
- **Shape:** large rounded containers (18px).
- **Background:** cyan panel with dark border.
- **Use:** boards, secret code areas, and color grids.

### Fields
- **Shape:** small rounded cells (7px-10px).
- **Background:** empty gray until selected.
- **State:** selected color fills the field; feedback must remain readable without tiny details.

### Navigation and Cards
- Keep the landing page consistent with the game surfaces: bold borders, simple cards, real screenshots, and direct links.

## 6. Do's and Don'ts

### Do:
- **Do** keep controls large enough for touch and young users.
- **Do** use the `bunte-bausteine` and `mastermind` interaction style as the source of truth.
- **Do** keep German labels short and literal.
- **Do** use color for play, but preserve visible borders and focus states.

### Don't:
- **Don't** make it look like grown-up SaaS polish.
- **Don't** add generic landing-page decoration.
- **Don't** use tiny fussy controls.
- **Don't** rely on muted gray-on-beige interfaces.
- **Don't** require instructions before play.
- **Don't** use the darker yellow `formenmalen` background as the target direction.
