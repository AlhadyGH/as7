import { DataTypes, Model } from "sequelize";
import { sequelize } from "../connection.js";
import userModel from "./users.model.js";

class postModel extends Model {}

postModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'post',
    timestamps: true,
    paranoid: true,
  },
);

userModel.hasMany(postModel);
postModel.belongsTo(userModel);

export default postModel;