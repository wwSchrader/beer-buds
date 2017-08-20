if ((process.env.NODE_ENV || 'development') === 'development') {
  require('dotenv').config();
}
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const bcrypt = require('bcrypt');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
const LocalStrategy = require('passport-local').Strategy;

const users = require('./routes/users')(passport);
const search = require('./routes/search');
const vote = require('./routes/vote');
const User = require('./models/user');

passport.use(new LocalStrategy(
  {passReqToCallback: true},
  (req, username, password, done) => {
    User.findOne({username: username}, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false,
          req.flash('authMessage', 'Incorrect username'));
      }
      bcrypt.compare(password, user.password)
        .then((passwordMatch) => {
          if (!passwordMatch) {
            return done(null, false,
              req.flash('authMessage', 'Incorrect password'));
          } else {
            return done(null, user);
          }
        });
    });
  }
));

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  datastore.findUserById(id)
    .then((response) => {
      return done(null, response);
    })
    .catch((ex) => {
      done(ex);
    });
});

// *** mongoose *** ///
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URI, {
  useMongoClient: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('we\'re connected!');
});

app.use(helmet());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
}));
app.use(flash());
app.use(passport.initialize());
app.use((passport.session()));

app.all('*', (request, response, next) => {
  request.passport = passport;
  next();
});

app.use('/api/users', users);
app.use('/api/search', search);
app.use('/api/vote', vote);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  console.log('404 error message');
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);

  console.log(err);
});

module.exports = app;
