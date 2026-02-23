import { api } from "./axios"
import type { Product } from "../types/product"

export const addProduct = (data: Product) =>
  api.post("/v1/createProduct", data)

export const getProducts = () =>
  api.get<{ products: Product[] }>("/v1/getProducts")

export const getProductById = (id: string) =>
  api.get<{ product: Product }>(`/v1/getProduct`, { params: { id } })

export const updateProduct = ( data: Product) =>
  api.put(`/v1/updateProduct`, data)

export const deleteProduct = () =>
  api.delete(`/v1/deleteProduct`)

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
    "/v1/filterProducts",
    { params }
  )