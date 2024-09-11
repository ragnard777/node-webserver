import { Router } from "express";
import { TodoRoutes } from "./todos/routes";

//Este router de express es el que vamos a poder enviar en el server, como un middleware.
//Un middleware no es mas que una funcion que se ejecuta siempre que se pasa por una ruta.
export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use("/api/todos", TodoRoutes.routes);

    return router;
  }
}
