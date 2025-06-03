'use client'

import { useEffect, useRef } from 'react'

const CODE_SNIPPETS = [
  'const handleCommand = (cmd) => {',
  'function Terminal({ initialMessage }) {',
  'cd projects',
  'npm install next-themes',
  'git commit -m "feat: add new features"',
  'const [currentPath, setCurrentPath] = useState("~")',
  'python manage.py runserver',
  'docker-compose up -d',
  'async function fetchData() {',
  'const theme = useTheme()',
  'export default function App() {',
  'console.log("Hello, World!")',
  'npm run dev',
  'git push origin main',
  'const router = useRouter()',
  '<div className="container">',
  'type Props = {',
  'interface CommandHistory {',
  'yo! this is yusuf!',
  'const projects = ["techhustlr", "scenefinder"]',
  'function handleSubmit(e: React.KeyboardEvent) {',
  'setHistory(prev => [...prev, { command: cmd }])',
]

export function CodeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Configuration
    const fontSize = 16
    ctx.font = `${fontSize}px "Courier New", monospace`
    const lineHeight = fontSize * 1.5
    const columns = Math.floor(canvas.width / (fontSize * 0.6))
    const rows = Math.floor(canvas.height / lineHeight)

    // Initialize code matrix with more lines
    const codeMatrix = Array(rows * 2).fill(null).map(() => ({
      text: CODE_SNIPPETS[Math.floor(Math.random() * CODE_SNIPPETS.length)],
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      speed: 0.3 + Math.random() * 0.4,
      opacity: 0.05 + Math.random() * 0.05
    }))

    // Animation
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      codeMatrix.forEach((line, i) => {
        ctx.fillStyle = `rgba(40, 255, 40, ${line.opacity})`
        ctx.fillText(line.text, line.x, line.y)

        line.y += line.speed
        if (line.y > canvas.height) {
          line.y = -lineHeight
          line.x = Math.random() * canvas.width
          line.text = CODE_SNIPPETS[Math.floor(Math.random() * CODE_SNIPPETS.length)]
        }
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-80"
      style={{ zIndex: -1 }}
    />
  )
} 