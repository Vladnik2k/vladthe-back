const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const configs = require('./configs');
const User = require('./models/User');

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: configs.jwtId
};

export {}; // ToDo add normal solving of issue "Cannot redeclare block-scoped variable"
module.exports = (passport: any) => {
    passport.use(
        new JwtStrategy(options, async (payload: any, done: any) => {
            try {
                const user = await User.findById(payload.userId).select('email id');

                if (user) {
                    done(null, user);
                } else {
                    done(null, false);
                }
            } catch (e) {
                console.log(e);
            }
        })
    )
};
