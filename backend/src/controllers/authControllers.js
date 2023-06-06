const login = (req, res) => {
  res.json({ token: "connected" });
};

module.exports = {
  login,
};
