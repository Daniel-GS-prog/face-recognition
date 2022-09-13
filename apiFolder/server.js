
// setting express variables:
const express = require('express');
const bodyParser = require('body-parser'); // always import early.
const cors = require('cors');


const app = express();
app.use(cors());
app.use(bodyParser.json());

/*
API  DESIGN:
/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user
*/

// array of objects to store user's information:

const database = {
    users: 
        [
            {
                id: '123',
                name: 'John',
                email: 'john@gmail.com',
                password: 'cookies',
                entries: 0,
                joined: new Date()

            },
            {
                id: '124',
                name: 'Sally',
                email: 'sally@gmail.com',
                password: 'bananas',
                entries: 0,
                joined: new Date()

            }
        ]
}

// signin route:
// returns success if user is in database, and error otherwise.
app.post('/signin', (req, res)=> {
    if (req.body.email === database.users[0].email &&
        req.body.password === database.users[0].password){
            res.json(database.users[0]);
        } else {
            res.status(400).json('error logging in');
        }
})

// register route:
// returns the new user added.
app.post('/register', (req, res) =>{

    const {name, email, password} = req.body; // deconstructing.

    database.users.push(
        {
            id: '125',
            name: name,
            email: email,
            password: password,
            entries: 0,
            joined: new Date()

        }
    )
    res.send(database.users[database.users.length-1]);

})

//profile/:userId:
app.get('/profile/:id', (req, res) => { // do not include ':' in the request.
    
    
    const {id} = req.params;
    let found = false;

    database.users.forEach(user => {
        if (user.id === id){
            found = true;
            return res.json(user);
        }
    })
    if (!found) {
        res.status(400).json('not such user');
    }
})

//image
app.put('/image', (req, res) => {
    const {id} = req.body;
    let found = false;

    database.users.forEach(user => {
        if (user.id === id){
            found = true;
            user.entries++
            return res.json(`${user.entries}`);
        }
    })
    if (!found) {
        res.status(400).json('not such user');
    }
})

// home route
// returns the update array of users to check we are registering them properly
app.get('/', (req, res)=>{
    res.send(database.users);
})

// initializing server and testing home route
app.listen(3000, ()=> {
    console.log('app running on port 3000');
})

