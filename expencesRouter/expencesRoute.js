const express = require("express")
const app = express(); 
const { Router} = require("express");
const expenceRouter = Router();
const { getAll, getById, Post, Delete, Put } = require("./expence.service");
app.set("view engine", "ejs");

expenceRouter.get("/all", getAll);

expenceRouter.get("/:id", getById);

expenceRouter.post("/add", Post);

expenceRouter.delete("/delete/:id", Delete);

expenceRouter.patch("/edit/:id", Put);

module.exports = expenceRouter;
