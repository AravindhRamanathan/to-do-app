const mysql=require('mysql');
const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');

const app=express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
const db=mysql.createConnection({
    host:'localhost',
    user:'your-username',
    //password:'123456'
    database:'your-database'
});

//connect 
db.connect((err)=>{
    if(err)
    {
        console.log('error in the db connectivity');
        throw err;
    }
    console.log('MySqldatabase connected');
})

//insert task
app.post('/addTask',(req,res)=>{
    let date=new Date();
    let time=date.getTime();
    let add_task=req.body.task;
    let task={id:time, task:add_task};
    let sql='INSERT INTO task SET ?';   //to prevent from query insertion
    let query=db.query(sql,task,(err,result)=>{
        if(err) console.log(err);
        console.log(result);
        //res.send('Task 1 added');
    })
    //console.log(req);
    res.send({id:time,task:add_task});
    res.end();

});

app.delete('/deleteTask',(req,res)=>{
    let sql='DELETE from task WHERE id=?';
    let query=db.query(sql,req.body.id,(err,result)=>{
        if(err) throw (err);
        console.log(result);
    } )
    res.send({success:true,id:req.body.id});
    res.end();
})


app.listen('5000',()=>{
    console.log("app is listening to 5000");
})
