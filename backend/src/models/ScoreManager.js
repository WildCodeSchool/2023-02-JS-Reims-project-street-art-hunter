const AbstractManager = require("./AbstractManager");

class ScoreManager extends AbstractManager {
  constructor() {
    super({ table: "gallery" });
  }

  insert(gallery) {
    return this.database.query(`insert into ${this.table} (title) values (?)`, [
      gallery.title,
    ]);
  }

  update(gallery) {
    return this.database.query(
      `update ${this.table} set title = ? where id = ?`,
      [gallery.title, gallery.id]
    );
  }

  find(id) {
    return this.database.query(
      `SELECT * FROM gallery JOIN users ON users.id=gallery.id_user JOIN street_art ON street_art.id=gallery.id_street_art WHERE gallery.id= ?`,
      [id]
    );
  }

  findAll() {
    return this.database.query(
      `SELECT users.id,users.pseudo, SUM(street_art.score) AS score FROM gallery JOIN users ON users.id=gallery.id_user JOIN street_art ON street_art.id=gallery.id_street_art GROUP BY gallery.id_user ORDER BY score DESC LIMIT 0,15`
    );
  }

  delete(id) {
    return this.database.query(`delete from ${this.table} where id = ?`, [id]);
  }
}

module.exports = ScoreManager;
