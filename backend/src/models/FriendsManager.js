const AbstractManager = require("./AbstractManager");

class FriendsManager extends AbstractManager {
  constructor() {
    super({ table: "friends" });
  }

  insert(friends) {
    return this.database.query(
      `INSERT INTO ${this.table} (friend_name, mail, date_added) VALUES (?, ?, ?)`,
      [friends.friend_name, friends.mail, friends.date_added]
    );
  }

  update(friends) {
    return this.database.query(
      `UPDATE ${this.table} SET friend_name = ?, mail = ?, date_added = ? WHERE id = ?`,
      [friends.friend_name, friends.mail, friends.date_added, friends.id]
    );
  }
}

module.exports = FriendsManager;
