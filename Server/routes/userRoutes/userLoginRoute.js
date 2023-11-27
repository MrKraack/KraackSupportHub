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

    let userEmail = userObject.userEmail;

    if (await bcrypt.compare(reqUserPassword, userObject.userPassword)) {
      const token = jwt.sign(
        { user_id: userObject._id, userEmail },
        process.env.JWT_SECRET,
        {
          expiresIn: "2h"
        }
      );

      userObject.token = token;
      console.log("Login success");

      // Send the token in the response
      return res.status(200).json({ userObject });
    } else {
      console.log("Invalid credentials");
      return res.status(400).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Login error:', error.message);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
