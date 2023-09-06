const fs = require('fs');  // import fs library
const userData = './data/userData.json'; // path to the users.json

async function getCurrentUser(currentUserEmail) {
    const fileData = fs.readFileSync(userData);
    const users =JSON.parse(fileData);
    currentUser = users[currentUserEmail]
    return {currentUser};
}

async function authenticateUser(request) {
    // get the value for the 'username' and 'password'
    // keys from the request query string
    const useremail = request.email;
    const password = request.password;
    
    return new Promise((resolve, reject) => {
        fs.readFile(userData, 'utf-8', (err, fileData) => {
            if (err) {
                reject(err);
                return;
            }
            const users = JSON.parse(fileData);
            if (users[useremail] && users[useremail].password === password) {
                resolve(true);
            } else {
                resolve(false);
            }
        });
    });
}

async function addUser(filePath, email, name, password) {
    return new Promise((resolve, reject) => {
        const fileData = fs.readFileSync(filePath);
        let users;
        let return_val = {}

        try {
            users = JSON.parse(fileData);
        } catch (error) {
            users = {};
            reject(error);
        }

        if (!users[email]) {
            users[email] = {
                name: name,
                password: password,
            };

            fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
            console.log(`User ${email} was added to users.json`);
            return_val = {state : 'sucess', message: `Sign up Sucessed`}
        } else {
            console.log(`Users ${email} already exists!`);
            return_val = {state: 'fail', message:`Users ${email} already exists!` }
        }
        resolve(return_val);
    })
    .then(function(return_val){
        return return_val;
    })
}


module.exports = {
    authenticateUser,
    getCurrentUser,
    addUser
};