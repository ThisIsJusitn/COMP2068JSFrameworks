const express = require("express");
const path = require("path");
const app = express();

// Set view engine to Handlebars
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

// Static folder
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/", require("./routes/index")); // Home page
app.use("/about", require("./routes/about")); // About Me page
app.use("/projects", require("./routes/projects")); // Projects page
app.use("/contact", require("./routes/contact")); // Contact Me page

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
