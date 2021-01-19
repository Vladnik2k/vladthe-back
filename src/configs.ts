// @ts-ignore
const env = process.env;
module.exports.mongoURI = `mongodb+srv://@cluster0.okkf0.mongodb.net/vladtheater_db?retryWrites=true&w=majority`;
module.exports.mongoData = {
    user: env.MONGO_DB_USER,
    pass: env.MONGO_DB_PASS,
    dbName: "vladtheater_db",
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false
};

module.exports.jwtId = env.JWT_ID;
module.exports.port = 3001;

module.exports.EMAIL_LOGIN = env.EMAIL_LOGIN;
module.exports.EMAIL_PASS = env.EMAIL_PASS;
