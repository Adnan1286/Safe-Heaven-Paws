const express = require('express');
const authMiddleware = require("../middlewares/authMiddleware");
const { 
    createEvent, 
    getAllEvents, 
    getAllEventsAdmin,
    approveEvent,
    rejectEvent 
} = require("../controllers/eventCtrl");
const router = express.Router();

// Public route to get approved events
router.get("/", getAllEvents);

// Protected routes
router.post("/create", authMiddleware, createEvent);
router.get("/admin", authMiddleware, getAllEventsAdmin);
router.post("/approve/:id", authMiddleware, approveEvent);
router.post("/reject/:id", authMiddleware, rejectEvent);

module.exports = router;
