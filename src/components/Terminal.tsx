'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'

interface TerminalProps {
  initialMessage?: string
}

interface CommandHistory {
  command: string
  output: string
  isError?: boolean
  path?: string
}

export function Terminal({ initialMessage = `yo! 
this is yusuf! type 'help' to see available commands.` }: TerminalProps) {
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<CommandHistory[]>([])
  const [currentPath, setCurrentPath] = useState('~')
  const terminalRef = useRef<HTMLDivElement>(null)
  const { theme, setTheme } = useTheme()

  const socialLinks = {
    github: 'https://github.com/notyourcfo',
    instagram: 'https://www.instagram.com/notyourcfo/',
    twitter: 'https://x.com/notyourcfo',
    x: 'https://x.com/notyourcfo',
    linkedin: 'www.linkedin.com/in/notyourcfo',
    youtube: 'https://www.youtube.com/@notyourcfo',
    email: 'mailto:usef@techhustlr.space'
  }

  const commands = {
    help: () => `available commands:
  about - about me
  projects - check out my projects
  experience - my work experience
  community - community work
  contact - how to reach me
  clear - clear terminal
  help - show this message
  theme - toggle dark/light mode
  version - check last update`,
    
    about: () => `hey! 
im yusuf!
a student on a drop year, exploring and building things.
exactly on the 10th of April, i left all my work and followed the exact same cycle: build something, make ppl check out the stuff i made, make it better, and then repeat the same process.`,
    
    projects: () => `my projects:

1. techhustlr (april 2025 - present)
   - newsletter for cs students and tech employees
   - type 'techhustlr' to visit the website

2. scenefinder (april 2025 - present)
   - a tool to discover movies from short clips
   - like shazam, but for movies
   - type 'scenefinder' to visit the website`,
    
    experience: () => `my work experience:

1. pocket fund (march 2025 - april 2025)
   - founder office intern

2. educational content sales (november 2024 - december 2024)
   - sales representative
   - built community around educational content

3. one1inc (june 2024 - august 2024)
   - founder
   - created antiscrolling community

4. mumbai ice cream store (march 2024 - april 2024)
   - sales representative
   - started working at age 17`,

    community: () => `community work:

1. homieswholikesbizness (december 2024 - april 2025)
   - managed Discord community
   - hosted guest lectures, co-working sessions and a couple more fun events`,

    contact: () => `how to reach me:

type any of these commands to open the respective profile:
  - github
  - instagram
  - twitter (or x)
  - linkedin
  - youtube
  - email`,

    techhustlr: () => {
      window.open('https://www.techhustlr.space/', '_blank')
      return 'opening techhustlr website...'
    },
    
    scenefinder: () => {
      window.open('https://scenefinder.vercel.app/', '_blank')
      return 'opening scenefinder website...'
    },
    
    clear: () => {
      setHistory(prev => prev.filter(entry => !entry.command))
      return ''
    },
    
    theme: () => {
      setTheme(theme === 'dark' ? 'light' : 'dark')
      return `switched to ${theme === 'dark' ? 'light' : 'dark'} theme`
    },

    version: () => `terminal portfolio v1.0.0
last updated: march 6, 2025 19:29

changelog:
- created site from scratch`,

    ...Object.entries(socialLinks).reduce((acc, [platform, url]) => ({
      ...acc,
      [platform]: () => {
        window.open(url, '_blank')
        return `opening ${platform}...`
      }
    }), {})
  }

  const handleCommand = (cmd: string) => {
    const [command, ...args] = cmd.trim().split(' ')
    const cmdLower = command.toLowerCase()
    let output = (commands as any)[cmdLower]?.(args.join(' '))

    setHistory(prev => [...prev, {
      command: cmd,
      output: output ?? `invalid command: ${command}`,
      isError: !output,
      path: currentPath
    }])
  }

  const handleSubmit = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && input.trim()) {
      handleCommand(input)
      setInput('')
    }
  }

  useEffect(() => {
    if (initialMessage) {
      setHistory([
        { command: '', output: 'yo!' },
        { command: '', output: "this is yusuf! type 'help' to see available commands." }
      ])
    }
  }, [initialMessage])

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full h-full flex flex-col rounded-lg overflow-hidden shadow-lg border border-green-500/20"
    >
      {/* Terminal Header */}
      <div className="bg-gray-800/80 backdrop-blur-[2px] px-4 py-2 flex items-center">
        <div className="flex gap-2">
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500" />
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500" />
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500" />
        </div>
        <div className="flex-1 text-center text-xs sm:text-sm text-gray-400">terminal</div>
      </div>

      {/* Terminal Content */}
      <div
        className="flex-1 bg-black/60 dark:bg-black/80 backdrop-blur-[2px] text-green-400 p-2 sm:p-4 font-mono overflow-auto transition-colors duration-200 retro-terminal"
        ref={terminalRef}
      >
        <div className="space-y-2 text-sm sm:text-base whitespace-pre-wrap">
          {history.map((entry, i) => (
            <div key={i} className="space-y-1">
              {entry.command && (
                <div className="flex flex-wrap sm:flex-nowrap items-center">
                  <span className="text-blue-400 dark:text-blue-500">{entry.path}</span>
                  <span className="text-yellow-400 dark:text-yellow-500 ml-1 sm:ml-2">$</span>
                  <span className="ml-1 sm:ml-2 break-all">{entry.command}</span>
                </div>
              )}
              <div className={`whitespace-pre-wrap break-words ${entry.isError ? 'text-red-500 dark:text-red-400' : ''}`}>
                {entry.output}
              </div>
            </div>
          ))}
          <div className="flex flex-wrap sm:flex-nowrap items-center">
            <span className="text-blue-400 dark:text-blue-500">{currentPath}</span>
            <span className="text-yellow-400 dark:text-yellow-500 ml-1 sm:ml-2">$</span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleSubmit}
              className="ml-1 sm:ml-2 bg-transparent outline-none flex-1 min-w-[200px] text-green-400 dark:text-green-300"
              autoFocus
              onFocus={(e) => {
                const viewport = document.querySelector('meta[name=viewport]')
                if (viewport) {
                  viewport.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1')
                }
                e.currentTarget.focus()
              }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
} 