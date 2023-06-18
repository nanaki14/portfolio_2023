import { useCallback, useState } from 'react'

export const useToggle = (defaultValue?: boolean) => {
  const [isOpen, setState] = useState(defaultValue || false)

  const toggle = useCallback(() => {
    setState(!isOpen)
  }, [isOpen])

  const close = useCallback(() => {
    setState(false)
  }, [])

  return [isOpen, toggle, close] as [boolean, () => void, () => void]
}
