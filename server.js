console.clear();
import express, { response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import person from "./models/person.js";
import bodyParser from "body-parser";
const app = express();
dotenv.config();
app.use(bodyParser.json());
const P = process.env.PO;
const url = process.env.url_DB;

// connection
mongoose
  .connect(url)
  .then(() => {
    console.log("connected to database");
  })
  .catch((err) => {
    console.log(err);
  });

// end

// CRUD
// POST method
app.post("/person", async (req, res) => {
  const { username, age, FD } = req.body;
  try {
    const newPerson = new person({ username, age, FD });
    await newPerson.save();
    res.status(200).send({ msg: "ajout avec success", newPerson });
  } catch (error) {
    res.status(500).send({ msg: "failed", Response: error });
    console.log(error);
  }
});
//  end of post

// get methhods
app.get("/persons", async (req, res) => {
  try {
    const persons = await person.find();
    res.status(200).send({ msg: "all persons", Response: persons });
  } catch (error) {
    res.status(500).send({ msg: "failed get persons", Response: error });
  }
});

app.get("/personscondition", async (req, res) => {
  try {
    const conditionperson = await person.find({ age: { $gt: 20 } });
    res
      .status(200)
      .send({ msg: "persons great than 20", response: conditionperson });
  } catch (error) {
    res
      .status(500)
      .send({ msg: "failed get persons great than 20 ", Response: error });
  }
});
//  end of get

// delete method
app.delete("/:id", async (req, res) => {
  try {
    const deleted = await person.deleteOne({ _id: req.params.id });
    deleted.deletedCount
      ? res.status(200).send({ msg: "deletes success", deleted })
      : res.status(200).send({ msg: "alredy deleted " });
  } catch (error) {
    res.status(500).send({ msg: "failed delete", Response: error });
  }
});

// end of delete

// patch method
app.patch("/:id", async (req, res) => {
  try {
    const updated = await person.updateOne({
      " _id": req.params.id,
      $set: { ...req.body },
    });
    updated.modifiedCount
      ? res.status(200).send({ msg: "update successfully", response: updated })
      : res.status(200).send("already updated");
  } catch (error) {
    res.status(500).send({ msg: "failed to update", response: error });
    console.log(error);
  }
});
// end of patch
// end of CRUD
//   server run
app.listen(P, (err) => {
  if (err) throw err;
  console.log(`server run on http://localhost:${P}`);
});
