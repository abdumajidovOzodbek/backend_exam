import jwt from "jsonwebtoken";
import { SECRET_KEY, manager } from "../configure.js";

const POST = (req, res) => {
  try {
    const { sign } = jwt;
    const { admin, password } = req.body;
    if (!(admin == manager.admin && password == manager.password)) {
      throw new Error(`invalid admin or admin password`);
    }
    return res
      .cookie("token", sign({ admin, password }, SECRET_KEY))
      .redirect("/myblog");
  } catch (error) {
    res.json({
      status: 404,
      message: `Error: ${error.message}`,
    });
  }
};
export { POST};
