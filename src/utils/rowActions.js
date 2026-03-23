/**
 * Utility functions for table row actions
 */

export function copyRowToClipboard(row) {
  const text = Object.entries(row)
    .map(([key, value]) => `${key}: ${value}`)
    .join('\n')
  navigator.clipboard.writeText(text).then(() => {
    // Could show a toast notification here
    console.log('Row copied to clipboard')
  }).catch(err => {
    console.error('Failed to copy row:', err)
  })
}

export function downloadRowAsJson(row, prefix = 'export') {
  const dataStr = JSON.stringify(row, null, 2)
  const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)

  const exportFileDefaultName = `${prefix}-${Date.now()}.json`

  const linkElement = document.createElement('a')
  linkElement.setAttribute('href', dataUri)
  linkElement.setAttribute('download', exportFileDefaultName)
  linkElement.click()
}