const {User} = require('../models');

class RegisterController {
    static async register(req, res, next){
        const {username, email, password, role, phoneNumber, address} = req.body;
        console.log(req.body);
        try {
            const newUser = await User.create({username, email, password, role, phoneNumber, address})
            res.status(201).json({
                id: newUser.id,
                email: newUser.email
            });
        } catch (error) {
            next(error)
        }
    }
}

module.exports = RegisterController;