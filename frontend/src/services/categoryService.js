const { Category } = require("../models/Category");

module.exports = {
  create: async (req, res, next) => {
    try {
      const { category } = req.body
      console.log(' >>> Category new : ' + req.body.description);
      //Create new post
      const newCategory = await new Category(category).save();

      //Send the response
      res.send({
        data: {
            category: newCategory
        },
        status: {
          code: 200,
          message: "Successfully correct",
          succeeded: true
        }
      })
    } catch(err) {
      //Send the error
      next(err)
    }
  },
  find: async (req, res, next) => {
    try {
      const { search="", searchBy="title", order='desc', orderBy='createdAt' } = req.query;
      
      //Find, sort and paginate the Category
      const theCategory = await Category.paginate({ [searchBy]: { $regex : `${search}` } }, { sort: { [orderBy]: order } });
console.log("-- Find ajillaj bna ----");
console.log(theCategory);
      //Send the response
      res.send({
        data: {
          category: theCategory.docs,
          total: theCategory.total
        },
        status: {
          code: 200,
          message: "Successfully correct",
          succeeded: true
        }
      })
    } catch(err){
      //Send the error
      next(err)
    }
  },
  findOne: async (req, res, next) => {
    try {
      const { id } = req.params;

      //Find a post by Id
      const theCategory = await theCategory.findById(id);

      //Send the response
      res.send({
        data: {
          category: theCategory
        },
        status: {
          code: 200,
          message: "Successfully correct",
          succeeded: true
        }
      })
    } catch(err){
      //Send the error
      next(err)
    }
  },
  update: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { category } = req.body;

      //Find a category by Id and update
      const theCategory = await Category.findByIdAndUpdate(id, { ...category });

      //Send the response
      res.send({
        data: {
            category: theCategory
        },
        status: {
          code: 200,
          message: "Successfully correct",
          succeeded: true
        }
      })
    } catch(err){
      //Send the error
      next(err)
    }
  },
  destroy: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { category } = req.body;

      //Find a category by id and remove it
      const theCategory = await Category.findByIdAndRemove(id);

      //Send the response
      res.send({
        status: {
          code: 200,
          message: "Successfully correct",
          succeeded: true
        }
      })
    } catch(err){
      //Send the error
      next(err)
    }
  }
}