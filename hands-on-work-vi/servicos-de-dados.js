
const mysql = require('mysql2');

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





function listaJogadores(){
    con.connect(
        function(err) {
            if (err) throw err;
            let sql = "SELECT id, nome_jogador, email_jogador FROM jogador;";
            con.query(sql,[], 
                function (err, result) {
                    if (err) throw err;
                    const jogadoresJSON = JSON.stringify(result);
                    console.log(jogadoresJSON);
                });
        }
    );
}

//listaJogadores();

function listaJogos(){
    con.connect(
        function(err) {
            if (err) throw err;
            let sql = "SELECT id, nome_jogo FROM jogo;";
            con.query(sql,[], 
                function (err, result) {
                    if (err) throw err;
                    const jogosJSON = JSON.stringify(result);
                    console.log(jogosJSON);
                });
        }
    );
}
//listaJogos();

function listaFormatos(){
     con.connect(
        function(err) {
            if (err) throw err;
            let sql = "SELECT id, descricao FROM formato;";
            con.query(sql,[], 
                function (err, result) {
                    if (err) throw err;
                    const jogosJSON = JSON.stringify(result);
                    console.log(jogosJSON);
                });
        }
    );
}


function inserePartida(dtInicio, dtFim, idJogadorA, idJogadorB, idVencedor, idFormato, idJogo){
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
inserePartida("2026-05-27 10:00:00", "2026-05-27 10:28:00", 1, 2, 1, 1, 1);