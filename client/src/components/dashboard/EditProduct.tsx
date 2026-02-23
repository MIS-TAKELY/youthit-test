import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getProductById, updateProduct } from "../../api/product.api"
import type { Product } from "../../types/product"

const EditProduct = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const [form, setForm] = useState<Product | null>(null)
  const [imagesInput, setImagesInput] = useState("")
  const [loading, setLoading] = useState(true)

  // Fetch product
  useEffect(() => {
    if (!id) return

    getProductById(id)
      .then((res) => {
        const product = res.data.product
        setForm(product)
        setImagesInput(product.images?.join(", ") || "")
      })
      .finally(() => setLoading(false))
  }, [id])

  // Handle input change (text + number)
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!form) return
    const { name, value } = e.target

    setForm({
      ...form,
      [name]:
        e.target.type === "number" ? Number(value) : value,
    })
  }

  // Handle images input
  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setImagesInput(value)

    if (!form) return
    setForm({
      ...form,
      images: value.split(",").map((img) => img.trim()),
    })
  }

  // Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form || !form._id) return

    try {
      await updateProduct(form._id, form)
      navigate("/dashboard/products")
    } catch (err) {
      console.error("Update failed", err)
      alert("Failed to update product")
    }
  }

  if (loading) return <p className="p-6">Loading...</p>
  if (!form) return <p className="p-6 text-red-500">Product not found</p>

return (
  <div className="min-h-screen bg-gray-50 px-4 py-10">
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Edit Product</h1>
        <p className="text-gray-500 mt-1">
          Update product details and images
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-8 bg-white rounded-2xl shadow p-8"
      >
        {/* Product Info */}
        <section>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Product Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Product Name
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full input"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Brand
              </label>
              <input
                name="brand"
                value={form.brand}
                onChange={handleChange}
                className="w-full input"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Category
              </label>
              <input
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full input"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={4}
                className="w-full input resize-none"
              />
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Pricing & Stock
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Price
              </label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                className="w-full input"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Stock
              </label>
              <input
                type="number"
                name="stock"
                value={form.stock}
                onChange={handleChange}
                className="w-full input"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Seller
              </label>
              <input
                name="seller"
                value={form.seller}
                onChange={handleChange}
                className="w-full input"
              />
            </div>
          </div>
        </section>

        {/* Images */}
        <section>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Product Images
          </h2>

          <label className="block text-sm font-medium text-gray-600 mb-1">
            Image URLs (comma separated)
          </label>
          <input
            value={imagesInput}
            onChange={handleImagesChange}
            placeholder="https://img1.jpg, https://img2.jpg"
            className="w-full input"
          />

          {form.images?.length > 0 && (
            <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {form.images.map((img, index) => (
                <div
                  key={index}
                  className="group relative rounded-xl overflow-hidden border"
                >
                  <img
                    src={img}
                    alt="preview"
                    className="h-36 w-full object-cover transition-transform group-hover:scale-105"
                    onError={(e) => {
                      ;(e.target as HTMLImageElement).src =
                        "https://via.placeholder.com/150?text=Invalid"
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Actions */}
        <div className="flex justify-end gap-4 pt-6 border-t">
          <button
            type="button"
            onClick={() => navigate("/dashboard/products")}
            className="px-6 py-3 rounded-xl border text-gray-600 hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-8 py-3 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 shadow-md"
          >
            Update Product
          </button>
        </div>
      </form>
    </div>
  </div>
)
}

export default EditProduct