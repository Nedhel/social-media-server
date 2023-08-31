const fs = require("fs");

function readFileJson(name) {
    const data = require(`../data/${name}.json`);
    /*fs.readFile(`./data/${name}.json`, "utf-8", function (err, data) {
        if (err) throw err;
        console.log(data);
    });*/
    return data;
}

//Formato que recibe la funcion writePostJson
/*let h = {
    text: "tercer post de zalpa!!",
    img: "local/img/photozalpa1",
    likes: 0,
};*/

function writePostJson(name, newPost) {
    let date = new Date();
    date = date.getTime().toString();
    const data = readFileJson(name);
    let lastPost = data.post[data.post.length - 1];
    let id = parseInt(lastPost.id) + 1;
    newPost = { id: id, date: date, owner: name, ...newPost };
    data.post.push(newPost);
    let newData = JSON.stringify({ ...data });
    fs.writeFile(`./data/${name}.json`, newData, function (err) {
        if (err) throw err;
        console.log("Replaced!");
    });
}

function mergeNewPost(name) {
    let friends = readFileJson(name);
    let post = [];
    friends.friends.map((nameFriend) => {
        let friend = readFileJson(nameFriend);
        friend.post.forEach((element) => {
            post.push(element);
        });
    });
    post.sort(function (a, b) {
        return b.date - a.date;
    });
    return post;
}
function mergeNewPostAll(name) {
    let friends = readFileJson(name);
    let post = [];
    friends.post.forEach((element) => {
        post.push(element);
    });
    friends.friends.map((nameFriend) => {
        let friend = readFileJson(nameFriend);
        friend.post.forEach((element) => {
            post.push(element);
        });
    });
    post.sort(function (a, b) {
        return b.date - a.date;
    });
    return post;
}

//id y position of post in the array is same
function like(name, postNumber) {
    const data = readFileJson(name);
    data.post[postNumber].likes++;
    let newData = JSON.stringify({ ...data });
    fs.writeFile(`./data/${name}.json`, newData, function (err) {
        if (err) throw err;
        console.log("sum ok!");
    });
}

function dislike(name, postNumber) {
    const data = readFileJson(name);
    data.post[postNumber].likes--;
    let newData = JSON.stringify({ ...data });
    fs.writeFile(`./data/${name}.json`, newData, function (err) {
        if (err) throw err;
        console.log("rest ok!");
    });
}

module.exports = {
    mergeNewPost,
    mergeNewPostAll,
    writePostJson,
    like,
    dislike,
    readFileJson,
};
