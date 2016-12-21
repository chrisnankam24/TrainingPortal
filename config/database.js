/**
 * author: chrisnankam24
 * copyright Orange CM, 2016
 */

// Database Configuration params
var mysql = require("mysql");

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "dv_portal_db",
    connectTimeout: 5000,
    multipleStatements: true
});

con.connect(function(err){
    if(err){
        console.log('Error connecting to Db');
        process.exit(1);
        return;
    }
    console.log('Connection established');
});

// Export database connection
exports.connection = con;