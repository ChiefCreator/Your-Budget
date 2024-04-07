function addCategoryIncome(chartExpenses) {
    let btnAdd = document.querySelector(".add-income");
    let popup = document.querySelector(".popup-category-done_income");
    let properties = {};
    let index = 0;

    togglePopup();

    window.addEventListener("click", function(e) {
        if (localStorage.getItem("categoriesIncome")) {
            index = JSON.parse(localStorage.getItem("categoriesIncome"))[JSON.parse(localStorage.getItem("categoriesIncome")).length - 1].index;
        }

        let category = e.target.closest(".done-income");

        if (e.target.closest(".done-income")) {
            chooseCategory(category)
        }
        if (e.target.closest(".popup-category-done_income .popup-category-done__button")) {
            if (localStorage.getItem("categoriesIncome") && JSON.parse(localStorage.getItem("categoriesIncome")).find(obj => obj.title == properties.title)) {
                return null;
            }
            setItemToList(properties);
            setToStorage(properties);
            chart(JSON.parse(localStorage.getItem("itemCategoriesIncomeSortedByCurrenDate")));
        }
    })

    function chooseCategory(category) {
        let actCategory = document.querySelector(".done-income_act");

        if (actCategory && actCategory != category) {
            actCategory.classList.remove("done-income_act");
        }
        category.classList.toggle("done-income_act");
        properties = JSON.parse(category.dataset.categoryDone);
        index++;
        properties.index = index;
    }

    function setItemToList(objCategory) {
        let blockToPaste = document.querySelector(".list-categories_income");
        let itemCategory = `<div class="list-categories__item item-category item-category_income" data-index="${objCategory.index}">
        <div class="item-category__head">
            <div class="item-category__icon ${objCategory.icon}" style="background-color:${objCategory.bg}"></div>
            <div class="item-category__info">
                <p class="item-category__name">${objCategory.title}</p>
            </div>
            <div class="item-category__total">${objCategory.cost} BYN</div>
        </div>
            </div>`;

        function parser(itemCategory) {
            var parser = new DOMParser();
            let teg = parser.parseFromString(itemCategory, 'text/html');
            let item = teg.querySelector(".item-category");
            return item;
        }
        blockToPaste.append(parser(itemCategory))
    }

    function setToStorage(properties) {
        if (localStorage.getItem("categoriesIncome")) {
            localStorage.setItem("categoriesIncome", JSON.stringify(sortArrayByIndex([...JSON.parse(localStorage.getItem("categoriesIncome")), properties])));
            localStorage.setItem("operationsIncome", JSON.stringify(sortArrayByIndex([...JSON.parse(localStorage.getItem("operationsIncome")), properties])));
            localStorage.setItem("itemCategoriesIncomeSortedByCurrenDate", JSON.stringify(sortArrayByIndex([...JSON.parse(localStorage.getItem("itemCategoriesIncomeSortedByCurrenDate")), properties])));
        } else {
            localStorage.setItem("categoriesIncome", JSON.stringify([properties]));
            localStorage.setItem("operationsIncome", JSON.stringify([properties]));
            localStorage.setItem("itemCategoriesIncomeSortedByCurrenDate", JSON.stringify([properties]));
        }
    }

    function sortArrayByIndex(arr) {
        if (arr.length >= 2) {
            return arr.sort((a, b) => a.index > b.index);
        }

        return arr;
    }

    function chart(arrOfCategories) {
        let titles = [];
        let bgArr = [];
        let costArr = [];
        console.log(titles, bgArr, costArr)
        arrOfCategories.forEach(item => {
            titles.push(item.title);
            bgArr.push(item.bg);

            if (item.cost == 0) {
                costArr.push(1);
            } else {
                costArr.push(item.cost);
            }
        })
        chartExpenses.data.datasets[0].data = costArr;
        chartExpenses.data.datasets[0].backgroundColor = bgArr;
        chartExpenses.update();
    }

    function togglePopup() {
        let overblock = document.querySelector(".overblock");

        btnAdd.addEventListener("click", function() {
            popup.classList.add("popup-category-done_open");
            overblock.classList.add("overblock_open");
        })

        overblock.addEventListener("click", function() {
            popup.classList.remove("popup-category-done_open");
            overblock.classList.remove("overblock_open");
        })
    }
}

export default addCategoryIncome;