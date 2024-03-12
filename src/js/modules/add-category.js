function addCategory() {
    let popupCategory = document.querySelector(".popup-category");
    let overblock = document.querySelector(".overblock");
    let addBtns = document.querySelectorAll(".tools-categories__item_add");
    let closeBtn = document.querySelector(".popup-category__close");
    addBtns.forEach(addBtn => {
        addBtn.addEventListener("click", function() {
            popupCategory.classList.add("popup-category_open");
            overblock.classList.add("overblock_open");
        })
    })

    overblock.addEventListener("click", function() {
        popupCategory.classList.remove("popup-category_open");
        overblock.classList.remove("overblock_open");
    })

    closeBtn.addEventListener("click", function() {
        popupCategory.classList.remove("popup-category_open");
        overblock.classList.remove("overblock_open");
    })
}

export default addCategory;