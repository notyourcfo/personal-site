# Terminal Portfolio Website

A retro-style terminal portfolio website built with Next.js and TypeScript, featuring a nostalgic CRT monitor effect and interactive command-line interface.

## Features

- 🖥️ Retro Terminal Interface
  - Classic CRT monitor effect with scan lines
  - RGB text shadow animation
  - Pixelated retro font (VT323)
  - Dark/Light theme support

- 💻 Interactive Commands
  - `help` - List all available commands
  - `about` - Personal introduction
  - `projects` - View project showcase
  - `experience` - Professional background
  - `community` - Community involvement
  - `contact` - Contact information
  - `theme` - Toggle dark/light mode
  - `version` - Check last update

- 🔗 Quick Access Links
  - Direct commands for social media profiles
  - GitHub, Twitter, LinkedIn, Instagram, YouTube
  - Email contact

## Tech Stack

- Next.js 14.1.0
- TypeScript
- Tailwind CSS
- Framer Motion
- next-themes

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/notyourcfo/personal-site.git
   ```

2. Install dependencies:
   ```bash
   cd personal-site
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

This site is deployed on Vercel. Any push to the main branch will trigger an automatic deployment.

## Project Structure

```
src/
├── app/                 # Next.js app directory
├── components/         
│   ├── Terminal.tsx    # Main terminal component
│   └── CodeBackground.tsx # Animated code background
└── styles/
    └── globals.css     # Global styles and animations
```

## Last Update

- Version: 1.0.0
- Date: March 6, 2025
- Changes: Created site from scratch

## License

MIT License - feel free to use this code for your own portfolio!

## Author

Yusuf - [@notyourcfo](https://twitter.com/notyourcfo)
