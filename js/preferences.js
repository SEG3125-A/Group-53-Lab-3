//Executes when DOM Content is loaded
document.addEventListener("DOMContentLoaded", function() {

    function save_preferences() {
        localStorage.setItem("vegetarian", document.getElementById("vegetarian-box").checked);
        localStorage.setItem("glutenFree", document.getElementById("gluten-free-box").checked);
        localStorage.setItem("organic", document.getElementById("organic-box").checked);
        localStorage.setItem("lactoseFree", document.getElementById("lactose-free-box").checked);
    }

    // Add event listeners to every checkbox
    document.getElementById("vegetarian-box").addEventListener("change", save_preferences);
    document.getElementById("gluten-free-box").addEventListener("change", save_preferences);
    document.getElementById("organic-box").addEventListener("change", save_preferences);
    document.getElementById("lactose-free-box").addEventListener("change", save_preferences);
    
    // Restoring previous input
    let vegetarian = localStorage.getItem("vegetarian") === "true";
    let gluten_free = localStorage.getItem("glutenFree") === "true";
    let organic = localStorage.getItem("organic") === "true";
    let lactose_free = localStorage.getItem("lactoseFree") === "true";

    document.getElementById("vegetarian-box").checked = vegetarian;
    document.getElementById("gluten-free-box").checked = gluten_free;
    document.getElementById("organic-box").checked = organic;
    document.getElementById("lactose-free-box").checked = lactose_free;

});