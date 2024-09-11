"use strict";
//No va a tener metodos estaticos por que vamos a querer hacer el DI, o dependenci injection
//No se tienen metodos estaticos cuando usamos dependece injection ??
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodosController = void 0;
//mock en memoria.
const todos = [
    {
        id: 1,
        text: "buy milk",
        createdAt: new Date(),
    },
    {
        id: 2,
        text: "buy bread",
        createdAt: null,
    },
    {
        id: 3,
        text: "buy butter",
        createdAt: new Date(),
    },
];
class TodosController {
    //DI
    constructor() {
        this.getTodos = (req, resp) => {
            console.log("Estoy en el getTodos");
            return resp.json(todos);
        };
        this.getTodoById = (req, resp) => {
            console.log("Estoy en el getTodoById");
            const id = +req.params.id;
            console.log("Varibale id", id);
            if (isNaN(id))
                resp.status(400).json({ error: `ID argument is not a number ` });
            const todo = todos.find((todo) => todo.id === id);
            todo
                ? resp.json(todo)
                : resp.status(404).json({ error: `TODO with id ${id} not found` });
        };
        this.createTodo = (req, resp) => {
            return resp.json("POST create todo");
        };
    }
}
exports.TodosController = TodosController;
