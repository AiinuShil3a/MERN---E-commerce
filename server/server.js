const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const mongoose = require("mongoose");
const ProductRouter = require("./routes/productrouter")
const CartRouter = require("./routes/cartrouter")
const UserRouter = require("./routes/user.router")
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const jwt = require('jsonwebtoken')


require("dotenv").config();

const app = express();
const CLIENT_URL = process.env.CLIENT_URL
app.use(cors({ credentials: true, origin: CLIENT_URL }));
app.use(express.json());



const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Resful-API-SEShop',
    version: '1.0.0',
    description:
      'This is a REST API application made with Express for SE Shop',
    license: {
      name: 'Licensed Under MIT',
      url: 'https://spdx.org/licenses/MIT.html',
    },
    contact: {
      name: 'AiinuShil3a',
      url: 'https://github.com/AiinuShil3a',
    },
  },
  servers: [
    {
      url: 'http://localhost:4000',
      description: 'Development server',
    },
  ],
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

const MONGODB_URL = process.env.MONGODB_URL;
mongoose.connect(MONGODB_URL);


app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get("/", (req, res) => {
  res.send("<h1> Welcome to restful API Blog</h1>");
});
app.use("/products", ProductRouter)
app.use("/carts", CartRouter)
app.use("/users", UserRouter)

app.post("/jwt" , async (req,res) => {
  const user = req.body;
  const token = jwt.sign(user, process.env.SECRET, { expiresIn: '1h' });
  res.json({ token });
});

const PORT = process.env.PORT;
const server = app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
});