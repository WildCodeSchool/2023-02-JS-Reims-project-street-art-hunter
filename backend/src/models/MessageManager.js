const AbstractManager = require("./AbstractManager");

class MessageManager extends AbstractManager {
  constructor() {
    super({ table: "message" });
  }

  insert(Message) {
    return this.database.query(`insert into ${this.table} (title) values (?)`, [
      Message.title,
    ]);
  }

  update(Message) {
    return this.database.query(
      `update ${this.table} set title = ? where id = ?`,
      [Message.title, Message.id]
    );
  }

  getMessage(id) {
    return this.database.query(
      `select * from ${this.table} where id_friendship = ? order by post_end desc`,
      [id]
    );
  }

  postMessage(Message) {
    return this.database.query(
      `insert into ${this.table} (id_friendship, user_id, content) values (?,?,?)`,
      [Message.id_friendship, Message.user_id, Message.content]
    );
  }
}

module.exports = MessageManager;
