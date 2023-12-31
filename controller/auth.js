const { loginService, registerService } = require("../service/auth");

const registerController = async (req, res, next) => {
  const { name, email, password } = req.body;

  // validation check
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Invalid Data" });
  }

  try {
    const user = await registerService({ name, email, password });
    return res.status(201).json({ message: "Successfully created", user });
  } catch (error) {
    next(error);
  }
};

const loginController = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const token = await loginService({ email, password });
    return res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerController,
  loginController,
};

/**
     * Request Input Sources
     - req body
     - req params
     - req query
     - req Header
     - req cookies
     */
