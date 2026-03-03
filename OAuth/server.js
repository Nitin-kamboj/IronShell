import express from "express";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

const app = express();
app.use(passport.initialize());

app.use(
  new GoogleStrategy(
    {
      clientId: "123",
      clientSecret: "secret",
      callbackURL: "/auth/google/callback", // here google will redirect once authentication by google is done
    },
    async (accessToken, refreshToken, profile, next) => {
      try {
        // Normally you'd find or create user in DB
        const user = {
          googleId: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
        };

        // Create JWT
        const token = jwt.sign(user, process.env.JWT_SECRET, {
          expiresIn: "1d",
        });

        return next(null, { user, token });
      } catch (err) {
        return next(err, null);
      }
    },
  ),
);

app.get(
  "/google",
  passport.authenticate(google, {
    scope: ["profile", "email"],
    session: false,
  }),
);

app.get(
  "/google/callback",
  passport.authenticate(
    "google",
    { session: false, failureRedirect: "/login" },
    (req, res) => {
      res.json({
        message: "Login successful",
        token: req.user.token,
        user: req.user.user,
      });
    },
  ),
);
