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

export interface MealplanItem {
  title: string
  image: string
}

export const data: Section[] = require('src/_data.json')
export const mealplanItems: MealplanItem[] = require('src/_mealplans.json')
