import db from '../db_config/database.js'

export async function authValidation(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');

    if (!token) return res.sendStatus(401);

    try {
        const userWithToken = await db.collection('sessions').findOne({ token });
        if (!userWithToken) return res.sendStatus(401);

        next()

    } catch (error) {
        res.status(500).send(error)
    }
}