const { default: mongoose } = require("mongoose");
const CartModel = require("../Model/CartModel");
const ObjectID = mongoose.Types.ObjectId;

exports.cartListService = async (req, res) => {
  try {
    let user_id = new ObjectID(req.headers.user_id);
    let matchStage = { $match: { userID: user_id } };

    let JoinStageProduct = {
      $lookup: {
        from: "products",
        localField: "productID",
        foreignField: "_id",
        as: "product",
      },
    };

    let unwindProductStage = { $unwind: "$product" };

    let JoinStageBrand = {
      $lookup: {
        from: "brands",
        localField: "product.brandID",
        foreignField: "_id",
        as: "brand",
      },
    };
    let unwindBrandStage = { $unwind: "$brand" };

    let JoinStageCategory = {
      $lookup: {
        from: "categories",
        localField: "product.categoryID",
        foreignField: "_id",
        as: "category",
      },
    };
    let unwindCategoryStage = { $unwind: "$category" };

    let projectionStage = {
      $project: {
        _id: 0,
        userID: 0,
        createdAt: 0,
        updatedAt: 0,
        "product._id": 0,
        "product.categoryID": 0,
        "product.brandID": 0,
        "brand._id": 0,
        "category._id": 0,
      },
    };

    let data = await CartModel.aggregate([
      matchStage,
      JoinStageProduct,
      unwindProductStage,
      JoinStageBrand,
      unwindBrandStage,
      JoinStageCategory,
      unwindCategoryStage,
      projectionStage,
    ]);

    return { status: "success", data: data };
  } catch (error) {
    return { status: "fail", message: "Something went wrong", error: error };
  }
};

exports.SaveCartListService = async (req, res) => {
  try {
    let user_id = req.headers.user_id;
    let reqBody = req.body;
    reqBody.userID = user_id;

    await CartModel.create(reqBody);

    return { status: "Success", message: "Cart List Create Success" };
  } catch (error) {
    return { status: "fail", message: "Something went wrong", error: error };
  }
};

exports.UpdateCartListService = async (req, res) => {
    try {
      let user_id = req.headers.user_id;
      let cartID = req.params.cartID;
      let reqBody = req.body;
  
      
      await CartModel.updateOne({ _id: cartID, userID: user_id }, { $set: reqBody });
  
      return { status: "success", message: "Cart List Update Success" };
  
    } catch (error) {
      return { status: "fail", message: "Something went wrong", error: error };
    }
  };

exports.RemoveCartListService = async (req, res) => {
  try {
    let user_id = req.headers.user_id;
    let reqBody = req.body;
    reqBody.userID = user_id;

    const result = await CartModel.deleteOne(reqBody);

    if (result.deletedCount === 1) {
      return {
        status: "Success",
        message: "Cart List item deleted",
        data: result,
      };
    } else {
      return {
        status: "fail",
        message: "Cart List item not found or already deleted",
        data: result,
      };
    }
  } catch (error) {
    return { status: "fail", message: "Something went wrong", error: error };
  }
};
