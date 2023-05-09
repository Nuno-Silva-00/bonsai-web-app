import BONSAI from "../mongo/models/bonsai.js";
import USER from "../mongo/models/user.js";
import * as dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const getProfileSocial = async (email) => {
  let totalLikes = 0;

  //find this user bonsais
  const user = await USER.findOne({ email }).populate("allBonsais");

  //remove the hidden bonsais
  const userBonsaiHidden = user.allBonsais.filter(
    (bonsai) => bonsai.hide === false
  );
  //take the number of bonsais for this user
  const numberOfBonsais = userBonsaiHidden.length;

  //map each bonsai and take the number of likes
  userBonsaiHidden.map((bonsai) => {
    totalLikes += bonsai.likes.length;
  });

  return { numberOfBonsais, totalLikes };
};

const getAllBonsais = async (req, res) => {
  const { page } = req.query;
  try {
    const LIMIT = 12;
    const startIndex = (Number(page) - 1) * LIMIT;

    const total = await BONSAI.countDocuments({ hide: false });

    const bonsais = await BONSAI.find({ hide: false })
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex);

    res.status(200).json({
      bonsais,
      currentPage: Number(page),
      numberOfPages: Math.ceil(total / LIMIT),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createBonsai = async (req, res) => {
  const photoUrl = [];
  try {
    const { specie, nickname, age, description, likes, photo, hide, email } =
      req.body;

    const session = await mongoose.startSession();
    session.startTransaction();

    const user = await USER.findOne({ email }).session(session);

    if (!user) throw new Error("User not Found");

    const newBonsai = await BONSAI.create({
      specie,
      nickname,
      age,
      description,
      likes,
      photo,
      hide,
      createdAt: new Date().toISOString(),
      creator: user._id,
    });

    user.allBonsais.push(newBonsai._id);

    await user.save({ session });
    await session.commitTransaction();

    res.status(200).json({ newBonsai });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getBonsaiDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const bonsaiExists = await BONSAI.findOne({ _id: id }).populate("creator");

    //find user creator email
    const email = bonsaiExists.creator.email;

    const { numberOfBonsais, totalLikes } = await getProfileSocial(email);

    if (bonsaiExists) {
      return res
        .status(200)
        .json({ bonsaiExists, numberOfBonsais, totalLikes });
    } else {
      return res.status(404).json({ message: "Bonsai not Found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getBonsaiByEmail = async (req, res) => {
  try {
    const { email, loggedInUser } = req.params;

    let data = await USER.findOne({ email }).populate("allBonsais");

    const { numberOfBonsais, totalLikes } = await getProfileSocial(email);

    if (loggedInUser != email) {
      const filteredBonsais = data.allBonsais.filter(
        (bonsai) => bonsai.hide === false
      );

      data.allBonsais = filteredBonsais;
    }

    res.status(200).json({ data, numberOfBonsais, totalLikes });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateBonsai = async (req, res) => {
  const photoUrl = [];
  try {
    const { id } = req.params;

    const {
      specie,
      nickname,
      age,
      description,
      likes,
      photo,
      hide,
      createdAt,
    } = req.body;

    const updatedBonsai = await BONSAI.findByIdAndUpdate(
      { _id: id },
      {
        specie,
        nickname,
        age,
        description,
        likes,
        photo,
        hide,
        createdAt,
      },
      { new: true }
    );

    res.status(200).json({ updatedBonsai });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteBonsai = async (req, res) => {
  try {
    const { id } = req.params;

    const bonsaiToDelete = await BONSAI.findById({ _id: id }).populate(
      "creator"
    );

    if (!bonsaiToDelete) throw new Error("Bonsai not Found");

    const userId = bonsaiToDelete.creator._id;

    const user = await USER.findById({ _id: userId });

    const userFinal = await USER.updateOne(
      { _id: userId },
      { $pull: { allBonsais: bonsaiToDelete._id } }
    );
    await BONSAI.findByIdAndRemove(id);

    for (const image of bonsaiToDelete.photo) {
      const publicId = image.match(/\/([^/]+)\.[^.]+$/)[1];

      cloudinary.uploader.destroy(publicId, function (error, result) {});
    }

    res.status(200).json({ message: "Bonsai Deleted!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const likeBonsai = async (req, res) => {
  const { id } = req.params;
  const userEmail = req.body.userEmail;

  if (!userEmail) {
    return res.json({ message: "Unauthenticated" });
  }

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).send(`No bonsai with id: ${id}`);

  const bonsai = await BONSAI.findById(id);

  const index = bonsai.likes.findIndex((id) => id === String(userEmail));

  if (index === -1) {
    bonsai.likes.push(userEmail);
  } else {
    bonsai.likes = bonsai.likes.filter((id) => id !== String(userEmail));
  }

  const updatedBonsai = await BONSAI.findByIdAndUpdate(id, bonsai, {
    new: true,
  });

  res.status(200).json(updatedBonsai);
};

const getBonsaiBySearch = async (req, res) => {
  const { searchQuery } = req.query;

  try {
    const specie = new RegExp(searchQuery, "i");

    const bonsais = await BONSAI.find({ specie });

    const filteredBonsais = bonsais.filter((bonsai) => bonsai.hide === false);

    res.json({ data: filteredBonsais });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  getAllBonsais,
  getBonsaiDetails,
  createBonsai,
  updateBonsai,
  deleteBonsai,
  getBonsaiByEmail,
  likeBonsai,
  getBonsaiBySearch,
};
