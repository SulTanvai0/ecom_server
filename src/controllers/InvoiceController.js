const {
  CreateInvoiceService,
  PaymentFailService,
  PaymentCancelService,
  PaymentIPNService,
  PaymentSuccessService,
  InvoiceListService,
  InvoiceProductListService,
} = require("../services/InvoiceServices");

exports.CreateInvoice = async (req, res) => {
  let result = await CreateInvoiceService(req);
  res.status(200).json(result);
};
exports.PaymentSuccess = async (req, res) => {
  let result = await PaymentSuccessService(req);
  res.status(200).json(result);
};
exports.PaymentFail = async (req, res) => {
  let result = await PaymentFailService(req);
  res.status(200).json(result);
};
exports.PaymentCancel = async (req, res) => {
  let result = await PaymentCancelService(req);
  res.status(200).json(result);
};
exports.PaymentIPN = async (req, res) => {
  let result = await PaymentIPNService(req);
  res.status(200).json(result);
};

exports.InvoiceList = async (req, res) => {
  let result = await InvoiceListService(req);
  res.status(200).json(result);
};
exports.InvoiceProductList = async (req, res) => {
  let result = await InvoiceProductListService(req);
  res.status(200).json(result);
};
