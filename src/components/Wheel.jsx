import React, { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { RotateCw } from 'lucide-react'

const COLORS = [
  '#6366f1', '#ec4899', '#06b6d4', '#f59e0b', 
  '#10b981', '#a855f7', '#f43f5e', '#3b82f6'
]

const Wheel = ({ participants, onComplete, isSpinning, setIsSpinning }) => {
  const canvasRef = useRef(null)
  const wheelRef = useRef(null)
  const rotationRef = useRef(0)
  
  // Draw the wheel segments
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const size = 500
    const centerX = size / 2
    const centerY = size / 2
    const radius = size / 2 - 10

    ctx.clearRect(0, 0, size, size)

    if (participants.length === 0) {
      // Draw empty wheel
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)'
      ctx.lineWidth = 5
      ctx.stroke()
      ctx.fillStyle = 'rgba(255, 255, 255, 0.05)'
      ctx.fill()
      return
    }

    const angleStep = (Math.PI * 2) / participants.length

    participants.forEach((p, i) => {
      const startAngle = i * angleStep
      const endAngle = (i + 1) * angleStep

      // Draw segment
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.arc(centerX, centerY, radius, startAngle, endAngle)
      ctx.closePath()
      
      ctx.fillStyle = COLORS[i % COLORS.length]
      ctx.fill()
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)'
      ctx.lineWidth = 2
      ctx.stroke()

      // Draw text
      ctx.save()
      ctx.translate(centerX, centerY)
      ctx.rotate(startAngle + angleStep / 2)
      ctx.textAlign = 'right'
      ctx.fillStyle = 'white'
      ctx.font = 'bold 20px Outfit'
      ctx.fillText(p.name, radius - 40, 10)
      ctx.restore()
    })

    // Center deco
    ctx.beginPath()
    ctx.arc(centerX, centerY, 40, 0, Math.PI * 2)
    ctx.fillStyle = '#1e293b'
    ctx.fill()
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)'
    ctx.lineWidth = 4
    ctx.stroke()
  }, [participants])

  const spin = () => {
    if (participants.length < 2 || isSpinning) return

    setIsSpinning(true)
    
    const count = participants.length
    const winnerIndex = Math.floor(Math.random() * count)
    const angleStep = 360 / count
    
    // Calculate final rotation
    // We want the winner index to stop at the top (which is -90 degrees in canvas coords, or 3 o'clock is 0)
    // The arrow is usually at the top or right. Let's assume arrow is at the top (negative 90 deg)
    // Angle in degrees for winner segment center
    const segmentCenter = (winnerIndex * angleStep) + (angleStep / 2)
    const targetRotation = 360 * 5 + (360 - segmentCenter) + 270 // 5 full turns + target
    
    rotationRef.current += targetRotation

    gsap.to(wheelRef.current, {
      rotation: rotationRef.current,
      duration: 5,
      ease: 'power4.out',
      onComplete: () => {
        onComplete(participants[winnerIndex].name)
      }
    })
  }

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="relative group">
        {/* Glow effect */}
        <div className={`absolute -inset-4 rounded-full bg-indigo-500/20 blur-3xl transition-opacity duration-1000 ${isSpinning ? 'opacity-100 animate-pulse' : 'opacity-0'}`}></div>
        
        {/* Pointer */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 z-10">
          <div className="w-8 h-10 bg-white clip-path-triangle shadow-xl"></div>
          <div className="w-8 h-10 absolute inset-0 bg-indigo-400 opacity-50 blur-sm"></div>
        </div>

        <div ref={wheelRef} className="relative z-0 shadow-2xl rounded-full overflow-hidden border-8 border-slate-900/50">
          <canvas 
            ref={canvasRef} 
            width={500} 
            height={500} 
            className="w-[320px] h-[320px] md:w-[500px] md:h-[500px]"
          />
        </div>
      </div>

      <button
        onClick={spin}
        disabled={isSpinning || participants.length < 2}
        className="group relative flex items-center gap-3 px-12 py-5 rounded-2xl premium-gradient text-white font-bold text-xl shadow-lg hover:shadow-indigo-500/25 active:scale-95 transition-all disabled:opacity-50 disabled:grayscale disabled:scale-100 overflow-hidden"
      >
        <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-[-20deg]"></div>
        <RotateCw className={isSpinning ? 'animate-spin' : ''} />
        <span>¡GIRAR!</span>
      </button>
      
      {participants.length < 2 && !isSpinning && (
        <p className="text-slate-500 animate-pulse">Agrega al menos 2 participantes para girar</p>
      )}
    </div>
  )
}

export default Wheel
