import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { QuotationInvoice } from './QuotationInvoice'
import { Button, Input, Select } from '..'

function ChevronRight({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  )
}

function CollapsibleSection({ title, defaultOpen = true, children }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border border-zinc-100 rounded-2xl overflow-hidden bg-white shadow-sm mb-4">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`w-full flex items-center justify-between px-5 py-3.5 transition-all ${open ? 'bg-[#c60000] text-white' : 'bg-white text-zinc-700 hover:bg-zinc-50'}`}
      >
        <span className="text-sm font-bold uppercase tracking-wider">{title}</span>
        <div className={`transition-transform duration-300 ${open ? 'rotate-90' : ''}`}>
          <ChevronRight className="w-5 h-5 ml-2" />
        </div>
      </button>
      {open && <div className="p-5 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">{children}</div>}
    </div>
  )
}

export function QuotationsPage() {
  const navigate = useNavigate()
  return (
    <div className="flex-1 flex flex-col min-h-screen bg-[#f8f9fb] overflow-hidden page-enter">
      <div className="flex-1 grid grid-cols-1 xl:grid-cols-12 gap-8 p-6 lg:p-10 max-w-480 mx-auto w-full">
        
        {/* Left: Invoice Preview Card (8 columns) */}
        <div className="xl:col-span-8 flex flex-col min-h-0">
          <div className="flex items-center justify-between mb-6 px-2">
            <div>
              <h2 className="text-2xl font-black text-zinc-900 tracking-tight">Invoice Preview</h2>
              <p className="text-sm font-medium text-zinc-400">Live document visualization</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" size="md" className="bg-white border-zinc-200">Print Preview</Button>
              <Button variant="primary" size="md" className="shadow-lg shadow-[#c60000]/20">Download PDF</Button>
            </div>
          </div>

          <div className="flex-1 bg-white rounded-[2.5rem] shadow-2xl shadow-black/3 border border-zinc-100 overflow-hidden flex flex-col relative">
            <div className="absolute top-0 right-0 p-4 z-20">
               <span className="px-3 py-1 bg-green-50 text-[10px] font-black text-green-600 uppercase tracking-widest rounded-full border border-green-100">Live Sync Active</span>
            </div>
            
            <div className="flex-1 overflow-y-auto p-12 scroll-smooth custom-scrollbar">
              <div className="max-w-200 mx-auto scale-[0.9] lg:scale-100 origin-top transition-transform duration-500">
                <QuotationInvoice className="shadow-none! border-none! p-0!" />
              </div>
            </div>

            {/* Pagination/Status bar inside preview */}
            <div className="px-10 py-5 bg-zinc-50/50 border-t border-zinc-100 flex items-center justify-between">
              <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Page 1 of 1</p>
              <div className="flex gap-1.5">
                {[1, 2].map(p => <div key={p} className={`w-1.5 h-1.5 rounded-full ${p === 1 ? 'bg-[#c60000]' : 'bg-zinc-200'}`} />)}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Interaction Form (4 columns) */}
        <div className="xl:col-span-4 flex flex-col min-h-0">
          <div className="mb-6 px-2">
             <h2 className="text-2xl font-black text-zinc-900 tracking-tight">Configuration</h2>
             <p className="text-sm font-medium text-zinc-400">Adjust travel parameters</p>
          </div>

          <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-4">
            <div className="bg-white rounded-3xl p-6 border border-zinc-100 shadow-sm">
              <CollapsibleSection title="Agency & Branding" defaultOpen={true}>
                <div className="space-y-4 pt-2">
                  <Select label="Registered Agency"><option>Travel Xpress Worldwide</option></Select>
                  <Input label="Display Name" defaultValue="TravelXpress" />
                </div>
              </CollapsibleSection>

              <CollapsibleSection title="Client Details" defaultOpen={false}>
                <div className="space-y-4 pt-2">
                  <Input label="Passenger Name" defaultValue="Mr Imran" />
                  <Input label="Group Size" defaultValue="2 Adult 1 Children" />
                  <Input label="Primary Contact" defaultValue="+92 300 0000000" />
                </div>
              </CollapsibleSection>

              <CollapsibleSection title="Contact & Ops" defaultOpen={false}>
                <div className="space-y-4 pt-2">
                  <Input label="Phone" defaultValue="+92-300-1234567" />
                  <Input label="Email" defaultValue="info@travelagency.com" />
                </div>
              </CollapsibleSection>

              <CollapsibleSection title="Assigned Agent" defaultOpen={false}>
                <div className="space-y-4 pt-2">
                  <Select label="Agent Select"><option>M. Raza (Head Office)</option></Select>
                  <Input label="Agent Alias" defaultValue="M. Raza" />
                </div>
              </CollapsibleSection>

              <CollapsibleSection title="Financial / Bank" defaultOpen={false}>
                <div className="space-y-4 pt-2">
                  <Input label="Bank Institution" placeholder="e.g. Standard Chartered" />
                  <Input label="Branch Code" placeholder="Enter branch detail" />
                </div>
              </CollapsibleSection>

              <CollapsibleSection title="Services & Itinerary" defaultOpen={true}>
                <div className="space-y-4 pt-2">
                  <Input label="Package 01" defaultValue="Dubai tour 21 days 20 nights" />
                  <Input label="Package 02" defaultValue="Daily breakfast city tour desert safari" />
                </div>
              </CollapsibleSection>
            </div>
          </div>

          {/* Action Footer */}
          <div className="mt-8 grid grid-cols-1 gap-3">
            <Button variant="primary" size="lg" className="w-full shadow-xl shadow-[#c60000]/20 font-black uppercase tracking-widest text-xs h-14">
              Finalize Quotation
            </Button>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="secondary" size="md" className="font-bold">Save Draft</Button>
              <Button variant="outline" size="md" onClick={() => navigate('/dashboard/services')} className="font-bold border-zinc-200">Services</Button>
            </div>
            <Button variant="ghost" size="sm" className="w-full text-zinc-400 hover:text-red-600" onClick={() => navigate(-1)}>
              Discard Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
