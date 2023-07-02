const bodyParser = require("body-parser");
const PostController = require("./controllers/post");
const app = require("express")();

app.use(bodyParser.json());

app.get("/posts", (req, res) => {
  const response = PostController.getPost();
  res.json(response);
});

app.get("/posts/:id", (req, res) => {
  try {
    const { id } = req.params;
    const response = PostController.getPost(parseInt(id));
    if (!response) return res.status(404).json({ msg: "Post not found" });
    res.json(response);
  } catch (err) {
    res.status(400).json({
      msg: err.message,
    });
  }
});

app.post("/posts", (req, res) => {
  try {
  const { title, content } = req.body;
    const response = PostController.addPost(title, content);
    res.status(201).json(response);
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
});

app.put("/posts/:id", (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const response = PostController.updatePost(parseInt(id), title, content);
    if (!response) return res.status(404).json({ msg: "Post not found" });
    res.json(response);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});

app.delete("/posts/:id", (req, res) => {
  try {
    const { id } = req.params;
    const response = PostController.deletePost(parseInt(id));
    if (!response) return res.status(404).json({ msg: "Post not found" });
    res.status(204).json();
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});

module.exports = app;
