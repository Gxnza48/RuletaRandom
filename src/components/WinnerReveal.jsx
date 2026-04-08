import React, { useEffect } from 'react'
import confetti from 'canvas-confetti'
import { Trophy, RotateCcw } from 'lucide-react'

const WinnerReveal = ({ winner, onReset, isDark }) => {
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
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#22c55e', '#4ade80', '#16a34a']
      })
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#22c55e', '#4ade80', '#16a34a']
      })
    }, 250)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-500 ${isDark ? 'bg-black/80' : 'bg-slate-900/40'}`}>
      <div className={`relative glass p-12 rounded-[3rem] text-center max-w-sm w-full border-green-500/30 overflow-hidden animate-in zoom-in-95 duration-500 ${isDark ? 'dark' : 'light'}`}>
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-500 via-emerald-500 to-lime-500"></div>
        
        <div className="flex justify-center mb-6">
          <div className="bg-green-500/20 p-6 rounded-full animate-bounce">
            <Trophy className="text-green-500 w-16 h-16" />
          </div>
        </div>

        <h2 className={`${isDark ? 'text-slate-400' : 'text-slate-500'} text-lg font-medium mb-1`}>¡TENEMOS UN GANADOR!</h2>
        <div className={`text-5xl font-black mb-10 tracking-tight drop-shadow-glow ${isDark ? 'text-white' : 'text-slate-900'}`}>
          {winner}
        </div>

        <button
          onClick={onReset}
          className={`flex items-center justify-center gap-2 w-full py-4 rounded-2xl border transition-all font-bold group ${isDark ? 'bg-white/5 hover:bg-white/10 border-white/10 text-white' : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'}`}
        >
          <RotateCcw className="group-hover:rotate-[-45deg] transition-transform" />
          REINICIAR
        </button>
      </div>
      
      <style>{`
        .drop-shadow-glow {
          filter: drop-shadow(0 0 10px rgba(34, 197, 94, 0.5));
        }
      `}</style>
    </div>
  )
}

export default WinnerReveal
