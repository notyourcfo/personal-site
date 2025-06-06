import { Terminal } from '@/components/Terminal'
import { CodeBackground } from '@/components/CodeBackground'

export default function Home() {
  return (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      <main className="min-h-screen bg-terminal-bg relative overflow-hidden">
        <div className="fixed inset-0 bg-terminal-bg/95" />
        <CodeBackground />
        <div className="container mx-auto max-w-4xl h-[100vh] sm:h-[80vh] relative z-10 p-2 sm:p-4">
          <Terminal initialMessage="yo! this is yusuf! type 'help' to see available commands." />
        </div>
      </main>
    </>
  )
}
