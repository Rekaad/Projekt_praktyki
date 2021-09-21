const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST","DELETE","UPDATE"],
    credentials: true,
  }));
app.use(express.json());

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
    session({
      key: "userId",
      secret: "subscribe",
      resave: false,
      saveUninitialized: false,
      cookie: {
        expires: 60 * 60 * 24,
      },
    })
  );


  
const bcrypt = require("bcrypt");
const saltRounds = 10;

//ROUTES//

//create todo

app.post("/test", async(req,res) => {

    try {
        const {nazwatest,przedmiotid,haslotest,uzytkownikid} = req.body;
        const newTodo = await pool.query("INSERT INTO test (nazwatest,haslotest,przedmiotid,uzytkownikid) VALUES($1,$2,$3,$4) RETURNING *",[nazwatest,haslotest,przedmiotid,uzytkownikid]);
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

app.post("/uczestnik", async(req,res) => {

    const {dataId, numeralbumu, wynik} = req.body;
    console.log(req.body);
    const newTodo = await pool.query("INSERT INTO uczestnik (numeralbumu,rezultat,testid) VALUES($1,$2,$3)",[numeralbumu,wynik,dataId]);
    res.json(newTodo.rows);
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

app.get("/uczestnik/testid/:id", async(req,res) => {
    try {
        const {id} = req.params;
        const allTodos = await pool.query("SELECT * FROM uczestnik WHERE testid= $1",[id]);
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

app.get("/test/nazwatest/:id", async(req,res) =>{
    try {
        const {id} = req.params;
        const todo = await pool.query("SELECT * FROM test WHERE nazwatest LIKE '%$1%'", [id]);

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
        const deleteTest = await pool.query("DELETE FROM test WHERE testid = $1",[id]);
        res.json("todo was deleted");
    } catch (err) {
        console.error(err.message);
    }
})


app.post('/register', (req,res)=>{
   
    const login =req.body.login;
    const haslo =req.body.haslo;
    const email =req.body.email;
    const imie =req.body.imie;
    const nazwisko =req.body.nazwisko;
 
    bcrypt.hash(haslo, saltRounds, (err, hash) => {
        if (err) {
          console.log(err);
        }
     pool.query(
         "INSERT INTO uzytkownik (login, haslo,email,imie,nazwisko) VALUES ($1,$2,$3,$4,$5)",
         [login, hash,email,imie,nazwisko],
         (err,result)=>{
         //console.log(err);
         console.log(result);
            if(err)
            {
                res.send({ message: "Użytkownik już istnieje" });
            }else{
                res.send(result);
            }
     }
     );
    });
 });

 app.get("/logins", (req, res) => {
    if (req.session.user) {
      res.send({ loggedIn: true, user: req.session.user });
    } else {
      res.send({ loggedIn: false });
    }
  });

  app.get("/logout", (req, res) => {
    
      res.send({ loggedIn: false});
      req.session.destroy();
    
  });


 app.post('/logins', (req,res)=>{
   
    const login =req.body.login;
    const haslo =req.body.haslo;
    
    
     pool.query(
         "SELECT * FROM uzytkownik WHERE login =$1",
         [login],
         (err,result)=> {
             if(err)
            {
               res.send({ err: err});
             } 
             

             if(result.rows.length >0){
                bcrypt.compare(haslo, result.rows[0].haslo, (error, response) => {

                if (response) {
                    req.session.user= result.rows;
                    console.log(req.session.user);
                    res.send(result.rows);
                  } else {
                    res.send({ message: "Zły login lub hasło" });
                  }
                });
              } else {
                
                res.send({ message: "Użytkownik nie istnieje" });
              }
            }
          );
        });
    
     app.post('/hasloT', (req,res)=>{
   
            const haslo =req.body.haslo;
            const id =req.body.testId;
             pool.query(
                 "SELECT * FROM test WHERE haslotest =$1 AND testid=$2",
                 [haslo,id],
                 (err,result)=> {
                   console.log
                     if(err)
                    {
                       res.send({ err: err});
                     } 
                     if(result.rows.length >0){
                       
                            res.send(result.rows);
                          
                      } else {
                        res.send({ message: "Błędne hasło!" });
                      }
                    }
                  );
                });


app.listen(5000, ()=> {
    console.log("serwer wystartowal na porcie 5000");
})