import { useEffect, useState } from "react";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { deleteProduct, getProducts, type FilterParams } from "../../api/product.api";
import Header from "../../components/layout/Header";
import Sidebar from "../../components/layout/Sidebar";
import type { Product } from "../../types/product";



const ProductsList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState<FilterParams>({});
  const navigate = useNavigate();

  // Fetch products
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await getProducts();
      const productsArray: Product[] = res.data.products ?? res.data;
      setProducts(productsArray);
    } catch (err) {
      console.error("Failed to fetch products", err);
    }
  };

  // Delete product
  const handleDelete = async (id: string | undefined) => {
    if (!id) return;
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await deleteProduct(id);
      setProducts(products.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Failed to delete product", err);
    }
  };

  // Filter products based on filter params
  const filteredProducts = products.filter((p) => {
    // Keyword filter
    if (filters.keyword && !p.name.toLowerCase().includes(filters.keyword.toLowerCase())) return false;

    // Category filter
    if (filters.category && p.category !== filters.category) return false;

    // Brand filter
    if (filters.brand && p.brand !== filters.brand) return false;

    // Min price
    if (filters.minPrice && p.price < Number(filters.minPrice)) return false;

    // Max price
    if (filters.maxPrice && p.price > Number(filters.maxPrice)) return false;

    // Stock availability
    if (filters.inStock) {
      if (filters.inStock === "true" && p.stock <= 0) return false;
      if (filters.inStock === "false" && p.stock > 0) return false;
    }

    return true;
  });

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 p-6">
        <Header />

        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-6 mb-4 gap-4">
          <h1 className="text-2xl font-bold text-gray-700">Products</h1>

          <button
            onClick={() => navigate("/dashboard/products/add")}
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            <FaPlus />
            Add Product
          </button>
        </div>

        {/* Filter Panel */}
        <div className="bg-white rounded-lg shadow p-4 mb-4 grid grid-cols-1 md:grid-cols-6 gap-4">
          <input
            type="text"
            placeholder="Search by name..."
            value={filters.keyword || ""}
            onChange={(e) => setFilters({ ...filters, keyword: e.target.value })}
            className="col-span-1 md:col-span-2 px-3 py-2 border rounded focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 outline-none"
          />
          <input
            type="text"
            placeholder="Category"
            value={filters.category || ""}
            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
            className="px-3 py-2 border rounded focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 outline-none"
          />
          <input
            type="text"
            placeholder="Brand"
            value={filters.brand || ""}
            onChange={(e) => setFilters({ ...filters, brand: e.target.value })}
            className="px-3 py-2 border rounded focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 outline-none"
          />
          <input
            type="number"
            placeholder="Min Price"
            value={filters.minPrice || ""}
            onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
            className="px-3 py-2 border rounded focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 outline-none"
          />
          <input
            type="number"
            placeholder="Max Price"
            value={filters.maxPrice || ""}
            onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
            className="px-3 py-2 border rounded focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 outline-none"
          />
          <select
            value={filters.inStock || ""}
            onChange={(e) => setFilters({ ...filters, inStock: e.target.value })}
            className="px-3 py-2 border rounded focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 outline-none"
          >
            <option value="">All Stock</option>
            <option value="true">In Stock</option>
            <option value="false">Out of Stock</option>
          </select>
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
                <th className="px-4 py-3 text-left">Stock</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <tr key={product._id} className="border-b hover:bg-gray-50 transition">
                    <td className="px-4 py-3">
                      <img
                        src={product.images?.[0] || "https://via.placeholder.com/80"}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded-md border"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "https://via.placeholder.com/80?text=No+Image";
                        }}
                      />
                    </td>
                    <td className="px-4 py-3 font-medium">{product.name}</td>
                    <td className="px-4 py-3">{product.brand}</td>
                    <td className="px-4 py-3 font-semibold">Rs. {product.price}</td>
                    <td className="px-4 py-3">{product.stock}</td>
                    <td className="px-4 py-3 flex gap-2">
                      <button
                        onClick={() => navigate(`/dashboard/products/edit/${product._id}`)}
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
                  <td colSpan={6} className="text-center py-6 text-gray-500">
                    No products match the filter
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