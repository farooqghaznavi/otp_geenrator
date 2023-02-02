const User = require('../models/user');

const generateOTP = async (req, res) => {
  const { phone_number } = req.body;
  try {
    const user = await User.findOne({ where: { phone_number } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const otp = Math.floor(1000 + Math.random() * 9000);
    const otp_expiration_date = new Date(Date.now() + 5 * 60 * 1000);
    await user.update({ otp, otp_expiration_date });
    return res.status(200).json({ user_id: user.id });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to generate OTP' });
  }
};

const verifyOTP = async (req, res) => {
  const { user_id } = req.params;
  const { otp } = req.query;
  try {
    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    if (user.otp_expiration_date < new Date()) {
      return res.status(400).json({ error: 'OTP has expired' });
    }
    if (user.otp !== parseInt(otp)) {
      return res.status(400).json({ error: 'Incorrect OTP' });
    }
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to verify OTP' });
  }
};

const createUser = async (req, res) => {
  const { name, phone_number } = req.body;
  try {
    const user = await User.create({ name, phone_number });
    if(user){

        return res.status(200).json({ user });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Failed to create user' });
  }
};

module.exports = {
  generateOTP,
  verifyOTP,
  createUser,
};
