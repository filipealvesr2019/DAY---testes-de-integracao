const Validation = require("../utils/validation");
const PostModel = require("../models/post");

const getPost = (id) => {
  Validation.idValidation(id);
  if (!id) return PostModel.getAllPosts();
  return PostModel.getPostById(parseInt(id));
};

const addPost = (title, content) => {
  Validation.addPostValidation(title, content);
  return PostModel.insertPost(title, content);
};

const updatePost = (id, title, content) => {
  Validation.updatePostValidation(id, title, content);
  return PostModel.updatePost(parseInt(id), title, content);
};

const deletePost = (id) => {
  Validation.deletePostValidation(id);
  return PostModel.deletePost(id);
};

module.exports = { getPost, addPost, updatePost, deletePost };
