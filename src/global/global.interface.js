import { read, write } from "../utils/model.js";

const GLOBAL_GET = (req, res) => {
  const page = req.query.page || 1;
  const limit = 9;
  const posts = read("posts");
  const ip = read("ips");
  let { fullname, date, prof, online } = req.query;
  const data = posts.filter((post) => {
    if (post.status == "public") {
      const Fullname = post.last_name + " " + post.first_name;
      const byFullname = fullname ? Fullname.includes(fullname) : true;
      const byDate = date ? post.date.includes(date) : true;
      const byProfession = prof ? post.profession.includes(prof) : true;
      const byOnline = online ? post.online == online : true;
      delete post.status;
      delete post.subcategory_id;
      ip.filter((ip) => {
        if (ip.id == post.post_id) {
          post.views = ip.views;
        }
      });
      return byFullname && byDate && byProfession && byOnline;
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
    if(content){
      const ip = read("ips");
      const newIp = {
        id: content.post_id,
        views:0,
        user_agent: [],
      };
      ip.push(newIp);
      write("ips", ip);
    }
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
const SINGLE_PAGE = (req, res) => {
  const ip = read("ips");
  const { id } = req.params;
  console.log(id);
  const agent = req.headers["user-agent"];
  const posts = read("posts");
  const human2 = posts.find((ip) => ip.post_id == id);
  
  if (human2.status == "public") {
    delete human2.status
  delete human2.subcategory_id
    res.json(human2);
  } else {
    res.json({ status: 400, message: "not found" });
  }
  const person = ip.find((ip) => ip.id == id);
  const find = person.user_agent.find((user) => user.agent == agent);
  if (!find) {
    const newAgent = {
      id: person.user_agent.length == 0 ? 1 : person.user_agent.at(-1).id + 1,
      agent: agent,
    };
    person.views++;
    person.user_agent.push(newAgent);
    write("ips", ip);
  }
};
export { GLOBAL_GET, POST_CONTENT, SINGLE_PAGE };
