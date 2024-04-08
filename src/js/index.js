let arrOfCategories = [];

let bgArr = [];
let costArr = [];
let titles = [];

if (localStorage.getItem("itemCategoriesExpensesSortedByCurrenDate")) {
    arrOfCategories = JSON.parse(localStorage.getItem("itemCategoriesExpensesSortedByCurrenDate"));
    
    arrOfCategories.forEach(item => {
        titles.push(item.title);
        bgArr.push(item.bg);
        
        if (item.cost == 0) {
            costArr.push(1);
        } else {
            costArr.push(item.cost);
        }
    })
}
const ctx = document.getElementById('myChart');
const chartExpenses = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: titles,
        datasets: [{
            data: costArr,
            backgroundColor: bgArr,
            borderWidth: 1,
        }]
    },
    options: {
        plugins: {
            legend: {
                display: false
            },
        }
    },
});
// ========================
let categoriesIncome = [];

let bgArrIncome = [];
let costArrIncome = [];
let titlesIncome = [];

if (localStorage.getItem("itemCategoriesIncomeSortedByCurrenDate")) {
    categoriesIncome = JSON.parse(localStorage.getItem("itemCategoriesIncomeSortedByCurrenDate"));
    
    categoriesIncome.forEach(item => {
        titlesIncome.push(item.title);
        bgArrIncome.push(item.bg);
        
        if (item.cost == 0) {
            costArrIncome.push(1);
        } else {
            costArrIncome.push(item.cost);
        }
    })
}
const ctxIncome = document.getElementById('chartIncome');
const chartIncome = new Chart(ctxIncome, {
    type: 'doughnut',
    data: {
        labels: titlesIncome,
        datasets: [{
            data: costArrIncome,
            backgroundColor: bgArrIncome,
            borderWidth: 1,
        }]
    },
    options: {
        plugins: {
            legend: {
                display: false
            },
        }
    },
});

// =========================
let arrDate = []
let objOperationsDate = {};
if (!localStorage.getItem("operationsExpensesDate")) {
    objOperationsDate = {};
} else {
    objOperationsDate = JSON.parse(localStorage.getItem("operationsExpensesDate"));
    for (let key of Object.keys(JSON.parse(localStorage.getItem("operationsExpensesDate")))) {
        arrDate.push(key);
    }
}
let categoryCosts = [];
let categoryBg = [];
if (localStorage.getItem("arrOfCostsOfOperationsExpenses")) {
    categoryCosts = JSON.parse(localStorage.getItem("arrOfCostsOfOperationsExpenses"));
}

if (localStorage.getItem("objOfBgOfOperationsExpenses")) {
    categoryBg = JSON.parse(localStorage.getItem("objOfBgOfOperationsExpenses"));
    for (let bg of categoryBg) {
        categoryCosts.push(bg)
    }
}
const ctxExpensesAndIncome = document.getElementById('chartExpensesAndIncome');
const chartExpensesAndIncome = new Chart(ctxExpensesAndIncome, {
    type: 'bar',
    data: {
        labels: arrDate,
        datasets: [
            {
                type: 'bar',
                label: 'Dataset 1',
                backgroundColor: categoryBg[0],
                data: categoryCosts[0],
            },
        ]
    },
    options: {
      plugins: {
        title: {
          text: 'Chart.js Combo Time Scale',
          display: false
        },
        legend: {
            display: false
        },
      },
      scales: {
        x: {
            type: "time",
            time: {
                unit: "day"
            },
            ticks: {
                stepSize: 2
            }
        },
        y: {
            // display: false
        }
    },
    },
});

for (let i = 0;i < categoryBg.length;i++) {
    if (!chartExpensesAndIncome.data.datasets[i]) {
        chartExpensesAndIncome.data.datasets.push({type: 'bar',
        label: 'Dataset 1',
        backgroundColor: [],
        data: [],})
    }

    chartExpensesAndIncome.data.datasets[i].data = categoryCosts[i];
    chartExpensesAndIncome.data.datasets[i].backgroundColor = categoryBg[i];
}
chartExpensesAndIncome.update();

// =================================

