import React from 'react'
import styles from './counter.module.css'

interface IFlowerCardProps {
  count: number
  vector?: 'up' | 'down'
}

export const Counter: React.FC<IFlowerCardProps> = ({ count, vector }) => {
  return (
    <div className={`${styles.count} ${vector === 'up' && styles.up} ${vector === 'down' && styles.down}`}>
      {vector === 'down' && <div>{count + 1}</div>}
      <div>{count}</div>
      {vector === 'up' && <div>{count - 1}</div>}
    </div>
  )
}
