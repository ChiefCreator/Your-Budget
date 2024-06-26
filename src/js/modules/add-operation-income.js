function addOperationIncome(chartExpenses, objOperationsDate, arrDate, chartExpensesAndIncome, operationsAllDates) {
    let popupOperation = document.querySelector(".popup-operation_income");
    let overblock = document.querySelector(".overblock");
    let btnCreate = popupOperation.querySelector(".popup-operation__button");
    let inputCost = popupOperation.querySelector(".popup-operation__input");
    let inputDate = popupOperation.querySelector("#date-operation-income");
    let textarreaComment = popupOperation.querySelector(".popup-operation__textarrea");
    let closeBtn = popupOperation.querySelector(".popup-operation__close");
    let more = document.querySelector(".operation-list__more_income");

    if (localStorage.getItem("itemCategoriesIncomeSortedByCurrenDate")) {
        let total = 0;
        document.querySelectorAll(".list-categories_income .list-categories__item").forEach((category, i) => {

            category.querySelector(".item-category__total").textContent = `${JSON.parse(localStorage.getItem("itemCategoriesIncomeSortedByCurrenDate"))[i].cost} BYN`;
            total += JSON.parse(localStorage.getItem("itemCategoriesIncomeSortedByCurrenDate"))[i].cost;
            document.querySelector(".slider-categories__item_income .slider-categories__total-num").textContent = total;
        })
    }

    if (localStorage.getItem("operationsIncomeDate")) {
        let blockToPaste = document.querySelector(".operation-list__item_income");

        if (JSON.parse(localStorage.getItem("itemOperationIncomeSortedByCurrenDate")).length < 3) {
            for (let [key, value] of Object.entries(JSON.parse(localStorage.getItem("operationsIncomeDate"))).reverse()) {

                let block = `<div class="list-operation__wrapper" data-dat-wrapper="income${key}">
                <p class="list-operation__date">${key}</p>
                <div class="list-operation__wrapper-content" data-dat="income${key}"></div>
                </div>`;
                function parserBlockToPaste(block) {
                    var parser = new DOMParser();
                    let teg = parser.parseFromString(block, 'text/html');
                    let item = teg.querySelector(".list-operation__wrapper");
                    return item;
                }
                blockToPaste.append(parserBlockToPaste(block));
                for (let i = 0;i < value.length;i++) {
    
                    let itemCategory = "";
                        if (value[i].comment) {
                            itemCategory = `<div class="list-category__item item-category item-category_income expand-operation" data-index="${value[i].index}">
                        <div class="item-category__head">
                            <div class="item-category__icon ${value[i].icon}" style="background-color:${value[i].bg}"></div>
                            <div class="item-category__info">
                                <p class="item-category__name">${value[i].title}</p>
                            </div>
                            <div class="item-category__total">${value[i].cost} BYN</div>
                        </div>
                        <div class="item-category__footer">
                            <div class="item-category__footer-content">
                                <div class="item-category__comment-wrapper">
                                    <div class="item-category__comment-icon"></div>
                                    <p class="item-category__comment">${value[i].comment}</p>
                                </div>
                                <div class="item-category__buttons">
                                    <button class="item-category__button item-category__button_change">Изменить</button>
                                    <button class="item-category__button item-category__button_delete">Удалить</button>
                                </div>
                            </div>
                        </div>
                            </div>`;
                        } else {
                            itemCategory = `<div class="list-category__item item-category item-category_income expand-operation" data-index="${value[i].index}">
                        <div class="item-category__head">
                            <div class="item-category__icon ${value[i].icon}" style="background-color:${value[i].bg}"></div>
                            <div class="item-category__info">
                                <p class="item-category__name">${value[i].title}</p>
                            </div>
                            <div class="item-category__total">${value[i].cost} BYN</div>
                        </div>
                        <div class="item-category__footer">
                            <div class="item-category__footer-content">
                                <div class="item-category__buttons">
                                    <button class="item-category__button item-category__button_change">Изменить</button>
                                    <button class="item-category__button item-category__button_delete">Удалить</button>
                                </div>
                            </div>
                        </div>
                            </div>`;
                        }
        
                    function parser(itemCategory) {
                        var parser = new DOMParser();
                        let teg = parser.parseFromString(itemCategory, 'text/html');
                        let item = teg.querySelector(".item-category");
                        return item;
                    }
                    document.querySelector(`[data-dat="income${key}"]`).prepend(parser(itemCategory))
                }
            }  
        }
         else {
            let count = 0;
            for (let [key, value] of Object.entries(JSON.parse(localStorage.getItem("operationsIncomeDate"))).reverse()) {

                let block = `<div class="list-operation__wrapper" data-dat-wrapper="income${key}">
                <p class="list-operation__date">${key}</p>
                <div class="list-operation__wrapper-content" data-dat="income${key}"></div>
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

                        let itemCategory = "";
                        if (value[i].comment) {
                            itemCategory = `<div class="list-category__item item-category item-category_income expand-operation" data-index="${value[i].index}">
                        <div class="item-category__head">
                            <div class="item-category__icon ${value[i].icon}" style="background-color:${value[i].bg}"></div>
                            <div class="item-category__info">
                                <p class="item-category__name">${value[i].title}</p>
                            </div>
                            <div class="item-category__total">${value[i].cost} BYN</div>
                        </div>
                        <div class="item-category__footer">
                            <div class="item-category__footer-content">
                                <div class="item-category__comment-wrapper">
                                    <div class="item-category__comment-icon"></div>
                                    <p class="item-category__comment">${value[i].comment}</p>
                                </div>
                                <div class="item-category__buttons">
                                    <button class="item-category__button item-category__button_change">Изменить</button>
                                    <button class="item-category__button item-category__button_delete">Удалить</button>
                                </div>
                            </div>
                        </div>
                            </div>`;
                        } else {
                            itemCategory = `<div class="list-category__item item-category item-category_income expand-operation" data-index="${value[i].index}">
                        <div class="item-category__head">
                            <div class="item-category__icon ${value[i].icon}" style="background-color:${value[i].bg}"></div>
                            <div class="item-category__info">
                                <p class="item-category__name">${value[i].title}</p>
                            </div>
                            <div class="item-category__total">${value[i].cost} BYN</div>
                        </div>
                        <div class="item-category__footer">
                            <div class="item-category__footer-content">
                                <div class="item-category__buttons">
                                    <button class="item-category__button item-category__button_change">Изменить</button>
                                    <button class="item-category__button item-category__button_delete">Удалить</button>
                                </div>
                            </div>
                        </div>
                            </div>`;
                        }
                        
                        function parser(itemCategory) {
                            var parser = new DOMParser();
                            let teg = parser.parseFromString(itemCategory, 'text/html');
                            let item = teg.querySelector(".item-category");
                            return item;
                        }
                        document.querySelector(`[data-dat="income${key}"]`).prepend(parser(itemCategory))
                    }
                }
            } 
            more.classList.add("operation-list__more_act")
        }         
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

    let count = 0;
    if (localStorage.getItem("countOperationsIncome")) {
        count = JSON.parse(localStorage.getItem("countOperationsIncome"));
    }

    btnCreate.addEventListener("click", function() {
        let total = 0;
        
        let operationsStorage = JSON.parse(localStorage.getItem("operationsIncome"));

        let category = document.querySelector(".list-categories_income .list-categories__item.act")
        let objectCategory = operationsStorage[category.dataset.index - 1];
        let priceOfOperation = +inputCost.value;
            
        objectCategory.cost += priceOfOperation;

        let dateOfOperation = inputDate.value;
        dateOfOperation = dateOfOperation.split(".").reverse()
        dateOfOperation = dateOfOperation.join("-")

        let commentOfOperation = textarreaComment.value;

        let ind = "income0";
        count++;
        localStorage.setItem("countOperationsIncome", JSON.stringify(count))
        if (localStorage.getItem("countOperationsIncome")) {
            ind = "income" + JSON.parse(localStorage.getItem("countOperationsIncome"));
        }

        addOperation(priceOfOperation, objectCategory, dateOfOperation, commentOfOperation, ind);

        const groupedItems = JSON.parse(localStorage.getItem("itemOperationIncomeSortedByCurrenDate")).reduce((acc, item) => {
            const key = item.title;
            if (!acc[key]) {
                acc[key] = {...item};
            } else {
                acc[key].cost += item.cost;
            }
            return acc;
        }, {});
        
        const result = Object.values(groupedItems);

        let i = 0;
        for (let obj of result) {
            i++;
            obj.index = i;
        }

        const mergedArray = [...JSON.parse(localStorage.getItem("operationsIncome")), ...JSON.parse(localStorage.getItem("itemOperationIncomeSortedByCurrenDate"))];

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

        document.querySelectorAll(".list-categories_income .list-categories__item").forEach((category, i) => {
            if (JSON.parse(localStorage.getItem("itemCategoriesIncomeSortedByCurrenDate"))[i]) {
                total += JSON.parse(localStorage.getItem("itemCategoriesIncomeSortedByCurrenDate"))[i].cost;

                category.querySelector(".item-category__total").textContent = JSON.parse(localStorage.getItem("itemCategoriesIncomeSortedByCurrenDate"))[i].cost + " BYN";
            }
        })
        document.querySelector(".slider-categories__item_income .slider-categories__total-num").textContent = total;

        let costArr = [];
        JSON.parse(localStorage.getItem("itemCategoriesIncomeSortedByCurrenDate")).forEach(item => {
            costArr.push(item.cost);
        })

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

        document.querySelectorAll(".popup-operation_income .item-category").forEach(category => {
            category.style.display = "none";
        })

        let blockToPaste = document.querySelector(".popup-operation_income .list-categories");
        let itemCategory = `<div class="item-category item-category_income">
        <div class="item-category__head">
            <div class="item-category__icon ${JSON.parse(localStorage.getItem("itemCategoriesIncomeSortedByCurrenDate"))[indexCategory - 1].icon}" style="background-color:${JSON.parse(localStorage.getItem("itemCategoriesIncomeSortedByCurrenDate"))[indexCategory - 1].bg}"></div>
            <div class="item-category__info">
                <p class="item-category__name">${JSON.parse(localStorage.getItem("itemCategoriesIncomeSortedByCurrenDate"))[indexCategory - 1].title}</p>
            </div>
            <div class="item-category__total">${JSON.parse(localStorage.getItem("itemCategoriesIncomeSortedByCurrenDate"))[indexCategory - 1].cost} BYN</div>
        </div>
            </div>`;
        function parser(itemCategory) {
            var parser = new DOMParser();
            let teg = parser.parseFromString(itemCategory, 'text/html');
            let item = teg.querySelector(".item-category");
            return item;
        }

        blockToPaste.append(parser(itemCategory));
    }

    function addOperation(priceOfOperation, objectCategory, dateOfOperation, commentOfOperation, ind) {
        let arrOperation = [];

        if (localStorage.getItem("itemOperationIncome")) {
            arrOperation = JSON.parse(localStorage.getItem("itemOperationIncome"));
        }

        let objectOperation = {};
        objectOperation.index = ind;
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

        localStorage.setItem("itemOperationIncome", JSON.stringify(sortedData));

        sortArrayByCurrentDate(sortedData);
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
        localStorage.setItem("itemOperationIncomeSortedByCurrenDate", JSON.stringify(expensesInYearMonth));

        return expensesInYearMonth;
    }

    function isObjectBelongToCurrentDate(obj) {
        const expenseDate = new Date(obj.date).getFullYear() + "-" + ("0" + (+(new Date(obj.date)).getMonth() + 1)).slice(-2);
        const yearMonthToFilter = localStorage.getItem("currentDate");
        if (expenseDate === yearMonthToFilter) {
            return true
        }
        return false;
    }

    function setOperationToList(sortedData, objectOperation) {
        let blockToPaste = document.querySelector(".operation-list__item_income");

        blockToPaste.querySelectorAll(".list-operation__wrapper").forEach(block => {
            block.remove()
        })

        for (let i = 0;i < sortedData.length;i++) {
            let block = `<div class="list-operation__wrapper" data-dat-wrapper="income${sortedData[i].date}">
            <p class="list-operation__date">${sortedData[i].date}</p>
            <div class="list-operation__wrapper-content" data-dat="income${sortedData[i].date}"></div>
            </div>`;

        let itemCategory = "";
            if (sortedData[i].comment) {
                itemCategory = `<div class="list-category__item item-category item-category_income expand-operation" data-index="${sortedData[i].index}">
            <div class="item-category__head">
                <div class="item-category__icon ${sortedData[i].icon}" style="background-color:${sortedData[i].bg}"></div>
                <div class="item-category__info">
                    <p class="item-category__name">${sortedData[i].title}</p>
                </div>
                <div class="item-category__total">${sortedData[i].cost} BYN</div>
            </div>
            <div class="item-category__footer">
                <div class="item-category__footer-content">
                    <div class="item-category__comment-wrapper">
                        <div class="item-category__comment-icon"></div>
                        <p class="item-category__comment">${sortedData[i].comment}</p>
                    </div>
                    <div class="item-category__buttons">
                        <button class="item-category__button item-category__button_change">Изменить</button>
                        <button class="item-category__button item-category__button_delete">Удалить</button>
                    </div>
                </div>
            </div>
                </div>`;
            } else {
                itemCategory = `<div class="list-category__item item-category item-category_income expand-operation" data-index="${sortedData[i].index}">
                <div class="item-category__head">
                    <div class="item-category__icon ${sortedData[i].icon}" style="background-color:${sortedData[i].bg}"></div>
                    <div class="item-category__info">
                        <p class="item-category__name">${sortedData[i].title}</p>
                    </div>
                    <div class="item-category__total">${sortedData[i].cost} BYN</div>
                </div>
                <div class="item-category__footer">
                    <div class="item-category__footer-content">
                        <div class="item-category__buttons">
                            <button class="item-category__button item-category__button_change">Изменить</button>
                            <button class="item-category__button item-category__button_delete">Удалить</button>
                        </div>
                    </div>
                </div>
                    </div>`;
            }
                        
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

        if (more.classList.contains("open")) {
            pasteAllOperations();
        } else {
            pasteThreeOperations();
        }

        function pasteThreeOperations() {
            blockToPaste.append(parserBlockToPaste(block));
            document.querySelector(`[data-dat="income${sortedData[i].date}"]`).prepend(parser(itemCategory));

            if (document.querySelectorAll(`[data-dat="income${sortedData[i].date}"]`).length > 1) {
                document.querySelectorAll(`[data-dat-wrapper="income${sortedData[i].date}"]`)[document.querySelectorAll(`[data-dat-wrapper="income${sortedData[i].date}"]`).length - 1].remove()
            }

            if (JSON.parse(localStorage.getItem("itemOperationIncomeSortedByCurrenDate")).length < 4) {
                more.classList.remove("operation-list__more_act")
            }
            else {
                blockToPaste.querySelectorAll(".item-category").forEach((operation, index) => {
                    if (index > 2) operation.remove()
                })
                blockToPaste.querySelectorAll(".list-operation__wrapper").forEach((block) => {
                    if (block.querySelector(".list-operation__wrapper-content").children.length == 0) {
                        block.remove()
                    }
                })

                more.classList.add("operation-list__more_act")
            }
        }
        function pasteAllOperations() {
            blockToPaste.append(parserBlockToPaste(block));
            document.querySelector(`[data-dat="income${sortedData[i].date}"]`).prepend(parser(itemCategory));

            if (document.querySelectorAll(`[data-dat="income${sortedData[i].date}"]`).length > 1) {
                document.querySelectorAll(`[data-dat-wrapper="income${sortedData[i].date}"]`)[document.querySelectorAll(`[data-dat-wrapper="income${sortedData[i].date}"]`).length - 1].remove()
            }
        }

        }

        let newObjDate = {};
        if (isObjectBelongToCurrentDate(objectOperation)) {

            sortArrayByCurrentDate(sortedData).forEach(item => {
            if (!newObjDate[item.date]) {
                newObjDate[item.date] = [item];
            } else {
                newObjDate[item.date].push(item);
            }
        });
       
        localStorage.setItem("operationsIncomeDate", JSON.stringify(sortDates(newObjDate)));

        operationsAllDates = uniteObjectsByDate(JSON.parse(localStorage.getItem("operationsExpensesDate")), JSON.parse(localStorage.getItem("operationsIncomeDate")))
        localStorage.setItem("operationsAllDate", JSON.stringify(operationsAllDates));

        return objOperationsDate;
        }
    }

    function uniteObjectsByDate(obj1, obj2) {
        if ((localStorage.getItem("operationsExpensesDate") && localStorage.getItem("operationsIncomeDate"))) {
            return mergeObjectsByDate(obj1, obj2);
        } else if (localStorage.getItem("operationsIncomeDate")) {
            return JSON.parse(localStorage.getItem("operationsIncomeDate"))
        } else if (localStorage.getItem("operationsExpensesDate")) {
            return JSON.parse(localStorage.getItem("operationsExpensesDate"));
        }

        function mergeObjectsByDate(obj1, obj2) {
            const result = {};
        
            for (const date in obj1) {
                if (obj2[date]) {
                    result[date] = [...obj1[date], ...obj2[date]];
                } else {
                    result[date] = obj1[date];
                }
            }
            
            for (const date in obj2) {
                if (!result[date]) {
                result[date] = obj2[date];
                }
            }
            
            return result;
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
        if (localStorage.getItem("operationsIncomeDate")) obj = JSON.parse(localStorage.getItem("operationsIncomeDate"))

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
        console.log(costArray, OperationSumCosts)

        let bgArray = [];

        for (let date in obj) {
            obj[date].forEach(item => {
            if (!bgArray.includes(item.bg)) {
              bgArray.push(item.bg);
            }
          })
        }

        let arrDate = []
        for (let key of Object.keys(JSON.parse(localStorage.getItem("operationsIncomeDate")))) {
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

        localStorage.setItem("objOfBgOfOperationsIncome", JSON.stringify(bgArray))
        localStorage.setItem("arrOfCostsOfOperationsIncome", JSON.stringify(OperationSumCosts))
    }
}

export default addOperationIncome;