let arrDateIncome = [];
let objOperationsDateIncome = {};
if (!localStorage.getItem("operationsIncomeDate")) {
    objOperationsDateIncome = {};
} else {
    objOperationsDateIncome = JSON.parse(localStorage.getItem("operationsIncomeDate"));
    for (let key of Object.keys(JSON.parse(localStorage.getItem("operationsIncomeDate")))) {
        arrDateIncome.push(key);
    }
}

let categoryCostsIncome = [];
let categoryBgIncome = [];
if (localStorage.getItem("arrOfCostsOfOperationsIncome")) {
    categoryCostsIncome = JSON.parse(localStorage.getItem("arrOfCostsOfOperationsIncome"));
}

if (localStorage.getItem("objOfBgOfOperationsIncome")) {
    categoryBgIncome = JSON.parse(localStorage.getItem("objOfBgOfOperationsIncome"));
    console.log(categoryBgIncome)
    for (let bg of categoryBgIncome) {
        categoryCostsIncome.push(bg)
    }
}
const ctxIncomeBar = document.getElementById('chartExpensesBar');
const chartIncomeBar = new Chart(ctxIncomeBar, {
    type: 'bar',
    data: {
        labels: arrDateIncome,
        datasets: [
            {
                type: 'bar',
                label: 'Dataset 1',
                backgroundColor: categoryBgIncome[0],
                data: categoryCostsIncome[0],
            },
        ]
    },
    options: {
      plugins: {
        title: {
          text: 'Chart.js Combo Time Scale',
          display: false
        },
        legend: {
            display: false
        },
      },
      scales: {
        x: {
            type: "time",
            time: {
                unit: "day"
            },
            ticks: {
                stepSize: 2
            }
        },
        y: {
            // display: false
        }
      }
    },
});

for (let i = 0;i < categoryBgIncome.length;i++) {
    if (!chartIncomeBar.data.datasets[i]) {
        chartIncomeBar.data.datasets.push({type: 'bar',
        label: 'Dataset 1',
        backgroundColor: [],
        data: [],})
    }

    chartIncomeBar.data.datasets[i].data = categoryCostsIncome[i];
    chartIncomeBar.data.datasets[i].backgroundColor = categoryBgIncome[i];
}
chartIncomeBar.update();

// =================================

let operationsAllDates = {};
if (localStorage.getItem("operationsAllDate")) {
    operationsAllDates = JSON.parse(localStorage.getItem("operationsAllDate"));
}

// ==================================

import AirDatepicker from 'air-datepicker';
import 'air-datepicker/air-datepicker.css';

let dateText = document.querySelector(".main-date__value");
let currentDate = new Date().getFullYear() + "-" + ("0" + (+(new Date()).getMonth() + 1)).slice(-2);
dateText.textContent = transformDate()
if (!localStorage.getItem("currentDate")) {
    localStorage.setItem("currentDate", currentDate); 
}
dateText.textContent = transformDate(localStorage.getItem("currentDate")); 

