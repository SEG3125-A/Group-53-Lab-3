document.addEventListener("DOMContentLoaded", function() {
    let total_cost_element = document.getElementById("total-cost2");
    let total_value = 0;
    //Cycling through grocery_items to see which items have been selected
    for (let item of grocery_items) {
        let quantity = localStorage.getItem(item[0]);
        if (quantity == null || quantity == 0) {continue;}
        total_value = total_value + item[1] * quantity;
    }
    //Displaying the total cost
    total_cost_element.innerText = `Total Cost: $${total_value.toFixed(2)}`;
});
