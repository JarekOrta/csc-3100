import express from "express";

const app = express();
const port = 8000;

app.use(express.json());

const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor",
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer",
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor",
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspiring actress",
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender",
    },
  ],
};

const findUserByName = (name) => {
    return users["users_list"].filter((user) => user["name"] === name);
};

const findUserByNameAndJob = (name, job) => {
  return users["users_list"].filter(
    (user) => user["name"] === name && user["job"] === job
  );
};


const findUserById = (id) => 
    users["users_list"].find((user) => user["id"] === id);


app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;

  if (name !== undefined && job !== undefined) {
    const result = findUserByNameAndJob(name, job);
    res.send({ users_list: result });
  } else if (name !== undefined) {
    const result = findUserByName(name);
    res.send({ users_list: result });
  } else {
    res.send(users);
  }
});

app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  const result = findUserById(id);

  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  addUser(userToAdd);
  res.send();
});

app.delete("/users/:id", (req, res) => {
    const id = req.params.id;
    const deletedUser = deleteUserById(id);

    if (deletedUser === undefined){
        res.status(404).send("resource not found.");
    }
    else{
        res.send(deletedUser);
    }});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

const deleteUserById = (id) => {
    const index = users["users_list"].findIndex((user) => user["id"] === id);

    if (index === -1) {
        return undefined;
    }
    return users["users_list"].splice(index, 1)[0];
};


const addUser = (user) => {
  users["users_list"].push(user);
  return user;
};


/*
curl -X POST http://localhost:8000/users \
-H "Content-Type: application/json" \
-d '{"id":"qwe123","job":"Zookeeper","name":"Cindy"}'

 
curl -X DELETE http://localhost:8000/users/qwe123

*/
