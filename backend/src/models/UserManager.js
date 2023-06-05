const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  insert(user) {
    return this.database.query(
      `insert into ${this.table} (username, password, mail, isadmin) values (?, ?, ?, false)`,
      [user.username, user.password, user.mail]
    );
  }

  update(user) {
    return this.database.query(
      `update ${this.table} set username = ?, password = ?, mail = ? where id = ?`,
      [user.username, user.password, user.mail, user.id]
    );
  }
}

module.exports = UserManager;
