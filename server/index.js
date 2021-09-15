const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

app.use(cors());
app.use(express.json());


//ROUTES//

//create todo

app.post("/tabtest", async(req,res) => {

    try {
        const {opis} = req.body;
        const newTodo = await pool.query("INSERT INTO tabtest (opis) VALUES($1) RETURNING *",[opis]);
        res.json(newTodo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }

})


//get all todo

app.get("/tabtest", async(req,res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM tabtest");
        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message);
    }
});


//get a todo

app.get("/tabtest/:id", async(req,res) =>{
    try {
        const {id} = req.params;
        const todo = await pool.query("SELECT * FROM tabtest WHERE tab_id = $1", [id]);

        res.json(todo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})

//update todo

app.put("/tabtest/:id", async(req,res)=>{
    try {
        const {id} = req.params;
        const {opis} = req.body;
        const updateTodo = await pool.query("UPDATE tabtest SET opis = $1 WHERE tab_id = $2",[opis,id]);

        res.json("todo was updated");
    } catch (err) {
        console.error(err.message);
    }
})

//delete todo

app.delete("/tabtest/:id", async(req,res)=>{
    try {
        const {id} = req.params;
        const deleteTodo = await pool.query("DELETE FROM tabtest WHERE tab_id = $1",[id]);
        res.json("todo was deleted");
    } catch (err) {
        console.error(err.message);
    }
})

app.listen(5000, ()=> {
    console.log("serwer wystartowal na porcie 5000");
})