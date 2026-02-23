import { useEffect, useState } from "react";
import { getProducts } from "../../api/product.api";
import type { Product } from "../../types/product";
import Filter from "./Filter";

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await getProducts();
      setAllProducts(res.data.products);
      setProducts(res.data.products);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleFilter = (filtered: Product[] | null) => {
    if (filtered === null) {
      // Reset: show all products
      setProducts(allProducts);
    } else {
      // Show filtered results (could be empty)
      setProducts(filtered);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/4">
          <Filter onFilter={handleFilter} />
        </div>

        <div className="w-full md:w-3/4">
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <p className="text-gray-500 text-lg">Loading products...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="flex justify-center items-center h-40">
              <p className="text-gray-500 text-lg">No products found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="bg-white p-4 rounded shadow hover:shadow-md transition"
                >
                  <h3 className="font-bold text-lg">{product.name}</h3>
                  <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="mt-3 flex justify-between items-center">
                    <span className="text-blue-600 font-semibold">
                      Rs.{product.price}
                    </span>
                    <span
                      className={`text-xs px-2 py-1 rounded ${product.stock > 0
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                        }`}
                    >
                      {product.stock > 0 ? "In Stock" : "Out of Stock"}
                    </span>
                  </div>
                  {product.category && (
                    <span className="inline-block mt-2 text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      {product.category}
                    </span>
                  )}
                  {product.brand && (
                    <span className="inline-block mt-2 ml-1 text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      {product.brand}
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
