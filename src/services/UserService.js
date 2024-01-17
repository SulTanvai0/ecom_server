const ProfileModel = require("../Model/ProfileModel");
const UserModel = require("../Model/UserModel");

const EmailSend = require("../utility/EmailHelper");
const { EncodeToken } = require("../utility/TokenHelper");

exports.UserOTPService = async (req) => {
    try {
        let code = Math.floor(100000 + Math.random() * 900000);

        let email = req.params.email;
        let emailText = `Your verification is ${code}`;
        let emailSubject = "email verification";
        await EmailSend(email, emailText, emailSubject);

        
        await UserModel.updateOne({ email: email }, { $set: { otp: code } }, { upsert: true });

        return { status: "success", message: "6 digit otp sent successfully" };
        
    } catch (err) {
        return { status: "fail", error: err };
    }
}




exports.verifyLoginService = async (req) => {
    try {
        let email = req.params.email;
        let otp = req.params.otp;

        // Use a single query to get both the count and the user
        let user = await UserModel.findOne({ email: email, otp: otp }).select('_id');

        if (user) {
            // Creating token by Function
            let token = EncodeToken(email, user._id.toString());

            // Update otp code
            await UserModel.updateOne({ email: email }, { $set: { otp: '0' }});

            return { status: "success", message: "Valid OTP", token: token };
        }

        return { status: "fail", message: "Invalid OTP" };

    } catch (err) {
        console.error(err); // Log the error for debugging
        return { status: "fail", message: "Something went wrong", error: err };
    }
}



exports.SaveProfileService = async (req) => {
    
    try {
        let user_id = req.headers.user_id;
        let reqBody = req.body;
        

        reqBody.userID = user_id;

        // Check if a profile with the specified userID exists
        let existingProfile = await ProfileModel.findOne({ userID: user_id });

        if (existingProfile) {
            // Update the existing profile
            let result = await ProfileModel.updateOne({ userID: user_id }, { $set: reqBody });
            return { status: "success", message: "Profile updated successfully", data: result };
        } else {
            // Create a new profile
            let result = await ProfileModel.create(reqBody);
            return { status: "success", message: "Profile saved successfully", data: result };
        }
    } catch (err) {
        return { status: "fail", error: err };
    }
}


exports.ReadProfileService = async (req)=>{
    try {
        let user_id = req.headers.user_id;
        let result = await ProfileModel.find({ userID: user_id });
        return { status: "success", data: result };
    } catch (err) {
        return { status: "fail", error: err};
    }
};