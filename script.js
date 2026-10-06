/* =========================
   SPACESHIP WEARS WEBSITE
========================= */


/* =========================
   PRODUCT DATA
========================= */

const products = {

    hat: {
        name: "SPACESHIP TRUCKER HAT",
        price: 6000,
        image: "images/trucker-hat.jpg",
        colours: ["Red", "Black", "White", "Pink", "Blue"],
        sizes: []
    },

    tee: {
    name: "SPACESHIP REGULAR TEE",
    price: 12000,

    images: {
        Black: "images/regular-tee-black.jpg",
        White: "images/regular-tee-white.jpg"
    },

    colours: ["Black", "White"],

    sizes: ["S", "M", "L", "XL", "XXL"]
},

    tank: {
        name: "SPACESHIP TANK TOP",
        price: 14000,
        image: "images/tank-top.jpg",
        colours: ["Black", "White"],
        sizes: ["S", "M", "L", "XL", "XXL"]
    },

    shorts: {
        name: "SPACESHIP SHORTS",
        price: 12000,
        image: "images/shorts.jpg",
        colours: ["Black"],
        sizes: ["S", "M", "L", "XL", "XXL"]
    },

    jorts: {
        name: "SPACESHIP JORTS",
        price: 25000,
        image: "images/jorts.jpg",
        colours: [],
        sizes: ["S", "M", "L", "XL", "XXL"]
    },

    joggers: {
        name: "SPACESHIP JOGGERS",
        price: 18000,
        image: "images/joggers.jpg",
        colours: ["Ash", "Black"],
        sizes: ["S", "M", "L", "XL", "XXL"]
    },

    graphicTee: {
        name: "SPACESHIP GRAPHIC ARMLESS TEE",
        price: 20000,
        image: "images/graphic-armless-tee.jpg",
        colours: ["Black", "White"],
        sizes: ["S", "M", "L", "XL", "XXL"]
    },

    doubleLayeredTee: {
        name: "SPACESHIP DOUBLE LAYERED TEE",
        price: 20000,
        image: "images/double-layered-tee.jpg",
        colours: ["Black"],
        sizes: ["S", "M", "L", "XL", "XXL"]
    },

    tracksuit: {
    name: "SPACESHIP TRACKSUIT",
    price: 40000,

    images: {
        Black: "images/tracksuit-black.jpg",
        Red: "images/tracksuit-red.jpg",
        Blue: "images/tracksuit-blue.jpg"
    },

    colours: ["Black", "Red", "Blue"],

    sizes: ["S", "M", "L", "XL", "XXL"]
},
    hoodie: {
        name: "SPACESHIP HOODIE JACKET",
        price: 18000,
        image: "images/hoodie-jacket.jpg",
        colours: ["Black"],
        sizes: ["S", "M", "L", "XL", "XXL"]
    }

};


/* =========================
   VARIABLES
========================= */

let currentProduct = null;
let selectedColour = "";
let selectedSize = "";
let quantity = 1;
let cart = [];


/* =========================
   OPEN PRODUCT
========================= */

