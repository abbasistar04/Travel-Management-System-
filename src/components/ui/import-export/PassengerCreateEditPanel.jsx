import { useState, useEffect } from 'react'
import crossIcon from '../../../assets/cross-icon.svg'

const BRAND_RED = '#c60000'
const INPUT_BG = '#F3FAFF'
const INPUT_BORDER = '#CBE9FF'

const formFieldStyle = 'rounded-lg border flex flex-col max-h-[90vh] overflow-hidden min-w-0'
const formFieldBorder = { borderColor: INPUT_BORDER, backgroundColor: INPUT_BG }
const formLabelClass = 'text-xs font-medium text-slate-500 pt-3 pb-1 px-4 block'

export function PassengerCreateEditPanel({ isOpen, onClose, initialData }) {
  const [panelSlidIn, setPanelSlidIn] = useState(false)
  const [fileName, setFileName] = useState('Text')
  const [status, setStatus] = useState('Text')
  const [date, setDate] = useState('04/07/2023')
  const [uploadBy, setUploadBy] = useState('Admin,HR,Sale man')

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFileName(initialData.fileName ?? 'Text')
        setStatus(initialData.status ?? 'Text')
        setDate(initialData.date ?? '04/07/2023')
        setUploadBy(initialData.uploadBy ?? 'Admin,HR,Sale man')
      } else {
        setFileName('Text')
        setStatus('Text')
        setDate('04/07/2023')
        setUploadBy('Admin,HR,Sale man')
      }
      setPanelSlidIn(false)
      const t = requestAnimationFrame(() => requestAnimationFrame(() => setPanelSlidIn(true)))
      return () => cancelAnimationFrame(t)
    } else {
      setPanelSlidIn(false)
    }
  }, [isOpen, initialData])

  const handleSave = () => {
    onClose?.()
  }

  if (!isOpen) return null

  return (
    <>
      <div
        className="fixed inset-0 bg-black/40 z-40 transition-opacity duration-300"
        onClick={onClose}
        aria-hidden
      />
      <div
        className="fixed top-1/2 left-1/2 w-full max-w-2xl bg-white shadow-2xl z-50 flex flex-col max-h-[90vh] overflow-hidden transition-all duration-300 ease-out"
        style={{
          maxWidth: 'min(100%, 36rem)',
          opacity: panelSlidIn ? 1 : 0, transform: panelSlidIn ? 'translate(-50%, -50%) scale(1)' : 'translate(-50%, -50%) scale(0.95)'
        }}
      >
        <div className="p-4 border-b border-slate-200 shrink-0 bg-white">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold" style={{ color: BRAND_RED }}>
              Passenger Create/Edit
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded hover:bg-slate-100 transition"
              aria-label="Close"
            >
              <img src={crossIcon} alt="" className="w-5 h-5" aria-hidden />
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-auto p-6 bg-white">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className={formFieldStyle} style={formFieldBorder}>
              <label className={formLabelClass}>File name</label>
              <input
                type="text"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                className="w-full text-sm font-medium bg-transparent border-none py-2.5 px-4 focus:outline-none focus:ring-0"
                style={{ color: '#0f172a' }}
                placeholder="Text"
              />
            </div>
            <div className={formFieldStyle} style={formFieldBorder}>
              <label className={formLabelClass}>Status</label>
              <input
                type="text"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full text-sm font-medium bg-transparent border-none py-2.5 px-4 focus:outline-none focus:ring-0"
                style={{ color: '#0f172a' }}
                placeholder="Text"
              />
            </div>
            <div className={formFieldStyle} style={formFieldBorder}>
              <label className={formLabelClass}>Date</label>
              <input
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full text-sm font-medium bg-transparent border-none py-2.5 px-4 focus:outline-none focus:ring-0"
                style={{ color: '#0f172a' }}
              />
            </div>
            <div className={formFieldStyle} style={formFieldBorder}>
              <label className={formLabelClass}>Upload by</label>
              <input
                type="text"
                value={uploadBy}
                onChange={(e) => setUploadBy(e.target.value)}
                className="w-full text-sm font-medium bg-transparent border-none py-2.5 px-4 focus:outline-none focus:ring-0"
                style={{ color: '#0f172a' }}
              />
            </div>
          </div>
          <div className="flex justify-center">
            <button
              type="button"
              onClick={handleSave}
              className="inline-flex items-center justify-center font-semibold rounded-lg px-8 py-3 text-white hover:opacity-90 uppercase tracking-wide"
              style={{ backgroundColor: BRAND_RED }}
            >
              SAVE
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
