const { FeatureListService } = require("../services/FeaturesServices");

exports.FeatureListController = async (req , res) =>{
    let result = await FeatureListService(req);
    res.status(200).json(result);
}