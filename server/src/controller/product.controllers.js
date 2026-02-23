import productModel from "../models/product.model.js";

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, brand, stock, images } =
      req.body;

    if (!name || !description || !price || !category || !stock) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const product = await productModel.create({
      name,
      description,
      price,
      category,
      brand,
      stock,
      images,
      seller: req.user._id,
    });

    return res.status(201).json({ message: "Product created", product });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await productModel.find().populate("seller", "name email");
    return res.status(200).json({ products });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

export const getProduct = async (req, res) => {
  try {
    const product = await productModel
      .findById(req.params.id)
      .populate("seller", "name email");
    if (!product) return res.status(404).json({ message: "Product not found" });

    return res.status(200).json({ product });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (
      product.seller.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    Object.assign(product, req.body);
    await product.save();

    return res.status(200).json({ message: "Product updated", product });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (
      product.seller.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await product.remove();
    return res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

export const searchProducts = async (req, res) => {
  try {
    const { keyword, page = 1, limit = 10 } = req.query;

    if (!keyword) {
      return res.status(400).json({ message: "Search keyword is required" });
    }

    const query = {
      $or: [
        { name: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };

    const skip = (page - 1) * limit;

    const products = await productModel
      .find(query)
      .populate("seller", "name email")
      .skip(skip)
      .limit(Number(limit));

    const total = await productModel.countDocuments(query);

    return res.status(200).json({
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
      products,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

export const filterProduct = async (req, res) => {
  try {
    const {
      keyword,
      category,
      brand,
      minPrice,
      maxPrice,
      inStock,
      page = 1,
      limit = 10,
    } = req.query;

    let query = {};

    if (keyword) {
      query.$or = [
        { name: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ];
    }

    if (category) {
      query.category = category;
    }

    if (brand) {
      query.brand = brand;
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    if (inStock === "true") {
      query.stock = { $gt: 0 };
    }

    const skip = (page - 1) * limit;

    const products = await productModel
      .find(query)
      .populate("seller", "name email")
      .skip(skip)
      .limit(Number(limit));

    const total = await productModel.countDocuments(query);

    return res.status(200).json({
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
      products,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
