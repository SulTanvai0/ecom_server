const {BrandListService,
    CategoryListService,
    SliderListService,
    ListByBrandService,
    ListByCategoryService,
    ListBySimilarService,
    ListByKeyWordService,
    ListByRemarkService,
    DetailsService,
    ReviewListService,
    CreateReviewService} = require('../services/ProductServices')

exports.ProductBrandList = async (req, res)=>{
    let result = await BrandListService();
    return res.status(200).json(result);
}
exports.ProductCategoryList = async (req, res)=>{
    let result = await CategoryListService();
    return res.status(200).json(result);
}
exports.ProductSliderList = async (req, res)=>{
    let result = await SliderListService();
    return res.status(200).json(result);
}

exports.ProductListByBrand = async (req, res)=>{
    let result = await ListByBrandService(req);
    return res.status(200).json(result);
}
exports.ProductListByCategory = async (req, res)=>{
    let result = await ListByCategoryService(req);
    return res.status(200).json(result);
}
exports.ProductListByRemark= async (req, res)=>{
    let result = await ListByRemarkService(req);
    return res.status(200).json(result);
}

exports.ProductListBySimilar= async (req, res)=>{
    let result = await ListBySimilarService(req);
    return res.status(200).json(result);
}
exports.ProductDetails= async (req, res)=>{
    let result = await DetailsService(req);
    return res.status(200).json(result);
}


exports.ProductListByKeyWord= async (req, res)=>{
    let result = await ListByKeyWordService(req);
    return res.status(200).json(result);
}


exports.ProductReviewList= async (req, res)=>{
    let result = await ReviewListService(req);
    return res.status(200).json(result);
}
exports.CreateReview= async (req, res)=>{
    let result = await CreateReviewService(req);
    return res.status(200).json(result);
}