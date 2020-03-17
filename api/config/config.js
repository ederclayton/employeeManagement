module.exports = {
  mongodbUri: process.env.MONGO_URL ? process.env.MONGO_URL : 'mongodb://localhost:27017/EmployeeManagement',
  port: process.env.PORT ? process.env.PORT : 3000,
  jwtSecret: process.env.JWT_SECRET ? process.env.JWT_SECRET : 'leads2b'
};