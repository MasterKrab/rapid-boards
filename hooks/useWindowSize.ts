import { useState } from 'react'
import useWindowEvent from './useWindowEvent'
import isomorphicWindow from '../utils/isomorphicWindow'

const getWindowSize = () => ({
  width: isomorphicWindow ? isomorphicWindow.innerWidth : 0,
  height: isomorphicWindow ? isomorphicWindow.innerHeight : 0,
})

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState(getWindowSize)

  const handleResize = () => setWindowSize(getWindowSize())

  useWindowEvent('resize', handleResize)

  return windowSize
}

export default useWindowSize
