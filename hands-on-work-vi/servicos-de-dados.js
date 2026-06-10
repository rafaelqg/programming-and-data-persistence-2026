
const mysql = require('mysql2');
const express = require('express');
const bodyParser = require('body-parser'); // npm install body-parser


const app = express();
app.listen(4333);

const jsonParser = bodyParser.json() // create application/json parser
const urlencodedParser = bodyParser.urlencoded({ extended: false }) // create application/x-www-form-urlencoded parser


//initialize mysql connection
const MYSQL_IP="localhost";
const MYSQL_LOGIN="root";
const MYSQL_PASSWORD="root";
const MYSQL_PORT=3310;

const con = mysql.createConnection({
  host:  MYSQL_IP,
  user: MYSQL_LOGIN,
  password: MYSQL_PASSWORD,
  port: MYSQL_PORT,
  database: "mydb"
});






app.get('/get_jogadores', function (request, response) {
    con.connect(
        function(err) {
            if (err) throw err;
            let sql = "SELECT id, nome_jogador, email_jogador FROM jogador;";
            con.query(sql,[], 
                function (err, result) {
                    if (err) throw err;
                    const jogadoresJSON = JSON.stringify(result);
                    addCorsHttpHeaders(response);
                    response.status(200);
                    response.setHeader('Content-Type', 'application/json');
                    response.send(jogadoresJSON);
                });
        }
    );

});


//listaJogadores();
app.get('/get_jogos', function (request, response) {

    con.connect(
        function(err) {
            if (err) throw err;
            let sql = "SELECT id, nome_jogo FROM jogo;";
            con.query(sql,[], 
                function (err, result) {
                    if (err) throw err;
                    const jogosJSON = JSON.stringify(result);
                    addCorsHttpHeaders(response);
                    response.status(200);
                    response.setHeader('Content-Type', 'application/json');
                    response.send(jogosJSON);
                });
        }
    );
});
//listaJogos();

app.get('/get_formatos', function (request, response) {
     con.connect(
        function(err) {
            if (err) throw err;
            let sql = "SELECT id, descricao FROM formato;";
            con.query(sql,[], 
                function (err, result) {
                    if (err) throw err;
                    const formatosJSON = JSON.stringify(result);
                    addCorsHttpHeaders(response);
                    response.status(200);
                    response.setHeader('Content-Type', 'application/json');
                    response.send(formatosJSON);
                });
        }
    );
}
);


app.post('/insere_partida', urlencodedParser, function (request, response) {
    inserePartida(con, request.body.data_inicio + " " + request.body.hora_inicio, request.body.data_fim+ " " + request.body.hora_fim, request.body.jogador_1, request.body.jogador_2, request.body.vencedor, request.body.formato, request.body.jogo);
    response.status(200);
    response.send("Partida registrada com sucesso!");
}); 


function inserePartida(con, dtInicio, dtFim, idJogadorA, idJogadorB, idVencedor, idFormato, idJogo){
     con.connect(
        function(err) {
            if (err) throw err;
            let sql = `INSERT INTO partida (inicio, fim, jogador_1, jogador_2, vencedor, formato, jogo) VALUES (?,?,?,?,?,?,?);`;
            con.query(sql,[dtInicio, dtFim, idJogadorA, idJogadorB, idVencedor, idFormato, idJogo], 
                function (err, result) {
                    if (err) throw err;
                    console.log("Partida inserida com sucesso!", result);
                });
        }
    );
}

//listaFormatos();
//inserePartida("2026-05-27 10:00:00", "2026-05-27 10:28:00", 1, 2, 1, 1, 1);

function addCorsHttpHeaders(httpResponse){
  httpResponse.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
  httpResponse.setHeader("Access-Control-Allow-Methods","POST,GET,OPTIONS,PUT,DELETE,HEAD");
  httpResponse.setHeader("Access-Control-Allow-Headers","X-PINGOTHER,Origin,X-Requested-With,Content-Type,Accept");
  httpResponse.setHeader("Access-Control-Max-Age","1728000");
}