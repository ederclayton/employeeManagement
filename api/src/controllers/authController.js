const authServices = require('../services/authServices');

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await authServices.authentication(email, password);
    
        res.status(200).json( user );
    } catch (error) {
        if (error.status) {
            res.status(error.status).json({message: error.message});
        } else {
            console.log(error.message);
            res.status(500).json({message: 'Internal Error'});
        }
    }
};

exports.newUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = {
            name, email, password
        };

        await authServices.register(user);

        res.status(200).json({message: 'Successfully registered user.'})

    } catch (error) {
        if (error.status) {
            res.status(error.status).json({message: error.message});
        } else {
            console.log(error.message);
            res.status(500).json({message: 'Internal Error'});
        }
    }
};