/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API for managing users
 *
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      required:
 *        - email
 *        - password
 *        - name
 *      properties:
 *        email:
 *          type: string
 *          description: The email of the user
 *        password:
 *          type: string
 *          description: The password of the user
 *        name:
 *          type: string
 *          description: The name of the user
 *        photo:
 *          type: string
 *          description: The photo URL of the user
 *        role:
 *          type: string
 *          description: The role of the user (admin or user)
 *      example:
 *        email: john@example.com
 *        password: password123
 *        name: March
 *        photo: https://example.com/john.jpg
 *        role: user
 */

const verifyToken = require("../middleWare/verifyToken");
const verifyAdmin = require("../middleWare/verifyAdmin");
const express = require("express");
const router = express.Router();
const UserModel = require("../models/User.model");

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve a list of users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Internal server error
 */
router.get("/", async (req, res) => {
  try {
    const userData = await UserModel.find();
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to retrieve
 *     responses:
 *       200:
 *         description: The user data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const userData = await UserModel.findById(id);
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: The created user data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       302:
 *         description: Email is already in use
 *       500:
 *         description: Internal server error
 */
router.post("/", async (req, res) => {
  const user = req.body;
  try {
    const existingUser = await UserModel.findOne({ email: user.email });

    if (existingUser) {
      return res.status(302).json({ message: "Email is already in use" });
    }

    if (!user.photo) {
      user.photo =
        "https://static.wikia.nocookie.net/worldofmayhem_gamepedia_en/images/8/81/Bugs_Bunny_%28artwork%29.png/revision/latest/scale-to-width-down/1200?cb=20210205220852";
    }

    const newCart = new UserModel(req.body);
    const savedCart = await newCart.save();
    return res.status(201).json(savedCart);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The updated user data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.put("/:id", async (req, res) => {
  try {
    const user = await UserModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to delete
 *     responses:
 *       200:
 *         description: The deleted user data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", async (req, res) => {
  try {
    const user = await UserModel.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /users/admin/{email}:
 *   get:
 *     summary: Check if a user is admin
 *     tags: 
 *       - Users
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         type: string
 *         description: The email of the user to check
 *     responses:
 *       200:
 *         description: Whether the user is an admin or not
 *         schema:
 *           type: boolean
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

router.get("/admin/:email", verifyToken, async (req, res) => {
  try {
    const { email } = req.params;
    const userData = await UserModel.findOne({ email });
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }
    const isAdmin = userData.role === "admin";
    res.status(200).json(isAdmin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /users/user/{id}/{roles}:
 *   patch:
 *     summary: Update user role (admin to user or user to admin)
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to update
 *       - in: path
 *         name: roles
 *         required: true
 *         schema:
 *           type: string
 *         description: The role to update (admin or user)
 *     responses:
 *       200:
 *         description: The updated user data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.patch("/user/:id/:roles", verifyToken, verifyAdmin, async (req, res) => {
  const { id, roles } = req.params;
  try {
    let roleToUpdate;
    if (roles === "admin") {
      roleToUpdate = "user";
    } else if (roles === "user") {
      roleToUpdate = "admin";
    }

    const updateRole = await UserModel.findByIdAndUpdate(
      id,
      { role: roleToUpdate },
      { new: true, runValidators: true }
    );

    if (!updateRole) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updateRole);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
