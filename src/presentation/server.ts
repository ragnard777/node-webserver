import express from "express";
import path from "path";

//Creamos siempre una interface
interface Options {
  port: number;
  public_path?: string;
}

//Practicar hacer la clase de la otra forma..
export class Server {
  private app = express();
  private readonly port: number;
  private readonly publicPath: string;

  //tenemos que inyectar la interface si queremos utilizarla.
  constructor(options: Options) {
    const { port, public_path = "public" } = options;
    this.port = port;
    this.publicPath = public_path;
  }

  async start() {
    //Middlewares... (funciones que se ejecutan en todo momento que pasen por una ruta.)

    //Public folders....
    this.app.use(express.static(this.publicPath));

    this.app.get("*", (req, res) => {
      console.log("Peticion... ");
      const indexPath = path.join(
        __dirname + `../../../${this.publicPath}/index.html`
      );

      res.sendFile(indexPath);
    });

    this.app.listen(3000, () => {
      console.log("Servidor corriendo... ");
    });
  }
}
