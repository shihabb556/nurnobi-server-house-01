import { Category } from "../models/category.model.js";


// for adding category - Admin route
export const addCategory = async (req, res) => {
    try {
      const { name } = req.body;
      const category = new Category({ name });
      await category.save();
      res.status(201).json({ message: 'Category created successfully', category });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }


  //route for get all category - Public Route
  export const getCategories = async (req,res)=>{
    try {
      const categories = Category.find({});
      res.status(200).json({categoriesS})      
    } catch (error) {
      res.staus(400).json({error:error.message})
    }
  };