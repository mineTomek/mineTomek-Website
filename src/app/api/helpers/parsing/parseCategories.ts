import Category from '@/app/types/Category'

export default function parseCategories(categoryProp: any) {
  return categoryProp.select.options.map((categoryOption: any) => {
    const category: Category = {
      id: categoryOption.id,
      name: categoryOption.name,
    }

    return category
  })
}
