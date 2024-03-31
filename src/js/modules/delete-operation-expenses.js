function deleteOperationExpenses(chartExpenses, chartExpensesAndIncome) {

    window.addEventListener("click", function(e) {
        if (e.target.closest(".item-category__button_delete")) {
            let deleteBtn = e.target.closest(".item-category__button_delete");

            del(deleteBtn)
        }
    })

    function del(deleteBtn) {
        let operation = deleteBtn.closest(".item-category");
   
        sortOperationsExpenses(operation);
        sortOperationsExpensesDate(operation);

        sortArrayByCurrentDate(JSON.parse(localStorage.getItem("itemOperationExpenses")))

        changeCategories();

        chart();
        operationToChart();
    
        operationsAllDateUpdate();
    }

    function sortOperationsExpensesDate(operation) {
        let res = {};

        for (let [key, value] of Object.entries(JSON.parse(localStorage.getItem("operationsExpensesDate")))) {

            let newValue = value.filter(item => item.index != operation.dataset.index);
            res[key] = newValue;

            if (res[key].length == 0) delete res[key]
        }

        localStorage.setItem("operationsExpensesDate", JSON.stringify(res));

        setOperationToList(res)
    }

    function setOperationToList(res) {
        let blockToPaste = document.querySelector(".operation-list__item_expenses");
        let more = document.querySelector(".operation-list__more_expenses");

        blockToPaste.querySelectorAll(".list-operation__wrapper").forEach(block => {
            block.remove()
        })

        for (let [key, value] of Object.entries(res).reverse()) {

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

                let itemCategory = "";
                if (value[i].comment) {
                    itemCategory = `<div class="list-category__item item-category expand-operation" data-index="${value[i].index}">
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
                    itemCategory = `<div class="list-category__item item-category expand-operation" data-index="${value[i].index}">
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

                if (JSON.parse(localStorage.getItem("itemOperationExpensesSortedByCurrenDate")).length < 4) {
                    blockToPaste.append(parserBlockToPaste(block));
                    document.querySelector(`[data-dat="expenses${value[i].date}"]`).append(parser(itemCategory));
        
                    if (document.querySelectorAll(`[data-dat="expenses${value[i].date}"]`).length > 1) {
                        document.querySelectorAll(`[data-dat="expenses${value[i].date}"]`)[document.querySelectorAll(`[data-dat="expenses${value[i].date}"]`).length - 1].remove()
                    }
                    more.classList.remove("operation-list__more_act")
                } else {
                    blockToPaste.append(parserBlockToPaste(block));
                    document.querySelector(`[data-dat="expenses${value[i].date}"]`).append(parser(itemCategory));
        
                    if (document.querySelectorAll(`[data-dat="expenses${value[i].date}"]`).length > 1) {
                        document.querySelectorAll(`[data-dat="expenses${value[i].date}"]`)[document.querySelectorAll(`[data-dat="expenses${value[i].date}"]`).length - 1].remove()
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
        } 
    }

    function sortOperationsExpenses(operation) {

        let res = JSON.parse(localStorage.getItem("itemOperationExpenses")).filter(item => item.index != operation.dataset.index);

        localStorage.setItem("itemOperationExpenses", JSON.stringify(res));
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

    function changeCategories() {
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
        console.log(res)
        localStorage.setItem("itemCategoriesExpensesSortedByCurrenDate", JSON.stringify(res))

        if (localStorage.getItem("itemCategoriesExpensesSortedByCurrenDate")) {
            let total = 0;
            document.querySelectorAll(".list-categories_expenses .list-categories__item").forEach((category, i) => {
            
                category.querySelector(".item-category__total").textContent = `${JSON.parse(localStorage.getItem("itemCategoriesExpensesSortedByCurrenDate"))[i].cost} BYN`;
                total += JSON.parse(localStorage.getItem("itemCategoriesExpensesSortedByCurrenDate"))[i].cost;
                document.querySelector(".slider-categories__total-num").textContent = total;
            })
        }
    }

    function chart() {
        let titles = [];
        let bgArr = [];
        let costArr = [];

        JSON.parse(localStorage.getItem("itemCategoriesExpensesSortedByCurrenDate")).forEach(item => {
            titles.push(item.title);
            bgArr.push(item.bg);

            costArr.push(item.cost);
        })
        chartExpenses.data.datasets[0].data = costArr;
        chartExpenses.data.datasets[0].backgroundColor = bgArr;
        chartExpenses.update();
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

        chartExpensesAndIncome.data.datasets = []

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

    function operationsAllDateUpdate() {
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

        let operationsAllDates = uniteObjectsByDate(JSON.parse(localStorage.getItem("operationsExpensesDate")), JSON.parse(localStorage.getItem("operationsIncomeDate")))
        localStorage.setItem("operationsAllDate", JSON.stringify(operationsAllDates));
    }
}

export default deleteOperationExpenses;