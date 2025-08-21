import User from '../model/user.model.js';

export async function getUserList(req,res) {
    try {
        const users = await User.find({}, '-password');  //exclude password
        res.json (users);
    }   catch (e) {
        res.status(500).json ({message: 'Error fetching users'});
    }
}

export async function searchUser(req, res) {
    try {
        const { username, role } = req.query;
        let query = {};
        
        if (username && username.trim() !== "") {
            query.username = { $regex: username, $options: "i" };
        }
        if (role && role.trim() !== "") {
            query.role = { $regex: role, $options: "i" }; 
        }
        const users = await User.find(query, "-password");
        res.json({ users });
    } catch (e) {
        res.status(500).json({ message: "Error !!! " });
    }
}

export async function updateUserProfile(req, res) {
    try {
        const userId = req.user.id; // Get user ID from the authMiddleware
        const { username, email, role } = req.body;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.username = username || user.username;
        user.email = email || user.email;
        user.role = role || user.role;

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            username: updatedUser.username,
            email: updatedUser.email,
            role: updatedUser.role,
        });

    } catch (e) {
        res.status(500).json({ message: "Error updating profile", error: e.message });
    }
}