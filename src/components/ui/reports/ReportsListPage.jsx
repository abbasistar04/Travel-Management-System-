import { useState, useEffect } from 'react'
import { Button, Input, Select, TableRowActionButtons } from '..'
import calendarIcon from '../../../assets/calendar-icon.svg'
import crossIcon from '../../../assets/cross-icon.svg'
import saveIcon from '../../../assets/save-icon.svg'

const MOCK_REPORTS = [
  { no: 1, date: 'Feb 09 2024', type: 'Payment', description: 'Booking Dubai Tour', customer: 'Ahmad Raza', amount: '150,000 PKR', status: 'Received', refNo: 'INV-1021' },
  { no: 2, date: 'Feb 09 2024', type: 'Expense', description: 'Booking Dubai Tour', customer: 'Ahmad Raza', amount: '150,000 PKR', status: 'Received', refNo: 'INV-1021' },
  { no: 3, date: 'Feb 09 2024', type: 'Commision', description: 'Booking Dubai Tour', customer: 'Ahmad Raza', amount: '150,000 PKR', status: 'Received', refNo: 'INV-1021' },
  { no: 4, date: 'Feb 09 2024', type: 'Refund', description: 'Booking Dubai Tour', customer: 'Ahmad Raza', amount: '150,000 PKR', status: 'Received', refNo: 'INV-1021' },
]

export function ReportsListPage() {
  const [showPanel, setShowPanel] = useState(false)
  const [panelSlidIn, setPanelSlidIn] = useState(false)
  const [editingRow, setEditingRow] = useState(null)
  const [formDate, setFormDate] = useState('')
  const [formType, setFormType] = useState('Payment')
  const [formDescription, setFormDescription] = useState('')
  const [formAmount, setFormAmount] = useState('')
  const [formRefNo, setFormRefNo] = useState('')

  useEffect(() => {
    if (showPanel) {
      setPanelSlidIn(false)
      const t = requestAnimationFrame(() => requestAnimationFrame(() => setPanelSlidIn(true)))
      return () => cancelAnimationFrame(t)
    } else {
      setPanelSlidIn(false)
    }
  }, [showPanel])

  const openPanel = (row = null) => {
    if (row) {
      setEditingRow(row)
      setFormDate(row.date)
      setFormType(row.type)
      setFormDescription(row.description)
      setFormAmount(row.amount)
      setFormRefNo(row.refNo)
    } else {
      setEditingRow(null)
      setFormDate('2023-08-03')
      setFormType('Payment')
      setFormDescription('Dubai tour')
      setFormAmount('1,000,000 PKR')
      setFormRefNo('0122')
    }
    setShowPanel(true)
  }

  const closePanel = () => {
    setShowPanel(false)
    setEditingRow(null)
  }

  return (
    <div className="flex-1 overflow-auto p-5 sm:p-7 bg-[#f4f5f7] relative page-enter">
      {/* ── Slide Panel ── */}
      {showPanel && (
        <>
          <div className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm" onClick={closePanel} aria-hidden />
          <div className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl bg-white shadow-2xl z-50 flex flex-col max-h-[90vh] overflow-hidden transition-all duration-300 ease-out ${panelSlidIn ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
             <div className="flex items-center justify-between p-5 border-b border-zinc-100 bg-[#fef2f2] shrink-0">
                <h3 className="text-lg font-bold text-zinc-900">{editingRow ? 'Edit Report' : 'Generate New Report'}</h3>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" icon={() => <img src={crossIcon} className="w-4 h-4" />} onClick={closePanel} />
                  <Button variant="primary" size="sm" icon={() => <img src={saveIcon} className="w-4 h-4 invert" />} onClick={closePanel}>Compile Report</Button>
                </div>
             </div>
             <div className="flex-1 overflow-auto p-6 flex flex-col gap-5">
                <Input label="Date" type="date" value={formDate} onChange={e => setFormDate(e.target.value)} />
                <Select label="Report Type" value={formType} onChange={e => setFormType(e.target.value)}>
                   <option>Payment</option>
                   <option>Expense</option>
                   <option>Commission</option>
                   <option>Refund</option>
                </Select>
                <Input label="Description" placeholder="Activity details..." value={formDescription} onChange={e => setFormDescription(e.target.value)} />
                <Input label="Amount (PKR)" placeholder="1,000,000" value={formAmount} onChange={e => setFormAmount(e.target.value)} />
                <Input label="Reference" placeholder="Ref id..." value={formRefNo} onChange={e => setFormRefNo(e.target.value)} />
             </div>
          </div>
        </>
      )}

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-7">
        <div>
          <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">Business Reports</h2>
          <p className="text-sm text-zinc-400">Detailed logs of all financial and operational activities</p>
        </div>
        <Button variant="primary" size="lg" onClick={() => openPanel()}>Generate Report</Button>
      </div>

      {/* ── Filter Bar ── */}
      <div className="flex flex-wrap items-end gap-3 mb-6">
        <div className="filter-pill flex-1 min-w-0 basis-40 px-4 py-1">
          <Input label="PNR Code" defaultValue="#0923" className="border-0 shadow-none" inputClassName="!p-0 !border-0 !shadow-none !ring-0" />
        </div>
        <div className="filter-pill flex-1 min-w-0 basis-52 px-4 py-1">
          <Input label="Passenger" defaultValue="Mr. Ali" className="border-0 shadow-none" inputClassName="!p-0 !border-0 !shadow-none !ring-0" />
        </div>
        <div className="filter-pill min-w-[150px]">
          <Select label="Type" className="!mb-0" selectClassName="!border-0 !ring-0 !py-1"><option>All Categories</option></Select>
        </div>
        <div className="filter-pill flex flex-col px-4 py-1 grow-0 min-w-[150px] cursor-pointer">
           <label className="text-xs font-semibold text-zinc-500 uppercase tracking-tight">Report Date</label>
           <div className="flex items-center justify-between py-1.5 pt-0.5">
             <span className="text-sm font-medium text-zinc-800">12 Sep 2024</span>
             <img src={calendarIcon} alt="" className="w-4 h-4 opacity-40 shrink-0" />
           </div>
        </div>
      </div>

      {/* ── Table ── */}
      <div className="card overflow-hidden">
        <div className="px-5 py-4 border-b border-zinc-100 bg-[#fef2f2] flex items-center justify-between">
          <h3 className="font-bold text-zinc-900 uppercase text-xs tracking-widest">Active Reports</h3>
          <div className="flex gap-1">
             <div className="w-2 h-2 rounded-full bg-[#c60000] animate-pulse" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                {['Date','Type','Description','Client/Vendor','Amount','Status','Ref','Actions'].map(h => <th key={h}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {MOCK_REPORTS.map((row, i) => (
                <tr key={i}>
                  <td className="text-zinc-600 font-medium text-xs whitespace-nowrap">{row.date}</td>
                  <td className="font-bold text-zinc-900 uppercase text-[10px] tracking-wider">{row.type}</td>
                  <td className="text-zinc-500 text-xs max-w-xs truncate">{row.description}</td>
                  <td className="text-zinc-900 font-bold">{row.customer}</td>
                  <td className="font-black text-zinc-900">{row.amount}</td>
                  <td>
                    <span className="badge badge-green">{row.status}</span>
                  </td>
                  <td className="font-mono text-xs text-zinc-400">{row.refNo}</td>
                  <td>
                    <TableRowActionButtons row={row} onEdit={() => openPanel(row)} onDelete={() => {}} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
