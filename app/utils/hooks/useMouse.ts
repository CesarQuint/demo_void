import { useEffect, useRef } from 'react'

interface State {
  x: number
  y: number
  lastX: number
  lastY: number
  getDirection(el: Element): 'top' | 'bottom' | 'left' | 'right' | undefined
}

export default function useMouse(): Readonly<State> {
  const mouse = useRef<State>({
    x: 0,
    y: 0,
    lastX: 0,
    lastY: 0,

    getDirection(el) {
      const { top, right, bottom, left } = el.getBoundingClientRect()
      const { lastX, lastY } = mouse.current

      if (lastY <= Math.floor(top)) return 'top'
      if (lastY >= Math.floor(bottom)) return 'bottom'
      if (lastX <= Math.floor(left)) return 'left'
      if (lastX >= Math.floor(right)) return 'right'
    },
  })

  useEffect(() => {
    const m = mouse.current

    function updateMouse(ev: MouseEvent) {
      m.lastX = m.x
      m.lastY = m.y
      m.x = ev.x
      m.y = ev.y
    }

    window.addEventListener('mousemove', updateMouse)
    return () => window.removeEventListener('mousemove', updateMouse)
  }, [])

  return mouse.current
}
