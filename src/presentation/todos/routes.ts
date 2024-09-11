//Cuando no hacemos el DI podemos hacer metodos estaticos.

import { Router } from "express";
import { TodosController } from "./controller";

export class TodoRoutes {
  static get routes(): Router {
    const router = Router();
    const todoController = new TodosController();

    //solo mandamos la referencia a la funcion.
    // router.get("/api/todos", (req,res) => todoController.getTodos(req,res));
    //El problema es el orden, si, se debe definir primero la ruta especifica y despues seguir con la ruta mas general.
    router.get("/:id", todoController.getTodoById);
    router.put("/:id", todoController.updateTodo);
    router.delete("/:id", todoController.deleteTodoByID);
    router.get("/", todoController.getTodos); //esto es solo la referencia a la funcion.
    router.post("/", todoController.createTodo);
    //

    return router;
  }
}
