import { read, write } from "../utils/model.js";

const GLOBAL_GET = (req, res) => {
  const page = req.query.page || 1;
  const limit = 9;
  const posts = read("posts");
  let { fullname, time, date, prof, online } = req.query;
  const data = posts.filter((post) => {
    if (post.status == "public") {
      const Fullname = post.last_name + " " + post.first_name;
      const byFullname = fullname ? Fullname.includes(fullname) : true;
      const byTime = time ? post.time.includes(time) : true;
      const byDate = date ? post.date.includes(date) : true;
      const byProfession = prof ? post.profession.includes(prof) : true;
      const byOnline = prof ? post.online == online : true;
      delete post.status;
      delete post.subcategory_id;
      return byFullname && byTime && byDate && byProfession && byOnline;
    }
  });

  res.json(data.slice((page - 1) * limit, limit * page));
};
const POST_CONTENT = (req, res) => {
  try {
    const {
      profession,
      title,
      online,
      first_name,
      last_name,
      description,
      tel_number,
      time,
      date,
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
      online,
      profession,
      last_name,
      title,
      description,
      image: filename,
      tel_number,
      date,
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
    res.send({ status: 400, message: error.message });
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
  if (privatePosts) {
    res.json({ status: 200, message: "this is private datas", privatePosts });
  }
};
export { GLOBAL_GET, POST_CONTENT, VERIFICATE, NOT_VERIFICATE_USERS };
