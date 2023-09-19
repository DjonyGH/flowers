import React from 'react'
import styles from './flowerCardDuo.module.css'
import { ESign, IFlower } from '../../types'

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
  return (
    <div className={styles.cardDuo}>
      <div className={styles.card}>
        <div className={styles.additional}>{flower1.additional && <span>{flower1.additional}</span>}</div>
        <div className={`${styles.body} ${styles.leftSide} ${styles.divider}`}>
          <div className={styles.img}>
            <img src={flower1.imgUrl} alt={flower1.name} />
            <div className={styles.count}>{flower1.count}</div>
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
              <div className={styles.priceControl}>
                <button
                  className={styles.priceBtn}
                  onClick={() => onChangePriceFlower1(ESign.Minus)}
                  disabled={orderCountFlower1 <= 1}
                >
                  -
                </button>
                <div className={styles.priceResult}>{orderCountFlower1 * flower1.price} ₽</div>
                <button
                  className={styles.priceBtn}
                  onClick={() => onChangePriceFlower1(ESign.Plus)}
                  disabled={orderCountFlower1 >= flower1.count}
                >
                  +
                </button>
              </div>
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
              <div className={styles.count}>{flower2.count}</div>
              {flower2.type && <div className={styles.type}>{flower2.type}</div>}
            </div>
            <div className={styles.name}>{flower2.name}</div>

            <div className={styles.priceControl}>
              <button
                className={styles.priceBtn}
                onClick={() => onChangePriceFlower2(ESign.Minus)}
                disabled={orderCountFlower2 <= 1}
              >
                -
              </button>
              <div className={styles.priceResult}>{orderCountFlower2 * flower2.price} ₽</div>
              <button
                className={styles.priceBtn}
                onClick={() => onChangePriceFlower2(ESign.Plus)}
                disabled={orderCountFlower2 >= flower2.count}
              >
                +
              </button>
            </div>
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
