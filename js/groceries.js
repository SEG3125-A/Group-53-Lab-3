const grocery_items = [
    ["Spinach", 2.99, "spinach.jpg", true, true, false, true, "Produce"],
    ["Tofu", 3.49, "tofu.jpg", true, true, false, true, "Protein"],
    ["Quinoa", 4.99, "quinoa.png", true, true, true, true, "Grain"],
    ["Almond Milk", 2.79, "almond-milk.jpg", true, true, false, true, "Beverages"],
    ["Brown Rice", 1.99, "brown-rice.jpg", true, true, false, true, "Grain"],
    ["Gluten-Free Oats", 3.29, "oats.jpg", true, true, false, true, "Grain"],
    ["Organic Gala Apples", 4.99, "apples.jpg", true, true, true, true, "Produce"],
    ["Gala Apples", 4.49, "apples.jpg", true, true, false, true, "Produce"],
    ["Organic Spinach", 3.99, "spinach.jpg", true, true, true, true, "Produce"],
    ["Yogurt (Lactose-free)", 2.89, "yogurt.jpg", true, true, false, true, "Dairy"],
    ["Yogurt", 2.89, "yogurt.jpg", true, true, false, false, "Dairy"],
    ["Cheese (Lactose-free)", 4.99, "cheese.jpg", true, true, false, true, "Dairy"],
    ["Swiss Cheese", 4.19, "cheese.jpg", true, true, false, false, "Dairy"],
    ["Blue Cheese", 5.79, "blue-cheese.png", true, true, false, false, "Dairy"],
    ["Chicken Breast", 6.99, "chicken-breast.png", false, true, true, true, "Protein"],
    ["Salmon Fillet", 8.49, "salmon.jpg", false, true, true, true, "Protein"],
    ["Eggs", 2.19, "eggs.jpg", true, true, true, true, "Dairy"],
    ["White Bread", 3.99, "white-bread.jpg", true, false, false, true, "Grain"],
    ["Avocado", 1.99, "avocado.jpg", true, true, false, true, "Produce"],
    ["Broccoli", 1.29, "broccoli.jpg", true, true, false, true, "Produce"],
    ["Shrimp", 9.99, "shrimp.jpg", false, true, true, true, "Protein"],
    ["Coffee Beans", 6.99, "coffee.jpg", true, true, true, true, "Beverages"],
    ["Milk", 3.79, "milk.jpg", true, true, true, false, "Dairy"],
    ["Raisin Bread", 4.99, "raisin-bread.jpg", true, false, false, true, "Grain"],
    ["Ground Beef", 8.99, "ground-beef.jpg", false, true, false, true, "Protein"],
    ["Ground Chicken",8.49,"ground-chicken.jpg",false,true,false,true, "Protein"],
    ["Butter tarts", 5.89,"butter-tart.png",true,false,false,false, "Grain"],
    ["Organic Strawberries",5.97,"strawberries.jpg",true, true, true, true, "Produce"],
    ["Pineapple", 4.99,"pineapple.jpg", true, true, false, true, "Produce"],
    ["Organic Cauliflower", 3.39,"cauliflower.jpg",true,true,true,true,"Produce"],
    ["Soda",1.99,"soda.jpg",true,true,false,true,"Beverages"],
    ["Organic White Sugar",3.99,"sugar.png",true,true,true,true,"Grain"]

];

//Variables for the temporary filter-by-category buttons
var filter_produce = false; 
var filter_dairy = false;
var filter_protein = false;
var filter_beverages = false;
var filter_grain = false;

function updateAndReload(){
    let element = document.getElementById('search-input');
    search_criteria = element.value.toLowerCase();
    localStorage.setItem("search-criteria",search_criteria);
    location.reload();
}

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
        let search_criteria = localStorage.getItem("search-criteria");
        if (!search_criteria){
            search_criteria = "";
        }

        let vegetarian = localStorage.getItem("vegetarian") === "true";
        let gluten_free = localStorage.getItem("glutenFree") === "true";
        let organic = localStorage.getItem("organic") === "true";
        let lactose_free = localStorage.getItem("lactoseFree") === "true";

        let result = grocery_items.filter(item => {
            if (vegetarian && !item[3]) return false;
            if (gluten_free && !item[4]) return false;
            if (organic && !item[5]) return false;
            if (lactose_free && !item[6]) return false;
            if (filter_produce && item[7] != "Produce") return false;
            if (filter_dairy && item[7] != "Dairy") return false;
            if (filter_protein && item[7] != "Protein") return false;
            if (filter_beverages && item[7] != "Beverages") return false;
            if (filter_grain && item[7] != "Grain") return false;
            if (!(item[0].toLowerCase()).includes(search_criteria)) {return false;}
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

    // Add event listeners to filter-by-category buttons
    document.getElementById("produce").addEventListener("click", function(){
        filter_produce = !filter_produce;
        displayFilteredItems();
    });
    document.getElementById("dairy").addEventListener("click", function(){
        filter_dairy = !filter_dairy;
        displayFilteredItems();
    });
    document.getElementById("protein").addEventListener("click", function(){
        filter_protein = !filter_protein;
        displayFilteredItems();
    });
    document.getElementById("beverages").addEventListener("click", function(){
        filter_beverages = !filter_beverages;
        displayFilteredItems();
    });
    document.getElementById("grain").addEventListener("click", function(){
        filter_grain = !filter_grain;
        displayFilteredItems();
    });

    // Add event listeners to the Price filter settings
    document.getElementById("price-filter").addEventListener("change", displayFilteredItems);
    document.getElementById("price-range").addEventListener("input", function(event) {
        document.getElementById("price-range-value").textContent = `$${event.target.value}`;
        displayFilteredItems();
    });

    //Re-display the filtering by: icon
    let search_criteria = localStorage.getItem("search-criteria");
    if (!search_criteria){
        search_criteria = "";
    }
    document.getElementById('searching-for').innerText = "Searching for: " + search_criteria;

});
