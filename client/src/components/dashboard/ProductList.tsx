import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Sidebar from "../../components/layout/Sidebar"
import Header from "../../components/layout/Header"
import type { Product } from "../../types/product"
import { getProducts, deleteProduct } from "../../api/product.api"
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa"

const ProductsList = () => {
  const [products, setProducts] = useState<Product[]>([])
  const navigate = useNavigate()

  // Fetch products
  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const res = await getProducts()
      console.log("Products response:", res.data)
      // adjust if your API returns directly array
      setProducts(res.data.products || res.data)
    } catch (error) {
      console.error("Failed to fetch products", error)
    }
  }

  // Delete product
  const handleDelete = async (id?: string) => {
    if (!id) return
    if (!window.confirm("Are you sure you want to delete this product?")) return

    try {
      await deleteProduct(id)
      setProducts((prev) => prev.filter((p) => p._id !== id))
    } catch (error) {
      console.error("Failed to delete product", error)
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 p-6">
        <Header />

        {/* Page Header */}
        <div className="flex justify-between items-center mt-6 mb-4">
          <h1 className="text-2xl font-bold text-gray-700">Products</h1>

          <button
            onClick={() => navigate("/dashboard/products/add")}
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            <FaPlus />
            Add Product
          </button>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="w-full table-auto">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="px-4 py-3 text-left">Image</th>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Brand</th>
                <th className="px-4 py-3 text-left">Price</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.length > 0 ? (
                products.map((product) => (
                  <tr
                    key={product._id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    {/* Product Image */}
                    <td className="px-4 py-3">
                      <img
                        src={product.images?.[0] || "https://via.placeholder.com/80"}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded-md border"
                        onError={(e) => {
                          ;(e.target as HTMLImageElement).src =
                            "https://via.placeholder.com/80?text=No+Image"
                        }}
                      />
                    </td>

                    <td className="px-4 py-3 font-medium">
                      {product.name}
                    </td>

                    <td className="px-4 py-3">
                      {product.brand}
                    </td>

                    <td className="px-4 py-3 font-semibold">
                      Rs. {product.price}
                    </td>

                    <td className="px-4 py-3 flex gap-2">
                      <button
                        onClick={() =>
                          navigate(`/dashboard/products/edit/${product._id}`)
                        }
                        className="bg-yellow-400 text-white px-3 py-1.5 rounded hover:bg-yellow-500 transition"
                      >
                        <FaEdit />
                      </button>

                      <button
                        onClick={() => handleDelete(product._id)}
                        className="bg-red-500 text-white px-3 py-1.5 rounded hover:bg-red-600 transition"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center py-6 text-gray-500"
                  >
                    No products available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ProductsList