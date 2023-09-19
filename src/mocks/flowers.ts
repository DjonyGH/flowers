import { EFlowertype, IFlower } from '../types'

export const flowers: IFlower[] = [
  {
    id: '1',
    name: 'Роза классическая',
    imgUrl: '/images/rose_classic.png',
    count: 14,
    price: 151,
    type: EFlowertype.Premium,
  },
  {
    id: '2',
    name: 'Роза классическая пионовидная',
    imgUrl: '/images/rose_classic_peony.png',
    count: 5,
    price: 578,
    type: EFlowertype.Luxe,
    additional: 'пахнет',
  },
  {
    id: '3',
    name: 'Сирень',
    imgUrl: '/images/lilac.jpeg',
    count: 20,
    price: 300,
  },
  {
    id: '4',
    name: 'Хризантема',
    imgUrl: '/images/сhrysanthemum.webp',
    count: 11,
    price: 179,
  },
  {
    id: '5',
    name: 'Гербера розовая',
    imgUrl: '/images/gerbera_pink.webp',
    count: 5,
    price: 199,
  },
  {
    id: '6',
    name: 'Гербера красная',
    imgUrl: '/images/gerbera_red.webp',
    count: 13,
    price: 199,
  },
]
