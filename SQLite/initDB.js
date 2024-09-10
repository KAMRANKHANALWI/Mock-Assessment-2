const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.sqlite');

db.serialize(() => {
  // Create Chefs table
  db.run(`CREATE TABLE IF NOT EXISTS chefs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    specialty TEXT NOT NULL
  )`);

  // Create Dishes table
  db.run(`CREATE TABLE IF NOT EXISTS dishes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price FLOAT NOT NULL,
    chef_id INTEGER NOT NULL,
    restaurant_id INTEGER NOT NULL
  )`);

  // Create Restaurants table
  db.run(`CREATE TABLE IF NOT EXISTS restaurants (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    location TEXT NOT NULL,
    cuisine TEXT NOT NULL
  )`);

  // Insert initial data into Chefs table
  db.run(`INSERT INTO chefs (name, specialty) VALUES
    ('Vikas Khanna', 'Indian'),
    ('Sanjeev Kapoor', 'Indian'),
    ('Gaggan Anand', 'Progressive Indian')`);

  // Insert initial data into Restaurants table
  db.run(`INSERT INTO restaurants (name, location, cuisine) VALUES
    ('Junoon', 'New York', 'Indian'),
    ('The Yellow Chilli', 'Mumbai', 'Indian'),
    ('Gaggan', 'Bangkok', 'Progressive Indian')`);

  // Insert initial data into Dishes table
  db.run(`INSERT INTO dishes (name, price, chef_id, restaurant_id) VALUES
    ('Dal Makhani', 15.0, 1, 1),
    ('Paneer Butter Masala', 20.0, 2, 2),
    ('Molecular Chaat', 35.0, 3, 3)`);
});

db.close();
console.log('Database initialized and seeded.');