let buttonYear = {
    content: 'Выбрать год',
    className: 'custom-button-classname',
    onClick: (dp) => {
        if (dp.currentView == "years") {
            buttonYear.content = 'Выбрать год'
            dp.update({
                view : "months",
                minView : "months",
                dateFormat: 'yyyy-MM',
            })
        } else if (dp.currentView == "months") {
            buttonYear.content = 'Выбрать месяц'
            dp.update({
                view : "years",
                minView : "years",
                dateFormat: 'yyyy',
            })
        }
    }
}
let mainDatePicker = new AirDatepicker('#main-picker', {
    inline: false,
    position:'left top',
    view: "months",
    minView:"months",
    dateFormat: 'yyyy-MM',
    onSelect: ({date, formattedDate, datepicker}) => {
        chartExpensesAndIncome.update()
        let mounth = transformDate(formattedDate)
    
        if (datepicker.currentView == "months") {
            if (date) {
                dateText.textContent = mounth;  
            } else {
                dateText.textContent = "Выберите дату";  
            }
        } else {
            if (date) {
                dateText.textContent = formattedDate;  
            } else {
                dateText.textContent = "Выберите дату";  
            }
        }
        
        localStorage.setItem("currentDate", formattedDate);
        
        if (localStorage.getItem("itemOperationExpenses")) {
            sortArrayByCurrentDate(JSON.parse(localStorage.getItem("itemOperationExpenses")), "itemOperationExpensesSortedByCurrenDate");

            let newObjDate = {}
            JSON.parse(localStorage.getItem("itemOperationExpensesSortedByCurrenDate")).forEach(item => {
                if (!newObjDate[item.date]) {
                    newObjDate[item.date] = [item];
                } else {
                    newObjDate[item.date].push(item);
                }
            });

            if (JSON.parse(localStorage.getItem("itemOperationExpensesSortedByCurrenDate").length > 0)) {
                localStorage.setItem("operationsExpensesDate", JSON.stringify(sortDates(newObjDate)));
            }

            function setOperationIncomeToList() {
                if (localStorage.getItem("operationsExpensesDate")) {
                    let blockToPaste = document.querySelector(".operation-list__item_expenses");
                    let more = document.querySelector(".operation-list__more_expenses");
                
                    blockToPaste.querySelectorAll(".list-operation__wrapper").forEach(block => {
                        block.remove()
                    })
                
                    if (JSON.parse(localStorage.getItem("itemOperationExpensesSortedByCurrenDate")).length < 3) {
                        for (let [key, value] of Object.entries(JSON.parse(localStorage.getItem("operationsExpensesDate"))).reverse()) {
                        
                            let block = `<div class="list-operation__wrapper" data-dat-wrapper="expenses${key}">
                            <p class="list-operation__date">${key}</p>
                            <div class="list-operation__wrapper-content" data-dat="expenses${key}"></div>
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
                                    itemCategory = `<div class="list-category__item item-category item-category_expenses expand-operation" data-index="${value[i].index}">
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
                                    itemCategory = `<div class="list-category__item item-category item-category_expenses expand-operation" data-index="${value[i].index}">
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
                                document.querySelector(`[data-dat="expenses${key}"]`).prepend(parser(itemCategory))
                            }
                        } 
                        more.classList.remove("operation-list__more_act")
                    }
                    else {
                        let count = 0;
                        for (let [key, value] of Object.entries(JSON.parse(localStorage.getItem("operationsExpensesDate"))).reverse()) {
                        
                            let block = `<div class="list-operation__wrapper" data-dat-wrapper="expenses${key}">
                            <p class="list-operation__date">${key}</p>
                            <div class="list-operation__wrapper-content" data-dat="expenses${key}">
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
                                        itemCategory = `<div class="list-category__item item-category item-category_expenses expand-operation" data-index="${value[i].index}">
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
                                        itemCategory = `<div class="list-category__item item-category item-category_expenses expand-operation" data-index="${value[i].index}">
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
                                    document.querySelector(`[data-dat="expenses${key}"]`).prepend(parser(itemCategory))
                                }
                            }
                            more.classList.add("operation-list__more_act")
                        } 
                    }        
                }
            }
            setOperationIncomeToList()
    
            function operationToChart() {
                let obj = {}
                if (localStorage.getItem("operationsExpensesDate")) obj = sortDates(JSON.parse(localStorage.getItem("operationsExpensesDate")))
        
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
                for (let i = 0;i < arrDate.length;i++) {
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
            operationToChart();
    
            function chartExpensesBar() {
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
    
                if (localStorage.getItem("itemCategoriesExpensesSortedByCurrenDate")) {
                    let total = 0;
                    document.querySelectorAll(".list-categories_expenses .list-categories__item").forEach((category, i) => {
                    
                        category.querySelector(".item-category__total").textContent = `${JSON.parse(localStorage.getItem("itemCategoriesExpensesSortedByCurrenDate"))[i].cost} BYN`;
                        total += JSON.parse(localStorage.getItem("itemCategoriesExpensesSortedByCurrenDate"))[i].cost;
                        document.querySelector(".slider-categories__total-num").textContent = total;
                    })
                }
            }
            chartExpensesBar();
    
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
            chart(JSON.parse(localStorage.getItem("itemCategoriesExpensesSortedByCurrenDate")));
        }


        if (localStorage.getItem("itemOperationIncome")) {
            sortArrayByCurrentDate(JSON.parse(localStorage.getItem("itemOperationIncome")), "itemOperationIncomeSortedByCurrenDate");

        let newObjDateIncome = {}
        JSON.parse(localStorage.getItem("itemOperationIncomeSortedByCurrenDate")).forEach(item => {
            if (!newObjDateIncome[item.date]) {
                newObjDateIncome[item.date] = [item];
            } else {
                newObjDateIncome[item.date].push(item);
            }
        });

        if (JSON.parse(localStorage.getItem("itemOperationIncomeSortedByCurrenDate").length > 0)) {
            localStorage.setItem("operationsIncomeDate", JSON.stringify(sortDates(newObjDateIncome)));
        }

        function setOperationIncomeToList() {
            if (localStorage.getItem("operationsIncomeDate")) {
                let blockToPaste = document.querySelector(".operation-list__item_income");
                let more = document.querySelector(".operation-list__more_income");

                blockToPaste.querySelectorAll(".list-operation__wrapper").forEach(block => {
                    block.remove()
                })
        
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
                    more.classList.remove("operation-list__more_act")
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
        }
        setOperationIncomeToList()

        function operationIncomeToChart() {
            let obj = {}
            if (localStorage.getItem("operationsIncomeDate")) obj = sortDates(JSON.parse(localStorage.getItem("operationsIncomeDate")))
    
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
            for (let key of Object.keys(JSON.parse(localStorage.getItem("operationsIncomeDate")))) {
                let temp = key.split(".").reverse()
                temp = temp.join("-")
                arrDate.push(temp);
            }
    
            chartIncomeBar.data.labels = arrDate
            for (let i = 0;i < arrDate.length;i++) {
                if (!chartIncomeBar.data.datasets[i]) {
                    chartIncomeBar.data.datasets.push({type: 'bar',
                    label: 'Dataset 1',
                    backgroundColor: [],
                    data: [],})
                }
    
                chartIncomeBar.data.datasets[i].data = OperationSumCosts[i];
                chartIncomeBar.data.datasets[i].backgroundColor = bgArray[i];
            }
            chartIncomeBar.update();
    
            localStorage.setItem("objOfBgOfOperationsIncome", JSON.stringify(bgArray))
            localStorage.setItem("arrOfCostsOfOperationsIncome", JSON.stringify(OperationSumCosts))
        }
        operationIncomeToChart();

        function chartIncomeBarFunction() {
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

            if (localStorage.getItem("itemCategoriesIncomeSortedByCurrenDate")) {
                let total = 0;
                document.querySelectorAll(".list-categories_income .list-categories__item").forEach((category, i) => {
                
                    category.querySelector(".item-category__total").textContent = `${JSON.parse(localStorage.getItem("itemCategoriesIncomeSortedByCurrenDate"))[i].cost} BYN`;
                    total += JSON.parse(localStorage.getItem("itemCategoriesIncomeSortedByCurrenDate"))[i].cost;
                    document.querySelector(".slider-categories__item_income .slider-categories__total-num").textContent = total;
                })
            }
        }
        chartIncomeBarFunction();

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
            chartIncome.data.datasets[0].data = costArr;
            chartIncome.data.datasets[0].backgroundColor = bgArr;
            chartIncome.update();
        }
        chart(JSON.parse(localStorage.getItem("itemCategoriesIncomeSortedByCurrenDate")));
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
        operationsAllDates = uniteObjectsByDate(JSON.parse(localStorage.getItem("operationsExpensesDate")), JSON.parse(localStorage.getItem("operationsIncomeDate")))
        localStorage.setItem("operationsAllDate", JSON.stringify(operationsAllDates));
    
        return formattedDate;
        },
    buttons: buttonYear,
})

function sortDates(obj) {
    const sortedDates = Array.from(Object.keys(obj).sort((a, b) => new Date(b) - new Date(a))).reverse();
    const sortedObj = sortedDates.reduce((acc, date) => {
        acc[date] = obj[date];
        return acc;
    }, {});

    return sortedObj;
}

function sortArrayByCurrentDate(arr, nameOfArayOperations) {
    function filterExpensesByMonth(arr, yearMonth) {
        const [year, month] = yearMonth.split('-');
        return arr.filter(expense => {
            const expenseDate = new Date(expense.date);
            return expenseDate.getFullYear() === parseInt(year) && expenseDate.getMonth() + 1 === parseInt(month);
        });
    }

    const yearMonthToFilter = localStorage.getItem("currentDate");
    const expensesInYearMonth = filterExpensesByMonth(arr, yearMonthToFilter);

    localStorage.setItem(nameOfArayOperations, JSON.stringify(expensesInYearMonth));
}

function transformDate(date) {
    if (date) {
        if (date.length == 7) {
            return new Date(date).toLocaleString('default', { month: 'long' }) + " " + new Date(date).getFullYear();
        } else if (date.length == 4) {
            return date
        }
    } else {
        return new Date().toLocaleString('default', { month: 'long' }) + " " + new Date().getFullYear();
    }
}

// ==================================

let currentDateStorage = []
currentDateStorage.push(JSON.parse(localStorage.getItem("itemOperationExpenses")))
localStorage.setItem("currentDateStorage", JSON.stringify(currentDateStorage))

// ==================================

let dateOperationExpenses = new AirDatepicker('#date-operation-expenses', {
    inline: false,
    position:'right top',
    container: '.popup-operation-datepicker'
})

let dateOperationIncome = new AirDatepicker('#date-operation-income', {
    inline: false,
    position:'right top',
    container: '.popup-operation-datepicker_income'
})

import togglePopup from "./modules/toggle-popup";
togglePopup();

import createCategoryExpenses from "./modules/create-category-expenses";
createCategoryExpenses(chartExpenses,arrOfCategories);

import createCategoryIncome from "./modules/create-category-income";
createCategoryIncome(chartIncome, categoriesIncome);

import addOperationExpenses from "./modules/add-operation-expenses";
addOperationExpenses(chartExpenses, objOperationsDate, arrDate, chartExpensesAndIncome, operationsAllDates);

import addOperationIncome from "./modules/add-operation-income";
addOperationIncome(chartIncome, objOperationsDateIncome, arrDateIncome, chartIncomeBar, operationsAllDates);

import switchCategory from "./modules/switch-category";
switchCategory();

import inputTextarrea from "./modules/textarrea";
inputTextarrea();

import expandOperation from "./modules/expand-operation";
expandOperation();

import deleteOperationExpenses from "./modules/delete-operation-expenses";
deleteOperationExpenses(chartExpenses, chartExpensesAndIncome);

import deleteOperationIncome from "./modules/delete-operation-income";
deleteOperationIncome(chartIncome, chartIncomeBar);

import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

const swiperIconsExpenses = new Swiper('.swiper_icons-expenses', {
    speed: 600,
    spaceBetween: 0,
    pagination: {
        el: '.pagination_icons-expenses',
        type: 'bullets',
        clickable: true,
    },
    parallax:true,
});

const swiperIconsIncome = new Swiper('.swiper_icons-income', {
    speed: 600,
    spaceBetween: 0,
    pagination: {
        el: '.pagination_icons-income',
        type: 'bullets',
        clickable: true,
    },
});

import changeOperationExpenses from "./modules/change-operation-expenses";
changeOperationExpenses(chartExpenses, objOperationsDate, arrDate, chartExpensesAndIncome, operationsAllDates);

let dateChangeOperationExpenses = new AirDatepicker('#date-change-operation-expenses', {
    inline: false,
    position:'right top',
    container: '.popup-change-operation-expenses-datepicker',
    dateFormat: 'yyyy-MM-dd',
})

import changeOperationIncome from "./modules/change-operation-income";
changeOperationIncome(chartIncome, objOperationsDateIncome, arrDateIncome, chartIncomeBar, operationsAllDates);

let dateChangeOperationIncome = new AirDatepicker('#date-change-operation-income', {
    inline: false,
    position:'right top',
    container: '.popup-change-operation-income-datepicker',
    dateFormat: 'yyyy-MM-dd',
})

import addMoreOperations from "./modules/add-more-operations-expenses";
addMoreOperations();

import addMoreOperationsIncome from "./modules/add-more-operations-income";
addMoreOperationsIncome();

const swiperCategories = new Swiper('.swiper_categories', {
    speed: 600,
    spaceBetween: 0,
    pagination: {
        el: '.pagination_done-expenses',
        type: 'bullets',
        clickable: true,
    },
});

import addCategoryExpenses from "./modules/add-category-expenses";
addCategoryExpenses(chartExpenses);

const swiperCategoriesIncome = new Swiper('.swiper_categories-income', {
    speed: 600,
    spaceBetween: 0,
});

import addCategoryIncome from "./modules/add-category-income";
addCategoryIncome(chartIncome);