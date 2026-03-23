import Logo1 from '../../assets/Logo1.svg'

const BRAND_RED = '#c60000'

const defaultAgency = {
  name: 'Travel Agency',
  website: 'www.website.com',
  email: 'hello@email.com',
  phone: '+91 00000 00000',
}

const defaultBusinessAddress = {
  label: 'Business address',
  line1: 'City, State, IN - 000 000',
  taxId: 'TAX ID 00XXXXX1234X0XX',
}

const defaultInvoiceMeta = {
  invoiceNumber: '#AB2324-01',
  reference: 'INV-057',
  quotationDate: '01 Aug, 2023',
  dueDate: '15 Aug, 2023',
  currency: 'OMR',
  total: '4,950.00',
}

const defaultBilledTo = {
  companyName: 'Company Name',
  address: 'Company address',
  cityCountry: 'City, Country - 00000',
  phone: '+0 (000) 123-4567',
  travelers: '2 Adult/ 1 child',
  contact: '+92......',
}

const defaultServiceRows = [
  { package: 'Return Tickets', description: 'Dubai Tour 21 Days and 20 Nights', person: '1', rate: '3,000.00', amount: '3,000.00' },
  { package: 'Includes Flights Hotel', description: 'Dailvy Breakfast City Tour Desert Safari', person: '1', rate: '1,500.00', amount: '1,500.00' },
  { package: 'Excludes', description: 'Personal expenses Insurance', person: '', rate: '', amount: '' },
]

const defaultSummary = {
  subtotal: '4,500.00',
  taxLabel: 'Tax (10%)',
  taxAmount: '450.00',
  total: '4,950.00',
}

const defaultPaymentDetail = {
  bankTitle: 'Bank Title: Insurance Bank',
  accountTitle: 'Account Title: Sky Fly Travel',
  iban: 'IBAN: PQ/QERFOPD',
  notes: [
    'Visa processing may take b-7 working days.',
    'cancellation before 7 days: 30% deduction',
    'price may very based on exchange rate changes.',
  ],
  thanks: 'Thanks for the business.',
}

