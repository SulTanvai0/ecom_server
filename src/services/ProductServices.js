const { default: mongoose } = require("mongoose");
const brandModel = require("../model/BrandModel");
const categoryModel = require("../model/CategoryModel");
const productSliderModel = require("../model/ProductSliderModel");
const productModel = require("../model/ProductModel");
const ReviewModel = require("../model/ReviewModel");

const ObjectID = mongoose.Types.ObjectId;

exports.BrandListService = async () => {
  try {
    const result = await brandModel.find();
    return { status: "success", data: result };
  } catch (err) {
    return { status: "fail", data: err }.toString();
  }
};
exports.CategoryListService = async (req, res) => {
  try {
    const result = await categoryModel.find();
    return { status: "success", data: result };
  } catch (err) {
    return { status: "fail", data: err }.toString();
  }
};
exports.SliderListService = async (req, res) => {
  try {
    const result = await productSliderModel.find();
    return { status: "success", data: result };
  } catch (err) {
    return { status: "fail", data: err }.toString();
  }
};

exports.ListByBrandService = async (req) => {
  try {
    let BrandId = new ObjectID(req.params.BrandID);
    console.log(BrandId);

    let MatchStage = { $match: { brandID: BrandId } };
    let JoinWithBrandStage = {
      $lookup: {
        from: "brands",
        localField: "brandID",
        foreignField: "_id",
        as: "brand",
      },
    };
    let JoinWithCategoryStage = {
      $lookup: {
        from: "categories",
        localField: "categoryID",
        foreignField: "_id",
        as: "category",
      },
    };

    let UnwindBrandStage = { $unwind: "$brand" };
    let UnwindCategoryStage = { $unwind: "$category" };

    let projectionStage = {
      $project: {
        "brand._id": 0,
        "category._id": 0,
        categoryID: 0,
        brandID: 0,
        createdAt: 0,
        updatedAt: 0,
      },
    };
    let result = await productModel.aggregate([
      MatchStage,
      JoinWithBrandStage,
      JoinWithCategoryStage,
      UnwindBrandStage,
      UnwindCategoryStage,
      projectionStage,
    ]);

    return { status: "success", data: result };
  } catch (err) {
    return { status: "fail", data: err };
  }
};

exports.ListByCategoryService = async (req, res) => {
  try {
    let CategoryID = new ObjectID(req.params.CategoryID);
    let MatchStage = { $match: { categoryID: CategoryID } };

    let JoinWithBrandStage = {
      $lookup: {
        from: "brands",
        localField: "brandID",
        foreignField: "_id",
        as: "brand",
      },
    };
    let JoinWithCategoryStage = {
      $lookup: {
        from: "categories",
        localField: "categoryID",
        foreignField: "_id",
        as: "category",
      },
    };

    let UnwindBrandStage = { $unwind: "$brand" };
    let UnwindCategoryStage = { $unwind: "$category" };

    let projectionStage = {
      $project: {
        "brand._id": 0,
        "category._id": 0,
        categoryID: 0,
        brandID: 0,
        createdAt: 0,
        updatedAt: 0,
      },
    };
    let result = await productModel.aggregate([
      MatchStage,
      JoinWithBrandStage,
      JoinWithCategoryStage,
      UnwindBrandStage,
      UnwindCategoryStage,
      projectionStage,
    ]);

    return { status: "success", data: result };
  } catch (err) {
    return { status: "fail", data: err };
  }
};

