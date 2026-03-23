import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faXmark,
  faCalendar,
  faExpand,
  faFloppyDisk,
  faUpload,
  faChartLine,
  faPlane,
  faPlus,
  faSearch,
  faFileLines,
  faPenToSquare,
  faCopy,
  faDownload,
  faTrash,
  faUser,
  faBell,
  faArrowUp,
  faArrowDown,
} from '@fortawesome/free-solid-svg-icons'

const ICONS = {
  xmark: faXmark,
  calendar: faCalendar,
  expand: faExpand,
  save: faFloppyDisk,
  upload: faUpload,
  chartLine: faChartLine,
  plane: faPlane,
  plus: faPlus,
  search: faSearch,
  fileLines: faFileLines,
  edit: faPenToSquare,
  copy: faCopy,
  download: faDownload,
  trash: faTrash,
  user: faUser,
  notification: faBell,
  'arrow-up': faArrowUp,
  'arrow-down': faArrowDown,
}

export function UiIcon({ name, className = '', style = {}, ...props }) {
  const icon = ICONS[name]

  if (!icon) {
    return (
      <span className={`inline-flex items-center justify-center ${className}`} style={style} {...props}>
        ?
      </span>
    )
  }

  return <FontAwesomeIcon icon={icon} className={className} style={style} {...props} />
}
