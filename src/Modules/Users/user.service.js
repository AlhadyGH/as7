import userModel from "../../DB/Models/users.model.js";

export const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const checkExists = await userModel.findOne({ where: { email } });
    if (checkExists)
      return res.status(409).json({ message: "Email already exists." });

    const user = userModel.build({ name, email, password, role });
    await user.save();

    return res.status(201).json({ message: "User added successfully." });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error.", error });
  }
};

export const createOrUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password, role } = req.body;

    const [user, created] = await userModel.upsert(
      { id, name, email, password, role },
      { validate: false, returning: true },
    );

    if (created)
      return res
        .status(201)
        .json({ message: "User created successfully.", user });
    else
      return res
        .status(200)
        .json({ message: "User updated successfully.", user });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error.", error });
  }
};

export const getByEmail = async (req, res) => {
  try {
    const query = req.query;
    console.log(query);

    const user = await userModel.findOne({ where: { email: query.email } });
    if (!user) return res.status(404).json({ message: "User not found!!!" });

    return res
      .status(200)
      .json({ message: "User fetched successfully.", user });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error.", error });
  }
};

export const getById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await userModel.findByPk(id, {
      attributes: { exclude: ["role"] },
    });
    if (!user) return res.status(404).json({ message: "User not found!!!" });

    return res
      .status(200)
      .json({ message: "User fetched successfully.", user });
  } catch (error) {
      return res.status(500).json({ message: "Internal server error.", error });
  }
};
