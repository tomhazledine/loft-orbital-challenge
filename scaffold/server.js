import http from "http";
import { Server } from "node-static";
import readline from "readline";

export const server = (buildPath, port) => {
    const fileServer = new Server(buildPath);

    http.createServer((request, response) => {
        request
            .addListener("end", () => {
                fileServer.serve(request, response, e => {
                    if (e && e.status === 404) {
                        // If the file wasn't found
                        fileServer.serveFile(
                            "/index.html",
                            200,
                            {},
                            request,
                            response
                        );
                    }
                });
            })
            .resume();
    }).listen(port);
};

export const exit = () => {
    console.log(`Press "q" to exit`);
    readline.emitKeypressEvents(process.stdin);
    if (process.stdin.isTTY) {
        process.stdin.setRawMode(true);
    }

    process.stdin.on("keypress", (str, key) => {
        if (key.name === "q") {
            process.exit();
        }
    });
};
