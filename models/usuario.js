import Model from "./model.js";

export default class Usuario extends Model {
  table = "usuarios";

  constructor(nombre, apellido, telefono) {
    super();

    this.id = Date.now();
    this.nombre = nombre;
    this.apellido = apellido;
    this.telefono = telefono;
  }
}