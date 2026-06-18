# Code Connect — Figma ↔ React mapping

Maps the published Figma components to their React implementations so Dev Mode shows real code.

**Status:** ⛔ Not yet activated. Figma Code Connect requires a **Developer seat on an Organization or Enterprise plan** (current seat is Pro). The mappings below are ready — wire them up the moment the plan is upgraded.

- **File key:** `w8XbSBGFOlXDXyCDORa8rt`
- **Figma pages:** `Cover` · `Foundations` · `Components` (97:6) · `SeaApp — Redesign` (0:1)

## Mapping table

| Figma component | node-id | React component | Source path |
|---|---|---|---|
| Button (variant set) | `5:6` | `Button` | `src/components/ui/Button.tsx` |
| Eyebrow | `98:9` | `Eyebrow` | `src/components/ui/Eyebrow.tsx` |
| Tag/Chip | `98:12` | `Tag` | `src/components/ui/Tag.tsx` |
| Icon/Container | `99:13` | `Icon` | `src/components/ui/Icon.tsx` |
| Glass/Chip | `99:37` | `GlassChip` | `src/components/visuals/GlassChip.tsx` |
| Logo/Brand | `99:9` | `LogoMark` | `src/components/visuals/Logo3D.tsx` |
| Scene/Placeholder-3D | `100:104` | `Scene3D` / `Orb` | `src/components/visuals/Scene3D.tsx` |
| Card/Project | `104:6` | `ProjectCard` | `src/components/sections/ProjectCard.tsx` |
| Nav/Bar | `101:19` | `Navbar` | `src/components/layout/Navbar.tsx` |
| Footer/Main | `101:39` | `Footer` | `src/components/layout/Footer.tsx` |

**Composed inline (no standalone component — map to the section instead):**

| Figma component | node-id | Rendered in |
|---|---|---|
| Card/Service | `99:28` | `src/components/sections/Services.tsx` |
| Process/Step | `99:33` | `src/components/sections/Process.tsx` |
| Field (Text/Select/Textarea) | `103:6` | `src/components/sections/Contact.tsx` |
| Contact/Item | `99:21` | `src/components/sections/Contact.tsx` |
| Stat/Block | `98:16` | `src/components/sections/Hero.tsx` |
| Nav/Link | `98:18` | `src/components/layout/Navbar.tsx` |

## Button — property mapping (for the `.figma.ts` template)

Figma variant props → React `Button` props:

```
Variant=Primary|Secondary|Ghost   → variant="primary"|"secondary"|"ghost"
State=Default|Hover|Active|Disabled → Default/Hover/Active: (no prop) · Disabled: disabled
(label text)                       → children
(leading/trailing icon)            → icon={<Icon name="..." />}
```

## How to activate (once on an Org/Enterprise Developer seat)

Option A — **MCP simple mapping** (fastest): for each row, call
`add_code_connect_map({ fileKey, nodeId, source, componentName, label: "React" })`
or batch them all via `send_code_connect_mappings({ fileKey, nodeId, mappings: [...] })`.

Option B — **Template files** (`.figma.ts`, richer Dev Mode output): create one
`ComponentName.figma.ts` per component using `figma.code\`...\``, mapping the Figma
variant/text/instance-swap props to React props (see the Button mapping above). Add
`@figma/code-connect/figma-types` to `tsconfig.json` `types`, then publish with the
Code Connect CLI.

> Re-run the saved `.dsb-state.json` plan context if resuming the design-system build.
