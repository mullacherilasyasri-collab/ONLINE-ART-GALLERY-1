// ==========================================
// ART VISTA - ONLINE ART GALLERY
// COMPLETE SCRIPT.JS
// ==========================================


// ==========================================
// 1. ARTWORK IMAGES
// ==========================================

const artworkImages = [

    // PAINTINGS
    "https://images.unsplash.com/photo-1577083288073-40892c0860a4?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1577083552431-6e5fd01988a5?auto=format&fit=crop&w=900&q=85",

    // DIGITAL ART
    "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1634986666676-ec8fd927c23d?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1614728263952-84ea256f9679?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1636955816868-fcb881e57954?auto=format&fit=crop&w=900&q=85",

    // PHOTOGRAPHY
    "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=900&q=85",

    // ABSTRACT ART
    "https://images.unsplash.com/photo-1549490349-b7f5d8d4f4a0?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1557682250-33bd709cbe85?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1551913902-c92207136625?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?auto=format&fit=crop&w=900&q=85"
];


// ==========================================
// 2. LOAD ARTWORK IMAGES
// ==========================================

function loadArtworkImages() {

    const images = document.querySelectorAll(".art-image img");

    images.forEach((img, index) => {

        if (artworkImages[index]) {
            img.src = artworkImages[index];
        }

    });

    // Hero image
    const heroImage = document.querySelector(".hero-art img");

    if (heroImage) {
        heroImage.src = artworkImages[0];
    }
}


// ==========================================
// 3. CART SYSTEM
// ==========================================

let cart = JSON.parse(localStorage.getItem("artCart")) || [];


// Save cart
function saveCart() {

    localStorage.setItem(
        "artCart",
        JSON.stringify(cart)
    );

}


// Update cart number
function updateCartCount() {

    const cartCount =
        document.getElementById("cart-count");

    if (cartCount) {

        cartCount.textContent = cart.length;

    }

}


// Add artwork to cart
function addToCart(name, price) {

    cart.push({

        name: name,
        price: price

    });

    saveCart();

    updateCartCount();

    alert(
        name +
        " has been added to your cart!"
    );

}


// ==========================================
// 4. OPEN CART
// ==========================================

function openCart() {

    const modal =
        document.getElementById("cartModal");

    if (modal) {

        modal.style.display = "flex";

        displayCart();

    }

}


// ==========================================
// 5. CLOSE CART
// ==========================================

function closeCart() {

    const modal =
        document.getElementById("cartModal");

    if (modal) {

        modal.style.display = "none";

    }

}


// ==========================================
// 6. DISPLAY CART
// ==========================================

