const AbstractManager = require("./AbstractManager");

class FriendsManager extends AbstractManager {
  constructor() {
    super({ table: "friends" });
  }

  insert(friends) {
    return this.database.query(
      `INSERT INTO ${this.table} (user_id_1, user_id_2) VALUES (?, ?, ?)`,
      [friends.user_id_1, friends.user_id_2]
    );
  }

  update(id) {
    return this.database.query(
      `UPDATE ${this.table} SET status='accepted' WHERE id = ?`,
      [id]
    );
  }
}

module.exports = FriendsManager;
