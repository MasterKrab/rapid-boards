import isBrowser from 'utils/isBrowser'

const getIsTouch = () =>
  isBrowser && ('ontouchstart' in window || navigator.maxTouchPoints > 0)

export default getIsTouch
