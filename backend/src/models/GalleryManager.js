const AbstractManager = require("./AbstractManager");

class GalleryManager extends AbstractManager {
  constructor() {
    super({ table: "gallery" });
  }

  insert(gallery) {
    return this.database.query(
      `insert into ${this.table} (id_user, id_street_art, image, is_valid) values (?, ?, ?, ?)`,
      [gallery.id, gallery.id_street_art, gallery.imgURL, gallery.is_valid]
    );
  }

  update(gallery) {
    return this.database.query(
      `update ${this.table} set title = ? where id = ?`,
      [gallery.title, gallery.id]
    );
  }

  validate(gallery) {
    return this.database.query(
      `update ${this.table} set is_valid = true where id = ?`,
      [gallery.id]
    );
  }

  checkToGallery(info) {
    return this.database.query(
      `select * from  ${this.table} where id_user = ? AND id_street_art = ?`,
      [info.id, info.id_street_art]
    );
  }

  findByNotValid() {
    return this.database.query(
      `select gallery.*, street_art.longitude, street_art.latitude from  ${this.table} join street_art on street_art.id = gallery.id_street_art where gallery.is_valid = 0`
    );
  }
}

module.exports = GalleryManager;
