if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const main = require("./db");
const express = require("express");
const cors = require("cors");
const flash = require("connect-flash");
const app = express();
const PORT = process.env.PORT || 8080;
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
const universityRoutes = require("./routes/universities.js");
const { signup, login, logout } = require("./routes/user.js");
main();

// Initialize session middleware
const sessionMiddleware = session({
  secret: "secretKey",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7, // Expires after 1 week
    maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    httpOnly: true,
  },
});

// Use session middleware
app.use(sessionMiddleware);
app.use(flash());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// route for universities
app.use("/api/uni", universityRoutes);

// Define signup route
app.post("/api/signup", signup);

// Define login route
app.post(
  "/api/login",
  passport.authenticate("local", {
    failureRedirect: "http://localhost:5173/login",
    failureFlash: true,
  }),
  login
);

// Define logout route
app.get("/api/logout", logout);
app.get("/", async (req, res) => {
  res.send("Hello World");
});
// For All Other Routes (Undefined Routes)
app.all("*", (req, res) => {
  res.json({ message: "404 - Not Found" });
});

// Your server listener
app.listen(PORT, () => {
  console.log(
    `unipursuit_backend is listening on port http://localhost:${PORT}`
  );
});
