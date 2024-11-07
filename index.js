const { listarActores, registrarActores, modificarActores, eliminarActores } = require("./database/actor.js");
const { createServer } = require("http");
const url = require("url");

createServer(async (req, resp) => {
    const method = req.method;
    const urlParsed = url.parse(req.url, true)
    const pathname = urlParsed.pathname;

    resp.setHeader("Content-Type", "application/json");

    if(pathname == "/actor") {
        if(method == "GET") {
            const actores = await listarActores();
            resp.end(JSON.stringify({ message: "Listado de actores", data: actores }));
        }

        if(method == "POST") {
            let body = "";
            req.on("data", (chunk) => {
                body += chunk.toString();
            });

            req.on("end", async () => {
                body = JSON.parse(body);
                const actor = await registrarActores(body);
                resp.end(JSON.stringify({ message: "Actor registrado exitosamente", data: actor}))
            })
        }

        if(method == "PUT") {
            let body = "";
            const id = Number(urlParsed.query.id);
            req.on("data", (chunk) => {
                body += chunk.toString();
            });

            req.on("end", async () => {
                body = JSON.parse(body);
                const actor = await modificarActores(body, id);
                resp.end(JSON.stringify({ message: "Actor modificado con éxito", data: actor}));
            })
        }

        if(method == "DELETE") {
            const id = Number(urlParsed.query.id);
            const actor = await eliminarActores(id);
            resp.end(JSON.stringify({ message: "Actor eliminado con éxito", data: actor }))
        }
    }


    
    
}).listen(3000, () => console.log("Aplicación en ejecución por el puerto 3000"))