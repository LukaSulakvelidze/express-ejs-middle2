const path = require("path");
const {
  readFile,
  getCurrentDateTime,
  writeFile,
} = require("../utilities/utilities");

// Get All
const getAll = async (_, res) => {
  const expencesData = await readFile(
    path.join(__dirname, "../", "expencesData.json"),
    true
  );
  // res.json(expencesData)
  res.render(path.join(__dirname, "../", "pages/main.ejs"), {
    data: expencesData,
  });
};

// Get By Id
const getById = async (req, res) => {
  const expencesData = await readFile(
    path.join(__dirname, "../", "expencesData.json"),
    true
  );
  const { id } = req.params;
  const indexOf = expencesData.findIndex((el) => el.id === Number(id));
  if (indexOf === -1)
    return res
      .status(404)
      .json({ success: false, message: "Expence not found" });
  res.json(expencesData[indexOf]);
  // res.render(path.join(__dirname, "../", "pages/main.ejs"));
};

// Create
const Post = async (req, res) => {
  const expencesData = await readFile(
    path.join(__dirname, "../", "expencesData.json"),
    true
  );
  const lastId = expencesData[expencesData.length - 1]?.id || 0;
  const { expence, category } = req.body;
  const newExpence = {
    id: lastId + 1,
    date: getCurrentDateTime(),
    expence,
    category,
  };
  expencesData.push(newExpence);
  await writeFile(
    path.join(__dirname, "../", "expencesData.json"),
    expencesData
  );
  res.json(newExpence);
};

// Delete
const Delete = async (req, res) => {
  const expencesData = await readFile(
    path.join(__dirname, "../", "expencesData.json"),
    true
  );
  const { id } = req.params;
  const indexOf = expencesData.findIndex((el) => el.id === Number(id));
  if (indexOf === -1)
    return res
      .status(404)
      .json({ success: false, message: "Expence not found" });
  const deletedExpence = expencesData.splice(indexOf, 1);
  await writeFile(
    path.join(__dirname, "../", "expencesData.json"),
    expencesData
  );
  res.json(deletedExpence);
  // res.render(path.join(__dirname, "../", "pages/main.ejs"));
};

// Update
const Put = async (req, res) => {
  const expencesData = await readFile(
    path.join(__dirname, "../", "expencesData.json"),
    true
  );
  const { id } = req.params;
  const { expence } = req.body;
  const indexOf = expencesData.findIndex((el) => el.id === Number(id));
  if (indexOf === -1)
    return res
      .status(404)
      .json({ success: false, message: "Expence not found" });
  expencesData[indexOf] = {
    ...expencesData[indexOf],
    expence: expence ? expence : expence[indexOf].expence,
  };
  await writeFile(
    path.join(__dirname, "../", "expencesData.json"),
    expencesData
  );
  res.json(expencesData[indexOf]);
  // res.render(path.join(__dirname, "../", "pages/main.ejs"));
};
module.exports = { getAll, getById, Post, Delete, Put };
