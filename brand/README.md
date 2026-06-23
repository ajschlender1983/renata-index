# Renata — Brand Mark (source of truth)

Everything that renders the Renata mark should reference these files. Do not hand-redraw
the mark or hard-code the hexes anywhere else.

## The mark
A solid **R** drawn as a letterform (squared stem, tapered cut-foot leg, circle bowl) with a
faceted **aperture** set into the bowl. It is also Renata's live status light.

## Files
| File | Use |
|------|-----|
| `renata-mark.svg` | Primary mark, ink + violet aperture. Light surfaces. |
| `renata-mark-reversed.svg` | Light mark for dark surfaces. |
| `renata-mark-mono.svg` | Tintable: fills with `currentColor`, aperture is a true knockout. Use this in code. |
| `renata-state-found.svg` / `-timing.svg` / `-alert.svg` | The live state marks (teal / amber / red). |
| `renata-favicon.svg` | Favicon (violet, idle). Swap the fill for a live tab. |
| `renata-app-icon.svg` | App / maskable icon source (mark on a paper field, safe-zone padded). |
| `renata-lockup.svg` | Horizontal mark + "Renata" wordmark. |
| `icons/` | Rasterized PNGs (16/32/48 favicons, 180 apple-touch, 192/512 maskable). |
| `tokens.css` / `tokens.json` | Colours, type, sizes. The single source for values. |
| `favicon-state.js` | `renataFavicon('found')` swaps the tab icon to a state colour. |
| `site.webmanifest` | PWA / icon manifest. |
| `generate-icons.sh` | Rebuild the PNGs from the SVGs. |

## Colour & the six states
The R is a constant; in the app **the whole mark takes the state colour** so it reads at 16px.

| State | Colour | Motion |
|-------|--------|--------|
| Present | violet `#574FC7` | still |
| Listening | violet `#574FC7` | breath |
| Working | violet `#574FC7` | throb (opacity) |
| **Found** | **teal `#0F7256`** | pop |
| **Timing** | **amber `#8A5A0C`** | breath, slow |
| **Alert** | **red `#A6342E`** | double pulse |

The three violet states are one calm family, told apart by motion. Teal / amber / red break out
hard for the moments that need attention.

## Rules
- **Min size** 16px. **Clear space** = half the mark's height on every side.
- **Lockup** rests in brand ink or violet only. **Only the live in-app instance carries state colour.**
- **Accessibility:** never signal a state by colour alone. Pair it with the motion and an
  adjacent text label (e.g. "1 account found"). Reduced-motion users get the still end-frame.

## Head tags to ship
```html
<link rel="icon" type="image/svg+xml" href="/brand/renata-favicon.svg">
<link rel="alternate icon" href="/brand/icons/favicon-32.png" sizes="32x32">
<link rel="apple-touch-icon" href="/brand/icons/apple-touch-icon.png">
<link rel="manifest" href="/brand/site.webmanifest">
```

## Component hand-off (the "everywhere" step)
Wrap `renata-mark-mono.svg` in one component, e.g. `<RenataMark state="working" size={28} />`,
that maps `state` → colour (from `tokens.json`) + a motion class, and exposes an `aria-label`.
Drive `state` from real agent activity, and call `renataFavicon(state)` to mirror it on the tab.
