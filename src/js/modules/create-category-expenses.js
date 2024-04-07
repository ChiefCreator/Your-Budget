function createCategoryExpenses(chartExpenses, arrOfCategories) {
    let objCategory = {};
    let inpTitle = document.querySelector(".popup-category__input");
    let inpBg = document.querySelector(".input-color__input_bg");
    let wrapperInpBg = inpBg.parentElement;
    let inpColor = document.querySelector(".input-color__input_color");
    let wrapperInpColor = inpColor.parentElement;
    let icons = document.querySelectorAll(".popup-category__icon");

    if (localStorage.getItem("categories")) {
        arrOfCategories = sortArrayByIndex(JSON.parse(localStorage.getItem("categories")));

        let blockToPaste = document.querySelector(".categories__list");
        for (let i = 0;i < JSON.parse(localStorage.getItem("categories")).length;i++) {
            let itemCategory = `<div class="list-categories__item item-category item-category_expenses" data-index="${JSON.parse(localStorage.getItem("categories"))[i].index}">
            <div class="item-category__head">
                <div class="item-category__icon ${JSON.parse(localStorage.getItem("categories"))[i].icon}" style="background-color:${JSON.parse(localStorage.getItem("categories"))[i].bg}"></div>
                <div class="item-category__info">
                    <p class="item-category__name">${JSON.parse(localStorage.getItem("categories"))[i].title}</p>
                </div>
                <div class="item-category__total">${JSON.parse(localStorage.getItem("categories"))[i].cost} BYN</div>
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
    }

    function changeColor() {

        icons.forEach(icon => {
            icon.style.backgroundColor = inpBg.value;
            icon.style.color = inpColor.value; 
    
            wrapperInpBg.style.backgroundColor = inpBg.value;
            wrapperInpColor.style.backgroundColor = inpColor.value; 
        })

        icons.forEach(icon => {
            icon.addEventListener("click", function() {
                document.querySelectorAll(".popup-category__icon").forEach(icon => {
                    icon.style.backgroundColor = "#102A49";
                    icon.style.color = "white"; 
                    icon.classList.remove("act");
                })
                icon.classList.add("act");
    
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
    
        wrapperInpColor.style.border = `2px solid #eef0f4`;
        wrapperInpBg.style.border = `2px solid ${inpBg.value}`;
    
        function changeBgOFInputs() {
            inpBg.addEventListener("input", function() {
                wrapperInpBg.style.backgroundColor = inpBg.value;
    
                if (inpBg.value == "#ffffff") {
                    wrapperInpBg.style.border = `2px solid #eef0f4`;
                } else {
                    wrapperInpBg.style.border = `2px solid ${inpBg.value}`;
                }
            })
    
            inpColor.addEventListener("input", function() {
                wrapperInpColor.style.backgroundColor = inpColor.value;
            
                if (inpColor.value == "#ffffff") {
                    wrapperInpColor.style.border = `2px solid #eef0f4`;
                } else {
                    wrapperInpColor.style.border = `2px solid ${inpColor.value}`;
                }
            
            })
        }
        changeBgOFInputs();
    }
    changeColor();

    function setValueToObject(obj, index) {
        obj.index = index;
        obj.title = inpTitle.value;
        obj.bg = inpBg.value;
        obj.color = inpColor.value;
        obj.cost = 0;
        return obj;
    }

    let btnCreate = document.querySelector(".popup-category__button");
    let popupCategory = document.querySelector(".popup-category");
    let overblock = document.querySelector(".overblock");
    let index = 0;

    btnCreate.addEventListener("click", function() {

        if (validation(objCategory)) {
            index++;

            if (localStorage.getItem("categories")) {
                console.log(localStorage.getItem("categories"))
                index = JSON.parse(localStorage.getItem("categories"))[JSON.parse(localStorage.getItem("categories")).length - 1].index;
                index++;
            }
            setValueToObject(objCategory, index);

            setItemToList();

            popupCategory.classList.remove("popup-category_open");
            overblock.classList.remove("overblock_open");

            if (localStorage.getItem("operations")) {
                arrOfCategories = JSON.parse(localStorage.getItem("operations"))
                arrOfCategories.push(Object.assign({}, objCategory)) 
            } else {
                arrOfCategories.push(Object.assign({}, objCategory)) 
            }
            localStorage.setItem("categories", JSON.stringify(arrOfCategories));
            localStorage.setItem("operations", JSON.stringify(arrOfCategories));

            // в operation кидать только категории при создании, не изменять cost
            let mergedArray = [];
            
            if (localStorage.getItem("itemOperationExpensesSortedByCurrenDate")) {
                mergedArray = [...JSON.parse(localStorage.getItem("operations")), ...JSON.parse(localStorage.getItem("itemOperationExpensesSortedByCurrenDate"))];
            } else {
                mergedArray = [...JSON.parse(localStorage.getItem("operations"))];
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
        localStorage.setItem("itemCategoriesExpensesSortedByCurrenDate", JSON.stringify(res))

            chart(res);

            setTimeout(function() {
                resetValues(objCategory);
            }, 0)
        }
    })

    function resetValues(objCategory) {
        delete objCategory.icon;

        inpTitle.value = "";
        inpBg.value = "#102A49";
        inpColor.value = "#FFFFFF";

        document.querySelector(".popup-category__icon.act").style.backgroundColor = "#102A49";
        document.querySelector(".popup-category__icon.act").style.color = "white"; 
        document.querySelector(".popup-category__icon.act").classList.remove("act");
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
        let blockToPaste = document.querySelector(".categories__list");
        let itemCategory = `<div class="list-categories__item item-category item-category_expenses" data-index="${objCategory.index}">
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

    function sortArrayByIndex(arr) {
        if (arr.length >= 2) {
            return arr.sort((a, b) => a.index > b.index);
        }

        return arr;
    }
}

export default createCategoryExpenses;