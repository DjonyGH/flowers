import React, { useState } from 'react'
import styles from './flowerCard.module.css'
import { ESign, IFlower } from '../../types'
import { Counter } from '../Counter'
import { PriceControl } from '../PriceControl'

interface IFlowerCardProps {
  flower: IFlower
  isActive: boolean
  isDuo: boolean
  orderCount: number
  onClick: () => void
  onChangePrice: (sign: ESign) => void
  onSelectDuo: () => void
}

export const FlowerCard: React.FC<IFlowerCardProps> = ({
  flower,
  isActive,
  isDuo,
  orderCount,
  onClick,
  onChangePrice,
  onSelectDuo,
}) => {
  const [vector, setVector] = useState<'up' | 'down'>()
  return (
    <div className={styles.card}>
      <div className={styles.additional}>{flower.additional && <span>{flower.additional}</span>}</div>
      <div className={`${styles.body} ${isActive && styles.isActive}`}>
        <div className={styles.img} onClick={onClick}>
          <img src={flower.imgUrl} alt={flower.name} />
          {(isActive || isDuo) && (
            <div className={styles.count}>
              <Counter count={isActive ? orderCount : flower.count} vector={vector} key={orderCount} />
            </div>
          )}
          {flower.type && <div className={styles.type}>{flower.type}</div>}
        </div>
        <div className={styles.name}>{flower.name}</div>
        {!isActive ? (
          <div className={`${styles.price} ${isActive && styles.dnone}`}>
            <div className={styles.desc}>стоимость за шт</div>
            <div className={styles.value}>{flower.price} ₽</div>
          </div>
        ) : (
          <>
            <PriceControl
              price={flower.price}
              minusDisabled={orderCount <= 1}
              onMinusClick={() => {
                onChangePrice(ESign.Minus)
                setVector('down')
              }}
              onPlusClick={() => {
                onChangePrice(ESign.Plus)
                setVector('up')
              }}
            />
            <div className={styles.canAdd}>можно дополнить</div>
            <button className={styles.duo} onClick={onSelectDuo}>
              сделать DUO
            </button>
          </>
        )}
      </div>
    </div>
  )
}
