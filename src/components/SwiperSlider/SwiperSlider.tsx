import React, { ReactNode, useEffect, useLayoutEffect, useRef, useState } from 'react'
import styles from './swiperSlider.module.css'
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react'
import 'swiper/css'

interface ISliderProps {
  children?: ReactNode
  isHalf?: boolean
  hidden?: boolean
  refSwiper: React.MutableRefObject<SwiperRef | null>
  indexFlower1?: number
  indexFlower2?: number
}

export const SwiperSlider: React.FC<ISliderProps> = ({
  children,
  isHalf,
  hidden,
  refSwiper,
  indexFlower1 = 0,
  indexFlower2,
}) => {
  const refWrapperSlider = useRef<HTMLDivElement | null>(null)
  const [width, setWidth] = useState<number>(0)

  useLayoutEffect(() => {
    setWidth(refWrapperSlider.current?.clientWidth || 0)
    setTimeout(function () {
      refSwiper.current?.swiper.slideTo(indexFlower1)
    }, 0)
  }, []) //eslint-disable-line

  useEffect(() => {
    console.log('indexFlower1', indexFlower1)
    console.log('indexFlower2', indexFlower2)
    setTimeout(function () {
      !isHalf && refSwiper.current?.swiper.slideTo(indexFlower1)
      isHalf && indexFlower2 && refSwiper.current?.swiper.slideTo(indexFlower2)
    }, 0)
  }, [isHalf, indexFlower1, indexFlower2]) //eslint-disable-line

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
