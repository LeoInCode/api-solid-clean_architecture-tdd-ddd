export default {
  mongoUrl:
    process.env.MONGO_URL ||
    'mongodb://127.0.0.1:27017/api-solid-clean_architecture-tdd-ddd',
  port: process.env.PORT || 5050,
  jwtSecret: process.env.JWT_SECRET || 'DKJ8923@#23SUDHJ==',
};
