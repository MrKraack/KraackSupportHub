const UserModel = require("../../models/UserModel")
module.exports = async (req, res) => {
  let isAuthenticated = false
  try {
    currentUserObject = await UserModel.findOne({ refreshToken: req.cookies.jwt })

    if (currentUserObject) {
      // 'jwt' cookie is present, user is authenticated
      isAuthenticated = true;
    } else {
      // 'jwt' cookie is not present, user is not authenticated
      isAuthenticated = false;
    }
    res.json(isAuthenticated)


  }
  catch (error) {

  }

}