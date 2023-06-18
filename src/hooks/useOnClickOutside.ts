import { useEffect, MutableRefObject } from 'react'

export const useOnClickOutside = (
  ref: MutableRefObject<any>,
  handler: (event?: globalThis.MouseEvent | globalThis.TouchEvent) => void
) => {
  useEffect(() => {
    const listener = (event: globalThis.MouseEvent | globalThis.TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return
      }
      handler(event)
    }
    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)
    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [ref, handler])
}
