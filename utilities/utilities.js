const fs = require("fs/promises");

const readFile = async (pathName, isObject = false) => {
  try {
    const data = await fs.readFile(pathName, "utf-8");
    return isObject ? JSON.parse(data) : data;
  } catch (error) {
    console.log(error);
  }
};

const writeFile = async (pathName, data) => {
  try {
    const file = await fs.writeFile(pathName, JSON.stringify(data));
    console.log("Write successfuly");
  } catch (error) {
    console.log(error);
  }
};

const getCurrentDateTime = () => {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

module.exports = { readFile, writeFile, getCurrentDateTime };
