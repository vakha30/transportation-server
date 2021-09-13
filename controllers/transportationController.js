const TransportationModel = require("../models/Transportation");

class TransportationController {
  async addTransportation(req, res) {
    try {
      const { start, finish, weight } = req.body;
      const userId = req.user.id;

      const price = await TransportationModel.getPrice(start, finish, weight);

      const promise = TransportationModel.addTransportation(
        start,
        finish,
        weight,
        userId,
        price
      );

      const response = await promise;

      res.json({ message: "Перевозка добавлена" });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  async getTransportation(req, res) {
    try {
      const promise = TransportationModel.getTransportation(req.user.id);
      const transportations = await promise;

      return res.json(transportations);
    } catch (error) {
      console.log(error);
      res.send("Server error!");
    }
  }
}

module.exports = new TransportationController();
