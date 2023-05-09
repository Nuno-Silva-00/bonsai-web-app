import USER from "../mongo/models/user.js";

const getAllUsers = async (req, res) => {
  try {
    const users = await USER.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const { name, email, picture } = req.body;

    const userExists = await USER.findOne({ email });

    if (userExists) return res.status(200).json(userExists);

    const newUser = await USER.create({ name, email, picture });

    res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserByID = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await USER.findOne({ _id: id }).populate("allBonsais");

    if (user) return res.status(200).json(user);

    res.status(400).json({ message: "User not Found" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getAllUsers, createUser, getUserByID };
