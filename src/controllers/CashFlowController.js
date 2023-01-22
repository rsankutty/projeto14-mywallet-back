import db from "../db_config/database.js";

export async function getCashFlow (req, res) {

  try {
    const cashflow = await db.collection("cashflow").find({ user_id: authId }).toArray();
    return res.send(movements);
  } catch (err) {
    return res.status(500).send(err);
  }
}

export async function store (req, res) {
  const { description, value, error } = validateStoreMovementSchema(req.body);
  const { type } = req.params;

  const authId = res.locals.authId;

  if (!type || (type !== 'entry' && type !== 'output')) return res.status(422).send('Insira um tipo válido');

  if (error) return res.status(422).send(error);

  try {
    const user = await db.collection("users").findOne({ _id: authId });

    const movement = new Movement(
      user._id,
      description,
      value,
      type
    )

    await db.collection("movements").insertOne(movement);

    return res.sendStatus(201);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
}