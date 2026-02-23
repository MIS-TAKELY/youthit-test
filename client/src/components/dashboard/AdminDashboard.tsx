import Sidebar from "../layout/Sidebar"
import Header from "../layout/Header"
import { FaBox, FaUsers, FaShoppingCart } from "react-icons/fa"
import { useState, useEffect } from "react"
import type { Product } from "../../types/product"
import { getProducts, deleteProduct } from "../../api/product.api"

const AdminDashboard = () => {
  const [products, setProducts] = useState<Product[]>([])


  const getProduct=async()=>{
const res= await getProducts()
console.log("products-->",res)
  }

  useEffect(() => {
    getProduct()
    
  }, [])

  const handleDelete = async (id: string | undefined) => {
    if (!id) return
    await deleteProduct()
    setProducts(products.filter((p) => p._id !== id))
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-100 min-h-screen">
        <Header />

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-white p-4 rounded-lg shadow flex items-center gap-4">
            <FaBox className="text-indigo-600 text-3xl" />
            <div>
              <p className="text-gray-500 text-sm">Total Products</p>
              <p className="text-xl font-semibold">{products.length}</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow flex items-center gap-4">
            <FaUsers className="text-indigo-600 text-3xl" />
            <div>
              <p className="text-gray-500 text-sm">Total Users</p>
              <p className="text-xl font-semibold">120</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow flex items-center gap-4">
            <FaShoppingCart className="text-indigo-600 text-3xl" />
            <div>
              <p className="text-gray-500 text-sm">Orders</p>
              <p className="text-xl font-semibold">45</p>
            </div>
          </div>
        </div>

        {/* Products Table */}
        <div className="mt-8 bg-white rounded-lg shadow overflow-x-auto">
          <table className="w-full table-auto">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 text-left">#</th>
                <th className="px-4 py-2 text-left">Title</th>
                <th className="px-4 py-2 text-left">Brand</th>
                <th className="px-4 py-2 text-left">Price</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products && products?.map((product) => (
                <tr key={product._id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{product.brand}</td>
                  <td className="px-4 py-2">{product.category}</td>
                  <td className="px-4 py-2">{product.description}</td>
                  <td className="px-4 py-2">${product.price}</td>
                  <td className="px-4 py-2 flex gap-2">
                    <button className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500">
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-4 text-gray-500">
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

export default AdminDashboard