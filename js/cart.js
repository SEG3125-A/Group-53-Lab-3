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


document.addEventListener("DOMContentLoaded", function() {

    let cart_list = document.getElementById("cart-list");

    let total_value = 0;

    for (let item of grocery_items){

        let quantity = localStorage.getItem(item[0]);
        if (quantity == null || quantity == 0){continue;}
        
        // Div element to enclose all aspects of the product
        let item_div = document.createElement("div");

        //Add quantity display
        let quantity_display = document.createElement("a");
        quantity_display.innerText = `${quantity}`;
        quantity_display.style.fontWeight = "bold";
        item_div.appendChild(quantity_display);

        // Name and price of any specific product
        let product = document.createTextNode(` ${item[0]} ($${(item[1]*quantity).toFixed(2)}) `);
        item_div.appendChild(product);

        // Add remove button of each product
        let remove = document.createElement("button");
        remove.innerText = "REMOVE";
        remove.style.fontSize = '10px';
        remove.style.color = '#aa0000';
        remove.style.padding = '10px';
        remove.style.borderRadius = '10px';
        remove.style.border = '10px';
        remove.style.fontWeight = "bold";
        remove.addEventListener("click", function(){localStorage.setItem(item[0],"0");});
        item_div.appendChild(remove);

        //Add the new div element to the Cart List
        cart_list.appendChild(item_div);
        cart_list.appendChild(document.createElement("br"));

        //Increment the total value of the cart
        total_value = total_value + item[1]*quantity;

    }

    // Add total_cost div to the stack of items in cart
    let total_cost_container = document.createElement("div");
    total_cost_container.id = "total-cost-container";
    total_cost_container.innerText = `Total Cost: $${total_value.toFixed(2)}`;
    total_cost_container.style.backgroundColor = "lightgrey";
    total_cost_container.style.padding = "10px";
    cart_list.appendChild(total_cost_container);

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
    display_total.id="display-total";
    display_total.appendChild(document.createTextNode(totalCostParagraph));
    display_total.appendChild(document.createTextNode(`Cart total: $${total_value}`));

});
