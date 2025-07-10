'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'

const SPINNER_FRAMES = ['/', '—', '\\', '|']

interface TerminalProps {
  initialMessage?: string
}

interface CommandHistory {
  command: string
  output: string
  isError?: boolean
  path?: string
  isLoading?: boolean
}

type CommandFunction = (args?: string) => string;

interface Commands {
  [key: string]: CommandFunction;
}

export function Terminal({ initialMessage = `yo! 
this is yusuf! type 'help' to see available commands.` }: TerminalProps) {
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<CommandHistory[]>([])
  const [currentPath] = useState('~')
  const [spinnerFrame, setSpinnerFrame] = useState(0)
  const terminalRef = useRef<HTMLDivElement>(null)
  const { theme: _ } = useTheme() // Unused theme variables removed

  const socialLinks = {
    github: 'https://github.com/notyourcfo',
    instagram: 'https://www.instagram.com/notyourcfo/',
    twitter: 'https://x.com/notyourcfo',
    x: 'https://x.com/notyourcfo',
    linkedin: 'https://www.linkedin.com/in/notyourcfo',
    youtube: 'https://www.youtube.com/@notyourcfo',
    email: 'mailto:contact@usef.world'
  }

  const commands: Commands = {
    help: () => `available commands:
  about - about me
  projects - check out my projects
  experience - work experience
  community - community work
  contact - how to reach me
  clear - clear terminal
  help - show this message
  version - check last update`,
    
    about: () => `hey! 
im yusuf!
a student on a drop year, exploring and building things.
exactly on the 10th of April, i left all my work and followed the exact same cycle: build something, make ppl check out the stuff i made, make it better, and then repeat the same process.`,
    
    projects: () => `my projects:

1. techhustlr (april 2024 - july 2024)
   - Newsletter forb cs major and junior dev looking for opportunities.
     - type 'techhustlr' to visit the website`,

2. scenefinder (april 2024 - present)
   - a tool to discover movies from short clips
   - kinda likeshazam, but for movies
   - type 'scenefinder' to visit the website`,
    
    experience: () => `my work experience:

1. pocket fund (march 2024 - april 2024)
   - founder office intern

2. educational content sales (november 2024 - december 2024)
   - sales representative
   - built community around educational content

3. one1inc (june 2024 - august 2024)
   - founder
   - created antiscrolling community

4. old mumbai ice cream store (march 2024 - april 2024)
   - sales representative
   - started working at age 16`,

    community: () => `community work:

1. homieswholikesbizness (december 2024 - april 2024)
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

    scenefinder: () => {
      window.open('https://scenefinder.vercel.app/', '_blank')
      return 'opening scenefinder website...'
    },
     techhustlr: () => {
      window.open('https://techhsutlr.substack.com', '_blank')
      return 'opening Substack website...'
    },
    clear: () => {
      setHistory([
        { command: '', output: 'yo!' },
        { command: '', output: "this is yusuf! type 'help' to see available commands." }
      ])
      return ''
    },
    
    version: () => `terminal portfolio v1.0.0
last updated: march 6, 2024 19:29

changelog:
- created site from scratch`,

    ...Object.entries(socialLinks).reduce<Commands>((acc, [platform, url]) => ({
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
    const commandFn = commands[cmdLower]
    
    // First add the command to history with loading state
    setHistory(prev => [...prev, {
      command: cmd,
      output: '',
      isLoading: true,
      path: currentPath
    }])

    // Add delay before showing output
    setTimeout(() => {
      const output = commandFn ? commandFn(args.join(' ')) : `invalid command: ${command}`
      
      setHistory(prev => {
        const newHistory = [...prev]
        const lastIndex = newHistory.length - 1
        newHistory[lastIndex] = {
          command: cmd,
          output,
          isError: !commandFn,
          path: currentPath,
          isLoading: false
        }
        return newHistory
      })
    }, 400) // 400ms delay
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

  useEffect(() => {
    let frameId: NodeJS.Timeout
    const animate = () => {
      setSpinnerFrame(prev => (prev + 1) % SPINNER_FRAMES.length)
    }
    frameId = setInterval(animate, 40) // Update every 40ms for faster spinning
    return () => clearInterval(frameId)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full h-full flex flex-col rounded-lg overflow-hidden shadow-lg border border-green-400/20"
    >
      {/* Terminal Header */}
      <div className="bg-gray-900 px-4 py-2 flex items-center">
        <div className="flex gap-2">
          <div className="w-2.4 h-2.4 sm:w-3 sm:h-3 rounded-full bg-red-400" />
          <div className="w-2.4 h-2.4 sm:w-3 sm:h-3 rounded-full bg-yellow-400" />
          <div className="w-2.4 h-2.4 sm:w-3 sm:h-3 rounded-full bg-green-400" />
        </div>
        <div className="flex-1 text-center text-xs sm:text-sm text-gray-400">terminal</div>
      </div>

      {/* Terminal Content */}
      <div
        className="flex-1 bg-terminal-bg text-terminal-text p-2 sm:p-4 font-mono overflow-auto retro-terminal"
        ref={terminalRef}
      >
        <div className="space-y-2 text-sm sm:text-base whitespace-pre-wrap">
          {history.map((entry, index) => (
            <div key={index} className="space-y-1">
              {entry.command && (
                <div className="flex flex-wrap sm:flex-nowrap items-center">
                  <span className="text-blue-400">{entry.path}</span>
                  <span className="text-yellow-400 ml-1 sm:ml-2">$</span>
                  <span className="ml-1 sm:ml-2 break-all">{entry.command}</span>
                </div>
              )}
              <div className={`whitespace-pre-wrap break-words ${entry.isError ? 'text-red-400' : ''}`}>
                {entry.isLoading ? (
                  <span className="text-yellow-400 inline-block">
                    <span className="inline-block w-4">{SPINNER_FRAMES[spinnerFrame]}</span>
                  </span>
                ) : (
                  entry.output
                )}
              </div>
            </div>
          ))}
          <div className="flex flex-wrap sm:flex-nowrap items-center">
            <span className="text-blue-400">{currentPath}</span>
            <span className="text-yellow-400 ml-1 sm:ml-2">$</span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleSubmit}
              className="flex-1 ml-1 sm:ml-2 bg-transparent outline-none"
              autoFocus
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
} 
