const grocery_items = [
    ["Spinach", 2.99, "spinach.jpg", true, true, false, true],
    ["Tofu", 3.49, "tofu.jpg", true, true, true, true],
    ["Quinoa", 4.99, "quinoa.jpg", true, true, true, true],
    ["Almond Milk", 2.79, "almond-milk.jpg", true, true, false, true],
    ["Brown Rice", 1.99, "brown-rice.jpg", true, true, false, true],
    ["Gluten-Free Oats", 3.29, "oats.jpg", true, true, false, true],
    ["Organic Apples", 4.49, "apples.jpg", true, true, true, true],
    ["Organic Spinach", 3.99, "spinach.jpg", true, true, true, true],
    ["Yogurt (Lactose-free)", 2.89, "yogurt.jpg", true, true, false, true],
    ["Cheese (Lactose-free)", 4.19, "cheese.jpg", true, true, false, true],
    ["Chicken Breast", 6.99, "chicken-breast.jpg", false, true, true, true],
    ["Salmon Fillet", 8.49, "salmon.jpg", false, true, true, true],
    ["Eggs", 2.19, "eggs.jpg", true, true, true, true],
    ["White Bread", 3.99, "white-bread.jpg", true, false, false, true],
    ["Avocado", 1.99, "avocado.jpg", true, true, false, true],
    ["Broccoli", 1.29, "broccoli.jpg", true, true, false, true],
    ["Shrimp", 9.99, "shrimp.jpg", false, true, true, true],
    ["Coffee Beans", 6.99, "coffee.jpg", true, true, true, true],
    ["Milk", 3.79, "milk.jpg", true, true, true, false]
];

document.addEventListener("DOMContentLoaded", function() {
    let cart_list = document.getElementById("cart-list");
    let total_value = 0;
    for (let item of grocery_items){
        let quantity = localStorage.getItem(item[0]);
        if (quantity == null || quantity == 0){
            continue;
        }
        
        // Div element to enclose all aspects of the product
        let item_div = document.createElement("div");

        // Name and price of any specific product
        let product = document.createTextNode(` ${item[0]}, x${quantity} ($${(item[1]*quantity).toFixed(2)})`);
        item_div.appendChild(product);

        // Add image of each product
        let img = document.createElement("img");
        img.src = `images/items/${item[2]}`;
        item_div.appendChild(img);

        //Add the new div element to the Cart List
        cart_list.appendChild(item_div);
        cart_list.appendChild(document.createElement("br"));

        //Increment the total value of the cart
        total_value = total_value + item[1]*quantity;
    }
    let display_total = document.createElement("div");
    display_total.appendChild(document.createTextNode(`Cart total: $${total_value}`));
    cart_list.appendChild(display_total);
});