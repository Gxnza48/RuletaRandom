import React, { useState, useEffect } from 'react'
import Wheel from './components/Wheel'
import ParticipantManager from './components/ParticipantManager'
import WinnerReveal from './components/WinnerReveal'
import { Trophy, Users, RotateCcw, Sun, Moon } from 'lucide-react'

function App() {
  const [participants, setParticipants] = useState([])
  const [winner, setWinner] = useState(null)
  const [isSpinning, setIsSpinning] = useState(false)
  const [plannedSequence, setPlannedSequence] = useState([])
  const [showSequenceUI, setShowSequenceUI] = useState(false)

  const handleSpinComplete = (winnerName) => {
    setWinner(winnerName)
    setIsSpinning(false)
  }

  const reset = () => {
    if (winner) {
      // Remove winner from participants
      setParticipants(prev => prev.filter(p => p.name !== winner))
      // Remove winner from sequence if it was next
      setPlannedSequence(prev => {
        if (prev[0] === winner) return prev.slice(1)
        return prev
      })
    }
    setWinner(null)
    setIsSpinning(false)
  }

  return (
    <div className="min-h-screen transition-colors duration-500 bg-black text-white">
      <div className="max-w-6xl mx-auto py-8 px-4 flex flex-col items-center">
        
        <header className="mb-12 text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight">
            <span className="text-gradient">Ruleta de Sorteo</span>
          </h1>
          <p className="text-slate-400 text-lg">
            Sorteos rápidos, justos y visualmente increíbles.
          </p>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full items-start">
          <section className="flex flex-col items-center space-y-8 order-2 lg:order-1">
            <ParticipantManager 
              participants={participants} 
              setParticipants={setParticipants} 
              disabled={isSpinning}
              isDark={true}
            />
          </section>

          <section className="flex flex-col items-center justify-center order-1 lg:order-2">
            <div className="relative">
              <Wheel 
                participants={participants} 
                onComplete={handleSpinComplete} 
                isSpinning={isSpinning}
                setIsSpinning={setIsSpinning}
                isDark={true}
                plannedSequence={plannedSequence}
              />
            </div>
          </section>
        </main>

        {winner && (
          <WinnerReveal winner={winner} onReset={reset} isDark={true} />
        )}
        
        <div className="mt-12 w-full max-w-md">
          <button 
            onClick={() => setShowSequenceUI(!showSequenceUI)}
            className="text-sm flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity mx-auto mb-4 text-white"
          >
            <Trophy size={16} />
            {showSequenceUI ? "Ocultar Planificador" : "Configurar Ganadores (Opcional)"}
          </button>

          {showSequenceUI && (
            <div className="p-8 rounded-[2.5rem] border animate-in slide-in-from-bottom-6 duration-700 bg-white/5 border-white/10 backdrop-blur-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-xl bg-green-500/20">
                  <Trophy className="text-green-500" size={20} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Secuencia de Ganadores</h3>
                  <p className="text-xs text-slate-400">Controla exactamente quién gana y en qué orden.</p>
                </div>
              </div>
              
              <div className="relative group/textarea">
                <textarea 
                  className="w-full h-40 p-5 rounded-2xl border focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all font-mono text-sm leading-relaxed resize-none bg-black/40 border-white/10 text-white placeholder:text-slate-700"
                  placeholder={"Escribe nombres en orden...\nEjemplo:\nJuan\nMaria\nPedro"}
                  value={plannedSequence.join('\n')}
                  onChange={(e) => setPlannedSequence(e.target.value.split('\n').filter(s => s.trim() !== ''))}
                />
                <div className="absolute top-4 right-4 flex flex-col items-end gap-1 opacity-100 transition-opacity pointer-events-none">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-green-500/50">Editor de Orden</span>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/5 bg-white/5">
                  <div className={`w-2 h-2 rounded-full ${plannedSequence.length > 0 ? 'bg-green-500 animate-pulse' : 'bg-slate-500'}`}></div>
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-300">
                    {plannedSequence.length > 0 ? `${plannedSequence.length} EN COLA` : 'MODO AZAR'}
                  </span>
                </div>
                
                {plannedSequence.length > 0 && (
                  <div className="text-xs italic text-slate-500">
                    Próximo: <span className="font-bold text-green-500">{plannedSequence[0]}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        
        <footer className="mt-20 text-slate-600 text-sm">
          &copy; 2026 Ruleta de Sorteo Premium. Todos los derechos reservados.
        </footer>
      </div>
    </div>
  )
}

export default App
