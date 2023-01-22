import bcrypt from 'bcrypt'
import { v4 as uuid } from 'uuid';
import db from "../db_config/database.js";

export async function signUp(req, res) {
  const { name, email, password } = req.body;

  try {
    const emailRegistered = await db.collection("users").findOne({ email });
    if (emailRegistered) return res.status(409).send("Email already registered");

    const newUser = {
      name,
      email,
      password: bcrypt.hashSync(password, 10)
    };

    await db.collection("users").insertOne(newUser);
    return res.status(201).send("New user successfully registered");

  } catch (err) {
    return res.status(500).send(err);
  }
}



export async function login(req, res) {
  const { email, password } = req.body;

  try {
    const user = await db.collection("users").findOne({ email });
    if (!user) return res.status(400).send('E-mail ou senha inválidos');

    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) return res.status(400).send('E-mail ou senha inválidos');

    const userToken = await db.collection("sessions").findOne({ userId: user._id })
    if (userToken) {
      delete userToken._id;
      return res.status(200).send(userToken)
    }

    const token = uuid();
    await db.collection("sessions").insertOne({
      userId: user._id,
      token
    })

    res.status(200).send({ token, userId: user._id });

  } catch (error) {
    return res.status(500).send(error);
  }
}