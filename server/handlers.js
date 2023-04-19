const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const { v4: uuidv4 } = require("uuid");

//Get an array of all the items

const getItems = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const db = client.db("E-commerce");
  // const { lowPriceRange, highPriceRange } = req.query;
  // let queryObj = { lowPriceRange, highPriceRange};
  // let queryKeysWithValues = {};
  // Object.keys(queryObj).forEach{
  //
  // }
  try {
    await client.connect();
    let items;
    // if(){
    //   await db.collection("items").find().toArray()
    // }
    items = await db.collection("items").find().toArray();
    if (!items) {
      res.status(200).json("no items");
    }
    res.status(200).json(items);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
  client.close();
};
// get Items with Company names
const getItemsWithCompanyNames = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const db = client.db("E-commerce");
  try {
    await client.connect();
    const companiesArr = await db.collection("companies").find().toArray();
    let items;
    items = await db.collection("items").find().toArray();
    items = items.map((item) => {
      let companyName = companiesArr.find(
        (company) => company._id === item.companyId
      );
      return { ...item, companyName: companyName.name };
    });
    if (!items) {
      res.status(200).json("no items");
    }
    res.status(200).json(items);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
  client.close();
};

//Get a single item by ID

const getItemById = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const db = client.db("E-commerce");
  const _id = +req.params._id;
  try {
    await client.connect();
    const item = await db.collection("items").findOne({ _id });
    if (!items) {
      res.status(200).json("could not find item");
    }
    res.status(200).json(item);
    client.close();
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

//Get single company by ID
const getCompanyDetails = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const db = client.db("E-commerce");
  const _id = +req.params._id;

  try {
    await client.connect();
    const company = await db.collection("companies").findOne({ _id });
    const companyItems = await db
      .collection("items")
      .find({ companyId: _id })
      .toArray();
    res.status(200).json({ company, companyItems });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
  client.close();
};

const getCompaniesList = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const db = client.db("E-commerce");
  try {
    await client.connect();
    const companiesArr = await db.collection("companies").find().toArray();
    res.status(200).json(companiesArr);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

//Retrieving a cart

const getCart = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const userEmail = req.params.userEmail;
  try {
    await client.connect();
    const db = client.db("E-commerce");
    const data = await db.collection("users").findOne({ _id: userEmail });
    res.status(200).json({
      status: 200,
      result: data.cart,
      message: "Here's the user's cart",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
  client.close();
};

//handler for adding items to cart and updating stock
const addToCart = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const db = client.db("E-commerce");
  const itemInfo = req.body;
  const { userId } = req.params;
  try {
    await client.connect();
    const user = await db.collection("users").findOne({ _id: userId });
    const cart = user.cart;
    const cartItemIndex = cart.findIndex(
      //If there's no match, the value will be -1
      (item) => item.product._id === itemInfo.product._id
    );
    if (cartItemIndex >= 0) {
      cart[cartItemIndex].quantity =
        cart[cartItemIndex].quantity + itemInfo.quantity;
    } else {
      cart.push({ product: itemInfo.product, quantity: itemInfo.quantity });
    }

    const mongoRes = await db
      .collection("users")
      .updateOne({ _id: userId }, { $set: { cart: cart } });
    res.status(200).json(mongoRes);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
  client.close();
};

//removing items from cart
const removeFromCart = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const db = client.db("E-commerce");
  const { item, userEmail } = req.body;
  // const itemId = req.body.itemId;
  try {
    await client.connect();
    const mongoRes = await db
      .collection("users")
      .updateOne(
        { _id: userEmail },
        { $pull: { cart: { "product._id": +item } } }
      );

    res.status(200).json(mongoRes);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
  client.close();
};

//Checkout Handler

const checkout = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const db = client.db("E-commerce");
  const orderData = req.body;
  const date = new Date();
  const orderId = uuidv4();
  try {
    await client.connect();
    const userObj = await db
      .collection("users")
      .findOne({ _id: orderData.userId });
    const mongoStockRes = [];
    if (userObj) {
      const userCart = userObj.cart;

      for (const item of userCart) {
        const mongoRes = await db
          .collection("items")
          .updateOne(
            { _id: item.product._id },
            { $inc: { numInStock: -item.quantity } }
          );
        mongoStockRes.push(mongoRes);
      }
    } else {
      res.status(200).json("user not found");
    }
    const mongoClearCart = await db
      .collection("users")
      .updateMany({ _id: orderData.userId }, { $set: { cart: [] } });
    const mongoOrderRes = await db.collection("users").updateOne(
      { _id: orderData.userId },
      {
        $push: { order: { itemsArr: userObj.cart, date, orderId, orderData } },
      }
    );
    const mongoAllOrdersRes = await db
      .collection("all-orders")
      .insertOne({ itemsArr: userObj.cart, date, _id: orderId, orderData });
    res
      .status(200)
      .json({ mongoOrderRes, mongoStockRes, mongoAllOrdersRes, orderId });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
  client.close();
};

const addUser = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const db = client.db("E-commerce");
  const { userId } = req.params;
  try {
    await client.connect();
    let existingUser = await db.collection("users").findOne({ _id: userId });

    if (!existingUser) {
      await db
        .collection("users")
        .insertOne({ _id: userId, cart: [], order: [] });
      return res.status(200).json("new user created");
    } else {
      res.status(200).json("user exists");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
  client.close();
};

//Getting all the categories from the item
const getCategoryItems = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const db = client.db("E-commerce");
  const { category } = req.params;
  try {
    await client.connect();
    const categoryItems = await db
      .collection("items")
      .find({ category: category })
      .toArray();
    const companiesArr = await db.collection("companies").find().toArray();
    let items = categoryItems.map((item) => {
      let companyName = companiesArr.find(
        (company) => company._id === item.companyId
      );
      return { ...item, companyName: companyName.name };
    });
    res.status(200).json(items);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
  client.close();
};

//Getting a single order

const getOrder = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const db = client.db("E-commerce");
  const { orderId } = req.params;
  try {
    await client.connect();
    const order = await db.collection("all-orders").findOne({ _id: orderId });
    if (order) {
      res.status(200).json(order);
    } else {
      res.status(400).json("order not found");
    }
  } catch (err) {}
  client.close();
};

//Return an array of all the orders
const getAllOrders = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const db = client.db("E-commerce");
  const { userId } = req.params;
  try {
    await client.connect();
    const user = await db.collection("users").findOne({ _id: userId });
    if (user) {
      res.status(200).json(user.order);
    } else {
      res.status(400).json("user not found");
    }
  } catch (err) {}
  client.close();
};

module.exports = {
  getItems,
  getItemById,
  getCompanyDetails,
  getCompaniesList,
  getItemsWithCompanyNames,
  addToCart,
  removeFromCart,
  //   updateStock,
  checkout,
  getCart,
  addUser,
  getCategoryItems,
  getOrder,
  getAllOrders,
};
