// make a server out of this pc using express
const express = require("express");
// import the file and make changes in it using the frontend
const filesystem = require("fs");
const users = require("./MOCK_DATA.json");
// console.log(users);
const myserver = express();
// get the whole info of all the users
myserver.use(express.urlencoded({ extended: false }));
myserver.get("/api/users", (req, res) => {
  return res.json(users);
});
// get a single user onli
myserver.get("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((user) => user.id === id);
  return res.send(user);
});
// add some data into it
myserver.post("/api/users", (req, res) => {
  const body = req.body;
  console.log(body);
  users.push({ ...body, id: users.length + 1 });
  filesystem.writeFile(
    "./MOCK_DATA.json",
    JSON.stringify(users),
    (err, data) => {
      return res.json({ status: "success", id: users.length });
    }
  );
});
// delete one user
myserver.delete("/api/users/remove/:id", (req, res) => {
  const id = Number(req.params.id);
  // lets take the case where id surely exists
  const user = users.find((user) => {
    user.id === id;
  });
  const deleted = users.pop(user);
  console.log(deleted);
  filesystem.writeFile(
    "./MOCK_DATA.json",
    JSON.stringify(users),
    (err, data) => {
      console.log("Done");
    }
  );
});
myserver.listen(8000, () => console.log("SERVER STARTED"));

// update the infromation of one user
