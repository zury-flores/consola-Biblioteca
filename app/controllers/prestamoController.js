import inquirer from "inquirer";
import chalk from "chalk";

import Prestamo from "../../models/prestamo.js";
import Libro from "../../models/libro.js";

import Helper from "../../helper/helper.js";

export default class PrestamoController {
opcion = 0;

opciones = [
    {
    name: "Menu anterior",
    value: 0,
    },
    {
    name: "Mostrar Prestamos",
    value: 1,
    },
    {
    name: "Registrar Prestamo",
    value: 2,
    },
];

constructor(opcion) {
    this.opcion = opcion;

    this.prestamo = new Prestamo();
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
    const libros = await this.libro.load();

    if (libros.length === 0) {
    console.log(
        chalk.bgRed.white(
        "No existen libros registrados",
        ),
    );

    await Helper.esperar();
    return;
    }

    let payload = await inquirer.prompt([
    {
        type: "input",
        name: "nombre",
        message:
        "Ingrese el nombre de la persona",
    },
    {
        type: "select",
        name: "libro",
        message: "Seleccione un libro",
        choices: libros.map((libro) => {
        return {
            name: libro.titulo,
            value: libro,
        };
        }),
    },
    ]);

    await this.prestamo.save({
    table: this.prestamo.getTable(),
    id: Date.now(),
    nombre: payload.nombre,
    libro: payload.libro,
    fecha: new Date().toLocaleDateString(),
    });

    console.log(
    chalk.bgGreen.white(
        "Préstamo registrado exitosamente",
    ),
    );

    await Helper.esperar();
}

async read() {
    const prestamos = await this.prestamo.load();

    const rows = prestamos.map((prestamo) => {
    return {
        nombre: prestamo.nombre,
        libro: prestamo.libro.titulo,
        fecha: prestamo.fecha,
    };
    });

    console.table(rows);

    await Helper.esperar();
}

async init() {
    let opcion;

    do {
    opcion = await Helper.menu(
        "Menú de Préstamos",
        this.opciones,
    );

    await this.validarMenu(opcion);
    } while (opcion != 0);
}
}