# Design Guidelines: Crossy Road Blockchain Game

## Design Approach
**Reference-Based Approach**: Drawing inspiration from retro arcade games (Crossy Road, Pac-Man) combined with modern web3 gaming platforms (Axie Infinity, StepN) to create a nostalgic yet blockchain-enabled gaming experience.

**Core Principle**: Preserve the original game's retro charm while seamlessly integrating modern blockchain UI elements without disrupting gameplay.

---

## Color Palette

### Game Environment (Preserve Original)
- **Road**: 69 16% 34% (dark asphalt)
- **Grass**: 88 88% 64% (vibrant green)
- **Vehicles**: Red 355 62% 39%, Yellow 62 68% 55%, Green 88 44% 50%
- **Background**: Transparent/gradient sky

### Blockchain UI Overlay
**Light Mode** (for UI elements over game):
- **Primary**: 142 76% 36% (blockchain green - web3 standard)
- **Surface**: 0 0% 100% with 90% opacity (frosted white)
- **Text**: 0 0% 13% (near black)
- **Accent**: 217 91% 60% (trust blue for wallet connection)

**Dark Mode Variant**:
- **Surface**: 0 0% 10% with 85% opacity (frosted dark)
- **Text**: 0 0% 95%

---

## Typography

### Game UI (Preserve Original)
- **Primary Font**: "Press Start 2P" (retro pixel font via Google Fonts)
- **Score Counter**: 2em, white, bold, pixel-perfect rendering
- **Buttons**: inherit from body, 1em

### Blockchain UI Additions
- **Wallet Address**: "Press Start 2P", 0.5em, monospace feel
- **Status Messages**: "Press Start 2P", 0.7em
- **Transaction Hashes**: 0.4em, truncated with ellipsis

---

## Layout System

### Spacing Units (Tailwind)
Use units: **2, 4, 8, 12, 20** for consistent rhythm
- Tight spacing: p-2, gap-2 (UI controls)
- Standard: p-4, m-4 (buttons, cards)
- Generous: p-8, my-12 (section separation)
- Large: p-20 (game canvas margins)

### Game Canvas
- **Full viewport**: 100vw × 100vh
- **3D Scene**: Orthographic camera, isometric view preserved
- **No modifications** to camera angles, lighting, or game objects

---

## Component Library

### Core Gaming Elements (DO NOT MODIFY)
- **3D Game Scene**: Three.js rendered canvas, full viewport
- **Chicken Character**: White body, pink crest, 15-unit size
- **Vehicles**: Cars and trucks with original dimensions and textures
- **Obstacles**: Trees with randomized heights (20-60 units)
- **Score Counter**: Top-right absolute positioned, white text

### Blockchain UI Components (NEW)

**A. Wallet Connection Panel**
- **Position**: Top-left corner, absolute
- **Style**: Frosted glass card (backdrop-blur-md, bg-white/90)
- **Layout**: 
  - "Connect Wallet" button (when disconnected): Accent blue, shadow-lg, px-8 py-4
  - Connected state: Horizontal layout showing truncated address + chain indicator
- **Dimensions**: Auto width, h-16, rounded-lg
- **Spacing**: m-4 from edges

**B. Transaction Status Toast**
- **Position**: Bottom-center, fixed
- **Style**: Slide-up animation, bg-black/80, rounded-full
- **Content**: "Submitting score..." or "Score submitted! TX: 0x..."
- **Duration**: 3s auto-dismiss on success, persistent on error
- **Dimensions**: max-w-md, px-6 py-3

**C. Game Controls (Preserve with Enhancement)**
- **Original**: Directional arrow SVG buttons, bottom-center
- **Enhancement**: Add subtle glassmorphism (backdrop-blur-sm, bg-white/70)
- **Grid**: 3×2 grid preserved, gap-2.5
- **Buttons**: 50×50px, white background, shadow-md

**D. Game Over Screen (Enhanced)**
- **Overlay**: Full viewport, bg-black/60, backdrop-blur-lg
- **Modal Card**: 
  - Center-positioned, max-w-md
  - Frosted glass (bg-white/90 or bg-gray-900/90 for dark)
  - Padding: p-12
- **Content Stack**:
  - "Game Over" title: text-4xl, Press Start 2P
  - Final score: text-6xl, accent color
  - "Submitting to blockchain..." status (if pending)
  - "Retry" button: Red (preserved), px-12 py-6, shadow-xl
  - "View on Explorer" link: text-sm, underline, blue (if tx successful)
- **Spacing**: gap-8 vertical stack

**E. Chain Network Indicator**
- **Position**: Adjacent to wallet address
- **Style**: Small badge, rounded-full, px-3 py-1
- **Color**: Purple gradient for Monad testnet (265 75% 45% to 280 70% 60%)
- **Text**: "Monad" in 0.6em

---

## Animations

**Preserve Original Game Animations**:
- Chicken hop movements (200ms step time)
- Vehicle scrolling (2-3 speed variants)
- Camera follow on chicken movement

**New Blockchain UI Animations** (Subtle):
- **Wallet Connect**: Scale 0.95→1 on hover (100ms)
- **Toast Slide**: translateY(100%) → 0 (300ms ease-out)
- **Transaction Pending**: Subtle pulse on status indicator (1s infinite)
- **Success Checkmark**: Scale pop 0→1.2→1 (400ms ease-out)

**Critical**: No animations during active gameplay to avoid distraction

---

## Accessibility

- **Keyboard Controls**: Preserve arrow key navigation
- **Focus States**: 2px solid blue ring on all interactive elements
- **Screen Readers**: aria-labels on wallet buttons ("Connect MetaMask Wallet")
- **Color Contrast**: All UI text meets WCAG AA (4.5:1 minimum)
- **Glassmorphism**: Ensure text remains readable over game scene (test on various backgrounds)

---

## Special Considerations

### Blockchain Integration UX
- **Non-Intrusive**: Wallet UI should not obstruct game view or controls
- **Progressive Enhancement**: Game playable without wallet connection, blockchain features optional
- **Error States**: Clear messaging for failed transactions (red accent, persistent toast)
- **Loading States**: Spinner + text during transaction submission (not blocking gameplay)

### Responsive Behavior
- **Desktop Primary**: Game optimized for landscape viewports
- **Mobile**: Stack controls vertically, reduce font sizes (0.7× scale), maintain playability
- **Tablet**: Landscape preferred, touch controls remain bottom-positioned

### Performance
- **No Layout Thrash**: Blockchain UI overlays use `position: fixed/absolute` to avoid reflows
- **Three.js Preservation**: Do not modify renderer, scene, or camera settings
- **Async Operations**: Wallet interactions non-blocking to game loop

---

## Images

**No images required** - This is a 3D rendered game using Three.js geometry. All visuals are procedurally generated (vehicles, trees, chicken, road textures).

**Icon Assets**: Use inline SVG for directional arrows (already provided in HTML). No external icon libraries needed.