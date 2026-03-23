import { Router } from "express";

const authRouter = Router();

Router.post("/register", (req, res) => {
  // Registration logic here
  res.send("User registered");
});

Router.post("/login", (req, res) => {
  // Login logic here
  res.send("User logged in");
});

export default authRouter;
