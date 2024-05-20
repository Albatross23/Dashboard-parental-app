import mysql from'mysql2'
import express from 'express'


const connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'saniya@23',
    database:'for_me'
});

const app=express();

const PORT=3000;

app.listen(PORT,()=>{
    console.log(`SERVER : http://localhost:${PORT}`);
    connection.connect(err=>{
        if(err) throw err;
        console.log('Database Connected');
    });
});

app.use("/all/mydata",(req,res)=>{
    const sql_query="SELECT * FROM SocialMediaUsage";
   connection.query(sql_query,(err,result)=>{
    if(err) throw err;
       res.send(result);

   })
    })