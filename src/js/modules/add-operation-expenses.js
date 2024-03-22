function addOperationExpenses(chartExpenses, objOperationsDate, arrDate, chartExpensesAndIncome, operationsDateAll) {
    let popupOperation = document.querySelector(".popup-operation_expenses");
    let overblock = document.querySelector(".overblock");
    let btnCreate = popupOperation.querySelector(".popup-operation__button");
    let inputCost = popupOperation.querySelector(".popup-operation__input");
    let inputDate = popupOperation.querySelector("#date-operation-expenses");
    let textarreaComment = popupOperation.querySelector(".popup-operation__textarrea");
    let closeBtn = popupOperation.querySelector(".popup-operation__close");
    let more = document.querySelector(".operation-list__more_expenses");

    if (localStorage.getItem("operations")) {
        let total = 0;
        document.querySelectorAll(".list-categories_expenses .list-categories__item").forEach((category, i) => {

            category.querySelector(".item-category__total").textContent = `${JSON.parse(localStorage.getItem("operations"))[i].cost} BYN`;
            total += JSON.parse(localStorage.getItem("operations"))[i].cost;
            document.querySelector(".slider-categories__total-num").textContent = total;
        })
    }

    if (localStorage.getItem("operationsExpensesDate")) {
        let blockToPaste = document.querySelector(".operation-list__item_expenses");

        if (JSON.parse(localStorage.getItem("itemOperationExpenses")).length < 3) {
            for (let [key, value] of Object.entries(JSON.parse(localStorage.getItem("operationsExpensesDate")))) {

                let block = `<div class="list-operation__wrapper" data-dat="expenses${key}">
                        <p class="list-operation__date">${key}</p>
                    </div>`;
                function parserBlockToPaste(block) {
                    var parser = new DOMParser();
                    let teg = parser.parseFromString(block, 'text/html');
                    let item = teg.querySelector(".list-operation__wrapper");
                    return item;
                }
                blockToPaste.append(parserBlockToPaste(block));
                for (let i = 0;i < value.length;i++) {
    
                    let itemCategory = `<div class="list-category__item item-category">
                    <div class="item-category__icon ${value[i].icon}" style="background-color:${value[i].bg}"></div>
                    <div class="item-category__info">
                        <p class="item-category__name">${value[i].title}</p>
                    </div>
                    <div class="item-category__total">${value[i].cost} BYN</div>
                    </div>`;
        
                    function parser(itemCategory) {
                        var parser = new DOMParser();
                        let teg = parser.parseFromString(itemCategory, 'text/html');
                        let item = teg.querySelector(".item-category");
                        return item;
                    }
                    document.querySelector(`[data-dat="expenses${key}"]`).append(parser(itemCategory))
                }
            } 
            more.classList.remove("operation-list__more_act")
        } else {
            let count = 0;
            for (let [key, value] of Object.entries(JSON.parse(localStorage.getItem("operationsExpensesDate")))) {

                let block = `<div class="list-operation__wrapper" data-dat="expenses${key}">
                        <p class="list-operation__date">${key}</p>
                    </div>`;
                function parserBlockToPaste(block) {
                    var parser = new DOMParser();
                    let teg = parser.parseFromString(block, 'text/html');
                    let item = teg.querySelector(".list-operation__wrapper");
                    return item;
                }
                if (count < 3) {
                    blockToPaste.append(parserBlockToPaste(block));
                }
                
                for (let i = 0;i < value.length;i++) {
                    if (count < 3) {
                        count++;

                        let itemCategory = `<div class="list-category__item item-category">
                        <div class="item-category__icon ${value[i].icon}" style="background-color:${value[i].bg}"></div>
                        <div class="item-category__info">
                            <p class="item-category__name">${value[i].title}</p>
                        </div>
                        <div class="item-category__total">${value[i].cost} BYN</div>
                        </div>`;
                        
                        function parser(itemCategory) {
                            var parser = new DOMParser();
                            let teg = parser.parseFromString(itemCategory, 'text/html');
                            let item = teg.querySelector(".item-category");
                            return item;
                        }
                        document.querySelector(`[data-dat="expenses${key}"]`).append(parser(itemCategory))
                    }
                }
                more.classList.add("operation-list__more_act")
            } 
        }        
    }

    window.addEventListener("click", function(e) {
        if (e.target.closest(".list-categories_expenses .list-categories__item")) {
            document.querySelectorAll(".list-categories_expenses .list-categories__item").forEach(cat => {
                cat.classList.remove("act");
            })

            let category = e.target.closest(".list-categories_expenses .list-categories__item");
            category.classList.add("act");

            addPopup();

            addCategoryToPopup(category);
        }
    })

    btnCreate.addEventListener("click", function() {
        let total = 0;
        
        let operationsStorage = JSON.parse(localStorage.getItem("operations"));

        let category = document.querySelector(".list-categories__item.act")
        let objectCategory = operationsStorage[category.dataset.index - 1];

        let priceOfOperation = +inputCost.value;
        objectCategory.cost += priceOfOperation;

        let dateOfOperation = inputDate.value;
        let commentOfOperation = textarreaComment.value;

        let costArr = [];
        operationsStorage.forEach(item => {
            costArr.push(item.cost);
        })

        operationsStorage[category.dataset.index - 1] = objectCategory;
        localStorage.setItem("operations", JSON.stringify(operationsStorage));
        localStorage.setItem("categories", JSON.stringify(operationsStorage));

        category.querySelector(".item-category__total").textContent = `${operationsStorage[category.dataset.index - 1].cost} BYN`;
        
        document.querySelectorAll(".list-categories_expenses .list-categories__item").forEach((category, i) => {
            total += JSON.parse(localStorage.getItem("operations"))[i].cost;
        })
        document.querySelector(".slider-categories__total-num").textContent = total;

        addOperation(priceOfOperation, objectCategory, dateOfOperation, commentOfOperation);

        chartExpenses.data.datasets[0].data = costArr;
        chartExpenses.update();
        
        closePopup();

        operationToChart();
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

        document.querySelectorAll(".popup-operation__body .item-category").forEach(category => {
            category.style.display = "none";
        })

        let blockToPaste = document.querySelector(".list-categories");
        let itemCategory = `<div class="item-category" data-index="${JSON.parse(localStorage.getItem("operations"))[indexCategory - 1].index}">
                    <div class="item-category__icon ${JSON.parse(localStorage.getItem("operations"))[indexCategory - 1].icon}" style="background-color:${JSON.parse(localStorage.getItem("operations"))[indexCategory - 1].bg}"></div>
                    <div class="item-category__info">
                        <p class="item-category__name">${JSON.parse(localStorage.getItem("operations"))[indexCategory - 1].title}</p>
                    </div>
                    <div class="item-category__total">${JSON.parse(localStorage.getItem("operations"))[indexCategory - 1].cost} BYN</div>
                    </div>`;
        function parser(itemCategory) {
            var parser = new DOMParser();
            let teg = parser.parseFromString(itemCategory, 'text/html');
            let item = teg.querySelector(".item-category");
            return item;
        }

        blockToPaste.append(parser(itemCategory));
    }

    function addOperation(priceOfOperation, objectCategory, dateOfOperation, commentOfOperation) {
        let arrOperation = [];

        if (localStorage.getItem("itemOperationExpenses")) {
            arrOperation = JSON.parse(localStorage.getItem("itemOperationExpenses"));
        }

        let objectOperation = {};
        objectOperation.cost = priceOfOperation;
        objectOperation.title = objectCategory.title;
        objectOperation.icon = objectCategory.icon;
        objectOperation.bg = objectCategory.bg;
        objectOperation.color = objectCategory.color;
        objectOperation.date = dateOfOperation;
        objectOperation.comment = commentOfOperation;

        arrOperation.push(objectOperation);

        localStorage.setItem("itemOperationExpenses", JSON.stringify(arrOperation));
        setOperationToList(objectOperation);

        return objectOperation;
    }

    function setOperationToList(obj) {
        let blockToPaste = document.querySelector(".operation-list__item_expenses");

        let block = `<div class="list-operation__wrapper" data-dat="expenses${obj.date}">
            <p class="list-operation__date">${obj.date}</p>
        </div>`;
        let itemCategory = `<div class="list-category__item item-category">
                        <div class="item-category__icon ${obj.icon}" style="background-color:${obj.bg}"></div>
                        <div class="item-category__info">
                            <p class="item-category__name">${obj.title}</p>
                        </div>
                        <div class="item-category__total">${obj.cost} BYN</div>
                        </div>`;
                        
        function parser(itemCategory) {
            var parser = new DOMParser();
            let teg = parser.parseFromString(itemCategory, 'text/html');
            let item = teg.querySelector(".item-category");
            return item;
        }
        function parserBlockToPaste(block) {
            var parser = new DOMParser();
            let teg = parser.parseFromString(block, 'text/html');
            let item = teg.querySelector(".list-operation__wrapper");
            return item;
        }

        if (JSON.parse(localStorage.getItem("itemOperationExpenses")).length < 4) {
            if (!Array.from(arrDate).includes(obj.date)) {
                blockToPaste.append(parserBlockToPaste(block));
            }
            document.querySelector(`[data-dat="expenses${obj.date}"]`).append(parser(itemCategory));
            more.classList.remove("operation-list__more_act")
        } else {
            more.classList.add("operation-list__more_act")
        }

        arrDate.push(obj.date)

        if (!objOperationsDate[obj.date]) {
            objOperationsDate[obj.date] = [obj]
        } else {
            objOperationsDate[obj.date].push(obj)
        }

        if (!operationsDateAll[obj.date]) {
            operationsDateAll[obj.date] = [obj];
        } else {
            operationsDateAll[obj.date].push(obj)
        }
       
        localStorage.setItem("operationsExpensesDate", JSON.stringify(objOperationsDate));
        localStorage.setItem("operationsAllDate", JSON.stringify(operationsDateAll));

        return objOperationsDate;
    }

    function operationToChart() {
        let obj = JSON.parse(localStorage.getItem("operationsExpensesDate"))

        let uniqueTitles = [];

        for (let date in obj) {
          obj[date].forEach(item => {
            if (!uniqueTitles.includes(item.title)) {
              uniqueTitles.push(item.title);
            }
          });
        }

        let costArray = {};

        uniqueTitles.forEach(title => {
          costArray[title] = [];
        
          for (let key in obj) {
            let totalCost = obj[key].reduce((acc, curr) => curr.title === title ? acc + curr.cost : acc, 0);

            costArray[title].push(totalCost);
          }
        });
        
        let OperationSumCosts = []
        for (let value of Object.values(costArray)) {
            OperationSumCosts.push(value)
        }
        console.log(OperationSumCosts)

        let bgArray = [];

        for (let date in obj) {
            obj[date].forEach(item => {
            if (!bgArray.includes(item.bg)) {
              bgArray.push(item.bg);
            }
          })
        }

        let arrDate = []
        for (let key of Object.keys(JSON.parse(localStorage.getItem("operationsExpensesDate")))) {
            let temp = key.split(".").reverse()
            temp = temp.join("-")
            arrDate.push(temp);
        }

        chartExpensesAndIncome.data.labels = arrDate
        for (let i = 0;i < bgArray.length;i++) {
            if (!chartExpensesAndIncome.data.datasets[i]) {
                chartExpensesAndIncome.data.datasets.push({type: 'bar',
                label: 'Dataset 1',
                backgroundColor: [],
                data: [],})
            }

            chartExpensesAndIncome.data.datasets[i].data = OperationSumCosts[i];
            chartExpensesAndIncome.data.datasets[i].backgroundColor = bgArray[i];
        }
        chartExpensesAndIncome.update();

        localStorage.setItem("objOfBgOfOperationsExpenses", JSON.stringify(bgArray))
        localStorage.setItem("arrOfCostsOfOperationsExpenses", JSON.stringify(OperationSumCosts))
    }
}

export default addOperationExpenses;
