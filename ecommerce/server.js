const express = require("express");
const fs = require("fs").promises;
const path = require("path");

const app = express();
app.use(express.json());

const datapath = path.join(__dirname, "data");

// Helper: Read JSON file
async function readFileOperation(file) {
  const content = await fs.readFile(path.join(datapath, file), "utf8");
  return JSON.parse(content);
}

// Helper: Write JSON file
async function writeFunctionOperation(file, data) {
  await fs.writeFile(
    path.join(datapath, file),
    JSON.stringify(data, null, 2),
    "utf8"
  );
}

// GET all products
app.get("/product", async (req, res) => {
  try {
    const product = await readFileOperation("product.json");
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: "Failed to read products" });
  }
});

// POST a new product
app.post("/product", async (req, res) => {
  try {
    const product = await readFileOperation("product.json");
    const newProduct = { id: product.length + 1, ...req.body };
    product.push(newProduct);
    await writeFunctionOperation("product.json", product);
    res.status(201).json(newProduct);
  } catch (err) {
    console.error("POST /product error:", err);
    res.status(500).json({ error: "Failed to add product" });
  }
});

// GET product by ID
app.get("/product/:id", async (req, res) => {
  try {
    const product = await readFileOperation("product.json");
    const productid = parseInt(req.params.id);
    const data = product.find((p) => p.id === productid);
    if (data) {
      res.json({ message: "Product found", info: data });
    } else {
      res.status(404).json({ message: "Product doesn't exist" });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch product by ID" });
  }
});

//POST product in orders
app.post("/order", async (req, res) => {
  const products = await readFileOperation("product.json");
  const orders = await readFileOperation("order.json");
  const { productid, quantity } = req.body;
  const order = products.find((p) => p.id === productid);
  if (order) {
    const newOrder = {
      id: orders.length + 1,
      data: order,
      total: order.price * quantity,
      timeStamp: new Date().toISOString(),
    };
    orders.push(newOrder);
    writeFunctionOperation("order.json", orders);
    res.status(201).json(newOrder);
  } else {
    res.status(404).json({ message: "product not found" });
  }
});


//Put product in product.json

app.put('/product/:id',async(req,res)=>{
  const {name,price}=req.body;
  const productid=parseInt(req.params.id)
  const products=await readFileOperation('product.json')
  const product=products.find(p=>p.id===productid)
  if(product){
    product.name=name
    product.price=price
    await writeFunctionOperation('product.json',products)
    res.status(200).json({"message":"Data updated",data:product})
  }
  else{
    res.status(404).json({"messgae":"Product not found"})
  }
})


//Delete product from product.json

app.delete("/product", async (req, res) => {
  const { productid } = req.body;
  const products = await readFileOperation("product.json");
  const newproducts = products.filter((p) => p.id !== productid);
  if (newproducts.length != products.length) {
    writeFunctionOperation("product.json", newproducts);
    return res.status(200).json({ message: "Deleted sucessfully" });
  } else {
    return res.status(404).json({ message: "product not found" });
  }
});

//Delete order from order.json

app.delete("/order", async (req, res) => {
  const { orderid } = req.body;
  const orders = await readFileOperation("order.json");
  const neworders = orders.filter((o) => o.id !== orderid);
  if (neworders.length != orders.length) {
    writeFunctionOperation("order.json", neworders);
    return res.status(200).json({ message: "Deleted sucessfully" });
  } else {
    return res.status(404).json({ message: "Order not found" });
  }
});

// Start the server
app.listen(3001, () => {
  console.log(`Your code is running on http://localhost:3001/`);
});
