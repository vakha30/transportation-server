const pool = require("../config/db");

class User {
  getByEmail(email) {
    return new Promise((resolve, reject) => {
      try {
        pool.query(
          `SELECT * FROM users WHERE email=?`,
          [email],
          (err, data) => {
            if (err) {
              reject(err);
            }
            resolve(data);
          }
        );
      } catch (error) {
        reject(error);
      }
    });
  }

  getById(id) {
    return new Promise((resolve, reject) => {
      try {
        const sql = "SELECT * FROM users WHERE ID=?";
        pool.query(sql, [id], (err, data) => {
          if (err) {
            reject(err);
          }
          resolve(data);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  addNewUser(name, email, password) {
    return new Promise((resolve, reject) => {
      try {
        pool.query(
          "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
          [name, email, password],
          (err, data) => {
            if (err) {
              return reject(err);
            }
            return resolve(data);
          }
        );
      } catch (error) {
        return reject(error);
      }
    });
  }
}

module.exports = new User();
