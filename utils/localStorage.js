const fs = require("fs");
const path = require("path");

const dbPath = path.join(__dirname, "db.json");

// Initialize DB file if not exists
if (!fs.existsSync(dbPath)) {
  fs.writeFileSync(
    dbPath,
    JSON.stringify({ users: [], tasks: [] }, null, 2)
  );
}

// Read DB
const readDB = () => {
  const data = fs.readFileSync(dbPath);
  return JSON.parse(data);
};

// Write DB
const writeDB = (data) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

module.exports = {
  readDB,
  writeDB,
};
