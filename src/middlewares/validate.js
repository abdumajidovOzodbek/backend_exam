import { LoginSchema, PostSchema } from "../utils/validation.js";

export default (req, res, next) => {
  try {
    if (req.url == "/login" && req.method == "POST") {
      const { error } = LoginSchema.validate(req.body);
      if (error) throw Error(error);
    }
    if (req.url == "/post" && req.method == "POST") {
      const { filename } = req.file;
      console.log(req.body);
      const { error } = PostSchema.validate({ image: filename, ...req.body });
      if (error) throw Error(error);
    }
    next();
  } catch (error) {
    return next(error);
  }
};
