const grocery_items = [
    ["Spinach", 2.99, "spinach.jpg", true, true, false, true, "Vegetables"],
    ["Tofu", 3.49, "tofu.jpg", true, true, false, true, "Protein"],
    ["Quinoa", 4.99, "quinoa.png", true, true, true, true, "Grains"],
    ["Almond Milk", 2.79, "almond-milk.jpg", true, true, false, true, "Beverages"],
    ["Brown Rice", 1.99, "brown-rice.jpg", true, true, false, true, "Grains"],
    ["Gluten-Free Oats", 3.29, "oats.jpg", true, true, false, true, "Grains"],
    ["Organic Gala Apples", 4.99, "apples.jpg", true, true, true, true, "Fruits"],
    ["Gala Apples", 4.49, "apples.jpg", true, true, false, true, "Fruits"],
    ["Organic Spinach", 3.99, "spinach.jpg", true, true, true, true, "Vegetables"],
    ["Yogurt (Lactose-free)", 2.89, "yogurt.jpg", true, true, false, true, "Dairy"],
    ["Yogurt", 2.89, "yogurt.jpg", true, true, false, false, "Dairy"],
    ["Cheese (Lactose-free)", 4.99, "cheese.jpg", true, true, false, true, "Dairy"],
    ["Swiss Cheese", 4.19, "cheese.jpg", true, true, false, false, "Dairy"],
    ["Blue Cheese", 5.79, "blue-cheese.png", true, true, false, false, "Dairy"],
    ["Chicken Breast", 6.99, "chicken-breast.jpg", false, true, true, true, "Meat"],
    ["Salmon Fillet", 8.49, "salmon.jpg", false, true, true, true, "Seafood"],
    ["Eggs", 2.19, "eggs.jpg", true, true, true, true, "Dairy"],
    ["White Bread", 3.99, "white-bread.jpg", true, false, false, true, "Bakery"],
    ["Avocado", 1.99, "avocado.jpg", true, true, false, true, "Fruits"],
    ["Broccoli", 1.29, "broccoli.jpg", true, true, false, true, "Vegetables"],
    ["Shrimp", 9.99, "shrimp.jpg", false, true, true, true, "Seafood"],
    ["Coffee Beans", 6.99, "coffee.jpg", true, true, true, true, "Beverages"],
    ["Milk", 3.79, "milk.jpg", true, true, true, false, "Dairy"],
    ["Raisin Bread", 4.99, "raisin-bread.jpg", true, false, false, true, "Bakery"],
    ["Ground Beef", 8.99, "ground-beef.jpg", false, true, false, true, "Protein"],
    ["Ground Chicken",8.49,"ground-chicken.jpg",false,true,false,true, "Protein"],
    ["Butter tarts", 5.89,"butter-tart.png",true,false,false,false, "Bakery"],
    ["Organic Strawberries",5.97,"strawberries.jpg",true, true, true, true, "Fruits"],
    ["Pineapple", 4.99,"pineapple.jpg", true, true, false, true, "Fruits"],
    ["Organic Cauliflower", 3.39,"cauliflower.jpg",true,true,true,true,"Vegetables"]
];

