// let users = []; // In-memory user storage (temporary)
import User from "../model/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function register(req, res){
    try {
        const { username, password } = req.body;

        const existing = await User.findOne({ username });
        if (existing) return res.status(400).send({ message: "User Exists" });

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({ username, password: hashedPassword, email, role });
        await user.save();
        res.status(201).json({ message: 'User registered successfully '});
    } 
    catch (e) {
        console.log(e);
        return res.status(500).json({ message: "User registered successfully!!! "})
    } 
}

export async function login(req, res){
    try {

        console.log(req.body);
        
        const { username, password } = req.body;
        const user = await User.findOne({ username }); 

        if (!user) return res.status(401).send({ message: "User not found" });

        const isMatch = bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).send("Invalid credentials");

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({ message: "Login successful", user, token });

    } catch (e) {        
        return res.status(500).json(e);
    }
}
