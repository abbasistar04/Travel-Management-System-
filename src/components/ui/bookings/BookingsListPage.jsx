import { useState, useEffect } from 'react'
import { Button, Input, Select, TableRowActionButtons } from '..'
import calendarIcon from '../../../assets/calendar-icon.svg'
import crossIcon from '../../../assets/cross-icon.svg'
import saveIcon from '../../../assets/save-icon.svg'

const MOCK_BOOKINGS = [
  { bookingId: '01', customerName: 'Ali Imran', packageName: 'Dubai Tour', travelers: '2 Adults 1 Child', travelDate: 'Feb 09 2024', bookingStatus: 'Confirmed', paymentStatus: 'Paid', createdDate: 'Feb 09 2024' },
  { bookingId: '02', customerName: 'Ali Khan', packageName: 'Visa Service', travelers: '2 Adults 1 Child', travelDate: 'Feb 09 2024', bookingStatus: 'Pending', paymentStatus: 'Unpaid', createdDate: 'Feb 09 2024' },
  { bookingId: '03', customerName: 'M. Ahad', packageName: 'Visa Service', travelers: '2 Adults 1 Child', travelDate: 'Feb 09 2024', bookingStatus: 'Confirmed', paymentStatus: 'Paid', createdDate: 'Feb 09 2024' },
]

export function BookingsListPage() {
  const [showPanel, setShowPanel] = useState(false)
  const [panelSlidIn, setPanelSlidIn] = useState(false)
  const [editingRow, setEditingRow] = useState(null)
  const [formDate, setFormDate] = useState('')
  const [formType, setFormType] = useState('')
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
      setFormDate(row.travelDate)
      setFormType(row.packageName)
      setFormDescription(row.packageName)
      setFormAmount('')
      setFormRefNo(row.bookingId)
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
               <h3 className="text-lg font-bold text-zinc-900">{editingRow ? 'Edit Booking' : 'Create New Booking'}</h3>
               <div className="flex items-center gap-2">
                 <Button variant="ghost" size="sm" icon={() => <img src={crossIcon} className="w-4 h-4" />} onClick={closePanel} />
                 <Button variant="primary" size="sm" icon={() => <img src={saveIcon} className="w-4 h-4 invert" />} onClick={closePanel}>Save Booking</Button>
               </div>
            </div>
            <div className="flex-1 overflow-auto p-6 flex flex-col gap-5">
              <Input label="Date" type="date" value={formDate} onChange={e => setFormDate(e.target.value)} />
              <Input label="Type" placeholder="Payment / Service..." value={formType} onChange={e => setFormType(e.target.value)} />
              <Input label="Description" placeholder="Dubai tour..." value={formDescription} onChange={e => setFormDescription(e.target.value)} />
              <Input label="Amount" placeholder="1,000,000 PKR" value={formAmount} onChange={e => setFormAmount(e.target.value)} />
              <Input label="Ref No." placeholder="0122" value={formRefNo} onChange={e => setFormRefNo(e.target.value)} />
            </div>
          </div>
        </>
      )}

      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-7">
        <div>
          <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">Bookings Activity</h2>
          <p className="text-sm text-zinc-400">Track and manage all travel reservations</p>
        </div>
        <Button variant="primary" size="lg" onClick={() => openPanel()}>
           Create New Booking
        </Button>
      </div>

      {/* ── Filter Bar ── */}
      <div className="flex flex-wrap items-end gap-3 mb-6">
        <div className="filter-pill flex-1 min-w-0 basis-40 px-4 py-1">
          <Input label="PNR Code" defaultValue="#0923" className="border-0 shadow-none" inputClassName="!p-0 !border-0 !shadow-none !ring-0" />
        </div>
        <div className="filter-pill flex-1 min-w-0 basis-52 px-4 py-1">
          <Input label="Passenger Name" defaultValue="Mr. Ali" className="border-0 shadow-none" inputClassName="!p-0 !border-0 !shadow-none !ring-0" />
        </div>
        <div className="filter-pill min-w-[150px]">
          <Select label="Traveller Type" className="!mb-0" selectClassName="!border-0 !ring-0 !py-1"><option>All Types</option></Select>
        </div>
        <div className="filter-pill flex flex-col px-4 py-1 grow-0 min-w-[150px] cursor-pointer">
           <label className="text-xs font-semibold text-zinc-500 uppercase tracking-tight">Travel Date</label>
           <div className="flex items-center justify-between py-1.5 pt-0.5">
             <span className="text-sm font-medium text-zinc-800">12 Sep 2024</span>
             <img src={calendarIcon} alt="" className="w-4 h-4 opacity-40 shrink-0" />
           </div>
        </div>
      </div>

      {/* ── Table ── */}
      <div className="card overflow-hidden">
        <div className="px-5 py-4 border-b border-zinc-100 bg-[#fef2f2] flex items-center justify-between">
          <h3 className="font-bold text-zinc-900 uppercase text-xs tracking-widest">Active Bookings</h3>
          <span className="text-xs text-zinc-400 font-medium">Updated 2m ago</span>
        </div>
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                {['ID','Customer','Package','Travelers','Travel Date','Status','Payment','Actions'].map(h => <th key={h}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {MOCK_BOOKINGS.map((row) => (
                <tr key={row.bookingId}>
                  <td className="text-zinc-400 font-mono text-xs">{row.bookingId}</td>
                  <td className="font-bold text-zinc-900">{row.customerName}</td>
                  <td className="text-zinc-600 font-medium">{row.packageName}</td>
                  <td className="text-zinc-500 text-xs">{row.travelers}</td>
                  <td className="text-zinc-600 font-medium">{row.travelDate}</td>
                  <td>
                    <span className={`badge ${row.bookingStatus === 'Confirmed' ? 'badge-green' : 'badge-amber'}`}>
                      {row.bookingStatus}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${row.paymentStatus === 'Paid' ? 'badge-green' : 'badge-red'}`}>
                      {row.paymentStatus}
                    </span>
                  </td>
                  <td>
                    <TableRowActionButtons row={row} onEdit={() => openPanel(row)} onDelete={() => {}} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3 border-t border-zinc-100 flex items-center justify-between text-sm text-zinc-500">
           <span>Displaying <span className="font-semibold text-zinc-900">3</span> entries</span>
           <div className="flex items-center gap-1">
             <button className="pg-btn active">1</button>
             <button className="pg-btn">2</button>
           </div>
        </div>
      </div>
    </div>
  )
}
