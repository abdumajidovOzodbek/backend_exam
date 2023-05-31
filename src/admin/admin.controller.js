import jwt from "jsonwebtoken";
import { SECRET_KEY,manager} from "../configure.js";
import { write,read } from "../utils/model.js";

const POST = (req, res) => {
  try {
    const { sign } = jwt;
    const { admin, password } = req.body;
    if (!(admin == manager.admin && password == manager.password)) {
      throw new Error(`invalid admin or admin password`);
    }
    console.log(sign({admin:admin}, SECRET_KEY));
    res.json({
      status: 200,
      message: "you are logged in ",
      token: sign({admin:admin}, SECRET_KEY),
    });
  } catch (error) {
    res.json({
      status: 404,
      message: `Error: ${error.message}`,
    });
  }
};
const VERIFICATE = (req, res) => {
  const { id, status } = req.params;
  const posts = read("posts");
  const find = posts.find((post) => post.post_id == id);
  if (!find || !id || !status) {
    res
      .status(404)
      .send({ status: 404, message: "this user's message is not defined" });
  }
  find.status = status;
  write("posts", posts);
  res
    .status(200)
    .send({ status: 200, message: "successfully declared a new post", data:[find] });
};
const NOT_VERIFICATE_USERS = (req, res) => {
  const privatePosts = read("posts")
    .filter((post) => post.status === "private")
    .filter((post) => {
      delete post.status;
      delete post.subcategory_id;
      return post;
    });
  if (privatePosts) {
    res.json({ status: 200, message: "this is private datas", data:privatePosts });
  }
};
export { POST,VERIFICATE, NOT_VERIFICATE_USERS };
