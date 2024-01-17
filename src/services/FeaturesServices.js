const FeatureModel = require("../Model/FeatureModel");


exports.FeatureListService = async (req )=>{

    try{

        let data = await FeatureModel.find();
        return{status:"success" , data:data}

    }catch(err){
        return {status:"fail" , data:err}
    }

}