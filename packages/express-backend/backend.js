import express from "express";
import cors from "cors";
import userService from "./services/user-service.js";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", (req, res) => {
  const { name, job } = req.query;

  userService
    .getUsers(name, job)
    .then((users) => res.send({ users_list: users }))
    .catch((error) => res.status(500).send(error));
});

app.get("/users/:id", (req, res) => {
  userService
    .findUserById(req.params.id)
    .then((user) => {
      if (user === null) {
        res.status(404).send("Resource not found.");
      } else {
        res.send(user);
      }
    })
    .catch((error) => res.status(500).send(error));
});

app.post("/users", (req, res) => {
  userService
    .addUser(req.body)
    .then((newUser) => res.status(201).send(newUser))
    .catch((error) => res.status(400).send(error));
});

app.delete("/users/:id", (req, res) => {
  userService
    .removeUser(req.params.id)
    .then((deletedUser) => {
      if (deletedUser === null) {
        res.status(404).send("Resource not found.");
      } else {
        res.send(deletedUser);
      }
    })
    .catch((error) => res.status(500).send(error));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
