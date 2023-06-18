import { useEffect } from 'react'
import { environments } from '@/environments'

export const useResizeObserver = (
  target: globalThis.Element,
  func: (params: { height: number; width: number }) => void
) => {
  useEffect(() => {
    if (environments.isServer || !target) return

    const observer = new ResizeObserver((entries) => {
      for (const e of entries) {
        func({ height: e.contentRect.height, width: e.contentRect.width })
      }
    })
    observer.observe(target)

    return () => {
      observer.unobserve(target)
      observer.disconnect()
    }
  }, [target, func])
}
