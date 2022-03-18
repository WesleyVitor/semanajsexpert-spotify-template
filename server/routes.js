import config from "./config.js";
import { Controller } from "./controller.js";
import { logger } from "./utils.js";
const { location, pages } = config;
const controller = new Controller();
async function routes(request, response) {
    const { method, url } = request;

    if (method === "GET" && url === "/") {
        response.writeHead(302, {
            Location: location.home,
        });

        response.end();
    }

    if (method === "GET" && url === "/home") {
        const { stream } = await controller.getFileStream(pages.homeHTML);

        return stream.pipe(response);
    }
    return response.end();
}

export function handler(request, response) {
    return routes(request, response).catch((error) =>
        logger.error(`Deu Ruimm ${error.stack}`)
    );
}
