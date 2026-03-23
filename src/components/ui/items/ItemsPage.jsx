import { useState } from 'react'
import editIcon from '../../../assets/edit-icon.svg'
import copyIcon from '../../../assets/copy-icon.svg'
import downloadIcon from '../../../assets/download-icon.svg'
import trashIcon from '../../../assets/trash-icon.svg'

const BRAND_RED = '#c60000'
const FILTER_BG = '#F3FAFF'
const FILTER_BORDER = '#CBE9FF'

const INITIAL_ITEMS = [
  { id: 1, name: 'Umrah Package Basic', description: '5-star hotels, flights included', category: 'Packages', price: 'OMR 850', stockQuantity: 24 },
  { id: 2, name: 'Hajj Premium', description: 'Full board, VIP services', category: 'Packages', price: 'OMR 2,100', stockQuantity: 12 },
  { id: 3, name: 'Visa Processing', description: 'Standard visa handling', category: 'Services', price: 'OMR 45', stockQuantity: 999 },
]

const CATEGORY_OPTIONS = ['Packages', 'Services', 'Transport', 'Accommodation', 'Other']

export function ItemsPage() {
  const [items, setItems] = useState(INITIAL_ITEMS)
  const [modalOpen, setModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: CATEGORY_OPTIONS[0],
    price: '',
    stockQuantity: '',
  })

  const handleOpenCreate = () => {
    setFormData({
      name: '',
      description: '',
      category: CATEGORY_OPTIONS[0],
      price: '',
      stockQuantity: '',
    })
    setModalOpen(true)
  }

  const handleCloseModal = () => setModalOpen(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newItem = {
      id: items.length > 0 ? Math.max(...items.map((i) => i.id)) + 1 : 1,
      name: formData.name.trim() || '—',
      description: formData.description.trim() || '—',
      category: formData.category,
      price: formData.price.trim() ? `OMR ${formData.price.trim()}` : '—',
      stockQuantity: formData.stockQuantity.trim() ? Number(formData.stockQuantity) : 0,
    }
    setItems((prev) => [newItem, ...prev])
    setModalOpen(false)
  }

  return (
    <div className="flex-1 overflow-auto p-6 bg-slate-50 relative">
      {modalOpen && (
        <>
          <div className="fixed inset-0 bg-black/40 z-40 transition-opacity duration-300" onClick={handleCloseModal} aria-hidden />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-hidden flex flex-col" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between p-4 border-b border-slate-200 shrink-0">
                <h3 className="text-lg font-semibold text-slate-900" style={{ color: BRAND_RED }}>Create New Item</h3>
                <button type="button" onClick={handleCloseModal} className="p-2 rounded-lg hover:bg-slate-100 text-slate-600" aria-label="Close">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
              <form onSubmit={handleSubmit} className="flex-1 overflow-auto p-4 bg-[#FAFBFC]">
                <div className="space-y-4">
                  <div className="rounded-lg border flex flex-col" style={{ borderColor: FILTER_BORDER, backgroundColor: FILTER_BG }}>
                    <label htmlFor="create-name" className="text-xs font-medium text-slate-500 pt-3 pb-1 px-4 block">Name</label>
                    <input id="create-name" name="name" type="text" value={formData.name} onChange={handleChange} placeholder="Item name" className="w-full text-slate-700 placeholder-slate-500 text-sm bg-transparent border-none px-4 pb-3 focus:outline-none focus:ring-0" />
                  </div>
                  <div className="rounded-lg border flex flex-col" style={{ borderColor: FILTER_BORDER, backgroundColor: FILTER_BG }}>
                    <label htmlFor="create-description" className="text-xs font-medium text-slate-500 pt-3 pb-1 px-4 block">Description</label>
                    <textarea id="create-description" name="description" value={formData.description} onChange={handleChange} placeholder="Description" rows={3} className="w-full text-slate-700 placeholder-slate-500 text-sm bg-transparent border-none px-4 pb-3 focus:outline-none focus:ring-0 resize-none" />
                  </div>
                  <div className="rounded-lg border flex flex-col" style={{ borderColor: FILTER_BORDER, backgroundColor: FILTER_BG }}>
                    <label htmlFor="create-category" className="text-xs font-medium text-slate-500 pt-3 pb-1 px-4 block">Category</label>
                    <select id="create-category" name="category" value={formData.category} onChange={handleChange} className="rounded-lg bg-transparent border-none text-slate-700 text-sm font-medium py-2.5 px-4 pr-9 focus:outline-none focus:ring-0 cursor-pointer appearance-none bg-no-repeat bg-[length:1rem_1rem] bg-[right_0.75rem_center] w-full" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%231f2937'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")` }}>
                      {CATEGORY_OPTIONS.map((opt) => (<option key={opt} value={opt}>{opt}</option>))}
                    </select>
                  </div>
                  <div className="rounded-lg border flex flex-col" style={{ borderColor: FILTER_BORDER, backgroundColor: FILTER_BG }}>
                    <label htmlFor="create-price" className="text-xs font-medium text-slate-500 pt-3 pb-1 px-4 block">Price</label>
                    <input id="create-price" name="price" type="text" value={formData.price} onChange={handleChange} placeholder="e.g. 99.500" className="w-full text-slate-700 placeholder-slate-500 text-sm bg-transparent border-none px-4 pb-3 focus:outline-none focus:ring-0" />
                  </div>
                  <div className="rounded-lg border flex flex-col" style={{ borderColor: FILTER_BORDER, backgroundColor: FILTER_BG }}>
                    <label htmlFor="create-stock" className="text-xs font-medium text-slate-500 pt-3 pb-1 px-4 block">Stock Quantity</label>
                    <input id="create-stock" name="stockQuantity" type="number" min="0" value={formData.stockQuantity} onChange={handleChange} placeholder="0" className="w-full text-slate-700 placeholder-slate-500 text-sm bg-transparent border-none px-4 pb-3 focus:outline-none focus:ring-0" />
                  </div>
                </div>
                <div className="flex justify-end gap-2 mt-6 pt-4 border-t border-slate-200">
                  <button type="button" onClick={handleCloseModal} className="px-4 py-2.5 rounded-lg font-medium text-slate-600 hover:bg-slate-100">Cancel</button>
                  <button type="submit" className="inline-flex items-center justify-center gap-2 font-semibold rounded-lg px-5 py-2.5 text-white hover:opacity-90" style={{ backgroundColor: BRAND_RED }}>Create Item</button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-slate-900" style={{ color: BRAND_RED }}>Items</h2>
        <button type="button" onClick={handleOpenCreate} className="inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition px-5 py-2.5 text-white hover:opacity-90" style={{ backgroundColor: BRAND_RED }}>Create New</button>
      </div>

      <div className="rounded-xl bg-white border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-slate-700">
            <thead className="bg-white border-b border-slate-200 text-slate-600 font-medium">
              <tr>
                <th className="px-5 py-3">No.</th>
                <th className="px-5 py-3">Name</th>
                <th className="px-5 py-3">Description</th>
                <th className="px-5 py-3">Category</th>
                <th className="px-5 py-3">Price</th>
                <th className="px-5 py-3">Stock Quantity</th>
                <th className="px-5 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, i) => (
                <tr key={item.id} className="border-b border-slate-100 hover:bg-slate-50/50">
                  <td className="px-5 py-3 font-medium">{i + 1}</td>
                  <td className="px-5 py-3 font-medium">{item.name}</td>
                  <td className="px-5 py-3 text-slate-600">{item.description}</td>
                  <td className="px-5 py-3">{item.category}</td>
                  <td className="px-5 py-3">{item.price}</td>
                  <td className="px-5 py-3">{item.stockQuantity}</td>
                  <td className="px-5 py-3 flex gap-2 items-center">
                    <button type="button" className="p-1.5 rounded hover:bg-slate-200" aria-label="Edit"><img src={editIcon} alt="" className="w-5 h-5" aria-hidden /></button>
                    <button type="button" className="p-1.5 rounded hover:bg-slate-200" aria-label="Duplicate"><img src={copyIcon} alt="" className="w-5 h-5" aria-hidden /></button>
                    <button type="button" className="p-1.5 rounded hover:bg-slate-200" aria-label="Download"><img src={downloadIcon} alt="" className="w-5 h-5" aria-hidden /></button>
                    <button type="button" className="p-1.5 rounded hover:bg-slate-200" aria-label="Delete"><img src={trashIcon} alt="" className="w-5 h-5" aria-hidden /></button>
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
