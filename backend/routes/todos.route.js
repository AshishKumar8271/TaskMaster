const router = require("express").Router();
const { authMiddleWare } = require("../middleware/auth.middleware");
const Todos = require("../models/todos.model");

router.post("/", authMiddleWare, async (req, res) => {
  try {
    const { text, completed } = req.body;

    if (!text || typeof text !== "string") {
      return res.status(400).json({ error: "Todo text is required" });
    }

    await Todos.create({
      text,
      completed: completed ?? false,
      userId: req.user.id,
    });

    return res.status(201).json({ message: "Task added Successfully" });
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/", authMiddleWare, async (req, res) => {
  try {
    const todos = await Todos.find({ userId: req.user.id });
    return res.status(200).json(todos);
  } catch (err) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.patch("/:id", authMiddleWare, async (req, res) => {
  try {
    const { id } = req.params;
    const {completed } = req.body;
    if (completed === undefined) {
      return res.status(400).json({ error: "Invalid Values" });
    }

    const todo = await Todos.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      {completed },
      { new: true }
    );

    if (!todo) return res.status(404).json({ error: "Todo not found" });

    return res.json(todo);
  } catch (err) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/:id", authMiddleWare, async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await Todos.findByIdAndDelete(id);

    if (!todo) return res.status(404).json({ error: "Todo not found" });

    return res.status(200).json({ message: "Todo Deleted Successfully" });
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
