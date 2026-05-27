
const mysql = require('mysql2');

//initialize mysql connection
const MYSQL_IP="localhost";
const MYSQL_LOGIN="root";
const MYSQL_PASSWORD="root";

let con = mysql.createConnection({
  host:  MYSQL_IP,
  user: MYSQL_LOGIN,
  password: MYSQL_PASSWORD,
  port: 3310,
  database: "sakila"
});

con.connect(
    function(err) {
        if (err){
            console.log(err);
            throw err;
        }
        console.log("Connection with mysql established");
        exibePagamentosPorAno(con, 2006);
        exibePagamentosPorAno(con, 2005);

    }
);

function exibePagamentosPorAno(connection, ano) {
    let sql = "SELECT * FROM payment where year(payment_date) = ?;";
    console.log("Executando query: " + sql);
    connection.query(sql,[ano], function (err, result) {
        if (err) throw err;
        console.log(result.length + " pagamentos encontrados no ano de " + ano  );
        //console.table(result);
    });
    }

