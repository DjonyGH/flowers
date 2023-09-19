import React, { ReactNode, useLayoutEffect, useRef, useState } from 'react'
import styles from './swiperSlider.module.css'
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react'
import 'swiper/css'

interface ISliderProps {
  children?: ReactNode
  isHalf?: boolean
  hidden?: boolean
}

export const SwiperSlider: React.FC<ISliderProps> = ({ children, isHalf, hidden }) => {
  const refWrapperSlider = useRef<HTMLDivElement | null>(null)
  const refSwiper = useRef<SwiperRef | null>(null)
  const [width, setWidth] = useState<number>(0)

  useLayoutEffect(() => {
    setWidth(refWrapperSlider.current?.clientWidth || 0)
    setTimeout(function () {
      refSwiper.current?.swiper.slideTo(0)
    }, 0)
  }, [])

  return (
    <div className={`${styles.wrapperSlider} ${hidden && styles.dnone}`} ref={refWrapperSlider}>
      <Swiper
        slidesPerView={isHalf ? (width - 178) / 178 : width / 178}
        className='mySwiper'
        onSlideChange={(e) => {
          if (e.activeIndex === React.Children.toArray(children).length) {
            refSwiper.current?.swiper.slideTo(React.Children.toArray(children).length - 1)
          }
        }}
        ref={refSwiper}
        init={false}
        initialSlide={0}
      >
        {React.Children.toArray(children).map((item, idx) => (
          <SwiperSlide tabIndex={idx} key={idx}>
            {item}
          </SwiperSlide>
        ))}
        {isHalf && (
          <SwiperSlide>
            <div style={{ width: `0` }} />
          </SwiperSlide>
        )}
      </Swiper>
    </div>
  )
}
