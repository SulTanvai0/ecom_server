const { SaveCartListService, RemoveCartListService, cartListService, UpdateCartListService } = require("../services/CartListServices");

exports.cartList = async (req ,  res) =>{
    let result = await cartListService(req);
    res.status(200).json(result);
}

exports.SaveCartList = async (req ,  res) =>{
    let result = await SaveCartListService(req);
    res.status(200).json(result);
}

exports.UpdateCartList = async (req ,  res) =>{
    let result = await UpdateCartListService(req);
    res.status(200).json(result);
}

exports.RemoveCartList = async (req ,  res) =>{
    let result = await RemoveCartListService(req);
    res.status(200).json(result);
}