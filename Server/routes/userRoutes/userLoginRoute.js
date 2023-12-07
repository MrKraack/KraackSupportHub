const UserModel = require("../../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
  // Get info from body
  const { reqUserName, reqUserPassword } = req.body;

  try {
    const userObject = await UserModel.findOne({ userName: reqUserName });

    if (!userObject) {
      
      return res.status(404).json({ error: 'User not found' });
    }


    if (await bcrypt.compare(reqUserPassword, userObject.userPassword)) {
     

      //create JWT
      const accessToken = jwt.sign(
        {
          "UserInfo":
          {
            "userName": userObject.userName,
            "roles": userObject.roles
          }
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: "5m"}
      )
      
      const refreshToken = jwt.sign(
        {"UserInfo":
        {
          "userName": userObject.userName,
          "roles": userObject.roles
        }
      },
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn: "1d"}
      )




      userObject.accessToken = accessToken;
      userObject.refreshToken = refreshToken;

      await userObject.save();


      res.cookie('jwt', refreshToken, {
        httpOnly: true,
        sameSite: 'Lax',
        Secure: true,
        maxAge: 1 * 60 * 60 * 1000, // (1 hour)
      });
      res.json({accessToken})

    } 
    
    else {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

  } catch (error) {
    console.error('Login error:', error.message);
    return res.status(500).json({ error: error.message });
  }
};
