const pool = mysql
createPool({
    host: "127.0.0.7",
    user: "root",
    password:"",
    database: "library"
})



export async function getBook(id) {
    const [rows] = await pool.query("select * from books where id = ?, [id]")
    return rows
}