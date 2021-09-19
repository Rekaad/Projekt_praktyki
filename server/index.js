const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

app.use(cors());
app.use(express.json());


//ROUTES//

//create todo

app.post("/test", async(req,res) => {

    try {
        const {nazwatest,przedmiotid,haslotest} = req.body;
        const newTodo = await pool.query("INSERT INTO test (nazwatest,haslotest,przedmiotid) VALUES($1,$2,$3) RETURNING *",[nazwatest,haslotest,przedmiotid]);
        res.json(newTodo.rows);
    } catch (err) {
        console.error(err.message);
    }

})

app.post("/pytanie", async(req,res) => {
    var dlugosc = Object.keys(req.body).length;
    var last = req.body[-1];
    for(var i=0; i<=dlugosc;i++){

        try {
            const {trescpytania,Odp1,Odp2,Odp3,Odp4,Poprawna} = req.body[i];
            console.log(trescpytania);
            const {last} = req.body;
            console.log(last.testid);
            const newTodo = await pool.query("INSERT INTO pytanie (trescpytania,odpowiedz1,odpowiedz2,odpowiedz3,odpowiedz4,poprawna,testid) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *",[trescpytania,Odp1,Odp2,Odp3,Odp4,Poprawna,last.testid]);
            res.json(newTodo.rows[i]);
        } catch (err) {
            console.error(err.message);
        }

    }
    

})

//get all todo

app.get("/test", async(req,res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM test");
        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/pytanie", async(req,res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM pytanie");
        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//get a todo where przedmiotid

app.get("/test/przedmiotid/:id", async(req,res) =>{
    try {
        const {id} = req.params;
        const todo = await pool.query("SELECT * FROM test WHERE przedmiotid = $1", [id]);

        res.json(todo.rows);
    } catch (err) {
        console.error(err.message);
    }
})

app.get("/pytanie/testid/:id", async(req,res) =>{
    try {
        const {id} = req.params;
        const todo = await pool.query("SELECT * FROM pytanie WHERE testid = $1", [id]);

        res.json(todo.rows);
    } catch (err) {
        console.error(err.message);
    }
})

//get a todo

app.get("/test/:id", async(req,res) =>{
    try {
        const {id} = req.params;
        const todo = await pool.query("SELECT * FROM test WHERE testid = $1", [id]);

        res.json(todo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})

//update todo

app.put("/test/:id", async(req,res)=>{
    try {
        const {id} = req.params;
        const {opis} = req.body;
        const updateTodo = await pool.query("UPDATE test SET opis = $1 WHERE testid = $2",[opis,id]);

        res.json("todo was updated");
    } catch (err) {
        console.error(err.message);
    }
})

//delete todo

app.delete("/test/:id", async(req,res)=>{
    try {
        const {id} = req.params;
        const deleteTodo = await pool.query("DELETE FROM test WHERE testid = $1",[id]);
        res.json("todo was deleted");
    } catch (err) {
        console.error(err.message);
    }
})

app.post('/register', (req,res)=>{
   
    const login =req.body.login;
    const haslo =req.body.haslo;
 
     pool.query(
         "INSERT INTO uzytkownik (login, haslo) VALUES ($1,$2)",
         [login, haslo],
         (err,result)=>{
         console.log(err);
     });
 });

 app.post('/logins', (req,res)=>{
   
    const login =req.body.login;
    const haslo =req.body.haslo;
    
    
     pool.query(
         "SELECT * FROM uzytkownik WHERE login =$1 AND haslo =$2",
         [login, haslo],
         (err,result)=> {
             if(err)
            {
               res.send({ err: err});
             } 
             
             if(result.rows.length >0){
                 res.send(result.rows);
             }else{
                
                 res.send({message: "Zly login lub haslo"});
             }
             console.log(result);
     });
     
 });




app.listen(5000, ()=> {
    console.log("serwer wystartowal na porcie 5000");
})