const defaultTerms = 'Please pay within 15 days of receiving this invoice.'
export function Invoice({
  agency = defaultAgency,
  businessAddress = defaultBusinessAddress,
  invoiceMeta = defaultInvoiceMeta,
  billedTo = defaultBilledTo,
  serviceRows = defaultServiceRows,
  summary = defaultSummary,
  paymentDetail = defaultPaymentDetail,
  terms = defaultTerms,
  className = '',
}) {
  const currency = invoiceMeta.currency ?? 'OMR'

  return (
    <div className={`max-w-4xl mx-auto font-sans text-slate-800 ${className}`}>
      {/* Header – light grey background */}
      <div className="bg-slate-100 px-8 py-6 rounded-t-lg">
        <div className="flex flex-wrap justify-between items-start gap-6">
          <div className="flex items-start gap-4">
            <div
              className="w-[100px] h-[100px] rounded-full flex items-center justify-center shrink-0 bg-white p-1"
              aria-hidden
            >
              <img src={Logo1} alt="" className="w-full h-full object-contain" aria-hidden />
            </div>
            <div>
              <h1 className="text-xl font-bold mb-1" style={{ color: BRAND_RED }}>
                {agency.name}
              </h1>
              <p className="text-sm text-slate-600">{agency.website}</p>
              <p className="text-sm text-slate-600">{agency.email}</p>
              <p className="text-sm text-slate-600">{agency.phone}</p>
            </div>
          </div>
          <div className="text-sm text-slate-600 text-right">
            <p className="font-medium text-slate-800">{businessAddress.label}</p>
            <p>{businessAddress.line1}</p>
            <p>{businessAddress.taxId}</p>
          </div>
        </div>
      </div>

      {/* Invoice summary – white background, three columns */}
      <div className="bg-white px-8 py-6 border-x border-slate-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left: Billed to */}
          <div>
            <p className="text-sm text-slate-600 mb-2">Billed to</p>
            <p className="font-bold text-slate-800">{billedTo.companyName}</p>
            <p className="text-sm text-slate-600">{billedTo.address}</p>
            <p className="text-sm text-slate-600">{billedTo.cityCountry}</p>
            <p className="text-sm text-slate-600">{billedTo.phone}</p>
            <p className="text-sm text-slate-600 mt-4">Travelers</p>
            <p className="text-sm text-slate-800">{billedTo.travelers}</p>
            <p className="text-sm text-slate-600 mt-2">Contact</p>
            <p className="text-sm text-slate-800">{billedTo.contact}</p>
          </div>
          {/* Middle: Invoice number, Reference, Quotation date */}
          <div className="text-sm">
            <p className="text-slate-500">Invoice number</p>
            <p className="font-bold text-slate-800">{invoiceMeta.invoiceNumber}</p>
            <p className="text-slate-500 mt-3">Reference</p>
            <p className="font-medium text-slate-800">{invoiceMeta.reference}</p>
            <p className="text-slate-500 mt-3">Quotation date</p>
            <p className="font-bold text-slate-800">{invoiceMeta.quotationDate}</p>
          </div>
          {/* Right: Invoice of (OMR), Total, Due date */}
          <div className="text-right">
            <p className="text-sm text-slate-500">Invoice of ({currency})</p>
            <p className="text-2xl font-bold mt-1" style={{ color: BRAND_RED }}>
              {currency} {invoiceMeta.total}
            </p>
            <p className="text-sm text-slate-500 mt-3">Due date</p>
            <p className="font-bold text-slate-800">{invoiceMeta.dueDate}</p>
          </div>
        </div>
      </div>

      {/* SERVICE – centered heading with lines above and below */}
      <div className="bg-white px-8 pt-6 pb-4 border-x border-slate-200">
        <div className="border-t border-slate-200 pt-4 mb-4" aria-hidden />
        <h2 className="text-sm font-bold text-slate-800 text-center uppercase tracking-wide py-4">Service</h2>
        <div className="border-b border-slate-200 mb-4" aria-hidden />
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-slate-600 font-semibold">
                <th className="text-left py-3 pr-4">PACKAGE</th>
                <th className="text-center py-3 pr-4">PERSON</th>
                <th className="text-right py-3 pr-4">RATE</th>
                <th className="text-right py-3">AMOUNT</th>
              </tr>
            </thead>
            <tbody>
              {serviceRows.map((row, i) => (
                <tr key={i} className="border-b border-slate-100">
                  <td className="py-3 pr-4 align-top">
                    <span className="font-bold text-slate-800">{row.package}</span>
                    {row.description && <p className="text-slate-500 text-sm mt-0.5 pl-0">{row.description}</p>}
                  </td>
                  <td className="py-3 pr-4 text-center text-slate-600 align-top">{row.person || '–'}</td>
                  <td className="py-3 pr-4 text-right text-slate-600 align-top">{row.rate ? `${currency} ${row.rate}` : '–'}</td>
                  <td className="py-3 text-right font-medium text-slate-800 align-top">{row.amount ? `${currency} ${row.amount}` : '–'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Summary – right-aligned */}
        <div className="flex justify-end mt-6">
          <div className="text-sm text-right space-y-2 min-w-[200px]">
            <p className="flex justify-between gap-6"><span className="text-slate-600">Subtotal</span><span className="text-slate-800">{currency} {summary.subtotal}</span></p>
            <p className="flex justify-between gap-6"><span className="text-slate-600">{summary.taxLabel}</span><span className="text-slate-800">{currency} {summary.taxAmount}</span></p>
            <p className="flex justify-between gap-6 font-bold text-slate-800 pt-2 border-t border-slate-200">
              <span>Total</span>
              <span style={{ color: BRAND_RED }}>{currency} {summary.total}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Payment Detail – left text, thanks right-aligned */}
      <div className="bg-white px-8 py-6 border-x border-b border-slate-200 rounded-b-[10px]">
        <h2 className="text-sm font-bold text-slate-800 mb-3">Payment Detail</h2>
        <p className="text-sm text-slate-600">{paymentDetail.bankTitle}</p>
        <p className="text-sm text-slate-600">{paymentDetail.accountTitle}</p>
        <p className="text-sm text-slate-600">{paymentDetail.iban}</p>
        {paymentDetail.notes?.length > 0 && (
          <div className="mt-3 text-sm text-slate-500 space-y-1">
            {paymentDetail.notes.map((note, i) => (
              <p key={i}>{note}</p>
            ))}
          </div>
        )}
        <p className="text-sm text-slate-700 mt-4 text-right">{paymentDetail.thanks}</p>
      </div>

      {/* Footer – light grey background */}
      <div className="bg-white px-8 py-6 rounded-b-lg">
        <h2 className="text-sm font-bold text-slate-800 mb-2">Terms & Conditions</h2>
        <p className="text-sm text-slate-600">{terms}</p>
      </div>
    </div>
  )
}

export default Invoice
