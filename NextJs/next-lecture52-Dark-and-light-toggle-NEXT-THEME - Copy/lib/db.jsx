import mysql from "mysql2/promise";

// Create a connection pool
export const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "12345678",
  database: "hospital_db",
//   waitForConnections: true,
//   connectionLimit: 10,  // max connections in pool
//   queueLimit: 0
});

// Test the connection
async function testConnection() {
  try {
    const connection = await db.getConnection();  // get a connection from pool
    console.log("MySQL connected successfully!");
    connection.release(); // release back to pool
  } catch (error) {
    console.error("MySQL connection failed:", error.message);
  }
}

testConnection();
