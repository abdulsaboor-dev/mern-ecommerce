const Products = require("../models/productModal");
const Category = require("../models/Category");

const controllerAddProduct = async (req, res) => {
  try {
    const { name, price, stock, category } = req.body;
    //console.log(category);
    // Find Category by Name if String is Passed
    let categoryId = category;
    if (typeof category === "string") {
      const existingCategory = await Category.findOne({
        name: category.toLowerCase(),
      });
      if (!existingCategory) {
        return res
          .status(400)
          .json({ status: false, message: "Invalid category name." });
      }
      categoryId = existingCategory._id; // Convert category name to ObjectId
      //console.log(categoryId);
    }

    const newProduct = new Products({
      name,
      price,
      stock,
      category: categoryId,
    });

    // const createNewProduct = new Products(req.body);
    await newProduct.save();
    res.status(201).json({
      status: true,
      message: "Product added successfully!",
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error adding product, please trying again later",
    });
  }
};

const controllerGetAllProducts = async (req, res) => {
  try {
    
    const allProducts = await Products.find({});
    const totalProducts = allProducts.length;

    // get record from category through populate query and show only name from category table & - sign is use incldue property from object.
    //const allProductWithDetail = await Products.find().populate("category"); // only get from category detail without conditions
    const productRecord = await Products.find()
      .populate({ path: "category", select: "name -_id" }) // ("category")
      .skip()
      .sort({ name: 1 });
    //console.log(productRecord);

    res.status(201).json({
      status: true,
      productRecord,
      totalProducts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "Error fetching products, please try again later",
    });
  }
};

const getProductsByPagination = async (req, res) => {
  try {

    // page and limit from query params
    let { page, limit } = req.query;

    page = parseInt(page) || 1; // default page 1
    limit = parseInt(limit) || 5; // default 5 per page

    const skip = (page - 1) * limit;

    // get records with pagination
     const allProducts = await Products.find({});
    const totalProducts = allProducts.length;

    const getAllProductsList = await Products.find().skip(skip).limit(limit);
    const pagProductLength = getAllProductsList.length;

    res.status(201).json({
      status: true,
      getAllProductsList,
      pagProductLength,
      totalProducts
    });

  } catch (err) {
    console.log("eror");  
  }
};

const productsFilterByNamePrice = async (req, res) => { 
  
}

module.exports = { controllerAddProduct, controllerGetAllProducts, getProductsByPagination };
