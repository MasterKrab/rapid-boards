export const getSupportsClipboard = () =>
  !!(navigator.clipboard && navigator.clipboard.writeText)

const copyToClipboard = (text: string) => navigator.clipboard.writeText(text)

export default copyToClipboard
