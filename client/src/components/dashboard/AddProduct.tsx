import React, { useState } from "react"
import { addProduct } from "../../api/product.api"
import type { Product } from "../../types/product"
import { useNavigate } from "react-router-dom"

const AddProduct = () => {
    const navigate = useNavigate()

    const [form, setForm] = useState<Product>({
        name: "",
        description: "",
        price: 0,
        brand: "",
        stock: 0,
        seller: "",
        images: [],
        category: "",
    })

    // Handles text, number, and checkbox safely
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target

        if (e.target instanceof HTMLInputElement) {
            if (e.target.type === "checkbox") {
                setForm({ ...form, [name]: e.target.checked })
            } else if (e.target.type === "number") {
                setForm({ ...form, [name]: Number(value) })
            } else {
                setForm({ ...form, [name]: value })
            }
        } else {
            // textarea
            setForm({ ...form, [name]: value })
        }
    }

    // Handle images input as comma-separated URLs
    const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setForm({ ...form, images: value.split(",").map((img) => img.trim()) })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const response = await addProduct(form)
            console.log("Product added:", response.data)
            navigate("/dashboard/products")
        } catch (error) {
            console.error("Failed to add product:", error)
            alert("Failed to add product. Check console for details.")
        }
    }

    return (
        <div className="p-6 max-w-4xl mx-auto bg-white rounded-xl shadow">
            <h1 className="text-2xl font-bold mb-6">Add Product</h1>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <input
                    name="name"
                    placeholder="Product Name"
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm
                     focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200
                     outline-none transition"
                />

                <input
                    name="brand"
                    placeholder="Brand"
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm
                     focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200
                     outline-none transition"
                />

                <input
                    name="price"
                    type="number"
                    placeholder="Price"
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm
                     focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200
                     outline-none transition"
                />

                <input
                    name="stock"
                    type="number"
                    placeholder="Stock"
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm
                     focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200
                     outline-none transition"
                />

                <input
                    name="category"
                    placeholder="Category"
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm
                     focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200
                     outline-none transition"
                />

                <input
                    name="seller"
                    placeholder="Seller"
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm
                     focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200
                     outline-none transition"
                />

                <textarea
                    name="description"
                    placeholder="Description"
                    onChange={handleChange}
                    className="col-span-1 md:col-span-2 w-full rounded-lg border border-gray-300 px-4 py-2 text-sm
                     focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200
                     outline-none transition"
                />

                <input
                    name="images"
                    placeholder="Images URLs (comma separated)"
                    onChange={handleImagesChange}
                    className="col-span-1 md:col-span-2 w-full rounded-lg border border-gray-300 px-4 py-2 text-sm
                     focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200
                     outline-none transition"
                />

               

                <button
                    type="submit"
                    className="col-span-1 md:col-span-2 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition"
                >
                    Add Product
                </button>
            </form>
        </div>
    )
}

export default AddProduct