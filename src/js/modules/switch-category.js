function switchCategory() {
    let switchBtn = document.querySelector(".slide-button");
    let sliderCategory = document.querySelector(".slider-categories");
    let expensesTab = document.querySelector(".categories__tab_expenses");
    let incomeTab = document.querySelector(".categories__tab_income");

    switchBtn.addEventListener("click", function() {
        switchBtn.classList.toggle("slide-button_active");
        sliderCategory.classList.toggle("slider-categories_active");

        expensesTab.classList.toggle("categories__tab_active");
        incomeTab.classList.toggle("categories__tab_active");
    })
}

export default switchCategory;