const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");

const app = express();
const PORT = process.env.PORT || 3000;

let db;

// Connect to SQLite database
(async () => {
  db = await open({ filename: "database.sqlite", driver: sqlite3.Database });
  if (db) console.log("Connected to the SQLite database.");
})();

app.get("/", (req, res) => {
  res.status(200).json({ message: "MOCK ASSESSMENT 2" });
});

async function fetchAllChefs() {
  let query = "SELECT * FROM chefs";
  let response = await db.all(query, []);
  return { chefs: response };
}

app.get("/v1/chefs", async (req, res) => {
  try {
    let result = await fetchAllChefs();
    if (result.chefs.length === 0)
      return res.status(404).json({ msg: "No Chefs Found" });
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

async function fetchAllDishesByChef(chef_id) {
  let query = "SELECT * FROM dishes WHERE chef_id  = ? ";
  let response = await db.all(query, [chef_id]);
  return { dishes: response };
}

app.get("/v1/dishes/chef/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let result = await fetchAllDishesByChef(id);
    if (result.dishes.length === 0) {
      return res
        .status(404)
        .json({ msg: `No dishes found for the chef of id ${id}` });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

async function fetchRestaurantDetailsByName(name) {
  const query = "SELECT * FROM restaurants WHERE name = ? ";
  let response = await db.all(query, [name]);
  return { restaurant: response };
}

app.get("/v1/restaurants/search", async (req, res) => {
  const name = req.query.name;
  try {
    let result = await fetchRestaurantDetailsByName(name);
    if (result.restaurant.length === 0) {
      return res
        .status(404)
        .json({ msg: `No restaurant found of the name ${name}` });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

async function fetchDishesByRestaurant(restaurant_id) {
  let query = "SELECT * FROM dishes WHERE restaurant_id = ?";
  let response = await db.all(query, [restaurant_id]);
  return { dishes: response };
}

app.get("/v1/dishes/restaurant/:id", async (req, res) => {
  const id = req.params.id;
  try {
    let result = await fetchDishesByRestaurant(id);
    if (result.dishes.length === 0)
      return res
        .status(404)
        .json({ msg: `No dishes found of the restaurant_id ${id}` });
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

async function fetchChefsBySpecialty(specialty) {
  let query = "SELECT * FROM chefs WHERE specialty = ?";
  let response = await db.all(query, [specialty]);
  return { chefs: response };
}

app.get("/v1/chefs/search", async (req, res) => {
  let specialty = req.query.specialty;
  try {
    let result = await fetchChefsBySpecialty(specialty);
    if (result.chefs.length === 0)
      return res
        .status(404)
        .json({ msg: `No chefs found of the specialty ${specialty}` });
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
