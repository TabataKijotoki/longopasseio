# Café photos

The source app references 19 curated Unsplash photos by stable ID, one per café.

See `assets/cafe-photos.js` for the full mapping (id → url). Photos load remotely via the existing Unsplash CDN; if you need fully local imagery, download each and replace the manifest with relative paths.

The detail-sheet falls back to a `linear-gradient(135deg, border → bg)` swatch with a 48px ☕ glyph at 35% opacity if a photo fails to load.
