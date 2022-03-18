import Server from "./server.js";
import { logger } from "./utils.js";
Server.listen(3000).on("listening", () => logger.info("Server running!!"));
