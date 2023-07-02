const posts = [];
let currentPostId = 0;

const getAllPosts = () => {
  return posts;
};

const getPostById = (id) => {
  return posts.find((post) => post.id === id);
};

const insertPost = (title, content) => {
  const newId = ++currentPostId;
  const newPost = { id: newId, title, content };
  posts.push(newPost);
  return newPost;
};

const updatePost = (id, title, content) => {
  const oldPostId = posts.findIndex((post) => post.id === id);
  if (oldPostId === -1) return undefined;

  const oldPost = posts[oldPostId];
  const updatedPost = {
    id: oldPost.id,
    title: title ?? oldPost.title,
    content: content ?? oldPost.content,
  };
  posts[oldPostId] = updatedPost;
  return updatedPost;
};

const deletePost = (id) => {
  const postIdToDelete = posts.findIndex((post) => post.id === id);
  if (postIdToDelete === -1) return undefined;
  const postRemoved = posts.splice(postIdToDelete);

  return Boolean(postRemoved.length);
};

module.exports = {
  getAllPosts,
  getPostById,
  insertPost,
  updatePost,
  deletePost,
};
