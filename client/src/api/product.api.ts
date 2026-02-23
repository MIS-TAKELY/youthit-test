import { api } from "./axios"
import type { Product } from "../types/product"

export const addProduct = (data: Product) =>
  api.post("/createProduct", data)

export const getProducts = () =>
  api.get<{ products: Product[] }>("/getProducts")

export const getProductById = (id: string) =>
  api.get<{ product: Product }>(`/getProduct/${id}`)

export const updateProduct = (_id: string, data: Product) =>
  api.patch(`/updateProduct/${data._id}`, data)

export const deleteProduct = (_id: string) =>
  api.delete(`/deleteProduct/${_id}`)

export interface FilterParams {
  keyword?: string
  category?: string
  brand?: string
  minPrice?: string
  maxPrice?: string
  inStock?: string
}

export const filterProducts = (params: FilterParams) =>
  api.get<{ products: Product[]; total: number; page: number; totalPages: number }>(
    "/filterProducts",
    { params }
  )