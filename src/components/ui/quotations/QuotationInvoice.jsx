// No imports needed for logo currently

const BRAND_RED = '#c60000'

const defaultServiceRows = [
  { package: 'Return Tickets', description: 'Dubai Tour 21 Days and 20 Nights', person: '1', rate: '3,000.00', amount: '3,000.00' },
  { package: 'Includes Flights Hotel', description: 'Daily Breakfast City Tour Desert Safari', person: '1', rate: '1,500.00', amount: '1,500.00' },
  { package: 'Excludes', description: 'Personal expenses Insurance', person: '', rate: '', amount: '' },
]

export function QuotationInvoice({
  agencyName = 'Travel Agency',
  agencyWebsite = 'www.website.com',
  agencyEmail = 'hello@email.com',
  agencyPhone = '+91 00000 00000',
  businessAddress = 'City, State, IN - 000 000',
  taxId = 'Tax ID 00000000000',
  billedToName = 'Mr Imran',
  passengers = '2 Adult / 1 Child',
  contact = '+92 300 0000000',
  invoiceNumber = '#QT-24-001',
  reference = 'REF-782',
  invoiceDate = '01 Aug, 2024',
  total = 'OMR 4,950.00',
  dueDate = '15 Aug, 2024',
  serviceRows = defaultServiceRows,
  subtotal = 'OMR 4,500.00',
  taxLabel = 'OMR 450.00',
  totalLabel = 'OMR 4,950.00',
  terms = 'Please pay within 15 days. Subject to availability at time of booking.',
  className = '',
}) {
  return (
    <div className={`bg-white text-zinc-800 font-sans p-10 sm:p-16 shadow-2xl border border-zinc-100 rounded-[2.5rem] ${className} relative overflow-hidden`}>
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-zinc-50 rounded-full -mr-32 -mt-32 opacity-50" />
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start gap-8 pb-12 mb-12 border-b border-zinc-100 relative z-10">
        <div className="flex items-center gap-6 pl-8">
          <div>
            <h1 className="text-3xl font-black text-zinc-900 leading-tight tracking-tight uppercase">{agencyName}</h1>
            <div className="flex items-center gap-2 mt-2">
              <span className="w-8 h-0.5 bg-[#c60000] rounded-full" />
              <p className="text-xs font-bold text-[#c60000] uppercase tracking-[0.2em]">{agencyWebsite}</p>
            </div>
          </div>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-black text-zinc-300 uppercase tracking-widest mb-3">Office Location</p>
          <p className="text-sm font-bold text-zinc-800 leading-relaxed max-w-50 ml-auto">{businessAddress}</p>
          <div className="mt-4 flex flex-col gap-1">
            <p className="text-xs font-semibold text-zinc-500">{agencyEmail}</p>
            <p className="text-sm font-black text-zinc-900">{agencyPhone}</p>
          </div>
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16 relative z-10">
        <div className="space-y-6">
          <div>
            <p className="text-[10px] font-black text-zinc-300 uppercase tracking-widest mb-3">Billed To</p>
            <div className="p-5 bg-zinc-50/50 rounded-2xl border border-zinc-100/50 hover:bg-zinc-50 transition-colors">
              <p className="text-xl font-black text-zinc-900 leading-none">{billedToName}</p>
              <p className="text-sm font-semibold text-zinc-500 mt-2">{contact}</p>
            </div>
          </div>
          <div>
            <p className="text-[10px] font-black text-zinc-300 uppercase tracking-widest mb-1.5 ml-1">Travelers</p>
            <p className="text-sm font-bold text-zinc-700 ml-1">{passengers}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <div className="flex flex-col">
            <p className="text-[10px] font-black text-zinc-300 uppercase tracking-widest mb-2">Quotation Details</p>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-zinc-50">
                <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider text-[10px]">Number</span>
                <span className="text-sm font-black text-zinc-900 font-mono">{invoiceNumber}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-zinc-50">
                <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider text-[10px]">Reference</span>
                <span className="text-sm font-bold text-zinc-800">{reference}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-zinc-50">
                <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider text-[10px]">Issued on</span>
                <span className="text-sm font-bold text-zinc-800">{invoiceDate}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end justify-start">
          <div className="text-right p-6 bg-zinc-900 rounded-3xl text-white shadow-2xl shadow-zinc-900/20 w-full max-w-60">
            <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] mb-3">Estimated Total</p>
            <p className="text-3xl font-black tracking-tighter mb-4">{total}</p>
            <div className="pt-4 border-t border-white/10">
              <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-1">Valid Until</p>
              <p className="text-xs font-bold text-white/90">{dueDate}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Services Table */}
      <div className="mb-16 relative z-10">
        <label className="text-[10px] font-black text-zinc-300 uppercase tracking-widest mb-6 block">Service Distribution</label>
        <div className="overflow-hidden rounded-3xl border border-zinc-100">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-zinc-50/80 backdrop-blur-sm border-b border-zinc-100">
                <th className="py-5 pl-8 text-left text-[10px] font-black text-zinc-400 uppercase tracking-widest">Description</th>
                <th className="py-5 px-6 text-center text-[10px] font-black text-zinc-400 uppercase tracking-widest">Qty</th>
                <th className="py-5 px-6 text-right text-[10px] font-black text-zinc-400 uppercase tracking-widest">Rate</th>
                <th className="py-5 pr-8 text-right text-[10px] font-black text-zinc-400 uppercase tracking-widest">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-50">
              {serviceRows.map((row, i) => (
                <tr key={i} className="group hover:bg-zinc-50/50 transition-all duration-300">
                  <td className="py-8 pl-8">
                    <p className="font-black text-zinc-900 uppercase tracking-tight text-sm mb-1.5 group-hover:text-[#c60000] transition-colors">{row.package}</p>
                    <p className="text-xs font-medium text-zinc-400 leading-relaxed italic max-w-sm">{row.description}</p>
                  </td>
                  <td className="py-8 px-6 text-center">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-zinc-100 text-xs font-bold text-zinc-600">
                      {row.person || '—'}
                    </span>
                  </td>
                  <td className="py-8 px-6 text-right font-bold text-zinc-600 tabular-nums">{row.rate ? `OMR ${row.rate}` : '—'}</td>
                  <td className="py-8 pr-8 text-right font-black text-zinc-900 tabular-nums">{row.amount ? `OMR ${row.amount}` : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Section */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-12 pt-12 border-t border-zinc-100 relative z-10">
        <div className="max-w-md">
           <h3 className="text-[10px] font-black text-zinc-300 uppercase tracking-widest mb-4">Terms & Essential Info</h3>
           <div className="p-6 bg-zinc-50/30 rounded-2xl border border-zinc-100/50">
             <p className="text-xs font-medium text-zinc-500 leading-relaxed italic line-clamp-3 hover:line-clamp-none transition-all duration-500 cursor-pointer">{terms}</p>
           </div>
           <p className="text-[10px] font-black text-[#c60000] uppercase tracking-widest mt-8 opacity-40">Generated by Hurr Abbas's Agency Portal</p>
        </div>
        <div className="w-full md:w-80 flex flex-col gap-5 p-8 bg-zinc-50/50 rounded-4xl border border-zinc-100">
           <div className="flex justify-between items-center text-sm px-2">
             <span className="font-black text-zinc-300 uppercase tracking-widest text-[9px]">Subtotal (Excl Tax)</span>
             <span className="font-bold text-zinc-700">{subtotal}</span>
           </div>
           <div className="flex justify-between items-center text-sm px-2">
             <span className="font-black text-zinc-300 uppercase tracking-widest text-[9px]">Tax / VAT (10%)</span>
             <span className="font-bold text-red-700/60 ">{taxLabel}</span>
           </div>
           <div className="h-px bg-zinc-200/50 my-1" />
           <div className="flex justify-between items-center p-6 bg-[#c60000] rounded-2xl text-white shadow-2xl shadow-[#c60000]/20 transform hover:scale-[1.02] transition-transform duration-300">
             <span className="font-black uppercase tracking-[0.2em] text-[10px]">Total Amount</span>
             <span className="text-2xl font-black tabular-nums tracking-tighter">{totalLabel}</span>
           </div>
        </div>
      </div>
    </div>
  )
}
