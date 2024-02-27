const express=require('express');
const bodyparser= require('body-parser'); 
const cors=require('cors');
const mysql= require('mysql2');
const app= express();
app.use(cors());
app.use(bodyparser.json());
const connection= mysql.createConnection({
    host:'baerto5kj9xqfzxwlolw-mysql.services.clever-cloud.com',
    user:'uuwvsemrf5bxu5ag',
    password:'piH9J5d6ZJOxEQUjspRC',
    database:'baerto5kj9xqfzxwlolw',
    port:3306
});
connection.connect(err=>{
    if(err) return console.error('Error connecting to MySQL:',err);
    console.log('connected to MySQL');
});

let users = [];
app.post('/signup',(req,res)=>{
    // console.log(req.body,'Post data '); 
    let Id = req.body.id;
    let Name = req.body.name;
    let Email = req.body.email;
    let Password = req.body.password;
    let qr=`insert into users( name,email,password) value( '${Name}' ,'${Email}','${Password}'  )`
    connection.query(qr,(err,results)=>{
        if(err){
            console.log(err)
        }
         
        const newUser = {Name,Email, Password };
        users.push(newUser);
        res.send({
            message:"DAta added successfully",
            data:results
        })
    })

});
    
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
    connection.query(sql, [email, password], (err, results) => {
      if (err) throw err;
      if (results.length > 0) {
        res.status(200).json({ message: 'Login successful' });
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    });
  });
  app.post('/admlogin', (req, res) => {
    const { email, password } = req.body;
    const sql = 'SELECT * FROM admin WHERE email = ? AND password = ?';
    connection.query(sql, [email, password], (err, results) => {
      if (err) throw err;
      if (results.length > 0) {
        res.status(200).json({ message: 'Login successful' });
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    });
  });
   
//   app.post('/adsignup',(req,res)=>{
//     // console.log(req.body,'Post data '); 
//     let Id = req.body.id;
     
//     let Email = req.body.email;
//     let Password = req.body.password;
//     let qr=`insert into admin(  email,password) value(  '${Email}','${Password}'  )`
//     connection.query(qr,(err,results)=>{
//         if(err){
//             console.log(err)
//         }
//         // if(results.length>0){
//         //     res.send({
//         //         message:"Data created successfully"
//         //     });
//         // }
//         // else{
//         //     res.send({
//         //         message:"Something wrong.."
//         //     })
//         // }
         
//         res.send({
//             message:"DAta added successfully",
//             data:results
//         })
//     })

// });
app.get('/books',(req,res)=>{
    // console.log('Get All Users');
    let qrr=`SELECT * FROM book1`;
    connection.query(qrr,(err,results)=>{
        if(err){
            console.log(err,'errs');
        }
        if(results.length >0){
            res.send({
                message:'All books data',
                data:results
            });
        }
    });
});
// app.get('/user/:id',(req,res)=>{
// //    console.log('Get data by ID');
// // console.log(req.params.id);    
// let qrId=req.params.id;
// let qr = `SELECT * FROM user where id = ${qrId}`;
// connection.query(qr,(err,results)=>{
//     if(err){
//         console.log(err);

//     }
//     if(results.length>0){
//         res.send({
//             message:"Get data by ID",
//             data:results
//         })
//     }else{
//         res.send({
//             message:"Data not found dear!"
//         })
//     }
// })
// });
app.post('/book',(req,res)=>{
    // console.log(req.body,'Post data '); 
    let Id=req.body.id;
    let Title=req.body.title;
    let Author=req.body.author;
    let Subject=req.body.subject;
    let Year=req.body.year;
    let Bookcopy=req.body.bookcopy;
    let Image= req.body.image;
     
    let qr=`insert into book1(title,author,subject,year,bookcopy,image) value( '${Title}','${Author}','${Subject}','${Year}','${Bookcopy}','${Image}'  )`
    connection.query(qr,(err,results)=>{
        if(err){
            console.log(err)
        }
        // if(results.length>0){
        //     res.send({
        //         message:"Data created successfully"
        //     });
        // }
        // else{
        //     res.send({
        //         message:"Something wrong.."
        //     })
        // }
        res.send({
            message:"DAta added successfully",
            data:results
        })
    })

})
// app.put('/user/:id',(req,res)=>{
//     let Id=req.body.id;
//     let Name=req.body.name;
//     let Department=req.body.department;
//     let Employeeid=req.body.employeeid;
//     let Email=req.body.email;
//     let Dob=req.body.dob;
//     let Mobile= req.body.mobile;
//     let Salary= req.body.salary;
//     let qr=`update user set name='${Name}',department='${Department}',employeeid='${Employeeid}',email='${Email}',dob='${Dob}',mobile='${Mobile}',salary='${Salary}' where id='${Id}'`;
//     connection.query(qr,(err,results)=>{
//         if(err){console.log(err)}
//         res.send({
//             message:"Data updated successfully",
//             data:results
//         })
//     })
// });
app.delete('/book/:id',(req,res)=>{
    let uId=req.params.id;
    let qr=`delete from book1 where id='${uId}'`;
    connection.query(qr,(err,results)=>{
        if(err){console.log(err);}
        res.send({
            message:"Data deleted"
        })
    })

})
  
app.listen(3030,()=>{
    console.log("Server is running on 3000 PORT,Testycodeiz");
});
