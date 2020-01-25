const useModuleId = (req, res, next) => {
  if (req.user) {
    console.log(req.user);
  } else {
    res.send({ message: "USer not logeed In" });
  }
  next();
};

module.exports = { useModuleId };