function openProduct(productId) {

  

    const product = products[productId];

    if (!product) {
        console.error("Product not found:", productId);
        return;
    }

    // leave the rest of your code exactly as it is

    currentProduct = product;

    selectedColour = "";
    selectedSize = "";
    quantity = 1;


    const modal =
        document.getElementById("productModal");

    const image =
        document.getElementById("modalProductImage");

    const name =
        document.getElementById("modalProductName");

    const price =
        document.getElementById("modalProductPrice");

    const colourOptions =
        document.getElementById("colourOptions");

    const colourGroup =
        document.getElementById("colourGroup");

    const sizeGroup =
        document.getElementById("sizeGroup");

    const sizeOptions =
        document.querySelector(".size-options");

    const quantityDisplay =
        document.getElementById("quantity");


    if (!modal) {
        console.error("productModal not found");
        return;
    }


    if (product.image) {
    image.src = product.image;
} else if (product.images) {
    const firstColour = product.colours[0];

    if (firstColour && product.images[firstColour]) {
        image.src = product.images[firstColour];
    }
}

name.textContent = product.name;
price.textContent = "₦" + product.price.toLocaleString();

    /* COLOURS */

    colourOptions.innerHTML = "";

if (product.colours.length > 0) {

    colourGroup.style.display = "block";

    product.colours.forEach(function (colour) {

        const button =
            document.createElement("button");

        button.textContent = colour;
        button.type = "button";
        button.className = "colour-option";

        button.addEventListener("click", function () {

            document
                .querySelectorAll(".colour-option")
                .forEach(function (btn) {

                    btn.classList.remove("active");

                });

            button.classList.add("active");

            selectedColour = colour;

            /* CHANGE PRODUCT IMAGE */

            if (product.images && product.images[colour]) {

                document.getElementById("modalProductImage").src =
                    product.images[colour];

            }

        });

        colourOptions.appendChild(button);

    });

} else {

    colourGroup.style.display = "none";

}
    /* SIZES */

    if (product.sizes.length > 0) {

        sizeGroup.style.display = "block";

        sizeOptions.innerHTML = "";

        product.sizes.forEach(function (size) {

            const button =
                document.createElement("button");

            button.textContent = size;
            button.type = "button";

            button.addEventListener("click", function () {

                document
                    .querySelectorAll(".size-options button")
                    .forEach(function (btn) {

                        btn.classList.remove("active");

                    });

                button.classList.add("active");

                selectedSize = size;

            });

            sizeOptions.appendChild(button);

        });

    } else {

        sizeGroup.style.display = "none";

    }


    quantityDisplay.textContent = quantity;


    modal.classList.add("active");

    document.body.style.overflow = "hidden";

}


/* =========================
   CLOSE PRODUCT
========================= */

function closeProduct() {

    const modal =
        document.getElementById("productModal");

    if (modal) {

        modal.classList.remove("active");

    }

    document.body.style.overflow = "";

}


/* =========================
   SELECT SIZE
========================= */

function selectSize(button) {

    document
        .querySelectorAll(".size-options button")
        .forEach(function (btn) {

            btn.classList.remove("active");

        });


    button.classList.add("active");


    selectedSize = button.textContent;

}


/* =========================
   CHANGE QUANTITY
========================= */

function changeQuantity(change) {

    quantity += change;


    if (quantity < 1) {

        quantity = 1;

    }


    document
        .getElementById("quantity")
        .textContent = quantity;

}


/* =========================
   ADD TO CART
========================= */

function addToCart() {

    if (!currentProduct) {

        return;

    }


    if (
        currentProduct.colours.length > 0 &&
        selectedColour === ""
    ) {

        alert("Please select a colour.");

        return;

    }


    if (
        currentProduct.sizes.length > 0 &&
        selectedSize === ""
    ) {

        alert("Please select a size.");

        return;

    }


    const cartItem = {

        name: currentProduct.name,

        price: currentProduct.price,

        image: currentProduct.image,

        colour: selectedColour,

        size: selectedSize,

        quantity: quantity

    };


    cart.push(cartItem);


    updateCartCount();


    closeProduct();


    alert("Product added to cart!");

}


/* =========================
   UPDATE CART COUNT
========================= */

function updateCartCount() {

    const cartCount =
        document.getElementById("cartCount");


    if (!cartCount) {

        return;

    }


    let total = 0;


    cart.forEach(function (item) {

        total += item.quantity;

    });


    cartCount.textContent = total;

}


/* =========================
   OPEN CART
========================= */

function openCart() {

    const cartModal =
        document.getElementById("cartModal");

    const cartItems =
        document.getElementById("cartItems");

    const cartTotal =
        document.getElementById("cartTotal");


    if (!cartModal) {

        return;

    }


    cartItems.innerHTML = "";


    if (cart.length === 0) {

        cartItems.innerHTML =
            "<p>Your cart is empty.</p>";

        cartTotal.textContent = "₦0";

    } else {

        let total = 0;


        cart.forEach(function (item, index) {

            const itemTotal =
                item.price * item.quantity;


            total += itemTotal;


            const cartItem =
                document.createElement("div");


            cartItem.className = "cart-item";


            cartItem.innerHTML = `

                <div>

                    <h4>${item.name}</h4>

                    <p>
                        ${item.colour ? "Colour: " + item.colour : ""}
                    </p>

                    <p>
                        ${item.size ? "Size: " + item.size : ""}
                    </p>

                    <p>
                        Quantity: ${item.quantity}
                    </p>

                </div>

                <div>

                    <strong>
                        ₦${itemTotal.toLocaleString()}
                    </strong>

                    <button
                        type="button"
                        onclick="removeFromCart(${index})">

                        Remove

                    </button>

                </div>

            `;


            cartItems.appendChild(cartItem);

        });


        cartTotal.textContent =
            "₦" + total.toLocaleString();

    }


    cartModal.classList.add("active");

    document.body.style.overflow = "hidden";

}


