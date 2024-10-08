import path from "node:path";

import { Request, Response, Router } from "express";
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
import { createUsers } from "./app/useCases/user/createUsers";
// import { listUsers } from "./app/useCases/user/listUsers";
import { listUsersbyRestaurant } from "./app/useCases/user/listUsersByRestaurant";
import { createRestaurant } from "./app/useCases/restaurant/createRestaurant";
import { listRestaurant } from "./app/useCases/restaurant/listRestaurant";
import { cancelRestaurant } from "./app/useCases/restaurant/cancelRestaurant";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "./app/models/Users";
import bcrypt from "bcrypt";
import { authenticateToken } from "./app/middlewares/authenticateToken";
import { getProfile } from "./app/useCases/user/getProfile";
import { editUser } from "./app/useCases/user/editUser";
import { UpdatePassword } from "./app/useCases/user/updatePassword";
import { listOrdersByWaiter } from "./app/useCases/order/listOrderByWaiter";
import { deleteCategory } from "./app/useCases/categories/deleteCategory";
import { deleteUser } from "./app/useCases/user/deleteUser";
import { AddIngredients } from "./app/useCases/products/AddIngredients";

dotenv.config();

export const router = Router();

const jwtSecret = process.env.JWT_SECRET;

if (!jwtSecret) {
  throw new Error("JWT_SECRET não está definido");
}

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
router.get("/categories/:restaurantId", authenticateToken, listCategories);

// Create categories
router.post("/categories", authenticateToken, createCategory);

// Delete/concel category
router.delete("/categories/:categoryId", authenticateToken, deleteCategory);

// List products
router.get("/products/:restaurantId", authenticateToken, listProducts);

// Create product
router.post(
  "/products",
  authenticateToken,
  upload.single("image"),
  createProduct
);

router.put(
  "products/ingredients/:productId",
  authenticateToken,
  AddIngredients
);

// Delet product
router.delete("/products/:productId", authenticateToken, cancelProduct);

// Get products by category
router.get(
  "/categories/:categoryId/products",
  authenticateToken,
  listProductsbyCategories
);

// List orders
router.get("/orders", authenticateToken, listOrders);

// List orders by restaurant
router.get("/orders/:restaurantId", authenticateToken, listOrders);

// List orders by waiter
router.get(
  "/orders/:restaurantId/waiter/:waiterId",
  authenticateToken,
  listOrdersByWaiter
);

// Create order
router.post("/orders", authenticateToken, createOrder);

// Change order status
router.patch("/orders/:orderId", authenticateToken, changeorderStatus);

// Delete/concel order
router.delete("/orders/:orderId", authenticateToken, cancelOrder);

// // List users
// router.get("/users", listUsersbyRestaurant);

// List users by restaurant
router.get("/users/:restaurantId", authenticateToken, listUsersbyRestaurant);

// Create user
router.post("/users", authenticateToken, createUsers);

router.put("/users/:userId", authenticateToken, editUser);

router.put("/users/update-password/:userId", authenticateToken, UpdatePassword);

// delete user
router.delete("/users/:userId", authenticateToken, deleteUser);

// Profile
router.get("/profile", authenticateToken, getProfile);

// List restaurants
router.get("/restaurants", authenticateToken, listRestaurant);

// Create restaurant
router.post("/restaurants", createRestaurant);

// Delete/concel restaurant
router.delete(
  "/restaurants/:restaurantId",
  authenticateToken,
  cancelRestaurant
);

router.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(401).json({ error: "Email ou senha inválidos" });
  }

  try {
    // console.log(email);
    // const user = await User.findOne({ where: { email } });

    // console.log(user);

    const users = await User.find();

    const user = users.find((user) => user.email === email);

    if (!user) {
      return res.status(401).json({ error: "Email ou senha inválidos" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Senha inválida" });
    }

    const accessToken = jwt.sign(
      { userId: user.id, email: user.email, restaurantId: user.restaurantId },
      jwtSecret,
      { expiresIn: "8h" }
    );

    const user_role = user.role;

    res.json({ token: accessToken, role: user_role });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});