exports.ListByRemarkService = async (req, res) => {
  try {
    let Remark = req.params.Remark;

    let MatchStage = { $match: { remark: Remark } };
    let JoinWithBrandStage = {
      $lookup: {
        from: "brands",
        localField: "brandID",
        foreignField: "_id",
        as: "brand",
      },
    };
    let JoinWithCategoryStage = {
      $lookup: {
        from: "categories",
        localField: "categoryID",
        foreignField: "_id",
        as: "category",
      },
    };

    let UnwindBrandStage = { $unwind: "$brand" };
    let UnwindCategoryStage = { $unwind: "$category" };

    let projectionStage = {
      $project: {
        "brand._id": 0,
        "category._id": 0,
        categoryID: 0,
        brandID: 0,
        createdAt: 0,
        updatedAt: 0,
      },
    };
    let result = await productModel.aggregate([
      MatchStage,
      JoinWithBrandStage,
      JoinWithCategoryStage,
      UnwindBrandStage,
      UnwindCategoryStage,
      projectionStage,
    ]);

    return { status: "success", data: result };
  } catch (err) {
    return { status: "fail", data: err };
  }
};
exports.ListBySimilarService = async (req, res) => {
  try {
    let CategoryID = new ObjectID(req.params.CategoryID);

    let MatchStage = { $match: { categoryID: CategoryID } };
    let limitStage = { $limit: 20 };
    let JoinWithBrandStage = {
      $lookup: {
        from: "brands",
        localField: "brandID",
        foreignField: "_id",
        as: "brand",
      },
    };
    let JoinWithCategoryStage = {
      $lookup: {
        from: "categories",
        localField: "categoryID",
        foreignField: "_id",
        as: "category",
      },
    };

    let UnwindBrandStage = { $unwind: "$brand" };
    let UnwindCategoryStage = { $unwind: "$category" };

    let projectionStage = {
      $project: {
        "brand._id": 0,
        "category._id": 0,
        categoryID: 0,
        brandID: 0,
        createdAt: 0,
        updatedAt: 0,
      },
    };
    let result = await productModel.aggregate([
      MatchStage,
      limitStage,
      JoinWithBrandStage,
      JoinWithCategoryStage,
      UnwindBrandStage,
      UnwindCategoryStage,
      projectionStage,
    ]);

    return { status: "success", data: result };
  } catch (err) {
    return { status: "fail", data: err }.toString();
  }
};
exports.DetailsService = async (req, res) => {
  try {
    let ProductID = new ObjectID(req.params.ProductID);

    let MatchStage = { $match: { _id: ProductID } };

    let JoinWithBrandStage = {
      $lookup: {
        from: "brands",
        localField: "brandID",
        foreignField: "_id",
        as: "brand",
      },
    };
    let JoinWithCategoryStage = {
      $lookup: {
        from: "categories",
        localField: "categoryID",
        foreignField: "_id",
        as: "category",
      },
    };
    let JoinWithDetailsStage = {
      $lookup: {
        from: "productDetails",
        localField: "_id",
        foreignField: "productID",
        as: "details",
      },
    };

    let UnwindBrandStage = { $unwind: "$brand" };
    let UnwindCategoryStage = { $unwind: "$category" };
    let UnwindDetailsStage = { $unwind: "$details" };

    let projectionStage = {
      $project: {
        "brand._id": 0,
        "category._id": 0,
        createdAt: 0,
        updatedAt: 0,
      },
    };

    let result = await productModel.aggregate([
      MatchStage,
      JoinWithBrandStage,
      JoinWithCategoryStage,
      JoinWithDetailsStage,
      UnwindBrandStage,
      UnwindCategoryStage,
      UnwindDetailsStage,
      projectionStage,
    ]);
    return { status: "success", data: result };
  } catch (err) {
    return { status: "fail", data: err };
  }
};

exports.ListByKeyWordService = async (req, res) => {
  try {
    let searchRegex = { $regex: req.params.Keyword, $options: "i" };
    let searchParams = [{ title: searchRegex }, { shortDes: searchRegex }];
    let searchQuery = { $or: searchParams };
    let matchStage = { $match: searchQuery };

    let joinWithBrandStage = {
      $lookup: {
        from: "brands",
        localField: "brandID",
        foreignField: "_id",
        as: "brand",
      },
    };

    let joinWithCategoryStage = {
      $lookup: {
        from: "categories",
        localField: "categoryID",
        foreignField: "_id",
        as: "category",
      },
    };

    let unwindBrandStage = { $unwind: "$brand" };
    let unwindCategoryStage = { $unwind: "$category" };

    let projectionStage = {
      $project: {
        "brand._id": 0,
        "category._id": 0,
        categoryID: 0,
        brandID: 0,
        createdAt: 0,
        updatedAt: 0,
      },
    };

    const data = await productModel.aggregate([
      matchStage,
      joinWithBrandStage,
      joinWithCategoryStage,
      unwindBrandStage,
      unwindCategoryStage,
      projectionStage,
    ]);

    return { status: "success", data: data };
  } catch (err) {
    return { status: "fail", data: err };
  }
};

exports.ReviewListService = async (req) => {
  try {
    let productID = new ObjectID(req.params.ProductID);
    let matchStage = { $match: { productID: productID } };

    let joinWithProfileStage = {
      $lookup: {
        from: "profiles",
        localField: "userID",
        foreignField: "userID",
        as: "profile",
      },
    };
    let unwindProfileStage = { $unwind: "$profile" };
    let projectionStage = {
      $project: {
        des: 1,
        rating: 1,
        "profile.cus_name": 1,
      },
    };

    let data = await ReviewModel.aggregate([
      matchStage,
      joinWithProfileStage,
      unwindProfileStage,
      projectionStage,
    ]);
    return { status: "success", data: data };
  } catch (err) {
    return { status: "fail", data: err };
  }
};

exports.CreateReviewService = async (req) => {
  try {
    let user_id = req.headers.user_id;
    let reqBody = req.body;
    reqBody.userID = user_id;

    let data = await ReviewModel.create(reqBody);
    return { status: "success", data: data };
  } catch (err) {
    return { status: "fail", data: err };
  }
};
