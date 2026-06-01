const express = require('express');//npm install express
const mysql = require('mysql');//npm install mysql
const bodyParser = require('body-parser'); // npm install body-parser

//initiate http server (express)
const app = express();
app.listen(3333);//initialize web server
//objects to handle POST message body
const jsonParser = bodyParser.json() // create application/json parser
const urlencodedParser = bodyParser.urlencoded({ extended: false }) // create application/x-www-form-urlencoded parser

//initialize mysql connection
const MYSQL_IP="localhost";//127.0.0.1
const MYSQL_LOGIN="root";
const MYSQL_PASSWORD="root";

let con = mysql.createConnection({
  host:  MYSQL_IP,
  user: MYSQL_LOGIN,
  password: MYSQL_PASSWORD,
  database: "sakila"
}); 

con.connect(function(err) {
  if (err){
    console.log(err);
    throw err;
  }
  console.log("Connection with mysql established");
});

app.get('/top_customers', function (req, res) {
  let sql =`SELECT concat ( concat(c.first_name, " "), c.last_name) as full_name, sum(amount) as total FROM sakila.payment p
  inner join customer c on c.customer_id = p.customer_id
  group by p.customer_id order by total desc limit 20`;
  con.query(sql, function (err, result) {
    if (err){
      res.status(500);
      res.send(JSON.stringify(err));
    }else{
      res.status(200);
      res.setHeader('Content-Type', 'application/json');
      addCorsHttpHeaders(res);
      console.log(result);
      res.send(JSON.stringify(result));
    }
  });
 
});

app.post('/actor', urlencodedParser, function (req, res) {
  const firstName = req.body.first_name;
  const lastName = req.body.last_name;
  const parameters = [firstName, lastName];
  let sql = "insert into actor (first_name, last_name) values (?,?)";
  con.query(sql, parameters, function (err, result) {
    if (err){
      res.status(500);
      res.send(JSON.stringify(err));
    }else{
      res.status(200);
      addCorsHttpHeaders(res);
      res.send("Novo ator inserido com sucesso!<br/>"+ JSON.stringify(result));
    }
  });
 
});

function addCorsHttpHeaders(httpResponse){
  httpResponse.setHeader("Access-Control-Allow-Origin", "*");
  httpResponse.setHeader("Access-Control-Allow-Methods","POST,GET,OPTIONS,PUT,DELETE,HEAD");
  httpResponse.setHeader("Access-Control-Allow-Headers","X-PINGOTHER,Origin,X-Requested-With,Content-Type,Accept");
  httpResponse.setHeader("Access-Control-Max-Age","1728000");
}

console.log("node express is running");
