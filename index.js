const { listarActores, registrarActores, modificarActores, eliminarActores } = require("./database/actor.js");
const { createServer } = require("http");
const url = require("url");

createServer((req, resp) => {
    const method = req.method;
    const urlParsed = url.parse(req.url, true)
    
    console.log({ method, urlParsed });


    resp.setHeader("Content-Type", "application/json");
    resp.end(JSON.stringify({ message: "Respuesta petición"}));
}).listen(3000, () => console.log("Aplicación en ejecución por el puerto 3000"))