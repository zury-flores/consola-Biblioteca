import fs from "fs/promises";
import path from "path";

export default class Model {
  table = "models";

  getTable() {
    return this.table;
  }

  getPath() {
    return `db/${this.getTable()}.json`;
  }

  async ensureFile() {
    try {
      await fs.mkdir("db", { recursive: true });

      await fs.access(this.getPath());
    } catch {
      await fs.writeFile(this.getPath(), "[]");
    }
  }

  async save(payload) {
    await this.ensureFile(); // 👈 clave

    let datos = await this.load();
    datos.push(payload);

    await fs.writeFile(
      this.getPath(),
      JSON.stringify(datos, null, 2)
    );

    return payload;
  }

  async load() {
    try {
      const data = await fs.readFile(this.getPath(), "utf-8");
      return JSON.parse(data);
    } catch {
      return [];
    }
  }
}