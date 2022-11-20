import path from "node:path";

import { Router } from "express";
import multer from "multer";

import { createCategory } from "./app/useCases/categories/createCategory";
import { listCategories } from "./app/useCases/categories/listCategories";
import { createProduct } from "./app/useCases/products/createProducts";
import { listProducts } from "./app/useCases/products/listProducts";
import { listProductsbyCategories } from "./app/useCases/categories/listProductsbyCategories";
import { listOrders } from "./app/useCases/order/listOrder";
import { createOrder } from "./app/useCases/order/createOrder";
import { changeorderStatus } from "./app/useCases/order/changeOrderStatus";
import { cancelOrder } from "./app/useCases/order/cancelOrder";
import { cancelProduct } from "./app/useCases/products/cancelProduct";

export const router = Router();

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, callback) {
      callback(null, path.resolve(__dirname, "..", "uploads"));
    },
    filename(req, file, callback) {
      callback(null, `${Date.now()}-${file.originalname}`);
    },
  }),
});

// List categories
router.get("/categories", listCategories);

// Create categories
router.post("/categories", createCategory);

// List products
router.get("/products", listProducts);

// Create product
router.post("/products", upload.single("image"), createProduct);

// Delet product
router.delete("/products/:productId", cancelProduct);

// Get products by category
router.get("/categories/:categoryId/products", listProductsbyCategories);

// List orders
router.get("/orders", listOrders);

// Create order
router.post("/orders", createOrder);

// Change order status
router.patch("/orders/:orderId", changeorderStatus);

// Delete/concel order
router.delete("/orders/:orderId", cancelOrder);
