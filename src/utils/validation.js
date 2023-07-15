const idValidation = (id) => {
  if (id && isNaN(parseInt(id))) throw Error("Input Invalid");
};

const addPostValidation = (title, content) => {
  if (
    typeof title !== "string" ||
    typeof content !== "string" ||
    title === "" ||
    content === ""
  )
    throw Error("Input invalid");
};

const updatePostValidation = (id, title, content) => {
  idValidation(id);
  if (!id || (!title && !content)) throw Error("Input Invalid");
  if (title && (typeof title !== "string" || title === ""))
    throw Error("Input Invalid");
  if (content && (typeof content !== "string" || content === ""))
    throw Error("Input Invalid");
};

const deletePostValidation = (id) => {
  if(!id) throw Error("Input Invalid");
  idValidation();
}

module.exports = { idValidation, addPostValidation, updatePostValidation, deletePostValidation };
