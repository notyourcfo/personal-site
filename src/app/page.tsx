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
          <div className="flex justify-center mt-8">
            <div className="bg-black rounded-lg p-2">
              <div className="badge-base LI-profile-badge" data-locale="en_US" data-size="large" data-theme="dark" data-type="HORIZONTAL" data-vanity="notyourcfo" data-version="v1"><a className="badge-base__link LI-simple-link" href="https://in.linkedin.com/in/notyourcfo?trk=profile-badge">Yusuf Shaikh</a></div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