/* =========================
   CLOSE CART
========================= */

function closeCart() {

    const cartModal =
        document.getElementById("cartModal");

    if (cartModal) {

        cartModal.classList.remove("active");

    }

    document.body.style.overflow = "";

}


/* =========================
   REMOVE FROM CART
========================= */

function removeFromCart(index) {

    cart.splice(index, 1);


    updateCartCount();


    openCart();

}


/* =========================
   OPEN CHECKOUT
========================= */

function openCheckout() {

    if (cart.length === 0) {

        alert("Your cart is empty.");

        return;

    }


    closeCart();


    const checkoutModal =
        document.getElementById("checkoutModal");


    if (checkoutModal) {

        checkoutModal.classList.add("active");

    }

}


/* =========================
   CLOSE CHECKOUT
========================= */

function closeCheckout() {

    const checkoutModal =
        document.getElementById("checkoutModal");


    if (checkoutModal) {

        checkoutModal.classList.remove("active");

    }

    document.body.style.overflow = "";

}


/* =========================
   CHECKOUT FORM
========================= */

const checkoutForm =
    document.getElementById("checkoutForm");

if (checkoutForm) {

    checkoutForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            if (cart.length === 0) {
                alert("Your cart is empty.");
                return;
            }

            const name =
                document.getElementById("customerName").value.trim();

            const phone =
                document.getElementById("customerPhone").value.trim();

            const address =
                document.getElementById("customerAddress").value.trim();

            if (!name || !phone || !address) {
                alert("Please complete all required customer details.");
                return;
            }

            /* CREATE ORDER NUMBER */

            const orderNumber =
                "SW-" + Date.now();

            /* CALCULATE ORDER TOTAL */

            let total = 0;

            cart.forEach(function (item) {
                total += item.price * item.quantity;
            });

            /* PROCESS ORDER */

            alert(
                "ORDER PLACED SUCCESSFULLY!\n\n" +
                "Order Number: " + orderNumber + "\n" +
                "Customer: " + name + "\n" +
                "Phone: " + phone + "\n" +
                "Total: ₦" + total.toLocaleString() +
                "\n\nThank you for shopping with Spaceship Wears!"
            );

            /* CLEAR CART AFTER SUCCESSFUL ORDER */

            cart = [];

            updateCartCount();

            /* RESET CHECKOUT FORM */

            this.reset();

            /* CLOSE CHECKOUT */

            closeCheckout();

        }
    );

}


/* =========================
   CART BUTTON
========================= */

const cartButton =
    document.getElementById("cartButton");


if (cartButton) {

    cartButton.addEventListener(
        "click",
        openCart
    );

}


/* =========================
   CLOSE MODALS WHEN
   CLICKING OUTSIDE
========================= */

window.addEventListener(
    "click",
    function (event) {

        const productModal =
            document.getElementById("productModal");

        const cartModal =
            document.getElementById("cartModal");

        const checkoutModal =
            document.getElementById("checkoutModal");


        if (event.target === productModal) {

            closeProduct();

        }


        if (event.target === cartModal) {

            closeCart();

        }


        if (event.target === checkoutModal) {

            closeCheckout();

        }

    }
);


/* =========================
   MAKE FUNCTIONS AVAILABLE
   TO HTML BUTTONS
========================= */

window.openProduct = openProduct;
window.closeProduct = closeProduct;
window.selectSize = selectSize;
window.changeQuantity = changeQuantity;
window.addToCart = addToCart;

window.openCart = openCart;
window.closeCart = closeCart;
window.removeFromCart = removeFromCart;

window.openCheckout = openCheckout;
window.closeCheckout = closeCheckout;file:///data/user/0/com.foxdebug.acodefree/files/public/my-portfolio/Spaceship wears/script.js
