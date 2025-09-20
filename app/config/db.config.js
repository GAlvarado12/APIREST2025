module.exports = {
  HOST: "ep-billowing-violet-aep0hvri.c-2.us-east-2.aws.neon.tech",
  USER: "neondb_owner",
  PASSWORD: "npg_hRwlFV5jsk9p",
  DB: "neondb",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};