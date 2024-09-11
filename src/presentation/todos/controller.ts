//No va a tener metodos estaticos por que vamos a querer hacer el DI, o dependenci injection
//No se tienen metodos estaticos cuando usamos dependece injection ??

import { Request, Response } from "express";

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

export class TodosController {
  //DI
  constructor() {}

  public getTodos = (req: Request, resp: Response) => {
    console.log("Estoy en el getTodos");
    return resp.json(todos);
  };

  public getTodoById = (req: Request, resp: Response) => {
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

  public createTodo = (req: Request, resp: Response) => {
    //const body = req.body;
    const { text, id } = req.body;
    if (!text) {
      return resp.status(400).json({ error: "Text property es requerida" });
    }

    //Esto puede ocacionar problemas por que puede que en un tiempo determinado dos personas al mismo tiempo graben
    //y se guarden dos cosas con el mismo id.
    const newTodo = {
      id: id,
      text: text,
      createdAt: null,
    };

    todos.push(newTodo);
    resp.json(newTodo);
  };

  public updateTodo = (req: Request, resp: Response) => {
    const id = +req.params.id;
    if (isNaN(id)) {
      return resp.status(400).json({ error: `ID argument is not a number ` });
    }
    const todo = todos.find((todo) => todo.id === id);
    console.log("variable todo del id", todo);

    if (!todo) {
      return resp
        .status(400)
        .json({ error: `Todo with id ${id} is not found` });
    }

    const { text } = req.body;
    console.log("Propiedad texto en el update ", text);

    if (!text) {
      return resp.status(400).json({ error: "Text property is required" });
    }
    //Ojo todo esta pasando por referencia.
    todo.text = text;

    resp.json(todo);
  };

  public deleteTodoByID = (req: Request, resp: Response) => {
    const id = +req.params.id;
    if (isNaN(id)) {
      return resp.status(400).json({ error: "Error el id no es valido" });
    }

    const idExist = todos.find((todo) => todo.id === id);
    if (!idExist) {
      return resp.status(400).json({ error: "No existe el id" });
    }
    console.log("El id ingresado ", id);
    console.log("El array de todos ", todos);
    const newTodo = todos.filter((todo) => todo.id !== id);

    console.log(newTodo);

    resp.status(200).json(newTodo);
  };
}