document.addEventListener("DOMContentLoaded", function() {
    // This function updates the localStorage with the new preference value
    function save_preferences() {
        localStorage.setItem("vegetarian", document.getElementById("vegetarian-box").checked);
        localStorage.setItem("glutenFree", document.getElementById("gluten-free-box").checked);
        localStorage.setItem("organic", document.getElementById("organic-box").checked);
        localStorage.setItem("lactoseFree", document.getElementById("lactose-free-box").checked);
        displayFilteredItems(); // Update the display whenever preferences are saved
    }

    // This function filters the grocery items based on the user's preferences
    function filter_grocery_items() {
        let vegetarian = localStorage.getItem("vegetarian") === "true";
        let gluten_free = localStorage.getItem("glutenFree") === "true";
        let organic = localStorage.getItem("organic") === "true";
        let lactose_free = localStorage.getItem("lactoseFree") === "true";

        let result = grocery_items.filter(item => {
            if (vegetarian && !item[3]) return false;
            if (gluten_free && !item[4]) return false;
            if (organic && !item[5]) return false;
            if (lactose_free && !item[6]) return false;
            return true;
        });

        return result;
    }

    // This function displays the filtered grocery items on the page
    function displayFilteredItems() {
        let filtered_grocery_items = filter_grocery_items();

        const sortType = document.getElementById("price-filter").value;
        if (sortType === "lower-to-higher") {
            filtered_grocery_items.sort((a, b) => a[1] - b[1]);
        } else if (sortType === "higher-to-lower") {
            filtered_grocery_items.sort((a, b) => b[1] - a[1]);
        }
    
        const maxPrice = parseFloat(document.getElementById("price-range").value);
        filtered_grocery_items = filtered_grocery_items.filter(item => item[1] <= maxPrice);
    
        let grocery_list = document.getElementById("grocery-list");
        grocery_list.innerHTML = ''; 

        for (let item of filtered_grocery_items) {
            let item_div = document.createElement("div");
            let img = document.createElement("img");
            img.src = `images/items/${item[2]}`;
            img.alt = item[0];
            item_div.appendChild(img);

            let productSpan = document.createElement("span");
            productSpan.className = 'product-name';
            productSpan.textContent = ` ${item[0]} ($${item[1].toFixed(2)})`;
            item_div.appendChild(productSpan);
            
        
            let quantity = localStorage.getItem(item[0]) || 0;
            if (quantity > 0) {
            
                createQuantityControls(item_div, item, quantity);
            } else {
                let addToCartBtn = document.createElement("button");
                addToCartBtn.className = 'add-to-cart-btn';
                addToCartBtn.textContent = `Add to Cart `;
                item_div.appendChild(addToCartBtn);
        
                addToCartBtn.addEventListener('click', function() {
                    localStorage.setItem(item[0], 1); 
                    createQuantityControls(item_div, item, 1); 
                    addToCartBtn.remove();
                });
                
            }
        
            grocery_list.appendChild(item_div);
        }
        
        function createQuantityControls(container, item, initialQuantity) {
            let decrementBtn = document.createElement("button");
            decrementBtn.textContent = '-';
            let incrementBtn = document.createElement("button");
            incrementBtn.textContent = '+';
            let quantityDisplay = document.createElement("span");
            quantityDisplay.textContent = initialQuantity;

            decrementBtn.className = 'quantity-btn';
            incrementBtn.className = 'quantity-btn';
            quantityDisplay.className = 'quantity-display';

            decrementBtn.addEventListener('click', function() {
                updateQuantity(item[0], quantityDisplay, -1);
            });
        
            incrementBtn.addEventListener('click', function() {
                updateQuantity(item[0], quantityDisplay, 1);
            });
        
            container.appendChild(decrementBtn);
            container.appendChild(quantityDisplay);
            container.appendChild(incrementBtn);
        }
        
        function updateQuantity(itemName, displayElement, change) {
            let currentQuantity = parseInt(localStorage.getItem(itemName) || 0);
            let newQuantity = currentQuantity + change;
            if (newQuantity >= 0) {
                localStorage.setItem(itemName, newQuantity);
                displayElement.textContent = newQuantity;
                displayFilteredItems();
            }
        }

            filtered_grocery_items = filtered_grocery_items.filter(item => item[1] <= maxPrice);
    }

    // Attach the save_preferences function to the change event of checkboxes
    document.getElementById("vegetarian-box").addEventListener("change", save_preferences);
    document.getElementById("gluten-free-box").addEventListener("change", save_preferences);
    document.getElementById("organic-box").addEventListener("change", save_preferences);
    document.getElementById("lactose-free-box").addEventListener("change", save_preferences);

    // Set the initial state of checkboxes based on stored preferences
    document.getElementById("vegetarian-box").checked = localStorage.getItem("vegetarian") === "true";
    document.getElementById("gluten-free-box").checked = localStorage.getItem("glutenFree") === "true";
    document.getElementById("organic-box").checked = localStorage.getItem("organic") === "true";
    document.getElementById("lactose-free-box").checked = localStorage.getItem("lactoseFree") === "true";

    // Display the filtered grocery items when the page is initially loaded
    displayFilteredItems();

    document.getElementById("price-filter").addEventListener("change", displayFilteredItems);
    document.getElementById("price-range").addEventListener("input", function(event) {
    document.getElementById("price-range-value").textContent = `$${event.target.value}`;
    displayFilteredItems();
});

});
