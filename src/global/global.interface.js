import { read, write } from "../utils/model.js";

const GLOBAL_GET = (req, res) => {
  const page = req.params.page || 2
  const limit =9
  const posts = read("posts")
    .filter((post) => post.status === "public")
    .filter((post) => delete post.status);
  res.send(posts.slice((page - 1) * 9, page * 9));
};
const POST_CONTENT = (req, res) => {
  try {
    const { title, coment } = req.body;
    const { filename } = req.file;
    const posts = read("posts");

    const content = {
      contentId: posts.length == 0 ? 1 : posts.at(-1).contentId + 1,
      status: "private",
      first_name,
      last_name,
      title,
      description,
      image: filename,
      time: new Date().toJSON(),
    };
    posts.push(content);
    write("posts", posts);
    res.json({
      status: 201,
      message: "success",
      data: content,
    });
  } catch (error) {
    res.send(error.message);
  }
};
export { GLOBAL_GET, POST_CONTENT };
