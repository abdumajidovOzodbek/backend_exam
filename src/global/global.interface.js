import { read, write } from "../utils/model.js";

const GLOBAL_GET = (req, res) => {
  const page =req.query.page || 1;
  const limit = 9;
  const posts = read("posts")
    .filter((post) => post.status === "public")
    .filter((post) => {
      delete post.status;
      delete post.subcategory_id;
      return post;
    });
  res.json(posts.slice((page - 1) * limit, limit * page));
};
const POST_CONTENT = (req, res) => {
  try {
    const {
      profession,
      title,
      first_name,
      last_name,
      description,
      tel_number,
      time,
      subcategory_id,
      link,
    } = req.body;
    const { filename } = req.file;
    const posts = read("posts");

    const content = {
      post_id: posts.length == 0 ? 1 : posts.at(-1).post_id + 1,
      status: "private",
      subcategory_id,
      first_name,
      link,
      profession,
      last_name,
      title,
      description,
      image: filename,
      tel_number,
      time,
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
const VERIFICATE = (req, res) => {
  const { id, status } = req.params;
  const posts = read("posts");
  const privatePosts = read("posts")
  .filter((post) => post.status === "private")
  .filter((post) => {
    delete post.status;
    delete post.subcategory_id;
    return post;
  });
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
    .send({ status: 200, message: "successfully declared a new post" });
};
const NOT_VERIFICATE_USERS = (req, res) => {
  const privatePosts = read("posts")
  .filter((post) => post.status === "private")
  .filter((post) => {
    delete post.status;
    delete post.subcategory_id;
    return post;
  });
  if(privatePosts){
    res.json({status:200,message:'this is private datas',privatePosts});
  }
  res
    .status(200)
    .send({ status: 200, message: "not yet announced" });
};
export { GLOBAL_GET, POST_CONTENT, VERIFICATE ,NOT_VERIFICATE_USERS};
