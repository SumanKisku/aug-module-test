const User = require("../../models/userSchema");
const validator = require("validator");
const bcrypt = require("bcrypt");

const handleSignup = async (req, res) => {
    const { name, email, username, phone, password } = req.body;
    try {

        // validate inputs
        if (!name || !email || !username || !phone || !password) {
            return res.send({
                status: 401,
                message: "Please fill all the credentials"
            })
        }

        // validate email 
        if (!validator.isEmail(email)) {
            return res.send({
                status: 401,
                message: "Enter a valid email address"
            })
        }

        if (!validator.isMobilePhone(phone, "en-IN")) {
            return res.send({
                status: 401,
                message: "Enter a valid phone number"
            })
        }

        // check if the user exists
        const userExistsEmail = await User.findOne({ email });
        if (userExistsEmail) {
            return res.send({
                status: 403,
                message: "Email already being used."
            })
        }
        const userExistsUsername = await User.findOne({ username });
        if (userExistsUsername) {
            return res.send({
                status: 403,
                message: "Username already being used."
            })
        }

        // hash the password using bcrypt
        const hashPassword = await bcrypt.hash(password, 11);

        const user = new User({
            name: name,
            email: email,
            username: username,
            phone: phone,
            password: hashPassword,
        })

        try {
            const userDb = await user.save();
            return res.redirect('/login');
        } catch (error) {
            return res.send({
                status: 500,
                message: "Database error",
                data: error
            })
        }
    } catch (error) {
        return res.send({
            stauts: 400,
            message: "Failed",
            error: error,
        })
    }
}

module.exports = handleSignup;