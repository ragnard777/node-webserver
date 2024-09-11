"use strict";
//Cuando no hacemos el DI podemos hacer metodos estaticos.
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoRoutes = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
class TodoRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const todoController = new controller_1.TodosController();
        //solo mandamos la referencia a la funcion.
        // router.get("/api/todos", (req,res) => todoController.getTodos(req,res));
        //Cuando se usa el use ?? es por que se ejecuta el middleware ???
        router.use("/:id", todoController.getTodoById);
        router.use("/", todoController.getTodos); //esto es solo la referencia a la funcion.
        //
        return router;
    }
}
exports.TodoRoutes = TodoRoutes;
