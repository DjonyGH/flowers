import React, { useRef, useState } from 'react'
import styles from './flowers.module.css'
import { FlowerCard } from '../FlowerCard'
import { flowers } from './../../mocks/flowers'
import { FlowerCardDuo } from '../FlowerCardDuo'
import { EOrderMode, ESign, IFlower, IOrder } from '../../types'
import { SwiperSlider } from '../SwiperSlider'
import { SwiperRef } from 'swiper/react'

const pause = (ms: number) => new Promise((res) => setTimeout(res, ms))

export const Flowers: React.FC = () => {
  const [order, setOrder] = useState<IOrder>({
    mode: EOrderMode.Mono,
    flower1: { id: flowers[0].id, count: flowers[0].count },
  })
  const [indexFlower1El, setIndexFlower1El] = useState<number>()
  const [indexFlower2El, setIndexFlower2El] = useState<number>()
  const refSwiper = useRef<SwiperRef | null>(null)

  const handleClick = (id: string, count: number, index?: number) => {
    if (order?.mode === EOrderMode.Duo && order.flower2) return

    if (order?.mode === EOrderMode.Duo) {
      index && setIndexFlower2El(index)
      setOrder({ ...order, flower2: { id, count } })
    } else {
      setOrder({ mode: EOrderMode.Mono, flower1: { id, count } })
    }
  }

  const handleChangePriceFlower1 = (sign: ESign) => {
    if (!order) return

    if (sign === ESign.Minus && order.flower1.count <= 1) return

    const flower1Count = sign === ESign.Plus ? ++order.flower1.count : --order.flower1.count

    setOrder({
      ...order,
      flower1: { ...order.flower1, count: flower1Count },
    })
  }

  const handleChangePriceFlower2 = (sign: ESign) => {
    if (!order || !order.flower2) return

    if (sign === ESign.Minus && order.flower2.count <= 1) return

    const flower2Count = sign === ESign.Plus ? ++order.flower2.count : --order.flower2.count

    setOrder({
      ...order,
      flower2: { ...order.flower2, count: flower2Count },
    })
  }

  const handleSelectDuo = async (index: number) => {
    setIndexFlower1El(index)
    refSwiper.current?.swiper.slideTo(index)
    await pause(300)
    if (!order) return
    setOrder({
      ...order,
      mode: EOrderMode.Duo,
    })
  }

  const handleInactivateDuo = async () => {
    setIndexFlower2El(undefined)
    if (!order) return
    setOrder({
      ...order,
      mode: EOrderMode.Mono,
      flower2: undefined,
    })
  }

  const handleReplace = async () => {
    setIndexFlower2El(indexFlower2El)
    await pause(300)
    if (!order) return
    setOrder({
      ...order,
      flower2: undefined,
    })
  }

  const flower1: IFlower | undefined = flowers.find((item) => item.id === order?.flower1.id)

  const flower2: IFlower | undefined = flowers.find((item) => item.id === order?.flower2?.id)

  const getFlowers = (order: IOrder | null): IFlower[] => {
    if (!order || order.mode === EOrderMode.Mono) return flowers
    return flowers.filter((item) => !(item.id === order.flower1.id || item.id === order.flower2?.id))
  }

  return (
    <div className={styles.wrapperFlowers}>
      <h1 className={styles.title}>Выбор цветов</h1>
      <div className={styles.body}>
        {flower1 && order?.mode === EOrderMode.Duo && (
          <FlowerCardDuo
            flower1={flower1}
            flower2={flower2}
            orderCountFlower1={order?.flower1.count || 0}
            orderCountFlower2={order?.flower2?.count || 0}
            onChangePriceFlower1={handleChangePriceFlower1}
            onChangePriceFlower2={handleChangePriceFlower2}
            onInactivateDuo={handleInactivateDuo}
            onReplace={handleReplace}
          />
        )}

        <SwiperSlider
          refSwiper={refSwiper}
          isHalf={!!order?.flower1 && order.mode === EOrderMode.Duo}
          hidden={!!order?.flower2}
          indexFlower1={indexFlower1El}
          indexFlower2={indexFlower2El}
        >
          {getFlowers(order).map((item) => (
            <FlowerCard
              flower={item}
              isActive={order?.mode === EOrderMode.Mono && item.id === order.flower1.id}
              isDuo={order?.mode === EOrderMode.Duo}
              onClick={(index) => handleClick(item.id, item.count, index)}
              key={item.id}
              orderCount={order?.flower1.count || 0}
              onChangePrice={handleChangePriceFlower1}
              onSelectDuo={handleSelectDuo}
            />
          ))}
        </SwiperSlider>
      </div>
    </div>
  )
}