function displayCart() {

    const cartItems =
        document.getElementById("cartItems");

    const cartTotal =
        document.getElementById("cartTotal");


    if (!cartItems) return;


    cartItems.innerHTML = "";


    // Empty cart
    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p style="text-align:center; padding:20px;">
                Your cart is empty.
            </p>
        `;

        if (cartTotal) {

            cartTotal.textContent = "₹0";

        }

        return;

    }


    let total = 0;


    // Display every item
    cart.forEach((item, index) => {

        total += Number(item.price);


        const div =
            document.createElement("div");


        div.className = "cart-item";


        div.innerHTML = `

            <div style="
                display:flex;
                justify-content:space-between;
                align-items:center;
                gap:15px;
                width:100%;
            ">

                <div>

                    <strong>
                        ${item.name}
                    </strong>

                    <p style="
                        margin:5px 0;
                        font-size:16px;
                    ">
                        ₹${item.price}
                    </p>

                </div>


                <button
                    onclick="removeFromCart(${index})"
                    style="
                        background:#c62828;
                        color:white;
                        border:none;
                        padding:8px 12px;
                        border-radius:5px;
                        cursor:pointer;
                    "
                >
                    Remove
                </button>

            </div>

        `;


        cartItems.appendChild(div);

    });


    // Display total
    if (cartTotal) {

        cartTotal.textContent =
            "₹" + total;

    }

}


// ==========================================
// 7. REMOVE FROM CART
// ==========================================

function removeFromCart(index) {

    cart.splice(index, 1);

    saveCart();

    updateCartCount();

    displayCart();

}


// ==========================================
// 8. CHECKOUT / BUY
// ==========================================

function checkout() {

    // Check empty cart
    if (cart.length === 0) {

        alert(
            "Your cart is empty!"
        );

        return;

    }


    // Calculate total
    let total = 0;


    cart.forEach(item => {

        total += Number(item.price);

    });


    // SUCCESS MESSAGE
    alert(

        "Order Placed Successfully!\n\n" +

        "Thank you for shopping with ArtVista.\n" +

        "Your artwork order has been confirmed.\n\n" +

        "Total Amount: ₹" + total

    );


    // Empty cart
    cart = [];


    // Remove saved cart
    localStorage.removeItem(
        "artCart"
    );


    // Update website
    updateCartCount();

    displayCart();

}


// ==========================================
// 9. LOGIN
// ==========================================

function openLogin() {

    const modal =
        document.getElementById("loginModal");

    if (modal) {

        modal.style.display = "flex";

    }

}


function closeLogin() {

    const modal =
        document.getElementById("loginModal");

    if (modal) {

        modal.style.display = "none";

    }

}


// Login user
function loginUser() {

    const email =
        document.getElementById("loginEmail").value;

    const password =
        document.getElementById("loginPassword").value;


    if (
        email === "" ||
        password === ""
    ) {

        alert(
            "Please enter email and password."
        );

        return;

    }


    const users =
        JSON.parse(
            localStorage.getItem("artUsers")
        ) || [];


    const user =
        users.find(
            u =>
                u.email === email &&
                u.password === password
        );


    if (user) {

        localStorage.setItem(
            "loggedInUser",
            email
        );


        alert(
            "Login successful!\n\nWelcome to ArtVista."
        );


        closeLogin();

    } else {

        alert(
            "Invalid email or password.\n\nPlease sign up first."
        );

    }

}


// ==========================================
// 10. SIGN UP
// ==========================================

function showSignup() {

    const name =
        prompt("Enter your name:");

    if (!name) return;


    const email =
        prompt("Enter your email:");

    if (!email) return;


    const password =
        prompt("Create a password:");

    if (!password) return;


    let users =
        JSON.parse(
            localStorage.getItem("artUsers")
        ) || [];


    // Check existing email
    const existingUser =
        users.find(
            user => user.email === email
        );


    if (existingUser) {

        alert(
            "An account with this email already exists."
        );

        return;

    }


    users.push({

        name: name,

        email: email,

        password: password

    });


    localStorage.setItem(
        "artUsers",
        JSON.stringify(users)
    );


    alert(
        "Account created successfully!"
    );

}


// ==========================================
// 11. SEARCH
// ==========================================

function searchArtworks() {

    const input =
        document.getElementById(
            "searchInput"
        );


    if (!input) return;


    const searchText =
        input.value.toLowerCase();


    const cards =
        document.querySelectorAll(
            ".art-card"
        );


    cards.forEach(card => {

        const text =
            card.textContent.toLowerCase();


        if (
            text.includes(searchText)
        ) {

            card.style.display = "";

        } else {

            card.style.display = "none";

        }

    });

}


// ==========================================
// 12. CATEGORY FILTER
// ==========================================

function filterCategory(category) {

    const cards =
        document.querySelectorAll(
            ".art-card"
        );


    cards.forEach(card => {

        const cardCategory =
            card.dataset.category;


        if (
            category === "All" ||
            cardCategory === category
        ) {

            card.style.display = "";

        } else {

            card.style.display = "none";

        }

    });

}


// ==========================================
// 13. CLOSE MODALS BY CLICKING OUTSIDE
// ==========================================

window.addEventListener(
    "click",
    function(event) {

        const loginModal =
            document.getElementById(
                "loginModal"
            );

        const cartModal =
            document.getElementById(
                "cartModal"
            );


        if (
            loginModal &&
            event.target === loginModal
        ) {

            loginModal.style.display =
                "none";

        }


        if (
            cartModal &&
            event.target === cartModal
        ) {

            cartModal.style.display =
                "none";

        }

    }
);


// ==========================================
// 14. START WEBSITE
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        loadArtworkImages();

        updateCartCount();

    }
);