const UserModel = require("../../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
  // Get info from body
  const { reqUserName, reqUserPassword } = req.body;

  try {
    const userObject = await UserModel.findOne({ userName: reqUserName });

    if (!userObject) {
      console.log("User not found");
      return res.status(404).json({ error: 'User not found' });
    }


    if (await bcrypt.compare(reqUserPassword, userObject.userPassword)) {
      console.log("Logged in user object: ")
      console.log(userObject)

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

      console.log("Login success");
      // res.cookie('jwt', refreshToken, { httpOnly: false, sameSite: 'None', secure: false, maxAge: 24 * 60 * 60 * 1000 });

      res.cookie('jwt', refreshToken, {
        httpOnly: true,
        sameSite: 'None',
        maxAge: 1 * 60 * 60 * 1000, // (1 hour)
      });
      res.json({accessToken})

    } 
    
    else {
      console.log("Invalid credentials");
      return res.status(400).json({ error: 'Invalid credentials' });
    }

  } catch (error) {
    console.error('Login error:', error.message);
    return res.status(500).json({ error: error.message });
  }
};
