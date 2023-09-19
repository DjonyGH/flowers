import React, { ReactNode, useEffect, useRef } from 'react'
import styles from './slider.module.css'
import { TinySliderInstance, tns } from 'tiny-slider/src/tiny-slider'
import 'tiny-slider/dist/tiny-slider.css'

interface ISliderProps {
  children?: ReactNode
}

export const Slider: React.FC<ISliderProps> = ({ children }) => {
  const refSlider = useRef<HTMLDivElement | null>(null)
  const tnsRef = useRef<TinySliderInstance | null>(null)

  useEffect(() => {
    if (!refSlider.current) return

    tnsRef.current = tns({
      container: refSlider.current,
      items: 1,
      slideBy: 1,
      autoplay: false,
      controls: false,
      nav: false,
      autoWidth: true,
      loop: false,
      // gutter: 10,
      swipeAngle: 30,
    })

    return () => {
      tnsRef.current?.destroy()
    }
  }, [])

  useEffect(() => {
    tnsRef.current?.rebuild()
  }, [React.Children.toArray(children).length]) //eslint-disable-line

  return (
    <div className={styles.wrapperSlider}>
      <div className={styles.mySlider} ref={refSlider}>
        {children}
      </div>
    </div>
  )
}
