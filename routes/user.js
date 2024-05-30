const User = require("../models/user");

module.exports.signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const newUser = new User({ email, username });
    const registeredUser = await User.register(newUser, password);
    req.user = registeredUser;
    req.login(registeredUser, (err) => {
      if (err) return next(err);
      res
        .status(201)
        .json({ message: "User signed up successfully", currUser: req.user });
    });
  } catch (error) {
    console.error("Error signing up:", error);
    res.status(500).json({ message: "Failed to sign up" });
  }
};
module.exports.login = async (req, res, next) => {
  try {
    const { username } = req.body;
    const registeredUser = await User.findOne({ username });
    req.user = registeredUser;
    req.login(registeredUser, (error) => {
      if (error) return res.status(500).json({ message: "Failed to login" });
      res
        .status(200)
        .json({ message: "User Logged in successfully", currUser: req.user });
    });
  } catch (error) {
    console.error("Error Logging in:", error);
    res.status(500).json({ message: "Failed to login" });
  }
};
module.exports.logout = (req, res) => {
  let { username } = req.user;
  req.logout((err) => {
    if (err) return next(err);
  });
  res.status(200).json({ message: `User ${username} logged out successfully` });
  res.redirect("http://localhost:5173/login");
};
