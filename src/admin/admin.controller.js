import jwt from "jsonwebtoken";
import { SECRET_KEY, manager } from "../configure.js";

const POST = (req, res) => {
  try {
    const { sign } = jwt;
    const { admin, password } = req.body;
    if (!(admin == manager.admin && password == manager.password)) {
      throw new Error(`invalid admin or admin password`);
    }
    res.json({
      status: 200,
      message: "you are logged in ",
      token: sign(admin, SECRET_KEY),
    });
  } catch (error) {
    res.json({
      status: 404,
      message: `Error: ${error.message}`,
    });
  }
};
export { POST };
