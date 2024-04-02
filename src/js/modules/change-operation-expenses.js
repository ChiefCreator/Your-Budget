function changeOperationExpenses(chartExpenses, objOperationsDate, arrDate, chartExpensesAndIncome, operationsAllDates) {
    let popupChangeOperation = document.querySelector(".popup-change-operation_expenses");
    let overblock = document.querySelector(".overblock");
    let more = document.querySelector(".operation-list__more_expenses");

    window.addEventListener("click", function(e) {
        if (e.target.closest(".item-category__button_change")) {
            let button = e.target.closest(".item-category__button_change");
            let operation = button.closest(".expand-operation");  
            operation.classList.add("expand-operation_act");
            
            findOperation(operation);
            addCategoryToPopup(findOperation(operation));
            addPopup();
        }

        if (e.target.closest(".popup-change-operation__button")) {
            let operation = document.querySelector(".expand-operation_act");
            
            changeOperation(operation);
            closePopup();

            operationToChart();
            categoryChange();

            operation.classList.remove("expand-operation_act");
        }
    })

    function addPopup() {
        popupChangeOperation.classList.add("popup-change-operation_open");
        overblock.classList.add("overblock_open");
    }

    function closePopup() {
        popupChangeOperation.classList.remove("popup-change-operation_open");
        popupChangeOperation.classList.remove("popup-change-operation_open");
        overblock.classList.remove("overblock_open");
    }

    overblock.addEventListener("click", function() {
        popupChangeOperation.classList.remove("popup-change-operation_open");
        overblock.classList.remove("overblock_open");
    })

    function findOperation(operation) {
        let index = operation.dataset.index;
        let modifiedObj = {}; 

        let modifiedItemOperationExpenses = [];

        for (let obj of JSON.parse(localStorage.getItem("itemOperationExpenses"))) {
            if (obj.index == index) {
                modifiedObj = Object.assign({}, obj);
                obj = modifiedObj; 
            }
            modifiedItemOperationExpenses.push(obj)
        }

        setDataFromInput(modifiedObj);

        return modifiedObj;
    }

    function setDataFromInput(modifiedObj) {
        let inpCost = document.querySelector(".popup-change-operation_expenses .popup-change-operation__input");
        let inpComm = document.querySelector(".popup-change-operation_expenses .popup-change-operation__textarrea");
        let inpDate = document.querySelector(".popup-change-operation_expenses .popup-change-operation__input_date");

        inpCost.value = modifiedObj.cost;
        inpComm.value = modifiedObj.comment;
        inpDate.value = modifiedObj.date;
    }

    function changeOperation(operation) {
        let index = operation.dataset.index;
        let modifiedObj = {}; 

        let inpCost = document.querySelector(".popup-change-operation_expenses .popup-change-operation__input");
        let inpComm = document.querySelector(".popup-change-operation_expenses .popup-change-operation__textarrea");
        let inpDate = document.querySelector(".popup-change-operation_expenses .popup-change-operation__input_date");

        let modifiedItemOperationExpenses = [];

        for (let obj of JSON.parse(localStorage.getItem("itemOperationExpenses"))) {
            if (obj.index == index) {
                modifiedObj = Object.assign({}, obj);

                modifiedObj.cost = +inpCost.value;
                modifiedObj.comment = inpComm.value;
                modifiedObj.date = inpDate.value;

                obj = modifiedObj; 
            }
            modifiedItemOperationExpenses.push(obj)
        }

        localStorage.setItem("itemOperationExpenses", JSON.stringify(modifiedItemOperationExpenses));
        setOperationToList(sortArrayByCurrentDate(modifiedItemOperationExpenses), modifiedObj)
    }

    function addCategoryToPopup(obj) {
        document.querySelectorAll(".popup-change-operation_expenses .item-category").forEach(category => {
            category.style.display = "none";
        })

        let blockToPaste = document.querySelector(".popup-change-operation_expenses .list-categories");
                      
        let itemCategory = `<div class="item-category item-category_expenses">
        <div class="item-category__head">
            <div class="item-category__icon ${obj.icon}" style="background-color:${obj.bg}"></div>
            <div class="item-category__info">
                <p class="item-category__name">${obj.title}</p>
            </div>
            <div class="item-category__total">${obj.cost} BYN</div>
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
        localStorage.setItem("itemOperationExpensesSortedByCurrenDate", JSON.stringify(sortArr(expensesInYearMonth)));

        return expensesInYearMonth;
    }

    function setOperationToList(sortedData, objectOperation) {
        let blockToPaste = document.querySelector(".operation-list__item_expenses");

        blockToPaste.querySelectorAll(".list-operation__wrapper").forEach(block => {
            block.remove()
        })

        sortedData = sortArrayByCurrentDate(sortedData)

        for (let i = 0;i < sortedData.length;i++) {
            let block = `<div class="list-operation__wrapper" data-dat="expenses${sortedData[i].date}">
            <p class="list-operation__date">${sortedData[i].date}</p>
            </div>`;

            let itemCategory = "";
            if (sortedData[i].comment) {
                itemCategory = `<div class="list-category__item item-category expand-operation" data-index="${sortedData[i].index}">
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
                itemCategory = `<div class="list-category__item item-category expand-operation" data-index="${sortedData[i].index}">
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
            
        sortedData.forEach(item => {
            if (!newObjDate[item.date]) {
                newObjDate[item.date] = [item];
            } else {
                newObjDate[item.date].push(item);
            }
        });

        localStorage.setItem("operationsExpensesDate", JSON.stringify(sortDates(newObjDate)));

        operationsAllDates = uniteObjectsByDate(JSON.parse(localStorage.getItem("operationsExpensesDate")), JSON.parse(localStorage.getItem("operationsIncomeDate")))
        localStorage.setItem("operationsAllDate", JSON.stringify(operationsAllDates));

        return objOperationsDate;
    }

    function sortDates(obj) {
        const sortedDates = Array.from(Object.keys(obj).sort((a, b) => new Date(b) - new Date(a))).reverse();
        const sortedObj = sortedDates.reduce((acc, date) => {
            acc[date] = obj[date];
            return acc;
        }, {});

        return sortedObj;
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

    function operationToChart() {
        let obj = {}
        if (localStorage.getItem("operationsExpensesDate")) obj = JSON.parse(localStorage.getItem("operationsExpensesDate"))

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

    function categoryChange() {
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

        if (localStorage.getItem("itemCategoriesExpensesSortedByCurrenDate")) {
            let total = 0;
            document.querySelectorAll(".list-categories_expenses .list-categories__item").forEach((category, i) => {
            
                category.querySelector(".item-category__total").textContent = `${JSON.parse(localStorage.getItem("itemCategoriesExpensesSortedByCurrenDate"))[i].cost} BYN`;
                total += JSON.parse(localStorage.getItem("itemCategoriesExpensesSortedByCurrenDate"))[i].cost;
                document.querySelector(".slider-categories__total-num").textContent = total;
            })
        }
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

    function sortArr(arr) {
        return arr.sort((a, b) => new Date(b.date) - new Date(a.date))
    }
}

export default changeOperationExpenses;