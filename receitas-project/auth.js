//const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;
const users = [
  {
    _id: 1,

    username: process.env.USER_EMAIL.split('@')[0],
    password: process.env.USER_PASSWORD,
    email: process.env.USER_EMAIL,
  },
];


module.exports = function (passport) {
  function findUser(username) {
    return users.find((user) => user.username === username);
  }

  function findUserById(id) {
    return users.find((user) => user._id === id);
  }

  function findUserByEmail(email) {
    return users.find((user) => {
      return user.email === email;
    });
  }

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    try {
      const user = findUserById(id);
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });

  passport.use(
    new LocalStrategy(
      {
        usernameField: 'username',

        passwordField: 'pass',
      },
      (username, password, done) => {
        try {
          const user = findUserByEmail(username);

          // usuário inexistente
          if (!user) {
            return done(null, false);
          }

          // comparando as senhas
          // const isValid = bcrypt.compareSync(password, user.password);
          const isValid = password === user.password;
          if (!isValid) return done(null, false);

          return done(null, user);
        } catch (err) {
          done(err, false);

        }
      }
    )
  );
};
