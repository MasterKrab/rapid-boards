import { useState, useEffect } from 'react'

const useIsMounted = () => {
  const [isMounted, setIsMounter] = useState(false)

  useEffect(() => setIsMounter(true), [])

  return isMounted
}

export default useIsMounted
