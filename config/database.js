const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('data.db');

const USER_SCHEMA = `
CREATE TABLE IF NOT EXISTS user (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_name VARCHAR(30) NOT NULL UNIQUE,
    user_email VARCHAR(255) NOT NULL,
    user_password VARCAHR(255) NOT NULL,
    user_full_name VARCAHR(40) NOT NULL,
    user_score BIGINT NOT NULL DEFAULT (0),
    user_join_date TIMESTAMP DEFAULT current_timestamp
)
`;

const INSERT_DEFAULT_USER =
`
INSERT INTO user (
    user_name,
    user_email,
    user_password,
    user_full_name,
    user_score
) SELECT 'ergito', 'ergito@email.com', '1234', 'Ergito', 100 WHERE NOT EXISTS (SELECT * FROM user WHERE user_name = 'ergito')
`;

const PHOTO_SCHEMA =
`
CREATE TABLE IF NOT EXISTS photo (
    photo_id INTEGER PRIMARY KEY AUTOINCREMENT,
    photo_url TEXT NOT NULL,
    user_id INTEGER,
    FOREIGN KEY(user_id) REFERENCES user(user_id) ON DELETE CASCADE 
)
`;

db.serialize(() => {
    db.run("PRAGMA foreign_keys=ON");
    db.run(USER_SCHEMA);
    db.run(INSERT_DEFAULT_USER);
    db.run(PHOTO_SCHEMA);

    db.each("SELECT * FROM user", (err, user) => {
        console.log('Users');
        console.log(user);
    })
});

process.on('SIGINT', () => db.close(() => {
    console.log('Database closed!');
    process.exit(0);
}))

module.exports = db;