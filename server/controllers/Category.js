const category = require("../models/Category");
const Category = require("../models/Category");



// creating Category

exports.createCategory = async (req, res) => {
    try{
        
    }
    catch(error)
    {

    }
}   

exports.showAllCategory = async(req, res) => {

}


exports.categoryPageDetails = async(req, res) => {
    try{
        // get CategoryId
        const {categoryId} = req.body;

        // get Course for specified Category
        const selectedCategory = await Category.findById(categoryId)
                                                        .populate("Courses")
                                                        .exec()
        
        // validation
        if(!selectedCategory)
        {
            return res.status(404).json({
                success : false,
                message : "Data Not Found"
            })
        }


        // get course for different category where $ne = not equals
        const differentCategories = await Category.find({
                                                _id : {$ne : categoryId}
                                             })
                                             .populate("courses")
                                             .exec()

        // get top selling courses
        

        // return 
        return res.status(200).json({
            success : true,
            data : {
                selectedCategory,
                differentCategories
            }
        })
    }
    catch(error)
    {
        console.log(error)
        
        return res.status(500).json({
            success : false,
            message : error.message
        })
    }
}
