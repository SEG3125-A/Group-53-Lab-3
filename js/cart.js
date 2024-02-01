const grocery_items = [
    ["Spinach", 2.99, "spinach.jpg", true, true, false, true, "Vegetables"],
    ["Tofu", 3.49, "tofu.jpg", true, true, true, true, "Protein"],
    ["Quinoa", 4.99, "quinoa.jpg", true, true, true, true, "Grains"],
    ["Almond Milk", 2.79, "almond-milk.jpg", true, true, false, true, "Beverages"],
    ["Brown Rice", 1.99, "brown-rice.jpg", true, true, false, true, "Grains"],
    ["Gluten-Free Oats", 3.29, "oats.jpg", true, true, false, true, "Grains"],
    ["Organic Apples", 4.49, "apples.jpg", true, true, true, true, "Fruits"],
    ["Organic Spinach", 3.99, "spinach.jpg", true, true, true, true, "Vegetables"],
    ["Yogurt (Lactose-free)", 2.89, "yogurt.jpg", true, true, false, true, "Dairy"],
    ["Cheese (Lactose-free)", 4.19, "cheese.jpg", true, true, false, true, "Dairy"],
    ["Chicken Breast", 6.99, "chicken-breast.jpg", false, true, true, true, "Meat"],
    ["Salmon Fillet", 8.49, "salmon.jpg", false, true, true, true, "Seafood"],
    ["Eggs", 2.19, "eggs.jpg", true, true, true, true, "Dairy"],
    ["White Bread", 3.99, "white-bread.jpg", true, false, false, true, "Bakery"],
    ["Avocado", 1.99, "avocado.jpg", true, true, false, true, "Fruits"],
    ["Broccoli", 1.29, "broccoli.jpg", true, true, false, true, "Vegetables"],
    ["Shrimp", 9.99, "shrimp.jpg", false, true, true, true, "Seafood"],
    ["Coffee Beans", 6.99, "coffee.jpg", true, true, true, true, "Beverages"],
    ["Milk", 3.79, "milk.jpg", true, true, true, false, "Dairy"]
];


document.addEventListener("DOMContentLoaded", function() {

    let cart_list = document.getElementById("cart-list");

    let total_value = 0;

    for (let item of grocery_items){

        let quantity = localStorage.getItem(item[0]);
        if (quantity == null || quantity == 0){continue;}
        
        // Div element to enclose all aspects of the product
        let item_div = document.createElement("div");

        // Name and price of any specific product
        let product = document.createTextNode(` ${item[0]}, x${quantity} ($${(item[1]*quantity).toFixed(2)})`);
        item_div.appendChild(product);

        //Add the new div element to the Cart List
        cart_list.appendChild(item_div);
        cart_list.appendChild(document.createElement("br"));

        //Increment the total value of the cart
        total_value = total_value + item[1]*quantity;

    }
    
    // After calculating total_value
    let totalCostParagraph = document.getElementById("total-cost");
    if (totalCostParagraph) {
        totalCostParagraph.textContent = `Total Cost: $${total_value.toFixed(2)}`;
    }

    let menuButtons = document.querySelectorAll("#menu2 a");
    menuButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            menuButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Set initial active state based on the current URL
    const currentPage = window.location.pathname.split("/").pop();
    if(currentPage === "cart.html") {
        document.querySelector("#menu2 a[href='cart.html']").classList.add('active');
    } else if(currentPage === "checkout.html") {
        document.querySelector("#menu2 a[href='checkout.html']").classList.add('active');
    }

    let display_total = document.createElement("div");

    display_total.appendChild(document.createTextNode(totalCostParagraph));

});
