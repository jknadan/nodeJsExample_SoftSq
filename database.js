const mysql = require('mysql')
const database = {
    host:'3.37.158.157',
    port:3306,
    user:'jknadan',
    password:'wnsrl159@',
    database:'jknadandb'
}

module.exports = {
    init: function () {
        return mysql.createConnection(database);
    },
    connect: function(conn) {
        conn.connect(function(err) {
            if(err) console.error('mysql connection error : ' + err);
            else console.log('mysql is connected successfully!');
        });
    }
}