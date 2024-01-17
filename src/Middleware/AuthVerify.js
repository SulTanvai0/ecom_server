const { DecodeToken } = require("../utility/TokenHelper");

module.exports = (req, res, next) => {
    try {
        let token = req.headers['token'];
        if (!token) {
            token = req.cookies['token'];
        }

        let decoded = DecodeToken(token);

        if (decoded === null) {
            return res.status(401).json({ status: "Fail", message: "Unauthorized" });
        } else {
            let email = decoded['email'];
            let user_id = decoded['user_id'];

            req.headers.email = email;
            req.headers.user_id = user_id;
            next();
        }
    } catch (err) {
        // Handle errors if needed
        console.error(err);
        res.status(500).json({ status: "Error", message: "Internal Server Error" });
    }
}
