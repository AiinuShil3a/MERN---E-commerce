const verifyToken = require("../middleWare/verifyToken")
const verifyAdmin = require("../middleWare/verifyAdmin")
const express = require("express");
const router = express.Router();
const UserModel = require("../models/User.model");

router.get("/", async (req, res) => {
  try {
    const userData = await UserModel.find();
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const userData = await UserModel.findById(id);
    if (!userData) {
      return res.status(404).json({ message: "userData Not Found" });
    }
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  const user = req.body;
  try {
    const existingUser = await UserModel.findOne({ email: user.email });

    if (existingUser) {
      return res.status(302).json({ message: "email can't used" }); // ใส่ return ที่นี่
    }

    if (!user.photo) {
        user.photo = "https://static.wikia.nocookie.net/worldofmayhem_gamepedia_en/images/8/81/Bugs_Bunny_%28artwork%29.png/revision/latest/scale-to-width-down/1200?cb=20210205220852";
    }
    const newCart = new UserModel(req.body);

    // บันทึกลงในฐานข้อมูล
    const savedCart = await newCart.save();

    return res.status(201).json(savedCart); // ใส่ return ที่นี่
  } catch (error) {
    return res.status(500).json({ message: error.message }); // ใส่ return ที่นี่
  }
});

router.put("/:id", async (req, res) => {
  try {
    const user = await UserModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) {
      return res.status(404).json({ message: "Users Not Found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const user = await UserModel.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "Users Not Found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//check roles
router.get("/admin/:email",verifyToken, async (req, res) => {
  try {
    const { email } = req.params;
    const userData = await UserModel.findOne({ email });
    let isAdmin = false;
    if (userData.role === "admin") {
      isAdmin = true;
    }
    if (!userData) {
      return res.status(404).json({ message: "userData Not Found" });
    }
    res.status(200).json(isAdmin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//change admin to user and change user to admin
//patch ใช้แก้แค่บางส่วนใน Objects
router.patch("/user/:id/:roles",verifyToken,verifyAdmin, async (req, res) => {
    const { id, roles } = req.params;
    try {
      let roleToUpdate;
      if (roles === "admin") {
        roleToUpdate = "user";
      } else if (roles === "user"){
        roleToUpdate = "admin";
      }
  
      const updateRole = await UserModel.findByIdAndUpdate(
        id,
        { role: roleToUpdate },
        { new: true, runValidators: true }
      );
  
      if (!updateRole) {
        return res.status(404).json({ message: "userData Not Found" });
      }
  
      res.status(200).json(updateRole);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
module.exports = router;
