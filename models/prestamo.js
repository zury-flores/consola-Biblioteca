import Model from "./model.js";

export default class Prestamo extends Model {
  table = "prestamos";

  constructor(nombre, libro) {
    super();

    this.id = Date.now();
    this.nombre = nombre;
    this.libro = libro;
    this.fecha = new Date().toLocaleDateString();
  }
}