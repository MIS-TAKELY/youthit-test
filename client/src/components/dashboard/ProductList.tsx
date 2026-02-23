import { useEffect, useState } from "react";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { deleteProduct, getProducts } from "../../api/product.api";
import Header from "../../components/layout/Header";
import Sidebar from "../../components/layout/Sidebar";
import type { Product } from "../../types/product";

const ProductsList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  // Fetch products from backend
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await getProducts();
      console.log("response-->",res)
      const productsArray: Product[] = res.data.products;
      setProducts(productsArray);
    } catch (err) {
      console.error("Failed to fetch products", err);
    }
  };

  // Delete a product
  const handleDelete = async (id: string | undefined) => {
    if (!id) return;
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    try {
      await deleteProduct();
      setProducts(products.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Failed to delete product", err);
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-100">
        <Header />

        {/* Header + Add Button */}
        <div className="flex justify-between items-center mt-6 mb-4">
          <h1 className="text-2xl font-bold text-gray-700">Products</h1>
          <button
            onClick={() => navigate("/dashboard/products/add")}
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
          >
            <FaPlus /> Add Product
          </button>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-lg shadow overflow-x-auto">
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
              {products.length > 0 ? (
                products?.map((product) => (
                  <tr key={product._id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2">{product.description}</td>
                    <td className="px-4 py-2">{product.brand}</td>
                    <td className="px-4 py-2">${product.price}</td>
                    <td className="px-4 py-2 flex gap-2">
                      <button
                        onClick={() =>
                          navigate(`/dashboard/products/edit/${product._id}`)
                        }
                        className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
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
  );
};

export default ProductsList;
