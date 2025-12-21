# Dark Mode Implementation

Dark mode has been implemented for the **main app** only. The **Decap CMS admin interface** remains light-only for simplicity and focus.

## 🎨 Color Scheme

### Light Mode
- Background: `#fff` (white)
- Text: `#000` (black)
- Borders: `#000` (black)
- Hover/Alt: `#f5f5f5` (light gray)

### Dark Mode
- Background: `#1a1a1a` (dark)
- Text: `#f5f5f5` (light gray)
- Borders: `#666` (medium gray)
- Hover/Alt: `#333` (dark gray)

## 📱 App Dark Mode

### User Theme Toggle
- Located in the header next to navigation links
- Shows 🌙 in light mode, ☀️ in dark mode
- Persists user preference in localStorage
- Falls back to system preference if no preference saved

### Implementation
1. **`hooks/useTheme.ts`** - Theme management hook
   - Detects system preference on first load
   - Reads/writes to localStorage
   - Applies `dark` class to `<html>`

2. **`tailwind.config.ts`** - Tailwind configuration
   - Changed `darkMode: false` → `darkMode: 'class'`
   - Added dark-specific color variables

3. **`styles/globals.css`** - Global dark mode styles
   - Base styles for `html.dark`
   - Component overrides for `.dark .neo-*` classes
   - Smooth transitions between modes

4. **Components** - Dark mode support
   - `Layout.tsx` - Theme toggle button, dark classes
   - `ConstructionTypeCard.tsx` - Dark backgrounds, text colors, shadows
   - `ConstructionCard.tsx` - Dark backgrounds, text colors

## 🔧 Technical Details

### Tailwind Dark Mode
- Uses `class` strategy (manual control via HTML class)
- All dark mode utilities available with `dark:` prefix
- Example: `dark:bg-[#1a1a1a] dark:text-[#f5f5f5]`

### Persistence
- **App**: Saves preference to localStorage under key `theme`

## ✨ Features

✅ System preference detection
✅ Manual user toggle in header
✅ Smooth color transitions
✅ Consistent Neo-Brutalist aesthetics
✅ All components styled for dark mode
✅ localStorage persistence  

## 🚀 Usage

### For Users
1. Click the moon/sun icon in the header to toggle dark mode
2. Preference is saved automatically

### For Developers
Use Tailwind's `dark:` prefix in components:
```tsx
<div className="bg-white dark:bg-[#1a1a1a] text-black dark:text-[#f5f5f5]">
  Content
</div>
```

Or use CSS variables in custom CSS:
```css
body {
  background-color: var(--color-bg);
  color: var(--color-text);
}
```

## 📋 Files Modified

- `tailwind.config.ts` - Enabled dark mode
- `styles/globals.css` - Added dark mode styles
- `components/Layout.tsx` - Added theme toggle button
- `components/ConstructionTypeCard.tsx` - Dark mode support
- `components/ConstructionCard.tsx` - Dark mode support
- `public/admin/custom.css` - Kept light mode only
- `hooks/useTheme.ts` - NEW: Theme management hook

## 🎯 Neo-Brutalist Philosophy

Both light and dark themes maintain the bold, high-contrast Neo-Brutalist aesthetic:
- Strong borders remain visible in both themes
- High contrast for readability
- Minimal color palette (black, white, grays)
- Consistent spacing and typography
