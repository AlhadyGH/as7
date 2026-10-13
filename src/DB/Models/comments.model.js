import { DataTypes, Model } from "sequelize";
import { sequelize } from "../connection.js";
import userModel from "./users.model.js";
import postModel from "./posts.model.js";

class commentModel extends Model {}

commentModel.init(
  {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
  },
  {
    sequelize,
    modelName: 'comment',
    timestamps: true,
  },
);

userModel.hasMany(commentModel);
commentModel.belongsTo(userModel);

postModel.hasMany(commentModel);
commentModel.belongsTo(postModel);

export default commentModel;