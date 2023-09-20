import React from 'react'
import styles from './priceControl.module.css'

interface IPriceControlProps {
  price: number
  plusDisabled?: boolean
  minusDisabled?: boolean
  onPlusClick: () => void
  onMinusClick: () => void
}

export const PriceControl: React.FC<IPriceControlProps> = ({
  price,
  plusDisabled,
  minusDisabled,
  onPlusClick,
  onMinusClick,
}) => {
  return (
    <div className={styles.priceControl}>
      <button className={styles.priceBtn} onClick={onMinusClick} disabled={plusDisabled}>
        -
      </button>
      <div className={styles.priceResult}>
        {price} <span>₽/шт</span>
      </div>
      <button className={styles.priceBtn} onClick={onPlusClick} disabled={minusDisabled}>
        +
      </button>
    </div>
  )
}
