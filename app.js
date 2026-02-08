
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

let tasks = [
    {
    id: 1,
    title: "Implement MongoDB Integration",
    description: "Connect application with MongoDB to store and retrieve tasks"
},
{
    id: 2,
    title: "Add User Authentication",
    description: "Create login and registration system using sessions or JWT"
},
{
    id: 3,
    title: "Create REST API",
    description: "Build API endpoints for tasks using GET, POST, PUT, and DELETE"
},
{
    id: 4,
    title: "Add Validation",
    description: "Validate form inputs before saving data"
},
{
    id: 5,
    title: "Handle Errors",
    description: "Implement centralized error handling middleware"
},
];

app.get("/", (req, res) => {
    res.render("index", { tasks });
});

// add pages
app.get("/add", (req, res) => {
    res.render("add");
});

//task created
app.post("/add", (req, res) => {
    const newTask = {
        id: Date.now(),
        title: req.body.title,
        description: req.body.description
    };
    tasks.push(newTask);
    res.redirect("/");
});

//edit task
app.get("/edit/:id", (req, res) => {
    const task = tasks.find(t => t.id == req.params.id);
    res.render("edit", { task });
});

//update task
app.post("/update/:id", (req, res) => {
    tasks = tasks.map(task =>
        task.id == req.params.id
            ? {
                ...task,
                title: req.body.title,
                description: req.body.description
            }: task
    );
    res.redirect("/");
});

// delete task
app.get("/delete/:id", (req, res) => {
    tasks = tasks.filter(t => t.id != req.params.id);
    res.redirect("/");
});

const port = 5001;

app.listen(port, () => {
    console.log("server running on ", port);
});
