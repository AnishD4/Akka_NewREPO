const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

// Middleware to parse JSON body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (e.g., HTML) from the "Akka" directory
app.use(express.static("public"));

// Endpoint to handle form submissions
app.post("/save-contacts", (req, res) => {
    const { content } = req.body;
    if (!content) {
        return res.status(400).json({ message: "Content is required" });
    }

    // Append content to the file
    fs.appendFile("feedback.txt", content + "\n", (err) => {
        if (err) {
            console.error("Error appending to file:", err);
            return res.status(500).json({ message: "Failed to append to file" });
        }

        res.status(200).json({ message: "Content appended successfully" });
    });
});




app.post("/save-purchase", (req, res) => {
    const { content } = req.body;
    if (!content) {
        return res.status(400).json({ message: "Content is required" });
    }

    // Append content to the file
    fs.appendFile("purchase.txt", content + "\n", (err) => {
        if (err) {
            console.error("Error appending to file:", err);
            return res.status(500).json({ message: "Failed to append to file" });
        }

        res.status(200).json({ message: "Content appended successfully" });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}/contact.html`);
});