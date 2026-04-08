import React, { useEffect } from 'react'
import confetti from 'canvas-confetti'
import { Trophy, RotateCcw } from 'lucide-react'

const WinnerReveal = ({ winner, onReset }) => {
  useEffect(() => {
    const duration = 3 * 1000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

    const randomInRange = (min, max) => Math.random() * (max - min) + min

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        return clearInterval(interval)
      }

      const particleCount = 50 * (timeLeft / duration)
      
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      })
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      })
    }, 250)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-500">
      <div className="relative glass p-12 rounded-[3rem] text-center max-w-sm w-full border-indigo-500/30 overflow-hidden animate-in zoom-in-95 duration-500">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
        
        <div className="flex justify-center mb-6">
          <div className="bg-indigo-500/20 p-6 rounded-full animate-bounce">
            <Trophy className="text-indigo-400 w-16 h-16" />
          </div>
        </div>

        <h2 className="text-slate-400 text-lg font-medium mb-1">¡TENEMOS UN GANADOR!</h2>
        <div className="text-5xl font-black mb-10 tracking-tight text-white drop-shadow-glow">
          {winner}
        </div>

        <button
          onClick={onReset}
          className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all font-bold group"
        >
          <RotateCcw className="group-hover:rotate-[-45deg] transition-transform" />
          REINICIAR
        </button>
      </div>
      
      <style>{`
        .drop-shadow-glow {
          filter: drop-shadow(0 0 10px rgba(99, 102, 241, 0.5));
        }
      `}</style>
    </div>
  )
}

export default WinnerReveal
