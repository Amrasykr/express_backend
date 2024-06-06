import Products from "../model/ProductModel.js";
import Users from "../model/UserModel.js";
import { Op } from "sequelize";

// Get all products
export const getProducts = async (req, res) => {
  try {
    let response;
    if (req.role === "admin") {
      response = await Products.findAll({
        include: [
          {
            model: Users,
          },
        ],
      });
    } else {
      response = await Products.findAll({
        where: {
          userId: req.userId,
        },
        include: [
          {
            model: Users,
            attributes: ["id", "name", "email"],
          },
        ],
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Products.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!product) return res.status(404).json({ message: "Product not found" });

    let response;
    if (req.role === "admin") {
      response = await Products.findOne({
        where: {
          id: product.id,
        },
        include: [
          {
            model: Users,
            attributes: ["id", "name", "email"],
          },
        ],
      });
    } else {
      response = await Products.findOne({
        where: {
          [Op.and]: [{ id: product.id }, { userId: req.userId }],
        },
        include: [
          {
            model: Users,
            attributes: ["id", "name", "email"],
          },
        ],
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new product
export const createProduct = async (req, res) => {
  const { name, price, description } = req.body;
  try {
    const response = await Products.create({
      name,
      price,
      description,
      userId: req.userId,
    });
    res.status(201).json({ message: "Product created successfully", response });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an existing product
export const updateProduct = async (req, res) => {
  try {
    const product = await Products.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!product) return res.status(404).json({ message: "Product not found" });

    const { name, price, description } = req.body;
    if (req.role === "admin") {
      await Products.update(
        { name, price, description },
        {
          where: {
            id: product.id,
          },
        }
      );
    } else {
      if (product.userId !== req.userId) {
        return res.status(403).json({ message: "Forbidden" });
      }
      await Products.update(
        { name, price, description },
        {
          where: {
            [Op.and]: [{ id: product.id }, { userId: req.userId }],
          },
        }
      );
    }
    res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a product
export const deleteProduct = async (req, res) => {
  try {
    const product = await Products.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!product) return res.status(404).json({ message: "Product not found" });

    const { name, price, description } = req.body;
    if (req.role === "admin") {
      await Products.destroy({
        where: {
          id: product.id,
        },
      });
    } else {
      if (product.userId !== req.userId) {
        return res.status(403).json({ message: "Forbidden" });
      }
      await Products.destroy({
        where: {
          [Op.and]: [{ id: product.id }, { userId: req.userId }],
        },
      });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
