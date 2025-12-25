# AR Horizon - Christmas AR Experience

A React-based Augmented Reality Christmas experience using MindAR and A-Frame.

## Features

- 🎄 Christmas-themed AR experience
- 📱 Mobile-friendly camera access
- 🎯 Image target tracking
- 🎬 Video playback on target detection
- 🔧 Built with Vite for fast development

## Tech Stack

- **Frontend**: React 19 + Vite
- **AR**: MindAR (CDN) + A-Frame (CDN)
- **Deployment**: Vercel
- **Styling**: CSS

## Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173` to test the AR experience.

## Testing Camera Access

Visit `http://localhost:5173/camera-test.html` to test basic camera functionality.

## Deployment

This project is configured for Vercel deployment:

1. **No native dependencies** - Uses CDN for AR libraries to avoid build issues
2. **SPA routing** - Configured in `vercel.json`
3. **Optimized build** - Small bundle size (~195KB)

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

## AR Setup

- **Target Image**: `public/targets.mind` (generated from marker image)
- **Video Content**: `public/video.mp4` (plays when target is detected)
- **Libraries**: Loaded via CDN for better compatibility

## Browser Requirements

- Modern browser with camera support
- HTTPS required for camera access (automatic on Vercel)
- Mobile-friendly for best AR experience

## Troubleshooting

### Camera Not Working
1. Allow camera permissions when prompted
2. Test basic camera at `/camera-test.html`
3. Check browser console for errors
4. Ensure good lighting for AR tracking

### Build Issues
- No native dependencies required
- Uses CDN for AR libraries
- Compatible with Node.js 18+

---

Hello my name is divyanbshu
