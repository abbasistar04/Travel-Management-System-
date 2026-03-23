import editIcon from '../../assets/edit-icon.svg'
import copyIcon from '../../assets/copy-icon.svg'
import downloadIcon from '../../assets/download-icon.svg'
import trashIcon from '../../assets/trash-icon.svg'
import { copyRowToClipboard, downloadRowAsJson } from '../../utils/rowActions'

const ICON_FILTER = 'invert(13%) sepia(88%) saturate(6000%) hue-rotate(355deg) brightness(90%) contrast(110%)'

/**
 * Standard row actions: edit, copy, download, delete.
 */
export function TableRowActionButtons({
  row,
  onEdit,
  onDelete,
  exportPrefix = 'export',
  copyLabel = 'Copy',
}) {
  return (
    <div className="flex items-center gap-1">
      {typeof onEdit === 'function' && (
        <button
          type="button"
          onClick={() => onEdit(row)}
          className="p-1.5 rounded-md hover:bg-red-50 transition-colors"
          aria-label="Edit"
        >
          <img src={editIcon} alt="" className="w-4 h-4" style={{ filter: ICON_FILTER }} aria-hidden />
        </button>
      )}
      <button
        type="button"
        onClick={() => copyRowToClipboard(row)}
        className="p-1.5 rounded-md hover:bg-red-50 transition-colors"
        aria-label={copyLabel}
      >
        <img src={copyIcon} alt="" className="w-4 h-4" style={{ filter: ICON_FILTER }} aria-hidden />
      </button>
      <button
        type="button"
        onClick={() => downloadRowAsJson(row, exportPrefix)}
        className="p-1.5 rounded-md hover:bg-red-50 transition-colors"
        aria-label="Download"
      >
        <img src={downloadIcon} alt="" className="w-4 h-4" style={{ filter: ICON_FILTER }} aria-hidden />
      </button>
      {onDelete && (
        <button
          type="button"
          onClick={() => onDelete(row)}
          className="p-1.5 rounded-md hover:bg-red-50 transition-colors"
          aria-label="Delete"
        >
          <img src={trashIcon} alt="" className="w-4 h-4" style={{ filter: ICON_FILTER }} aria-hidden />
        </button>
      )}
    </div>
  )
}
