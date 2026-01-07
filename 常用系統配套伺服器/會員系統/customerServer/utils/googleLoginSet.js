const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_REDIRECT_URI,
    },
    async (accessToken, refreshToken, profile, done) => {

        const email = profile.emails[0].value || null; 
        
        try {
            // 暫時只把資料交出去，不做任何事
            return done(null, {
                email,
                googleId: profile.id,
            });

        } catch (error) {
            return done(error, null);
        }
    }
  )
);

module.exports = passport;
