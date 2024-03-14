function addOperationIncome(chartExpenses) {
    let popupOperation = document.querySelector(".popup-operation_income");
    let overblock = document.querySelector(".overblock");
    let btnCreate = popupOperation.querySelector(".popup-operation__button");
    let inputCost = popupOperation.querySelector(".popup-operation__input");
    let closeBtn = popupOperation.querySelector(".popup-operation__close");

    if (localStorage.getItem("operationsIncome")) {
        let total = 0;
        document.querySelectorAll(".list-categories_income .list-categories__item").forEach((category, i) => {

            category.querySelector(".item-category__total").textContent = `${JSON.parse(localStorage.getItem("operationsIncome"))[i].cost} BYN`;
            total += JSON.parse(localStorage.getItem("operationsIncome"))[i].cost;
            document.querySelector(".slider-categories__item_income .slider-categories__total-num").textContent = total;
        })
    }

    window.addEventListener("click", function(e) {
        if (e.target.closest(".list-categories_income .list-categories__item")) {
            document.querySelectorAll(".list-categories_income .list-categories__item").forEach(cat => {
                cat.classList.remove("act");
            })

            let category = e.target.closest(".list-categories_income .list-categories__item");
            category.classList.add("act");

            addPopup();

            addCategoryToPopup(category);
        }
    })

    btnCreate.addEventListener("click", function() {
        let total = 0;
        
        let operationsStorage = JSON.parse(localStorage.getItem("operationsIncome"));

        let category = document.querySelector(".list-categories_income .list-categories__item.act")
        let objectCategory = operationsStorage[category.dataset.index - 1];
        let priceOfOperation = +inputCost.value;
            
        objectCategory.cost += priceOfOperation;

        let costArr = [];
        operationsStorage.forEach(item => {
            costArr.push(item.cost);
        })

        operationsStorage[category.dataset.index - 1] = objectCategory;
        localStorage.setItem("operationsIncome", JSON.stringify(operationsStorage));
        localStorage.setItem("categoriesIncome", JSON.stringify(operationsStorage));

        category.querySelector(".item-category__total").textContent = `${operationsStorage[category.dataset.index - 1].cost} BYN`;
        
        document.querySelectorAll(".list-categories_income .list-categories__item").forEach((category, i) => {
            total += JSON.parse(localStorage.getItem("operationsIncome"))[i].cost;
        })
        document.querySelector(".slider-categories__item_income .slider-categories__total-num").textContent = total;

        chartExpenses.data.datasets[0].data = costArr;
        chartExpenses.update();
        closePopup();
    })

    overblock.addEventListener("click", function() {
        closePopup();
    })

    closeBtn.addEventListener("click", function() {
        closePopup();
    })

    function addPopup() {
        popupOperation.classList.add("popup-operation_open");
        overblock.classList.add("overblock_open");
    }

    function closePopup() {
        popupOperation.classList.remove("popup-operation_open");
        overblock.classList.remove("overblock_open");

        inputCost.value = "";
    }

    function addCategoryToPopup(category) {
        let indexCategory = category.dataset.index;

        document.querySelectorAll(".popup-operation_income .item-category").forEach(category => {
            category.style.display = "none";
        })

        let blockToPaste = document.querySelector(".popup-operation_income .list-categories");
        let itemCategory = `<div class="item-category item-category_income" data-index="${JSON.parse(localStorage.getItem("operationsIncome"))[indexCategory - 1].index}">
                    <div class="item-category__icon ${JSON.parse(localStorage.getItem("operationsIncome"))[indexCategory - 1].icon}" style="background-color:${JSON.parse(localStorage.getItem("operationsIncome"))[indexCategory - 1].bg}"></div>
                    <div class="item-category__info">
                        <p class="item-category__name">${JSON.parse(localStorage.getItem("operationsIncome"))[indexCategory - 1].title}</p>
                    </div>
                    <div class="item-category__total">${JSON.parse(localStorage.getItem("operationsIncome"))[indexCategory - 1].cost} BYN</div>
                    </div>`;
        function parser(itemCategory) {
            var parser = new DOMParser();
            let teg = parser.parseFromString(itemCategory, 'text/html');
            let item = teg.querySelector(".item-category");
            return item;
        }

        blockToPaste.append(parser(itemCategory));
    }
}

export default addOperationIncome;
