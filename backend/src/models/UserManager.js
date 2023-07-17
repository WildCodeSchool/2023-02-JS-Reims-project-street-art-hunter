const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  insert(user) {
    return this.database.query(
      `insert into ${this.table} (username, password, mail, is_admin) values (?, ?, ?, ?)`,
      [user.username, user.hashedPassword, user.mail, false]
    );
  }

  update(user) {
    return this.database.query(
      `update ${this.table} set username = ?, password = ?, mail = ? where id = ?`,
      [user.username, user.hashedPassword, user.mail, user.id]
    );
  }

  findGallery(id) {
    return this.database.query(
      "SELECT gallery.id, gallery.id_street_art, street_art.name, street_art.longitude, street_art.latitude, gallery.image, street_art.score, gallery.creation_date, gallery.is_valid FROM `gallery` JOIN street_art ON gallery.id_street_art=street_art.id where gallery.id_user = ? order by creation_date desc",
      [id]
    );
  }

  findFriends(id) {
    return this.database.query(
      "SELECT friends.id, user.id AS friend_id, user.username FROM friends JOIN user ON (user.id != ? AND user.id = friends.user_id_1) OR (user.id != ? AND user.id = friends.user_id_2) WHERE (user_id_1 = ? OR user_id_2 = ?) AND status = 'accepted' ",
      [id, id, id, id]
    );
  }

  findFriendsRequest(id) {
    return this.database.query(
      "SELECT friends.id, user.id AS friend_id, user.username FROM friends JOIN user ON user.id = friends.user_id_1 WHERE user_id_2 = ? AND status = 'pending' ",
      [id, id, id, id]
    );
  }

  findFriendsPending(id) {
    return this.database.query(
      " SELECT friends.id, user.id AS friend_id, user.username FROM friends JOIN user ON user.id = friends.user_id_2 WHERE user_id_1 = ? AND status = 'pending'; ",
      [id, id, id, id]
    );
  }

  findAllScores() {
    return this.database.query(
      "SELECT gallery.id_user, user.username, SUM(street_art.score) AS score FROM `gallery` JOIN user ON gallery.id_user=user.id JOIN street_art ON gallery.id_street_art=street_art.id GROUP BY gallery.id_user ORDER BY score DESC"
    );
  }

  findScore(id) {
    return this.database.query(
      "SELECT gallery.id_user, user.username, SUM(street_art.score) AS score FROM `gallery` JOIN user ON gallery.id_user=user.id JOIN street_art ON gallery.id_street_art=street_art.id where gallery.id_user = ?",
      [id]
    );
  }

  findUserByUsername(username) {
    return this.database.query(
      `select id, username, password, is_admin as role from  ${this.table} where username = ?`,
      [username]
    );
  }
}

module.exports = UserManager;
