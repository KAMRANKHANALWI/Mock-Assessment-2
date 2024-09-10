let express = require("express");
let { sequelize } = require("./lib/index");
let { chef } = require("./models/chef.model");
let { restaurant } = require("./models/restaurant.model");
let { dish } = require("./models/dish.model");
let app = express();

app.get("/v2/seed_db", async (req, res) => {
  try {
    // Clear existing data
    await sequelize.sync({ force: true });

    // Seed Chefs
    await chef.create({ name: "Vikas Khanna", specialty: "Indian" });
    await chef.create({ name: "Sanjeev Kapoor", specialty: "Indian" });
    await chef.create({
      name: "Gaggan Anand",
      specialty: "Progressive Indian",
    });

    // Seed Restaurants
    await restaurant.create({
      name: "Junoon",
      location: "New York",
      cuisine: "Indian",
    });
    await restaurant.create({
      name: "The Yellow Chilli",
      location: "Mumbai",
      cuisine: "Indian",
    });
    await restaurant.create({
      name: "Gaggan",
      location: "Bangkok",
      cuisine: "Progressive Indian",
    });

    // Seed Dishes
    await dish.create({ name: "Dal Makhani", price: 20.0 });
    await dish.create({ name: "Paneer Butter Masala", price: 25.0 });
    await dish.create({ name: "Molecular Chaat", price: 40.0 });

    res.status(200).json({ message: "Database seeded successfully" });
  } catch (error) {
    console.error("Error seeding database:", error);
    res.status(500).json({ message: "Error seeding database" });
  }
});

async function fetchAllRestaurants() {
  let restaurants = await restaurant.findAll();
  return { restaurants };
}

app.get("/v2/restaurants", async (req, res) => {
  try {
    let response = await fetchAllRestaurants();
    if (response.restaurants.length === 0) {
      return res.status(404).json({ msg: "No Restaurants Found" });
    }
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

async function fetchChefDetailsByID(id) {
  let chefDetails = await chef.findOne({ where: { id } });
  return { chefDetails };
}

app.get("/v2/chefs/:id", async (req, res) => {
  let id = req.params.id;
  try {
    let result = await fetchChefDetailsByID(id);
    if (result.chefDetails.length === 0) {
      return res.status(404).json({ msg: `No chef found of id ${id}` });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

async function fetchAllDishesByName(name) {
  let dishes = await dish.findAll({ where: { name } });
  return { dishes };
}

app.get("/v2/dishes/filter", async (req, res) => {
  let name = req.query.name;
  try {
    let response = await fetchAllDishesByName(name);
    if (response.dishes.length === 0) {
      return res
        .status(404)
        .json({ msg: `No dishes found of the name ${name}` });
    }
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

async function fetchRestaurantsByLocation(location) {
  let restaurants = await restaurant.findAll({ where: { location } });
  return { restaurants };
}

app.get("/v2/restaurants/location/:location", async (req, res) => {
  let location = req.params.location;
  try {
    let response = await fetchRestaurantsByLocation(location);
    if (response.restaurants.length === 0) {
      return res
        .status(404)
        .json({ msg: `No restaurant found of the location ${location}` });
    }
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

let PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
