const AbstractManager = require("./AbstractManager");
const bcrypt = require("bcrypt");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "utilisateurs" });
  }

  async create(user) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const [result] = await this.database.query(
      `insert into ${this.table} (pseudo, email, password) values (?, ?, ?)`,
      [user.pseudo, user.email, hashedPassword]
    );
    return result.insertId;
  }

  async readAll() {
    const [result] = await this.database.query(`SELECT * from ${this.table}`);
    return result;
  }

  async validatelogin(pseudo, password) {
    const [result] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE pseudo= ?`,
      [pseudo]
    );
    if (result.length && (await bcrypt.compare(password, result[0].password))) {
      const user = result[0];
      return {
        id: user.id,
        pseudo: user.pseudo,
        role: user.role,
      };
    }
    return null;
  }

  async read(id) {
    const [result] = await this.database.query(
      `SELECT * from ${this.table} WHERE id = ?`,
      [id]
    );
    return result[0];
  }

  async findUserByPseudo(pseudo) {
    const [result] = await this.database.query(
      `SELECT id FROM ${this.table} WHERE pseudo= ?`,
      [pseudo]
    );
    return result.length ? result[0].id : null;
  }
}

module.exports = UserManager;
