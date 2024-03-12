function chooseIcon(chartExpenses) {
    let objCategory = {};
    let arrOfCategories = [];
    let inpTitle = document.querySelector(".popup-category__input");
    let inpBg = document.querySelector(".popup-category__inp-bg");
    let inpColor = document.querySelector(".popup-category__inp-color");
    
    let icons = document.querySelectorAll(".popup-category__icon");

    if (localStorage.getItem("categories")) {
        arrOfCategories = JSON.parse(localStorage.getItem("categories"));

        let blockToPaste = document.querySelector(".categories__list");
        for (let i = 0;i < JSON.parse(localStorage.getItem("categories")).length;i++) {
            console.log(i)
            let itemCategory = `<div class="list-categories__item">
                        <div class="list-categories__icon ${JSON.parse(localStorage.getItem("categories"))[i].icon}" style="background-color:${JSON.parse(localStorage.getItem("categories"))[i].bg}"></div>
                        <div class="list-categories__info">
                            <p class="list-categories__name">${JSON.parse(localStorage.getItem("categories"))[i].title}</p>
                        </div>
                        <div class="list-categories__total">0 BYN</div>
                        </div>`;
        function parser(itemCategory) {
            var parser = new DOMParser();
            let teg = parser.parseFromString(itemCategory, 'text/html');
            let item = teg.querySelector(".list-categories__item");
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
        obj.cost = 1;
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

            arrOfCategories.push(Object.assign({}, objCategory)) 
            localStorage.setItem("categories", JSON.stringify(arrOfCategories));

            chart(arrOfCategories);

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

        document.querySelector(".popup-category__icon.act").style.backgroundColor = "#808080";
        document.querySelector(".popup-category__icon.act").style.color = "white"; 
        document.querySelector(".popup-category__icon.act").style.border = `2px solid gray`;
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
        let itemCategory = `<div class="list-categories__item">
                        <div class="list-categories__icon ${objCategory.icon}" style="background-color:${objCategory.bg}"></div>
                        <div class="list-categories__info">
                            <p class="list-categories__name">${objCategory.title}</p>
                        </div>
                        <div class="list-categories__total">0 BYN</div>
                        </div>`;
        function parser(itemCategory) {
            var parser = new DOMParser();
            let teg = parser.parseFromString(itemCategory, 'text/html');
            let item = teg.querySelector(".list-categories__item");
            return item;
        }
        blockToPaste.append(parser(itemCategory))
    }

    function chart(arrOfCategories) {
        let bgArr = [];
        let costArr = []
        arrOfCategories.forEach(item => {
            bgArr.push(item.bg);
            costArr.push(item.cost);
        })
        chartExpenses.data.datasets[0].data = [...costArr];
        chartExpenses.data.datasets[0].backgroundColor = [...bgArr];
        chartExpenses.update();
    }
}

export default chooseIcon;