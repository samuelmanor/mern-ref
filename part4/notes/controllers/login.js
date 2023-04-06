const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const loginRouter = require('express').Router();
const User = require('../models/user');

loginRouter.post('/', async (request, response) => {
    const { username, password } = request.body;

    const user = await User.findOne({ username });
    const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(password, user.passwordHash);
    
    if (!(user && passwordCorrect)) {
        return response.status(401).json({
            error: 'invalid username or password'
        });
    }

    const userForToken = {
        username: user.username,
        id: user._id
    };

    const token = jwt.sign(
        userForToken, 
        process.env.SECRET,
        { expiresIn: 60*60 }); // expires in one hour
    // console.log('userForToken', userForToken, 'token', token);

    response.status(200)
        .send({ token, username: user.username, name: user.name });
});

module.exports = loginRouter;

/*

userForToken { username: 'smm', id: new ObjectId("642dea43413951b32cb46415") } 
token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNtbSIsImlkIjoiNjQyZGVhNDM0MTM5NTFiMzJjYjQ2NDE1IiwiaWF0IjoxNjgwNzM5NDYyfQ.tf7iohIES9GzQEo5EJjmYVDcv3RBdlTgyVVeMybGaeU

*/