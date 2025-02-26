import usersModel from "../model/users.model.js";
import { hashValue, createToken, hashCompare } from "../utils/auth.js";

const createUser = async (req, res) => {
  try {
    let user = await usersModel.findOne({ email: req.body.email });
    let username = await usersModel.findOne({ username: req.body.username });
    if (!user && !username) {
      req.body.password = await hashValue(req.body.password);
      req.body.email = await req.body.email.toLowerCase();
      await usersModel.insertOne(req.body);
      res.status(201).send({
        message: "User Created Successfully!",
      });
      res.end();
    } else {
      if (user) {
        res.status(400).send({
          message: `User with ${req.body.email} already exists!`,
        });
        res.end();
      } else {
        res.status(400).send({
          message: `User with ${req.body.username} already exists!`,
        });
        res.end();
      }
    }
  } catch (error) {
    // console.log(error)
    res.status(500).send({
      message: error.message || "Internal Server Error",
      error,
    });
    res.end();
  }
};

const getAllUsers = async (req, res) => {
  try {
    let data = await usersModel.find();

    res.status(200).send({
      message: "Data Fetch Successfully",
      data,
    });
    res.end();
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: error.message || "Internal Server Error",
    });
    res.end();
  }
};

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await usersModel.findOne({ email });
    console.log(user);

    if (user) {
      if (await hashCompare(password, user.password)) {
        const token = await createToken(req.body);
        res.status(200).send({ message: "Login Successfully!", token });
        res.end();
      } else {
        res.status(400).send({ message: "Invalid Password" });
        res.end();
      }
    } else {
      if (user) {
        res.status(400).send({
          message: `User with ${email} already exists!`,
        });
        res.end();
      } else {
        res.status(400).send({
          message: `User with ${username} already exists!`,
        });
        res.end();
      }
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Internal Server Error",
    });
    res.end();
  }
};

const getIDByUser = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await usersModel.findOne({ _id: id });

    res.status(200).send({
      message: "Data Fetch Successfully",
      data,
    });
    res.end();
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: error.message || "Internal Server Error",
    });
    res.end();
  }
};

export { getAllUsers, createUser, signin, getIDByUser };
