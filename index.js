const express = require("express"); // Express module to create a server application
const cors = require("cors"); // Cors module to handle Preflight requests
const bodyParser = require("body-parser"); // Body-parser module to parse JSON objects

const app = express(); // instance of an Express object
const port = 5000; // the port the server will be listening on
const textBodyParser = bodyParser.text({
    limit: "20Mb",
    defaultCharset: "utf-8",
});

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

//Initialize the Server, and Listen to connection requests
app.listen(port, (err) => {
    if (err) {
        console.log("There was a problem ", err);
    }
    console.log(`Server listening on http://localhost:${port}`);
});
