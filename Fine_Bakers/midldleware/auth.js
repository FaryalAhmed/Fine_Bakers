const jwt = require("jsonwebtoken");
const config = require("config");

const auth = async (req, res, next) => {
      try {
            let token = req.cookies["x-auth-token"];
            if (!token) {
                  return res
                        .status(401)
                        .send("Access denied. No token provided.");
            }
            console.log(token);
            const decode = jwt.verify(token, "jwtPrivateKey");
            const user = await Users.findOne({
                  _id: decode._id,
                  "tokens.token": token,
            });
            if (!user) {
                  return res.redirect("/login");
            }
            req.token = token;
            req.user = user;
            next();
            return res.redirect("/login");
      } catch (err) {
            res.status(400).send("Invalid Token.");
      }
};

module.exports = auth;
