const UserRead = require('../services/users.read');

const UserGetAllController = async (req, res) => {
  try {
    const users = await UserRead();

    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { UserGetAllController }
