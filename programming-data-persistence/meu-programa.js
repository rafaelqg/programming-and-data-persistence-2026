
const mysql = require('mysql2');
const express = require('express');
const bodyParser = require('body-parser'); // npm install body-parser

//objects to handle POST message body
const jsonParser = bodyParser.json() // create application/json parser
const urlencodedParser = bodyParser.urlencoded({ extended: false }) // create application/x-www-form-urlencoded parser


//initiate http server (express)
const app = express();
app.listen(4333);

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
        //exibePagamentosPorAno(con, 2006);
        //exibeTotalPagamentosPorCliente(con);
        //atualizaValorPagamento(con, 20, 6.99);
        //inserePagamento(con, 6, 39, 1, 1, 6.99);

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

function exibeTotalPagamentosPorCliente(connection) {
    let sql = `
     SELECT c.customer_id, c.first_name, c.last_name, sum(amount) as total
     FROM sakila.payment p
     inner join customer c on p.customer_id = c.customer_id
     group by customer_id;`;
    console.log("Executando query: " + sql);
    connection.query(sql,[], function (err, result) {
        if (err) throw err;
        let cliente = result[0];
        //console.log("Cliente: " + cliente.first_name + " " + cliente.last_name);
        //console.log("Total de pagamentos: " + cliente.total);
        console.log(result);
    });
}


app.get('/total_pagamentos_clientes', function (request, response) {
    let sql = `
     SELECT c.customer_id, c.first_name, c.last_name, sum(amount) as total
     FROM sakila.payment p
     inner join customer c on p.customer_id = c.customer_id
     group by customer_id;`;
    console.log("Executando query: " + sql);
    con.query(sql,[], function (err, result) {
        if (err) throw err;
        const resultJSON = JSON.stringify(result);
        addCorsHttpHeaders(response);
        response.status(200);
        response.setHeader('Content-Type', 'application/json');
        response.send(resultJSON);
    
    });
 
});


function atualizaValorPagamento(connection, payment_id, valor) {
    let sql = "UPDATE payment SET amount = ? WHERE payment_id = ?;";
    connection.query(sql, [valor, payment_id], function (err, result) {
        if (err) throw err;
        result.changedRows > 0 ?
            console.log("Pagamento atualizado com sucesso!") :
            console.log("Nenhum pagamento foi atualizado.");
        console.log("DEBUG", result);
    });
}

app.post('/insere_pagamento', urlencodedParser, function (request, response) {
    inserePagamento(con, request.body.customer_id, request.body.film_id, request.body.staff_id, request.body.store_id, request.body.amount);
    response.status(200);
    response.send();
}); 

/**
 * Insere um novo pagamento na base de dados
 * @param {*} connection: conexão com o banco de dados
 * @param {*} customer_id 
 * @param {*} film_id 
 * @param {*} staff_id 
 * @param {*} store_id 
 * @param {*} amount : valor do pagamento em formato decimal(5,2)
 * @returns boolean indicando se a inserção foi bem sucedida ou não
 */
function inserePagamento(connection, customer_id, film_id, staff_id, store_id, amount) {
    //1. Descobrir o id do inventory basedo no film_id e store_id
    let sql = "SELECT inventory_id FROM inventory WHERE film_id = ? AND store_id = ? LIMIT 1;";
    connection.query(sql, [film_id, store_id], function (err, result) {
        if (err) throw err;
        if (result.length === 0) {
            console.log("Nenhum inventário encontrado para o filme " + film_id + " na loja " + store_id);
            return false;
        }else {
            let inventory_id = result[0].inventory_id;
            sql = "INSERT INTO rental (rental_date, inventory_id, customer_id, staff_id) VALUES (NOW(), ?, ?, ?);";
            //2. Inserir o aluguel na tabela rental
            connection.query(sql, [inventory_id, customer_id, staff_id], function (err, result) {
                if (err) throw err;
                let rental_id = result.insertId;
                if(rental_id === 0) {
                    console.log("O aluguel não foi inserido!");
                    return false;
                }
                //3. Inserir o pagamento na tabela payment
                sql = "INSERT INTO payment (customer_id, staff_id, rental_id, amount) VALUES (?, ?, ?, ?);";
                connection.query(sql, [customer_id, staff_id, rental_id, amount], function (err, result) {
                    if (err) throw err;
                    console.log("Pagamento inserido com sucesso!");
                    return true;
                });
            });
        }
    });
}


function addCorsHttpHeaders(httpResponse){
  httpResponse.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
  httpResponse.setHeader("Access-Control-Allow-Methods","POST,GET,OPTIONS,PUT,DELETE,HEAD");
  httpResponse.setHeader("Access-Control-Allow-Headers","X-PINGOTHER,Origin,X-Requested-With,Content-Type,Accept");
  httpResponse.setHeader("Access-Control-Max-Age","1728000");
}



