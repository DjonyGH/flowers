import React, { useState } from 'react'
import styles from './flowerCard.module.css'
import { ESign, IFlower } from '../../types'

interface IFlowerCardProps {
  flower: IFlower
  isActive: boolean
  orderCount: number
  onClick: () => void
  onChangePrice: (sign: ESign) => void
  onSelectDuo: () => void
}

export const FlowerCard: React.FC<IFlowerCardProps> = ({
  flower,
  isActive,
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
          {isActive && (
            <div
              className={`${styles.count} ${vector === 'up' && styles.up} ${vector === 'down' && styles.down}`}
              key={orderCount}
            >
              {vector === 'down' && <div>{orderCount + 1}</div>}
              <div>{orderCount}</div>
              {vector === 'up' && <div>{orderCount - 1}</div>}
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
            <div className={`${styles.priceControl} ${!isActive && styles.dnone}`}>
              <button
                className={styles.priceBtn}
                onClick={() => {
                  onChangePrice(ESign.Minus)
                  setVector('down')
                }}
                disabled={orderCount <= 1}
              >
                -
              </button>
              <div className={styles.priceResult}>
                {flower.price} <span>₽/шт</span>
              </div>
              <button
                className={styles.priceBtn}
                onClick={() => {
                  onChangePrice(ESign.Plus)
                  setVector('up')
                }}
                disabled={orderCount >= flower.count}
              >
                +
              </button>
            </div>
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
