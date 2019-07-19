export interface Item {
  title: string
  image: string
  type?: string
  description: string
}

export interface Section {
  title: string
  data: Item[]
}

export const data: Section[] = require('src/_data.json')
