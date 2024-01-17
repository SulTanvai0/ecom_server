const {
  UserOTPService,
  verifyLoginService,
  SaveProfileService,
  ReadProfileService,
} = require("../services/UserService");

exports.UerOTP = async (req, res) => {
    let result = await UserOTPService(req);
    console.log(result);
    res.status(200).json(result);
  
};
exports.verifyLogin = async (req, res) => {
    let result = await verifyLoginService(req);

    if(result['status'] === 'success'){

        //Cookie set

        let cookieOption  = {
            expires: new Date(Date.now() + 24 * 6060 * 1000),
            httpOnly:false 
        }
        //set cookie with response 

        res.cookie('token' , result['token'] , cookieOption);
        res.status(200).json(result);
    }else{

        res.status(200).json(result);
    }

  
};
exports.Logout = async (req, res) => {
    console.log('res in');
    let cookieOption  = {
        expires: new Date(Date.now() - 24 * 6060 * 1000),
        httpOnly:false 
    }
   await res.cookie('token' , "" , cookieOption);
    res.status(200).json({ status: "success", message: "Token Expires" })
  
};

exports.CreateProfile = async (req, res) => {
    let result = await SaveProfileService(req);
    
    res.status(200).json(result);
  
};
exports.UpdateProfile = async (req, res) => {
    let result = await SaveProfileService(req);
    res.status(200).json(result);
  
};
exports.ReadProfile = async (req, res) => {
    let result = await ReadProfileService(req);
    res.status(200).json(result);
  
};
exports.CreateProductReview = async (req, res) => {
  
};
