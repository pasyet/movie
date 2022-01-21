const {User} = require('../models');
const {signin} = require('../helpers/jwt-helper')
const {compare} = require('../helpers/hash-helper')

class SigninController {
    static async signIn(req, res, next){
        const {email, password} = req.body;
        try {
            if (!email || !password) throw { name: 'Unauthorized'};
            const user = await User.findOne({where: {email}});
            if (!user) throw {name : 'Unauthorized'};
            const compareResult = compare(password, user.password);
            if (!compareResult) throw {name: 'Unauthorized'}
            const access_token = signin({id : user.id, email:user.email});
            res.status(200).json({access_token});
        } catch (error) {
            next(error)
        }
    }
}

module.exports = SigninController;