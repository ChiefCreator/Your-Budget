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
            for (let [key, value] of Object.entries(JSON.parse(localStorage.getItem("operationsExpensesDate"))).reverse()) {

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
            for (let [key, value] of Object.entries(JSON.parse(localStorage.getItem("operationsExpensesDate"))).reverse()) {

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
        dateOfOperation = dateOfOperation.split(".").reverse()
        dateOfOperation = dateOfOperation.join("-")

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
        objectOperation.create = false;
        objectOperation.cost = priceOfOperation;
        objectOperation.title = objectCategory.title;
        objectOperation.icon = objectCategory.icon;
        objectOperation.bg = objectCategory.bg;
        objectOperation.color = objectCategory.color;
        objectOperation.date = dateOfOperation;
        objectOperation.comment = commentOfOperation;

        arrOperation.push(objectOperation);

        const sortedData = arrOperation.map(obj => ({
            ...obj,
            date: obj.date.split('.').reverse().join('-')
        })).sort((a, b) => new Date(b.date) - new Date(a.date));

        localStorage.setItem("itemOperationExpenses", JSON.stringify(sortedData));

        sortArrayByCurrentDate(sortedData)

        if (isObjectBelongToCurrentDate(objectOperation)) setOperationToList(sortArrayByCurrentDate(sortedData), objectOperation);
    
        return objectOperation;
    }

    function sortArrayByCurrentDate(arr) {
        function filterExpensesByMonth(arr, yearMonth) {
            const [year, month] = yearMonth.split('-');
            return arr.filter(expense => {
                const expenseDate = new Date(expense.date);
                return expenseDate.getFullYear() === parseInt(year) && expenseDate.getMonth() + 1 === parseInt(month);
            });
        }

        const yearMonthToFilter = localStorage.getItem("currentDate");
        const expensesInYearMonth = filterExpensesByMonth(arr, yearMonthToFilter);
        localStorage.setItem("itemOperationExpensesSortedByCurrenDate", JSON.stringify(expensesInYearMonth));

        return expensesInYearMonth;
    }

    function isObjectBelongToCurrentDate(obj) {
        const expenseDate = new Date(obj.date).getFullYear() + "-" + ("0" + (+(new Date(obj.date)).getMonth() + 1)).slice(-2);
        const yearMonthToFilter = localStorage.getItem("currentDate");
        console.log(expenseDate,yearMonthToFilter)
        if (expenseDate === yearMonthToFilter) {
            return true
        }
        return false;
    }

    function setOperationToList(sortedData, objectOperation) {
        let blockToPaste = document.querySelector(".operation-list__item_expenses");

        blockToPaste.querySelectorAll(".list-operation__wrapper").forEach(block => {
            block.remove()
        })

        for (let i = 0;i < sortedData.length;i++) {
            let block = `<div class="list-operation__wrapper" data-dat="expenses${sortedData[i].date}">
            <p class="list-operation__date">${sortedData[i].date}</p>
            </div>`;
        let itemCategory = `<div class="list-category__item item-category">
                        <div class="item-category__icon ${sortedData[i].icon}" style="background-color:${sortedData[i].bg}"></div>
                        <div class="item-category__info">
                            <p class="item-category__name">${sortedData[i].title}</p>
                        </div>
                        <div class="item-category__total">${sortedData[i].cost} BYN</div>
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

        if (JSON.parse(localStorage.getItem("itemOperationExpensesSortedByCurrenDate")).length < 4) {
            blockToPaste.append(parserBlockToPaste(block));
            document.querySelector(`[data-dat="expenses${sortedData[i].date}"]`).append(parser(itemCategory));

            if (document.querySelectorAll(`[data-dat="expenses${sortedData[i].date}"]`).length > 1) {
                document.querySelectorAll(`[data-dat="expenses${sortedData[i].date}"]`)[document.querySelectorAll(`[data-dat="expenses${sortedData[i].date}"]`).length - 1].remove()
            }
            more.classList.remove("operation-list__more_act")
        } else {
            blockToPaste.append(parserBlockToPaste(block));
            document.querySelector(`[data-dat="expenses${sortedData[i].date}"]`).append(parser(itemCategory));

            if (document.querySelectorAll(`[data-dat="expenses${sortedData[i].date}"]`).length > 1) {
                document.querySelectorAll(`[data-dat="expenses${sortedData[i].date}"]`)[document.querySelectorAll(`[data-dat="expenses${sortedData[i].date}"]`).length - 1].remove()
            }

            blockToPaste.querySelectorAll(".item-category").forEach((operation, index) => {
                if (index > 2) operation.remove()
            })
            blockToPaste.querySelectorAll(".list-operation__wrapper").forEach((block, index) => {
                if (block.children.length <= 1) block.remove()
            })

            more.classList.add("operation-list__more_act")
        }
        }
        let newObjDate = {};
        if (isObjectBelongToCurrentDate(objectOperation)) {
        //     arrDate.push(objectOperation.date)
        //     console.log(arrDate)

        // if (!objOperationsDate[objectOperation.date]) {
        //     objOperationsDate[objectOperation.date] = [objectOperation]
        // } else {
        //     objOperationsDate[objectOperation.date].push(objectOperation)
        // }

        // if (!operationsDateAll[objectOperation.date]) {
        //     operationsDateAll[objectOperation.date] = [objectOperation];
        // } else {
        //     operationsDateAll[objectOperation.date].push(objectOperation)
        // }
        // console.log("xwe", objOperationsDate)
        sortedData.forEach(item => {
            if (!newObjDate[item.date]) {
                newObjDate[item.date] = [item];
            } else {
                newObjDate[item.date].push(item);
            }
        });
       
        localStorage.setItem("operationsExpensesDate", JSON.stringify(sortDates(newObjDate)));
        localStorage.setItem("operationsAllDate", JSON.stringify(sortDates(operationsDateAll)));

        return objOperationsDate;
        }
    }

    function sortDates(obj) {
        const sortedDates = Array.from(Object.keys(obj).sort((a, b) => new Date(b) - new Date(a))).reverse();
        const sortedObj = sortedDates.reduce((acc, date) => {
            acc[date] = obj[date];
            return acc;
        }, {});

        return sortedObj;
    }

    function operationToChart() {
        let obj = {}
        if (localStorage.getItem("operationsExpensesDate")) obj = JSON.parse(localStorage.getItem("operationsExpensesDate"))
        // if (obj = {}) return

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
