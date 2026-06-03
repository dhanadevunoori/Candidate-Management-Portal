const express = require("express");
const router = express.Router();
const Candidate = require("../models/Candidate");

router.get("/", async (req, res) => {
  try {
    const candidates = await Candidate.find().sort({ createdAt: -1 });
    res.json(candidates);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.params.id);
    if (!candidate) return res.status(404).json({ message: "Candidate not found" });
    res.json(candidate);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { fullName, email, skills, experience, status, phone, notes } = req.body;

    const existing = await Candidate.findOne({ email });
    if (existing) return res.status(400).json({ message: "Candidate with this email already exists" });

    const candidate = new Candidate({
      fullName, email,
      skills: Array.isArray(skills) ? skills : skills.split(",").map((s) => s.trim()),
      experience, status: status || "Applied", phone, notes,
    });

    const saved = await candidate.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: "Validation error", error: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { fullName, email, skills, experience, status, phone, notes } = req.body;

    const updateData = {
      fullName, email,
      skills: Array.isArray(skills) ? skills : skills.split(",").map((s) => s.trim()),
      experience, status, phone, notes,
    };

    const candidate = await Candidate.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true });
    if (!candidate) return res.status(404).json({ message: "Candidate not found" });
    res.json(candidate);
  } catch (err) {
    res.status(400).json({ message: "Update failed", error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const candidate = await Candidate.findByIdAndDelete(req.params.id);
    if (!candidate) return res.status(404).json({ message: "Candidate not found" });
    res.json({ message: "Candidate deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;