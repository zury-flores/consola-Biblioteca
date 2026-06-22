import inquirer from "inquirer";
import chalk from "chalk";

import LibroController from "./app/controllers/libroController.js";
import PrestamoController from "./app/controllers/prestamoController.js";

async function init() {
  const setup = await inquirer.prompt([
    {
      type: "select",
      name: "opcion",
      message: "¿Qué deseas hacer?",
      choices: [
        {
          name: "Libros",
          value: "1",
        },
        {
          name: "Préstamos",
          value: "2",
        },
        {
          name: "Salir",
          value: "3",
        },
      ],
    },
  ]);

  console.log(
    chalk.bgGray.black(
      "Opción seleccionada: " + setup.opcion,
    ),
  );

  return setup.opcion;
}

async function MainMenu(opcion) {
  if (opcion === "1") {
    const libro = new LibroController(opcion);

    await libro.init();
  } else if (opcion === "2") {
    const prestamo = new PrestamoController(
      opcion,
    );

    await prestamo.init();
  }
}

let opcion;

do {
  console.clear();

  opcion = await init();

  await MainMenu(opcion);
} while (opcion !== "3");