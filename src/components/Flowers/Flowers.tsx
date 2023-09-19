import React, { useState } from 'react'
import styles from './flowers.module.css'
import { Slider } from '../Slider'
import { FlowerCard } from '../FlowerCard'
import { flowers } from './../../mocks/flowers'
import { FlowerCardDuo } from '../FlowerCardDuo'
import { EOrderMode, ESign, IFlower, IOrder } from '../../types'

export const Flowers: React.FC = () => {
  const [order, setOrder] = useState<IOrder | null>(null)

  const handleClick = (id: string) => {
    if (order?.mode === EOrderMode.Duo && order.flower2) return

    if (order?.mode === EOrderMode.Duo) {
      setOrder({ ...order, flower2: { id, count: 1 } })
    } else {
      setOrder({ mode: EOrderMode.Mono, flower1: { id, count: 1 } })
    }
  }

  const handleChangePriceFlower1 = (sign: ESign) => {
    if (!order) return

    if (sign === ESign.Minus && order.flower1.count <= 1) return

    const selectedFlower = flowers.find((item) => item.id === order.flower1.id)

    if (sign === ESign.Plus && selectedFlower && selectedFlower.count <= order.flower1.count) return

    const flower1Count = sign === ESign.Plus ? ++order.flower1.count : --order.flower1.count

    setOrder({
      ...order,
      flower1: { ...order.flower1, count: flower1Count },
    })
  }

  const handleChangePriceFlower2 = (sign: ESign) => {
    if (!order || !order.flower2) return

    if (sign === ESign.Minus && order.flower2.count <= 1) return

    const selectedFlower = flowers.find((item) => item.id === order.flower2!.id)

    if (sign === ESign.Plus && selectedFlower && selectedFlower.count <= order.flower2.count) return

    const flower2Count = sign === ESign.Plus ? ++order.flower2.count : --order.flower2.count

    setOrder({
      ...order,
      flower2: { ...order.flower2, count: flower2Count },
    })
  }

  const handleSelectDuo = () => {
    if (!order) return
    setOrder({
      ...order,
      mode: EOrderMode.Duo,
    })
  }

  const handleInactivateDuo = () => {
    if (!order) return
    setOrder(null)
  }

  const handleReplace = () => {
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

        {!order?.flower2 && (
          <Slider>
            {getFlowers(order).map((item) => (
              <FlowerCard
                flower={item}
                isActive={order?.mode === EOrderMode.Mono && item.id === order.flower1.id}
                onClick={() => handleClick(item.id)}
                key={item.id}
                orderCount={order?.flower1.count || 0}
                onChangePrice={handleChangePriceFlower1}
                onSelectDuo={handleSelectDuo}
              />
            ))}
            {order?.flower1 && <div style={{ width: '180px' }} />}
          </Slider>
        )}
      </div>
    </div>
  )
}
