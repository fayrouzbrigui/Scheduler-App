const authService = require("../services/login");

async function login(req, res){
    try {
        const {email, password} = req.body;
        const token = await authService.login(email, password);
        res.json({token : token});
    } catch (error) {
        res.status(400).json({message: "Invalid Credentials"});
    }
}

module.exports = {
    login
};