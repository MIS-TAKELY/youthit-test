
import Product from "../models/Product.js";


export const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, brand, stock, images } = req.body;

    if (!name || !description || !price || !category || !stock) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const product = await Product.create({
      name,
      description,
      price,
      discountPrice,
      category,
      brand,
      stock,
      images,
      seller: req.user._id,
    });

    return res.status(201).json({ message: "Product created", product });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("seller", "name email");
    return res.status(200).json({ products });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("seller", "name email");
    if (!product) return res.status(404).json({ message: "Product not found" });

    return res.status(200).json({ product });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Only seller who owns it or admin
    if (product.seller.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" });
    }

    Object.assign(product, req.body);
    await product.save();

    return res.status(200).json({ message: "Product updated", product });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Only seller who owns it or admin
    if (product.seller.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" });
    }

    await product.remove();
    return res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};