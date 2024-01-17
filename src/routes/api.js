const {
  ProductBrandList,
  ProductCategoryList,
  ProductSliderList,
  ProductListByBrand,
  ProductListByCategory,
  ProductListByRemark,
  ProductListBySimilar,
  ProductDetails,
  ProductListByKeyWord,
  ProductReviewList,
  createReview,
  CreateReview,
} = require("../controllers/ProductController");
const { SiteInfoController } = require("../controllers/SiteInfoController");
const IsLogIN = require("../Middleware/AuthVerify");
const {
  UerOTP,
  verifyLogin,
  Logout,
  CreateProfile,
  UpdateProfile,
  ReadProfile,
} = require("../controllers/UserController");
const {
  WishList,
  SaveWishList,
  RemoveWishList,
} = require("../controllers/WishListController");
const {
  cartList,
  SaveCartList,
  RemoveCartList,
  UpdateCartList,
} = require("../controllers/CartListController");
const {
  CreateInvoice,
  PaymentFail,
  PaymentCancel,
  PaymentIPN,
  PaymentSuccess,
  InvoiceList,
  InvoiceProductList,
} = require("../controllers/InvoiceController");
const { FeatureListController } = require("../controllers/FeaturesController");

const router = require("express").Router();

// root verify server responding is okay ?
router.get("/", SiteInfoController),
  //product
  router.get("/ProductBrandList", ProductBrandList);
router.get("/ProductCategoryList", ProductCategoryList);
router.get("/ProductSliderList", ProductSliderList);
router.get("/ProductListByBrand/:BrandID", ProductListByBrand);
router.get("/ProductListByCategory/:CategoryID", ProductListByCategory);
router.get("/ProductListByRemark/:Remark", ProductListByRemark);
router.get("/ProductBySimilar/:CategoryID", ProductListBySimilar);
router.get("/ProductDetails/:ProductID", ProductDetails);
router.get("/ProductListByKeyword/:Keyword", ProductListByKeyWord);
router.get("/ProductReviewList/:ProductID", ProductReviewList);

//user

router.get("/userOTP/:email", UerOTP);
router.get("/VerifyLogin/:email/:otp", verifyLogin);
router.get("/UserLogOut/", IsLogIN, Logout);
router.post("/CreateProfile/", IsLogIN, CreateProfile);
router.post("/UpdateProfile/", IsLogIN, UpdateProfile);
router.get("/ReadProfile/", IsLogIN, ReadProfile);

// wishList

router.get("/WistList", IsLogIN, WishList);
router.post("/SaveWishList", IsLogIN, SaveWishList);
router.post("/RemoveWishList", IsLogIN, RemoveWishList);

// CartList

router.get("/CartList", IsLogIN, cartList);
router.post("/SaveCartList", IsLogIN, SaveCartList);
router.post("/UpdateCartList/:cartID", IsLogIN, UpdateCartList);
router.post("/RemoveCartList", IsLogIN, RemoveCartList);

//Invoice & payment

router.get("/CreateInvoice", IsLogIN, CreateInvoice);
router.get("/InvoiceList", IsLogIN, InvoiceList);
router.get("/InvoiceProductList/:invoice_id", IsLogIN, InvoiceProductList);

router.post("/PaymentSuccess/:trxId", IsLogIN, PaymentSuccess);
router.post("/PaymentCancel/:trxId", IsLogIN, PaymentCancel);
router.post("/PaymentFail/:trxId", IsLogIN, PaymentFail);
router.post("/PaymentIPN/:trxId", IsLogIN, PaymentIPN);

// Features
router.get("/FeatureList", FeatureListController);
//create Review
router.post("/CreateReview/", IsLogIN, CreateReview);

module.exports = router;
