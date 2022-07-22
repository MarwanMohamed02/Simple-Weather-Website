import path from 'path'
import express from 'express'
const app = express();
import hbs from 'hbs'
import { forecast } from './test';



/* Creating paths */
const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

/* Setting Up hbs */ 
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);


/* Giving the website access to public Dir */
app.use(express.static(publicDirPath));     // the filename index.html is a special name to servers it represents the root url
                                            // Thats why app.get("",..) will not work as the root has already been configured


/* Creating Different pages  */

// Home 
app.get("", (req, res) => {
    res.render("index", {
        title: "Weather App",
        name: "Marwan Mohamed"
    });
})

// About 
app.get("/about", (req, res) => {
    res.render("about", {
        title: "About Me",
        name: "Marwan Mohamed"
    });
})

// Help
app.get("/help", (req, res) => {
    res.render("help", {
        message: "How can we help you?",
        title: "Help",
        name: "Marwan Mohamed"
    })
})

// Any page not available in help
app.get("/help/*", (req, res) => {
    res.render("404", {
        errorMessage: "Help Article Not Found",
        title: "404",
        name: "Marwan Mohamed"
    });
})

// Weather 
app.get("/weather", (req, res) => {

    if (!req.query.address) {
        res.send({
            error: "Must use a search term"
        })
    }
    else {
        forecast(req.query.address).then(weather => res.send(weather));
    }
    
})

// 404 Page
app.get("*", (req, res) => {
    res.render("404", {
        errorMessage: "Page Not Found",
        title: "404",
        name: "Marwan Mohamed"
    });
})
     

app.listen(3000, () => {
    console.log("Server is up on port 3000");
})

