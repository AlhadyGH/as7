import postModel from "../../DB/Models/posts.model.js";
import userModel from "../../DB/Models/users.model.js";
import commentModel from "../../DB/Models/comments.model.js";
import { sequelize } from "../../DB/connection.js";

export const createPost = async (req, res) => {
  try {
    const { title, content, userId } = req.body;

    const user = await userModel.findByPk(userId);
    if (!user) return res.status(404).json({ message: "User not found!!!" });

    const post = postModel.build({ title, content, userId });
    await post.save();

    return res.status(201).json({ message: "Post created successfully." });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error.", error });
  }
};

export const hardDelete = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    const user = await userModel.findByPk(userId);
    if (!user) return res.status(404).json({ message: "User not found!!!" });

    const post = await postModel.findByPk(id);
    if (!post) return res.status(404).json({ message: "Post not found!!!" });

    if (post.userId != userId)
      return res
        .status(403)
        .json({ message: "U are not authorized to delete this post!!!" });

    await postModel.destroy({ where: { id }, force: true });
    return res.status(200).json({ message: "Post hard deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error.", error });
  }
};

export const softDelete = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    const user = await userModel.findByPk(userId);
    if (!user) return res.status(404).json({ message: "User not found!!!" });

    const post = await postModel.findByPk(id);
    if (!post) return res.status(404).json({ message: "Post not found!!!" });

    if (post.userId != userId)
      return res
        .status(403)
        .json({ message: "U are not authorized to delete this post!!!" });

    await post.destroy();

    return res.status(200).json({ message: "Post soft deleted successfully" });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Internal server error.",
      error,
    });
  }
};

export const detailedPosts = async (req, res) => {
  try {
    const posts = await postModel.findAll({
      attributes: ["id", "title"],

      include: [
        {
          model: userModel,
          attributes: ["id", "name"],
        },
        {
          model: commentModel,
          attributes: ["id", "content"],
        },
      ],
    });

    return res
      .status(200)
      .json({ message: "Detailed posts fetched successfully.", posts });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error.",
      error,
    });
  }
};

export const posts_commentCount = async (req, res) => {
  try {
    const posts = await postModel.findAll({
      attributes: ["id", "title", [sequelize.fn('COUNT', sequelize.col('comments.id')), 'commentCount']],
      include: [
        {
          model: commentModel,
          attributes: []
        }
      ],
      group: ["post.id"]
      
      
    });

    return res.status(200).json({ message: "Retrieved successfully", posts });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error.",
      error,
    });
  }
};
