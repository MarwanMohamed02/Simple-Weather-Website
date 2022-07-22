"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const hbs_1 = __importDefault(require("hbs"));
const test_1 = require("./test");
/* Creating paths */
const publicDirPath = path_1.default.join(__dirname, "../public");
const viewsPath = path_1.default.join(__dirname, "../templates/views");
const partialsPath = path_1.default.join(__dirname, "../templates/partials");
/* Setting Up hbs */
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs_1.default.registerPartials(partialsPath);
/* Giving the website access to public Dir */
app.use(express_1.default.static(publicDirPath)); // the filename index.html is a special name to servers it represents the root url
// Thats why app.get("",..) will not work as the root has already been configured
/* Creating Different pages  */
// Home 
app.get("", (req, res) => {
    res.render("index", {
        title: "Weather App",
        name: "Marwan Mohamed"
    });
});
// About 
app.get("/about", (req, res) => {
    res.render("about", {
        title: "About Me",
        name: "Marwan Mohamed"
    });
});
// Help
app.get("/help", (req, res) => {
    res.render("help", {
        message: "How can we help you?",
        title: "Help",
        name: "Marwan Mohamed"
    });
});
// Any page not available in help
app.get("/help/*", (req, res) => {
    res.render("404", {
        errorMessage: "Help Article Not Found",
        title: "404",
        name: "Marwan Mohamed"
    });
});
// Weather 
app.get("/weather", (req, res) => {
    if (!req.query.address) {
        res.send({
            error: "Must use a search term"
        });
    }
    else {
        (0, test_1.forecast)(req.query.address).then(weather => res.send(weather));
    }
});
// 404 Page
app.get("*", (req, res) => {
    res.render("404", {
        errorMessage: "Page Not Found",
        title: "404",
        name: "Marwan Mohamed"
    });
});
app.listen(3000, () => {
    console.log("Server is up on port 3000");
});
