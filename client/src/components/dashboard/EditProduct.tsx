import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getProductById, updateProduct } from "../../api/product.api"
import type { Product } from "../../types/product"

const EditProduct = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [form, setForm] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)

  // Fetch product by ID
  useEffect(() => {
    if (!id) return

    getProductById(id)
      .then((res) => setForm(res.data.product))
      .finally(() => setLoading(false))
  }, [id])

  // Handle input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!form) return
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  // Submit updated product
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form || !form._id) return

    console.log("form-->",form)

    await updateProduct(form)
    navigate("/dashboard") 
  }

  if (loading) return <p className="p-6">Loading...</p>
  if (!form) return <p className="p-6 text-red-500">Product not found</p>

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-6">Edit Product</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">

        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Product Name"
          required
        />

        <input
          name="brand"
          value={form.brand}
          onChange={handleChange}
          placeholder="Brand"
          required
        />

        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
        />

        <input
          type="number"
          name="stock"
          value={form.stock}
          onChange={handleChange}
          placeholder="Stock"
        />

        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Category"
        />

        <input
          name="seller"
          value={form.seller}
          onChange={handleChange}
          placeholder="Seller"
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="col-span-2"
          placeholder="Description"
        />

        <button
          type="submit"
          className="col-span-2 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700"
        >
          Update Product
        </button>
      </form>
    </div>
  )
}

export default EditProduct