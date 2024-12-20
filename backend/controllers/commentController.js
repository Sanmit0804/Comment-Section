const Comment = require("../models/comment.models");

const addComment = async (req, res) => {
  try {
    const { content, userId, username, parentId } = req.body;

    const newComment = new Comment({
      content,
      userId,
      username,
      replies: [],
    });

    const savedComment = await newComment.save();

    if (parentId) {
      const parentComment = await Comment.findById(parentId);
      parentComment.replies.push(savedComment._id);
      await parentComment.save();
    }

    res.status(201).json(savedComment);
  } catch (error) {
    res.status(500).json({ message: "Error adding comment", error });
  }
};

const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ replies: { $exists: true } })
      .populate({
        path: "replies",
        populate: { path: "replies" }, // Nested populate for deeper replies
      })
      .exec();

    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching comments", error });
  }
};

const editComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    const updatedComment = await Comment.findByIdAndUpdate(
      id,
      { content },
      { new: true }
    );

    res.json(updatedComment);
  } catch (error) {
    res.status(500).json({ message: "Error editing comment", error });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;

    const deleteRecursive = async (commentId) => {
      const comment = await Comment.findById(commentId);
      if (comment.replies.length > 0) {
        await Promise.all(comment.replies.map(deleteRecursive));
      }
      await Comment.findByIdAndDelete(commentId);
    };

    await deleteRecursive(id);

    res.json({ message: "Comment and its replies deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting comment", error });
  }
};

module.exports = { addComment, getComments, editComment, deleteComment };
