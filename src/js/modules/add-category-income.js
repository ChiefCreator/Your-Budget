function addCategoryIncome(chartExpenses, arrOfCategories) {
    let objCategory = {};
    let popupIncome = document.querySelector(".popup-category_income");
    let inpTitle = popupIncome.querySelector(".popup-category__input");
    let inpBg = popupIncome.querySelector(".popup-category__inp-bg");
    let inpColor = popupIncome.querySelector(".popup-category__inp-color");
    
    let icons = popupIncome.querySelectorAll(".popup-category__icon");

    if (localStorage.getItem("categoriesIncome")) {
        arrOfCategories = JSON.parse(localStorage.getItem("categoriesIncome"));

        let blockToPaste = document.querySelector(".list-categories_income");
        for (let i = 0;i < JSON.parse(localStorage.getItem("categoriesIncome")).length;i++) {
            let itemCategory = `<div class="list-categories__item item-category item-category_income" data-index="${JSON.parse(localStorage.getItem("categoriesIncome"))[i].index}">
                        <div class="item-category__icon ${JSON.parse(localStorage.getItem("categoriesIncome"))[i].icon}" style="background-color:${JSON.parse(localStorage.getItem("categoriesIncome"))[i].bg}"></div>
                        <div class="item-category__info">
                            <p class="item-category__name">${JSON.parse(localStorage.getItem("categoriesIncome"))[i].title}</p>
                        </div>
                        <div class="item-category__total">0 BYN</div>
                        </div>`;
        function parser(itemCategory) {
            var parser = new DOMParser();
            let teg = parser.parseFromString(itemCategory, 'text/html');
            let item = teg.querySelector(".item-category");
            return item;
        }
        blockToPaste.append(parser(itemCategory))
        }
    }

    icons.forEach(icon => {
        icon.style.backgroundColor = inpBg.value;
        icon.style.color = inpColor.value; 
    })
    icons.forEach(icon => {
        icon.addEventListener("click", function() {
            document.querySelectorAll(".popup-category__icon").forEach(icon => {
                icon.style.backgroundColor = "#808080";
                icon.style.color = "white"; 
                icon.classList.remove("act");
                icon.style.border = `2px solid gray`;
            })
            icon.classList.add("act");

            icon.style.border = `2px solid ${changeColor(inpBg, inpColor, icon)[0]}`;
            icon.style.backgroundColor = changeColor(inpBg, inpColor, icon)[0]; 
            icon.style.color = changeColor(inpBg, inpColor, icon)[1]; 

            objCategory.icon = icon.dataset.categoryIcon;
        })
    })

    function changeColor(inpBg, inpColor, icon) {
        let bg = inpBg.value;
        let color = inpColor.value;
        inpBg.addEventListener("input", function() {
            bg = inpBg.value;

            if (icon.classList.contains("act")) {
                icon.style.backgroundColor = bg;
                icon.style.border = `2px solid ${bg}`;
            }
        })
        inpColor.addEventListener("input", function() {
            color = inpColor.value;

            if (icon.classList.contains("act")) {
                icon.style.color = color;
            }
        })
        return [bg, color]
    }

    function setValueToObject(obj, index) {
        obj.index = index;
        obj.title = inpTitle.value;
        obj.bg = inpBg.value;
        obj.color = inpColor.value;
        obj.cost = 0;
        return obj;
    }

    let btnCreate = popupIncome.querySelector(".popup-category__button");
    let popupCategory = document.querySelector(".popup-category_income");
    let overblock = document.querySelector(".overblock");
    let index = 0;

    btnCreate.addEventListener("click", function() {

        if (validation(objCategory)) {
            index++;

            if (localStorage.getItem("categoriesIncome")) {
                console.log(localStorage.getItem("categoriesIncome"))
                index = JSON.parse(localStorage.getItem("categoriesIncome"))[JSON.parse(localStorage.getItem("categoriesIncome")).length - 1].index;
                index++;
            }
            setValueToObject(objCategory, index);

            setItemToList();

            popupCategory.classList.remove("popup-category_open");
            overblock.classList.remove("overblock_open");

            if (localStorage.getItem("operationsIncome")) {
                arrOfCategories = JSON.parse(localStorage.getItem("operationsIncome"))
                arrOfCategories.push(Object.assign({}, objCategory)) 
            } else {
                arrOfCategories.push(Object.assign({}, objCategory)) 
            }
            localStorage.setItem("categoriesIncome", JSON.stringify(arrOfCategories));
            localStorage.setItem("operationsIncome", JSON.stringify(arrOfCategories));

            // в operation кидать только категории при создании, не изменять cost
            let mergedArray = [];
            
            if (localStorage.getItem("itemOperationIncomeSortedByCurrenDate")) {
                mergedArray = [...JSON.parse(localStorage.getItem("operationsIncome")), ...JSON.parse(localStorage.getItem("itemOperationIncomeSortedByCurrenDate"))];
            } else {
                mergedArray = [...JSON.parse(localStorage.getItem("operationsIncome"))];
            }

            const grouped = mergedArray.reduce((acc, item) => {
                const key = item.title;
                if (!acc[key]) {
                    acc[key] = {...item};
                } else {
                    acc[key].cost += item.cost;
                }
                return acc;
            }, {});
        
        const res = Object.values(grouped);
        localStorage.setItem("itemCategoriesIncomeSortedByCurrenDate", JSON.stringify(res))

            chart(res);

            setTimeout(function() {
                resetValues(objCategory);
            }, 0)
        }
    })

    function resetValues(objCategory) {
        delete objCategory.icon;

        inpTitle.value = "";
        inpBg.value = "#808080";
        inpColor.value = "#FFFFFF";

        popupIncome.querySelector(".popup-category__icon.act").style.backgroundColor = "#808080";
        popupIncome.querySelector(".popup-category__icon.act").style.color = "white"; 
        popupIncome.querySelector(".popup-category__icon.act").style.border = `2px solid gray`;
        popupIncome.querySelector(".popup-category__icon.act").classList.remove("act");
    }

    function validation(objCategory) {
        let isError = true;
        if (objCategory.title == "") {
            isError = false;
        }
        if (!objCategory.icon) {
            isError = false;
        }
        console.log(isError)
        return isError;
    }

    function setItemToList() {
        let blockToPaste = document.querySelector(".list-categories_income");
        console.log(blockToPaste)
        let itemCategory = `<div class="list-categories__item item-category item-category_income" data-index="${objCategory.index}">
                        <div class="item-category__icon ${objCategory.icon}" style="background-color:${objCategory.bg}"></div>
                        <div class="item-category__info">
                            <p class="item-category__name">${objCategory.title}</p>
                        </div>
                        <div class="item-category__total">0 BYN</div>
                        </div>`;
        function parser(itemCategory) {
            var parser = new DOMParser();
            let teg = parser.parseFromString(itemCategory, 'text/html');
            let item = teg.querySelector(".item-category");
            return item;
        }
        blockToPaste.append(parser(itemCategory))
    }

    function chart(arrOfCategories) {
        let titles = [];
        let bgArr = [];
        let costArr = [];
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
}

export default addCategoryIncome;