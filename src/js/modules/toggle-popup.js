function togglePopup() {
    let popupCategoryExpenses = document.querySelector(".popup-category_expenses");
    let popupCategoryIncome = document.querySelector(".popup-category_income");
    let overblock = document.querySelector(".overblock");
    let addBtnsExpenses = document.querySelectorAll(".add-expenses");
    let addBtnsIncome = document.querySelectorAll(".add-income");
    let closeBtn = document.querySelector(".popup-category__close");
    addBtnsExpenses.forEach(addBtn => {
        addBtn.addEventListener("click", function() {
            popupCategoryExpenses.classList.add("popup-category_open");
            overblock.classList.add("overblock_open");
        })
    })
    addBtnsIncome.forEach(addBtn => {
        addBtn.addEventListener("click", function() {
            popupCategoryIncome.classList.add("popup-category_open");
            overblock.classList.add("overblock_open");
        })
    })

    overblock.addEventListener("click", function() {
        popupCategoryExpenses.classList.remove("popup-category_open");
        popupCategoryIncome.classList.remove("popup-category_open");
        overblock.classList.remove("overblock_open");
    })

    closeBtn.addEventListener("click", function() {
        popupCategoryExpenses.classList.remove("popup-category_open");
        popupCategoryIncome.classList.remove("popup-category_open");
        overblock.classList.remove("overblock_open");
    })
}

export default togglePopup;