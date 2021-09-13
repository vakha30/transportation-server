const config = require("config");
const pool = require("../config/db");

const { default: axios } = require("axios");

class Transportation {
  addTransportation(start, finish, weight, userId, price) {
    return new Promise((resolve, reject) => {
      try {
        if (weight <= 0) {
          return reject({
            message: "Вес не может быть отрицательным или нулевым",
          });
        }
        const sql =
          "INSERT INTO transportation ( start, finish, weight, user_id, price ) VALUES ( ?, ?, ?, ?, ? )";
        pool.query(sql, [start, finish, weight, userId, price], (err, data) => {
          if (err) {
            return reject(err);
          }
          return resolve(data);
        });
      } catch (e) {
        return reject(e);
      }
    });
  }

  getTransportation(id) {
    return new Promise((resolve, reject) => {
      try {
        const sql = "SELECT * FROM transportation WHERE user_id=?";
        pool.query(sql, [id], (err, data) => {
          if (err) {
            return reject(err);
          }
          return resolve(data);
        });
      } catch (error) {
        return reject(error);
      }
    });
  }

  getPrice(start, finish, weight) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/distancematrix/json?destinations=${finish}&origins=${start}&key=${config.get(
            "apiKey"
          )}`
        );
        if (!response.data.rows[0].elements[0].distance) {
          return reject({ message: "Некорректный адрес" });
        }
        const distanceMeter = response.data.rows[0].elements[0].distance.value;

        const distance = Math.round(distanceMeter / 1000);

        const price = config.get("price");
        const totalPrice = distance * price * weight;

        return resolve(totalPrice);
      } catch (error) {
        return reject(error);
      }
    });
  }
}

module.exports = new Transportation();
