const express = require("express"); // Express module to create a server application
const cors = require("cors"); // Cors module to handle Preflight requests
const bodyParser = require("body-parser"); // Body-parser module to parse JSON objects
const formidable = require("formidable");
const fs = require("fs");

const app = express(); // instance of an Express object
const port = 5000; // the port the server will be listening on
const textBodyParser = bodyParser.text({
    limit: "20Mb",
    defaultCharset: "utf-8",
});

const { authenticateUser,
    getCurrentUser,
    addUser } = require('./modules/login.js');

app.use(
    cors({
        origin: "http://localhost:3000", // enable CORS for localhost:3000
    })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const {
    mergeNewPost,
    writePostJson,
    like,
    unlike,
} = require("./modules/social");

//Solicitud previa
app.options("/", (req, res) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "task"); // Allow the 'task 'header
    res.header("Access-Control-Allow-Methods", "GET"); // Allow the GET method
    res.header("Access-Control-Allow-Methods", "POST"); // Allow the POST method
    res.sendStatus(200);
});

app.post("/", textBodyParser, async function (req, res) {
    let user = JSON.parse(req.body);
    console.log("usuario2: ", user.username); //print the HTTP Request Headers
    let post;
    if (req.headers["task"] == "getPost") {
        post = mergeNewPost(user.username);
        console.log(post);
        //res.send({ response });
        res.status(200).json(post);
        res.end();
    }
});
app.put("/", textBodyParser, async function (req, res) {
    let data = JSON.parse(req.body);
    console.log(data); //print the HTTP Request Headers
    if (req.headers["task"] == "like") {
        like(data.username, data.numberpost);
        console.log("Ok like agregado");
        //res.send({ response });
        res.status(200);
        res.end();
    }
});

app.post('/getUserData', textBodyParser, async function (req,res) {
    console.log('req.headers: ', req.headers); 

    const reqOrigin = req.headers['origin']; // get the origin of the request
    const reqTask = req.headers['task']; // get the task of the request

    console.log("Processing request from " + reqOrigin + " for route " + req.url + " with method " + req.method + " for task: " + reqTask);

    if (reqTask === 'getCurrentUserData') {
        try {
            let request = JSON.parse(req.body);
            currentUserEmail = request.currentUserEmail
            const {currentUser} = await getCurrentUser(currentUserEmail);
            console.log(currentUser);
            res.setHeader('Access-Control-Allow-Origin', '*');
            // allow client to access the custom 'request-result' header:
            res.setHeader('Access-Control-Expose-Headers', 'request-result'); 
            // set the custom header 'request-result'
            res.setHeader('request-result', 'Request ' + req.method + ' was received successfully.');
            res.status(200).json({currentUser});
        } catch (error) {
            console.log('getCurrentUser() error :' ,error);
            res.status(500).send("Server Error");
        }
        
    }
})

app.post('/login', textBodyParser, async function (req, res) {
    // print the HTTP Request Headers
    console.log('req.headers: ', req.headers); 
    const reqOrigin = req.headers['origin']; // get the origin of the request
    const reqTask = req.headers['task']; // get the task of the request
    let request = JSON.parse(req.body);
    console.log("Processing request from " + reqOrigin + " for route " + req.url + " with method " + req.method + " for task: " + reqTask);

    // TASK Check
    if (reqTask === 'login') {
        try {
            console.log(request);
            const loginResult = await authenticateUser(request);
            console.log('authenticateUser() result: ', loginResult);

            if (loginResult == true) {
                res.setHeader('Access-Control-Allow-Origin', '*');
                // allow client to access the custom 'request-result' header:
                res.setHeader('Access-Control-Expose-Headers', 'request-result'); 
                // set the custom header 'request-result'
                res.setHeader('request-result', 'Request ' + req.method + ' was received successfully.');
                res.status(200).json({message:"Login Successful"});
            } else {
                res.status(403).jdon({message:"Login Failed"}); // 403 Forbidden Access
            }
        } catch (error) {
            console.log('authenticateUser() error:', error);
            res.status(500).json({message:"Server Error"});
        }
    }

    else if (reqTask === 'signup') {
        try {   
            console.log(request);
             let filePath = './data/userData.json';
             const email = request.email;
             const name = request.name;
             const password = request.password;
             await addUser(filePath,email,name,password);
        } catch (error){
            console.log('addUser() error:', error);
            res.status(500).send("Server Error");
        }
    }
    res.end();
});

app.post('/post', async function (req, res){
    const reqOrigin = req.headers['origin'];
    const reqTask = req.headers['task'];

    let form = new formidable.IncomingForm();

    if (reqTask === 'text'){
        console.log("\n\n\nProcessing request from " + reqOrigin + " for route " + req.url + " with method " + req.method + " for task: " + reqTask);
        console.log(req.body.content);
        res.write('text posted');
    }else {
        console.log("Posting Image...");
        form.parse(req, function (error, fields, file) {
            let filepath = file.fileupload[0].filepath;
            let newpath = './data/imgs/';
            newpath += 'image test';

            fs.rename(filepath, newpath, function () {

            res.write('NodeJS File Upload Success!');
            res.end();
            });
        });
    }
});

//Initialize the Server, and Listen to connection requests
app.listen(port, (err) => {
    if (err) {
        console.log("There was a problem ", err);
    }
    console.log(`Server listening on http://localhost:${port}`);
});
