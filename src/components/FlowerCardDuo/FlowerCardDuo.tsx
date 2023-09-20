import React, { useState } from 'react'
import styles from './flowerCardDuo.module.css'
import { ESign, IFlower } from '../../types'
import { Counter } from '../Counter'
import { PriceControl } from '../PriceControl'

interface IFlowerCardDuoProps {
  flower1: IFlower
  flower2?: IFlower
  orderCountFlower1: number
  orderCountFlower2: number
  onChangePriceFlower1: (sign: ESign) => void
  onChangePriceFlower2: (sign: ESign) => void
  onInactivateDuo: () => void
  onReplace: () => void
}

export const FlowerCardDuo: React.FC<IFlowerCardDuoProps> = ({
  flower1,
  flower2,
  orderCountFlower1,
  orderCountFlower2,
  onChangePriceFlower1,
  onChangePriceFlower2,
  onInactivateDuo,
  onReplace,
}) => {
  const [vector1, setVector1] = useState<'up' | 'down'>()
  const [vector2, setVector2] = useState<'up' | 'down'>()
  return (
    <div className={styles.cardDuo}>
      <div className={styles.card}>
        <div className={styles.additional}>{flower1.additional && <span>{flower1.additional}</span>}</div>
        <div className={`${styles.body} ${styles.leftSide} ${styles.divider}`}>
          <div className={styles.img}>
            <img src={flower1.imgUrl} alt={flower1.name} />

            <div className={styles.count}>
              <Counter count={orderCountFlower1} vector={vector1} key={orderCountFlower1} />
            </div>

            {flower1.type && <div className={styles.type}>{flower1.type}</div>}
          </div>
          <div className={styles.name}>{flower1.name}</div>

          {!flower2 ? (
            <>
              <div className={styles.price}>
                <div className={styles.desc}>стоимость за шт</div>
                <div className={styles.value}>{flower1.price} ₽</div>
              </div>
              <button className={styles.duo} onClick={onInactivateDuo}>
                отменить DUO
              </button>
            </>
          ) : (
            <>
              <PriceControl
                price={flower1.price}
                minusDisabled={orderCountFlower1 <= 1}
                onMinusClick={() => {
                  onChangePriceFlower1(ESign.Minus)
                  setVector1('down')
                }}
                onPlusClick={() => {
                  onChangePriceFlower1(ESign.Plus)
                  setVector1('up')
                }}
              />

              <div className={styles.canAdd}>можно дополнить</div>
              <button className={styles.duo} onClick={onInactivateDuo}>
                отменить DUO
              </button>
            </>
          )}
        </div>
      </div>

      {flower2 && (
        <div className={styles.card}>
          <div className={styles.additional}>{flower2.additional && <span>{flower2.additional}</span>}</div>
          <div className={`${styles.body} ${styles.rightSide}`}>
            <div className={styles.img}>
              <img src={flower2.imgUrl} alt={flower2.name} />

              <div className={styles.count}>
                <Counter count={orderCountFlower2} vector={vector2} key={orderCountFlower2} />
              </div>

              {flower2.type && <div className={styles.type}>{flower2.type}</div>}
            </div>
            <div className={styles.name}>{flower2.name}</div>

            <PriceControl
              price={flower2.price}
              minusDisabled={orderCountFlower2 <= 1}
              onMinusClick={() => {
                onChangePriceFlower2(ESign.Minus)
                setVector2('down')
              }}
              onPlusClick={() => {
                onChangePriceFlower2(ESign.Plus)
                setVector2('up')
              }}
            />
            <div className={styles.canAdd}>можно дополнить</div>
            <button className={styles.duo} onClick={onReplace}>
              заменить
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
