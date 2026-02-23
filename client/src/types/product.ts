export interface Product {
    _id?: string
    name: string
    description: string
    price: number
    brand: string
    stock: number
    seller: string
    isPublished: boolean
    images: string[]
    category: string
}