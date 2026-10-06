const express = require("express");
const path = require("path");

const app = express();

const PORT = 3000;


// Middleware

app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));


// Home route

app.get("/", (req, res) => {

    res.sendFile(
        path.join(__dirname, "public", "index.html")
    );

});


// Test API route

app.get("/api/products", (req, res) => {

    const products = [

        {
            id: 1,
            name: "Spaceship Trucker Hat",
            price: 6000,
            colours: [
                "Red",
                "Black",
                "White",
                "Pink",
                "Blue"
            ],
            sizes: []
        },

        {
            id: 2,
            name: "Spaceship Regular Tee",
            price: 12000,
            colours: [
                "Black",
                "White"
            ],
            sizes: [
                "S",
                "M",
                "L",
                "XL",
                "XXL"
            ]
        },

        {
            id: 3,
            name: "Spaceship Tank Top",
            price: 14000,
            colours: [
                "Black",
                "White"
            ],
            sizes: [
                "S",
                "M",
                "L",
                "XL",
                "XXL"
            ]
        }

    ];


    res.json(products);

});


// Start server

app.listen(PORT, () => {

    console.log(
        `Spaceship server is running on http://localhost:${PORT}`
    );

});
