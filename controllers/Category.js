const Category = require("../models/Category");

const controllerAddCategory = async (req, res) => {
    try {
        const addCategory = new Category(req.body);
        await addCategory.save();
        res.status(200).json({
            status: true,
            addCategory
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: false,
            message: "Can't add category"
        });
    }
}

const controllerGetAllCategory = async (req, res) => {
    try {
        console.log("call");
        const categoryList = await Category.find({});
        const totalCategory = categoryList.length;
        res.status(200).json({
            status: true,
            categoryList,
            totalCategory
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: false,
            message: "Category not found!"
        });
    }
}

module.exports = { controllerAddCategory, controllerGetAllCategory };