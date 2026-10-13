import commentModel from "../../DB/Models/comments.model.js";
import userModel from "../../DB/Models/users.model.js";
import postModel from "../../DB/Models/posts.model.js";
import { Op } from "sequelize";

export const createBulk = async (req, res) => {
  try {
    const body = req.body;

    const comments = await commentModel.bulkCreate(body);
    return res.status(201).json({ message: "Created successfully", comments });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error.", error });
  }
};

export const updateContent = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, content } = req.body;

    const user = await userModel.findByPk(userId);
    if (!user) return res.status(404).json({ message: "User not found!!!" });

    const comment = await commentModel.findByPk(id);
    if (!comment)
      return res.status(404).json({ message: "Comment not found!!!" });

    if (comment.userId != userId)
      return res
        .status(403)
        .json({ message: "U are not owner of this comment!!!" });

    await comment.update({ content });
    return res.status(200).json({ message: "Updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error.", error });
  }
};

export const findOrCreate = async (req, res) => {
  try {
    const { userId, postId, content } = req.body;

    const user = await userModel.findByPk(userId);
    if (!user) return res.status(404).json({ message: "User not found!!!" });

    const post = await postModel.findByPk(postId);
    if (!post) return res.status(404).json({ message: "Post not found!!!" });

    const [comment, created] = await commentModel.findOrCreate({
      where: { userId, postId, content },
      defaults: { userId, postId, content },
    });

    if (created)
      return res
        .status(201)
        .json({ message: "Created successfully", comment, created });

    return res
      .status(200)
      .json({ message: "Retrieved successfully", comment, created });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error.", error });
  }
};

export const search = async (req, res) => {
  try {
    const { word } = req.query;
    console.log(word);

    const comments = await commentModel.findAndCountAll({
      where: { content: { [Op.like]: `%${word}%` } },
    });
    // console.log(comments);

    if (!comments.count)
      return res.status(404).json({ message: "No comments found" });

    return res.status(200).json({
      message: "Retrieved successfully",
      count: comments.count,
      comments: comments.rows,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error.", error });
  }
};

export const newest = async (req, res) => {
  try {
    const { postId } = req.params;

    const comments = await commentModel.findAll({
      where: { postId },
      attributes: ["id", "content", "createdAt"],
      order: [
        ["createdAt", "DESC"],
        ["id", "DESC"],
      ],
      limit: 3,
    });

    if (!comments.length)
      return res
        .status(404)
        .json({ message: "There is not any comments to display." });

    return res
      .status(200)
      .json({ message: "Retrieved successfully", comments });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error.", error });
  }
};

export const getDetailed = async (req, res) => {
  try {
    const { id } = req.params;

    const comment = await commentModel.findByPk(id, {
      attributes: ["id", "content"],
      include: [
        {
          model: userModel,
          attributes: ["id", "name", "email"],
        },
        {
          model: postModel,
          attributes: ["id", "title", "content"],
        },
      ],
    });

    if (!comment) return res.status(404).json({ message: "No comment found" });

    return res
      .status(200)
      .json({ message: "Retrieved successfully", data: comment });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error.", error });
  }
};
