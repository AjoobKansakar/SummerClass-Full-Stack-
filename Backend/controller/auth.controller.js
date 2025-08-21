// let users = []; // In-memory user storage (temporary)

import User from "../model/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function register(req, res) {
  try {
    const { username, password, email, role } = req.body; // <— include email & role

    if (!username || !password || !email) {
      return res.status(400).json({ message: "username, email and password are required" });
    }

    // check duplicates (by username or email)
    const existing = await User.findOne({ $or: [{ username }, { email }] });
    if (existing) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      password: hashedPassword,
      email,
      role,
    });

    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    // never return password
    const safeUser = { _id: user._id, username: user.username, email: user.email, role: user.role };

    return res.status(201).json({ message: "Registered", user: safeUser, token });
  } catch (e) {
    return res.status(500).json({ message: "Server error", error: e.message });
  }
}

export async function login(req, res) {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ message: "User not found" });

   
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    const safeUser = { _id: user._id, username: user.username, email: user.email, role: user.role };
    return res.json({ message: "Login successful", user: safeUser, token });
  } catch (e) {
    return res.status(500).json({ message: "Server error", error: e.message });
  }
}
