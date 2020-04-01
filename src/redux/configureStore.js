module.exports = require(process.env.NODE_ENV === "production"
  ? "./configureStore.prod"
  : "./configureStore.dev");
