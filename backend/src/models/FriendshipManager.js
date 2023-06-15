const AbstractManager = require("./AbstractManager");

class FriendshipManager extends AbstractManager {
  constructor() {
    super({ table: "friendship" });
  }

  insert(friendship) {
    return this.database.query(
      `INSERT INTO ${this.table} (friend_name, mail, date_added) VALUES (?, ?, ?)`,
      [friendship.user_id_1, friendship.user_id_2]
    );
  }

  update(friendship) {
    return this.database.query(
      `UPDATE ${this.table} SET user_id_1 = ?, user_id_2 = ?, WHERE id = ?`,
      [friendship.user_id_1, friendship.user_id_2]
    );
  }
}

module.exports = FriendshipManager;
