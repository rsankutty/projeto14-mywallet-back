import db from "../db_config/database.js";
import { ObjectId } from "mongodb";
import dayjs from "dayjs";


export async function getCashFlow (req, res) {
  const { authorization } = req.headers;
	const token = authorization.replace('Bearer ', '');

  try {
    const userWithToken = await db.collection('sessions').findOne({ token });
    const {userId} = userWithToken
    const cashflow = await db.collection("cashflow").find({ userId }).toArray();
    return res.send(cashflow);
  } catch (err) {
    return res.status(500).send(err);
  }
}


export async function addFlow (req, res) {
  const { authorization } = req.headers;
	const token = authorization.replace('Bearer ', '');
  const { value, description, type } =  req.body;

  try {
    const userWithToken = await db.collection('sessions').findOne({ token });
    const {userId} = userWithToken
    const user = await db.collection("users").findOne({ _id: ObjectId(userId) });

    await db.collection('cashflow').insertOne({
      date: dayjs(Date.now()).format('DD/MM'),
      value,
      description,
      type,
      userId
    });

    return res.sendStatus(201);
  } catch (error) {
    console.log(err);
    return res.status(500).send(err);
  }
}