const { Pool } = require("pg");

const conPool = new Pool({
    host: 'localhost',
    port: 5432,
    database: 'dvdrental',
    user: 'postgres',
    password: 'postgres'
});

const listarActores = async () => {
    const result = await conPool.query("SELECT * FROM actor");
    return result.rows;
}

const registrarActores = async (data) => {
    const result = await conPool.query(
        "INSERT INTO actor(first_name, last_name, last_update) VALUES($1, $2, now()) RETURNING *",
        [data.first_name, data.last_name]
    )
    return result.rows
}

const modificarActores = async (data, id) => {
    const arguments = {
        text: `UPDATE actor SET first_name=$1, last_name=$2, last_update=now() WHERE actor_id=$3 RETURNING *`,
        values: [data.first_name, data.last_name, id]
    };
    const result = await conPool.query(arguments);
    return result.rows
}

const eliminarActores = async (id) => {
    const result = await conPool.query("DELETE FROM actor WHERE actor_id=$1 RETURNING *",[id]);
    return result.rows;
}

module.exports = { listarActores, registrarActores, modificarActores, eliminarActores }