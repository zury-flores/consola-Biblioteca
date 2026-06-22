import inquirer from "inquirer";
import chalk from "chalk";

import Libro from "../../models/libro.js";
import Helper from "../../helper/helper.js";

export default class LibroController {
opcion = 0;

opciones = [
    {
    name: "Menu anterior",
    value: 0,
    },
    {
    name: "Mostrar Libros",
    value: 1,
    },
    {
    name: "Crear Libro",
    value: 2,
    },
];

constructor(opcion) {
    this.opcion = opcion;
    this.libro = new Libro();
}

async validarMenu(opcion) {
    if (opcion == 0) {
    return;
    } else if (opcion == 1) {
    await this.read();
    } else if (opcion == 2) {
    await this.create();
    } else {
    console.log(chalk.bgRed.white("Opción no válida"));
    }
}

async create() {
    let payload = await inquirer.prompt([
    {
        type: "input",
        name: "titulo",
        message: "Ingrese el título del libro",
    },
    {
        type: "input",
        name: "autor",
        message: "Ingrese el autor",
    },
    {
        type: "input",
        name: "cantidad",
        message: "Ingrese la cantidad",
    },
    ]);

    await this.libro.save({
    table: this.libro.getTable(),
    id: Date.now(),
    titulo: payload.titulo,
    autor: payload.autor,
    cantidad: payload.cantidad,
    });

    console.log(
    chalk.bgGreen.white(
        "Libro creado exitosamente",
    ),
    );

    await Helper.esperar();
}

async read() {
    const libros = await this.libro.load();

    console.table(libros);

    await Helper.esperar();
}

async init() {
    let opcion;

    do {
    opcion = await Helper.menu(
        "Menú de Libros",
        this.opciones,
    );

    await this.validarMenu(opcion);
    } while (opcion != 0);
}
}