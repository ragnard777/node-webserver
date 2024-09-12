import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { CreateTodoDto } from "../../domain/dtos";
import { UpdateTodoDto } from "../../domain/dtos/todos/update-todo.dto";

export class TodosController {
  //DI
  constructor() {}

  public getTodos = async (req: Request, resp: Response) => {
    console.log("Estoy en el getTodos");
    const newTodos = await prisma.todo.findMany();
    return resp.json(newTodos);
  };

  public getTodoById = async (req: Request, resp: Response) => {
    console.log("Estoy en el getTodoById");

    const id = +req.params.id;
    console.log("Varibale id", id);

    if (isNaN(id))
      resp.status(400).json({ error: `ID argument is not a number ` });
    //const todo = todos.find((todo) => todo.id === id);
    const newtodos = await prisma.todo.findUnique({ where: { id: id } });
    console.log("Respuesta desde la base de datos", newtodos);

    newtodos
      ? resp.json(newtodos)
      : resp.status(404).json({ error: `TODO with id ${id} not found` });
  };

  public createTodo = async (req: Request, resp: Response) => {
    const [error, createTodoDto] = CreateTodoDto.create(req.body);
    if (error) return resp.status(400).json({ error });

    const todo = await prisma.todo.create({
      data: createTodoDto!,
    });

    resp.json(todo);
  };

  public updateTodo = async (req: Request, resp: Response) => {
    const id = +req.params.id;
    /*   if (isNaN(id)) {
      return resp.status(400).json({ error: `ID argument is not a number ` });
    } */
    //const todo = todos.find((todo) => todo.id === id);
    const [error, updateTodoDto] = UpdateTodoDto.create({ ...req.body, id });

    if (error) return resp.status(400).json({ error });

    const idExist = await prisma.todo.findUnique({ where: { id: id } });
    console.log("variable todo del id", idExist);

    if (!idExist) {
      return resp
        .status(400)
        .json({ error: `Todo with id ${id} is not found` });
    }

    //const { text } = req.body;

    //console.log("Propiedad texto en el update ", text);

    /* if (!text) {
      return resp.status(400).json({ error: "Text property is required" });
    } */
    //Ojo todo esta pasando por referencia.
    //todo.text = text;
    const updateTodo = await prisma.todo.update({
      where: {
        id: id,
      },
      /*       data: {
        text: text,
      }, */
      data: updateTodoDto!.values,
    });

    console.log("Lo que devuelve la funcion update de prisma ", updateTodo);

    resp.json(updateTodo);
  };

  public deleteTodoByID = async (req: Request, resp: Response) => {
    const id = +req.params.id;
    if (isNaN(id)) {
      return resp.status(400).json({ error: "Error el id no es valido" });
    }
    const idExist = await prisma.todo.findUnique({ where: { id: id } });
    if (!idExist) {
      return resp.status(400).json({ error: "No existe el id" });
    }
    //const idExist = todos.find((todo) => todo.id === id);
    const todosSindId = await prisma.todo.delete({
      where: {
        id: id,
      },
    });
    console.log("Lo que regresa la funcion de delete ", todosSindId);

    //const newTodo = todos.filter((todo) => todo.id !== id);

    const newTodos = await prisma.todo.findMany();

    console.log(newTodos);

    resp.status(200).json(newTodos);
  };
}
