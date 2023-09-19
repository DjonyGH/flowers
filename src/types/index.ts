export enum EFlowertype {
  Premium = 'premium',
  Luxe = 'luxe',
}

export interface IFlower {
  id: string
  name: string
  imgUrl: string
  count: number
  price: number
  type?: EFlowertype
  additional?: string
}

export enum EOrderMode {
  Mono = 'Mono',
  Duo = 'Duo',
}

export interface IFlowerOrder {
  id: string
  count: number
}

export interface IOrder {
  mode: EOrderMode
  flower1: IFlowerOrder
  flower2?: IFlowerOrder
}

export enum ESign {
  Plus = 'Plus',
  Minus = 'Minus',
}
