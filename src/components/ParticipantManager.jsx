import React, { useState } from 'react'
import { Plus, Trash2, Edit2, UserPlus, AlertCircle } from 'lucide-react'

const ParticipantManager = ({ participants, setParticipants, disabled }) => {
  const [inputValue, setInputValue] = useState('')
  const [editingId, setEditingId] = useState(null)

  const addParticipant = (e) => {
    e.preventDefault()
    if (!inputValue.trim() || participants.length >= 8) return

    if (editingId !== null) {
      setParticipants(participants.map(p => p.id === editingId ? { ...p, name: inputValue.trim() } : p))
      setEditingId(null)
    } else {
      setParticipants([...participants, { id: Date.now(), name: inputValue.trim() }])
    }
    setInputValue('')
  }

  const removeParticipant = (id) => {
    setParticipants(participants.filter(p => p.id !== id))
  }

  const startEdit = (p) => {
    setInputValue(p.name)
    setEditingId(p.id)
  }

  return (
    <div className="w-full max-w-md glass p-6 rounded-3xl animate-in fade-in slide-in-from-left duration-700">
      <div className="flex items-center gap-2 mb-6 text-xl font-bold font-heading">
        <UserPlus className="text-indigo-400" />
        <h2>Participantes <span className="text-sm font-normal text-slate-400">({participants.length}/8)</span></h2>
      </div>

      <form onSubmit={addParticipant} className="flex gap-2 mb-6">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Nombre del participante..."
          className="flex-1 bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all placeholder:text-slate-600"
          maxLength={20}
          disabled={disabled || (participants.length >= 8 && editingId === null)}
        />
        <button
          type="submit"
          disabled={disabled || (!inputValue.trim()) || (participants.length >= 8 && editingId === null)}
          className="premium-gradient p-3 rounded-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:grayscale disabled:hover:scale-100"
        >
          {editingId !== null ? <Edit2 size={24} /> : <Plus size={24} />}
        </button>
      </form>

      {participants.length === 0 && (
        <div className="flex flex-col items-center justify-center py-10 text-slate-500 border-2 border-dashed border-white/5 rounded-2xl">
          <AlertCircle size={32} className="mb-2 opacity-20" />
          <p>Agrega nombres para comenzar</p>
        </div>
      )}

      <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
        {participants.map((p) => (
          <div 
            key={p.id} 
            className="flex items-center justify-between bg-white/5 hover:bg-white/10 p-3 rounded-xl border border-white/5 transition-colors group"
          >
            <span className="font-medium truncate mr-2">{p.name}</span>
            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button 
                onClick={() => startEdit(p)}
                className="p-2 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-colors"
                disabled={disabled}
              >
                <Edit2 size={16} />
              </button>
              <button 
                onClick={() => removeParticipant(p.id)}
                className="p-2 hover:bg-red-500/20 rounded-lg text-slate-400 hover:text-red-400 transition-colors"
                disabled={disabled}
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ParticipantManager
