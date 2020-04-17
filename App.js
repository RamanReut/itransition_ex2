var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();
var users = {
    0: {
        username: 'user',
        email: '123@gmail.com',
        registrationDate: Date.UTC(2019, 10, 15, 14),
        lastLoginDate: Date.UTC(2020, 1, 1, 13),
        isActive: true,
    }, 
    1: {
        username: 'what',
        email: '321@gmail.com',
        registrationDate: Date.UTC(2019, 10, 15, 14),
        lastLoginDate: Date.UTC(2020, 1, 1, 13),
        isActive: false,
    }
};
var passwords = {
    0: '123',
    1: '222',
}
var existUser = [0, 1];
var idCounter = 2;

app.use(express.static(path.join(__dirname+'/siteSrc/build')));

app.use('/api/*', bodyParser.json());

app.get('/api/users', (req, res) => {
    let reqUsersForm = [];
    for(let i=0; i<existUser.length; i++) {
        reqUsersForm.push({
            ...users[existUser[i]],
            id: existUser[i],
        });
    }
    res.json(reqUsersForm);
});
app.post('/api/users', (req, resp) => {
    let { action, user, users: proceedUsers } = req.body;
    let changeActiveStatus = (status) => {                 
        for(let i=0; i<proceedUsers.length; i++) {
        if (users[proceedUsers[i]]) {
            users[proceedUsers[i]].isActive = status;
        }}
    }

    if (users[user] && users[user].isActive) {
        switch(action) {
            case 'block':
                changeActiveStatus(false);
                resp.status(200).end();
                break;
            case 'unblock':
                changeActiveStatus(true)
                resp.status(200).end();
                break;
            case 'delete':
                for(let i=0; i<proceedUsers.length; i++) {
                    let userID = proceedUsers[i];

                    if(users[userID]) {
                        users[userID]  = undefined;
                        passwords[userID] = undefined;
                        for(let k=0; k<existUser.length; k++) {
                            if(existUser[k]==userID) {
                                existUser = [
                                    ...existUser.slice(0, k),
                                    ...existUser.slice(k+1),
                                ]
                                break;
                            }
                        }
                    }
                }
                resp.status(200).end();
                break;
        }
    } else {
       resp.status(401).end();
    }
})

app.post('/api/newUser', (req, resp) => {
    let { username, password, email } = req.body;

    for (let i=0; i<existUser.length; i++) {
        if (username == users[existUser[i]].username && email == users[existUser[i]].email) {
            resp.status(406).end();
        }
    }
    users[idCounter] = {
        username: username,
        email: email,
        registrationDate: Date.now(),
        lastLoginDate: Date.now(),
        isActive: true,
    };
    passwords[idCounter] = password;
    existUser = [...existUser, idCounter];
    resp.json({user: idCounter});
    idCounter++;
});

app.post('/api/login', (req, resp) => {
    let { username, password } = req.body;
    
    for (let i=0; i<existUser.length; i++) {
        let userID = existUser[i];

        if(
            users[userID].username == username && 
            passwords[userID] == password &&
            users[userID].isActive
        ) {
            users[userID].lastLoginDate = Date.now();
            resp.json({user: userID});
        }
    }
});

app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/siteSrc/build/index.html'));
});

app.listen(process.env.PORT);