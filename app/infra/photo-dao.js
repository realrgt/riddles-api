const photoConverter = row => ({
    id: row.photo_id,
    url: row.photo_url,
    userId: row.user_id,
});

class PhotoDao {

    constructor(db) {
        this._db = db;
    }

    add(photo, user_id) {
        return new Promise((resolve, reject) => {
            this._db.run(`
                INSERT INTO photo (
                    photo_url,
                    user_id
                ) values (?,?,?,?,?)
            `,
                [
                    photo.url,
                    user_id
                ],
                function (err) {
                    if (err) {
                        console.log(err);
                        return reject('Can`t add photo');
                    }
                    resolve(this.lastID);
                });
        });
    }

    findById(id) {

        return new Promise((resolve, reject) => this._db.get(`
            SELECT  p.* FROM photo AS p
            WHERE p.photo_id = ?
            ORDER BY p.photo_post_date DESC;
            `,
            [id],
            (err, row) => {
                if (err) {
                    console.log(err);
                    return reject('Can`t find photo');
                }
                if (row) {
                    resolve(photoConverter(row));
                } else {
                    resolve(null);
                }
            }
        ));
    }

    remove(id) {
        return new Promise((resolve, reject) => this._db.run(
            `DELETE FROM photo where photo_id = ?`,
            [id],
            err => {
                if (err) {
                    console.log(err);
                    return reject('Can`t remove photo');
                }
                resolve();
            }
        ));
    }
}

module.exports = PhotoDao;