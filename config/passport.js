const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const User = require("../Models/User");


//PASSPORT GOOGLE STRATEGY
const initializePassport = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const email = profile.emails && profile.emails[0].value;
          const userName = profile.displayName;
          const googleId = profile.id;

          if (!email) {
            // If no email is provided by Google, return an error.
            return done(new Error("No email found in Google profile"), null);
          }

          // Check if a user with this email already exists.
          let user = await User.findOne({ email });

          if (user) {
            // User exists: Return the existing user.
            return done(null, user);
          } else {
            // User does not exist: Create a new user.
            // Since they're using Google, you can consider their email verified.
            const newUser = await User.create({
              googleId,
              userName,
              email,
              verification: true,
            });
            return done(null, newUser);
          }
        } catch (err) {
          // Handle any errors.
          return done(err, null);
        }
      }
    )
  );


  //PASSPORT FACEBOOK STRATEGY

  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK_URL, // Will switch based on environment
        profileFields: ["id", "displayName", "emails"],
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const email = profile.emails?.[0]?.value;
          let user = await User.findOne({ email });

          if (!user) {
            user = await User.create({
              facebookId: profile.id,
              userName: profile.displayName,
              email: email || `fb-${profile.id}@noemail.com`,
            });
          }

          return done(null, user);
        } catch (err) {
          return done(err, null);
        }
      }
    )
  );
};

module.exports = initializePassport;

  //HANDLE ERRORS
