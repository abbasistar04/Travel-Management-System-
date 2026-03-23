import { useState, useEffect } from 'react'
import { Button, Input, Select } from '..'
import calendarIcon from '../../../assets/calendar-icon.svg'
import crossIcon from '../../../assets/cross-icon.svg'
import saveIcon from '../../../assets/save-icon.svg'

/**
 * Shared panel for Assets and Documents creation/editing.
 * Redesigned for premium look with red accents.
 */
export function AssetsCreateEditPanel({ isOpen, onClose, onSave, title = "Asset Configuration" }) {
  const [panelSlidIn, setPanelSlidIn] = useState(false)
  const [assetsName, setAssetsName] = useState('')
  const [purchaseDate, setPurchaseDate] = useState('')
  const [status, setStatus] = useState('')
  const [type, setType] = useState('')

  useEffect(() => {
    if (isOpen) {
      setPanelSlidIn(false)
      const t = requestAnimationFrame(() => requestAnimationFrame(() => setPanelSlidIn(true)))
      return () => cancelAnimationFrame(t)
    }
    setPanelSlidIn(false)
  }, [isOpen])

  if (!isOpen) return null

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm" onClick={onClose} aria-hidden />
      <div className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl bg-white shadow-2xl z-50 flex flex-col max-h-[90vh] overflow-hidden transition-all duration-300 ease-out ${panelSlidIn ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
         <div className="flex items-center justify-between p-5 border-b border-zinc-100 bg-[#fef2f2] shrink-0">
            <h3 className="text-lg font-bold text-zinc-900 uppercase tracking-tight">{title}</h3>
            <div className="flex items-center gap-2">
               <Button variant="ghost" size="sm" icon={() => <img src={crossIcon} className="w-4 h-4" />} onClick={onClose} />
               <Button variant="primary" size="sm" icon={() => <img src={saveIcon} className="w-4 h-4 invert" />} onClick={onSave || onClose}>Record Entry</Button>
            </div>
         </div>
         <div className="flex-1 overflow-auto p-6 flex flex-col gap-6">
            <div className="space-y-4">
               <h4 className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">General Information</h4>
               <Input label="Name / Description" value={assetsName} onChange={e => setAssetsName(e.target.value)} placeholder="Enter name..." />
               <div className="grid grid-cols-2 gap-4">
                  <Select label="Status" value={status} onChange={e => setStatus(e.target.value)}>
                     <option>Active / In Use</option>
                     <option>Pending</option>
                     <option>Maintenance</option>
                     <option>Archived</option>
                  </Select>
                  <Select label="Type / Category" value={type} onChange={e => setType(e.target.value)}>
                     <option>Passport</option>
                     <option>Visa Copy</option>
                     <option>Furniture</option>
                     <option>IT Equipment</option>
                  </Select>
               </div>
            </div>

            <div className="space-y-4">
               <h4 className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Date Metadata</h4>
               <div className="filter-pill flex flex-col px-4 py-1 grow-0 min-w-[150px] cursor-pointer">
                  <label className="text-xs font-semibold text-zinc-500 uppercase tracking-tight">Purchase / Upload Date</label>
                  <div className="flex items-center justify-between py-1.5 pt-0.5">
                     <input type="date" value={purchaseDate} onChange={e => setPurchaseDate(e.target.value)} className="text-sm font-medium text-zinc-800 bg-transparent border-0 p-0 focus:ring-0 w-full" />
                     <img src={calendarIcon} alt="" className="w-4 h-4 opacity-40 shrink-0" />
                  </div>
               </div>
            </div>

            <div className="mt-auto p-5 bg-zinc-50 rounded-2xl border border-zinc-100 italic text-xs text-zinc-400 leading-relaxed">
               All modifications are tracked in the system audit log for security purposes. Please ensure data accuracy before saving.
            </div>
         </div>
      </div>
    </>
  )
}
