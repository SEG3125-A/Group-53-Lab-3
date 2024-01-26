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

    function update_local_storage(event) {
        localStorage.setItem(event.target.name, event.target.value);
    }

    function filter_grocery_items(grocery_items) {

        //Extracting the user's preferences
        let vegetarian = localStorage.getItem("vegetarian") === "true";
        let gluten_free = localStorage.getItem("glutenFree") === "true";
        let organic = localStorage.getItem("organic") === "true";
        let lactose_free = localStorage.getItem("lactoseFree") === "true";

        let result = [];

        for (let item of grocery_items) {
            if (vegetarian && !item[3]) {continue;}
            if (gluten_free && !item[4]) {continue;}
            if (organic && !item[5]) {continue;}
            if (lactose_free && !item[6]) {continue;}
            result.push(item);
        }

        return result;
    }

    let filtered_grocery_items = filter_grocery_items(grocery_items);

    //Display the Customer's grocery list
    let grocery_list = document.getElementById("grocery-list");
    for (let item of filtered_grocery_items) {

        // Div element to enclose all aspects of the product
        let item_div = document.createElement("div");

        // Number input for the number of units the customer wants
        let input = document.createElement("input");
        input.type = "number";
        input.name = item[0];

        //Save the value inputted by user for future use
        let stored_value = localStorage.getItem(input.name);
        if (stored_value !== null) {
            input.value = stored_value;
        }
        input.min = 0;
        input.addEventListener('input', update_local_storage);
        item_div.appendChild(input);

        // Name and price of any specific product
        let product = document.createTextNode(` ${item[0]} ($${item[1].toFixed(2)})`);
        item_div.appendChild(product);

        // Add image of each product
        let img = document.createElement("img");
        img.src = `images/items/${item[2]}`;
        item_div.appendChild(img);

        //Add the new div element to the Grocery List
        grocery_list.appendChild(item_div);
        grocery_list.appendChild(document.createElement("br"));
    }
});