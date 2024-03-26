let arrOfCategories = [];

let bgArr = [];
let costArr = [];
let titles = [];

if (localStorage.getItem("categories")) {
    arrOfCategories = JSON.parse(localStorage.getItem("categories"));
    
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

if (localStorage.getItem("categoriesIncome")) {
    categoriesIncome = JSON.parse(localStorage.getItem("categoriesIncome"));
    
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
console.log(categoryCosts)
console.log(categoryBg)
console.log(arrDate)
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
            display: false
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
            display: false
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

let operationsDateAll = {};
if (localStorage.getItem("operationsAllDate")) {
    operationsDateAll = JSON.parse(localStorage.getItem("operationsAllDate"));
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
        sortArrayByCurrentDate(JSON.parse(localStorage.getItem("itemOperationExpenses")));

        let newObjDate = {}
        JSON.parse(localStorage.getItem("itemOperationExpensesSortedByCurrenDate")).forEach(item => {
            if (!newObjDate[item.date]) {
                newObjDate[item.date] = [item];
            } else {
                newObjDate[item.date].push(item);
            }
        });



        // 

        let blockToPaste = document.querySelector(".operation-list__item_expenses");

        blockToPaste.querySelectorAll(".list-operation__wrapper").forEach(block => {
            block.remove()
        })
        let sortedData = JSON.parse(localStorage.getItem("itemOperationExpensesSortedByCurrenDate"));
        let more = document.querySelector(".operation-list__more_expenses");

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

        // 

        if (JSON.parse(localStorage.getItem("itemOperationExpensesSortedByCurrenDate").length > 0)) {
            localStorage.setItem("operationsExpensesDate", JSON.stringify(sortDates(newObjDate)));
        }

        function operationToChart() {
            let obj = {}
            if (localStorage.getItem("operationsExpensesDate")) obj = sortDates(JSON.parse(localStorage.getItem("operationsExpensesDate")))
            // if (obj = {}) return
            console.log(obj)
    
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
            console.log(uniqueTitles,arrDate,costArray,OperationSumCosts,bgArray)
    
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
            console.log(chartExpensesAndIncome)
    
            localStorage.setItem("objOfBgOfOperationsExpenses", JSON.stringify(bgArray))
            localStorage.setItem("arrOfCostsOfOperationsExpenses", JSON.stringify(OperationSumCosts))
        }
        operationToChart() 

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

let currentDateStorage = []
currentDateStorage.push(JSON.parse(localStorage.getItem("itemOperationExpenses")))
localStorage.setItem("currentDateStorage", JSON.stringify(currentDateStorage))

let dateOperationExpenses = new AirDatepicker('#date-operation-expenses', {
    inline: true
})

let dateOperationIncome = new AirDatepicker('#date-operation-income', {
    inline: true
})

import togglePopup from "./modules/toggle-popup";
togglePopup();

import addCategoryExpenses from "./modules/add-category-expenses";
addCategoryExpenses(chartExpenses,arrOfCategories);

import addCategoryIncome from "./modules/add-category-income";
addCategoryIncome(chartIncome, categoriesIncome);

import addOperationExpenses from "./modules/add-operation-expenses";
addOperationExpenses(chartExpenses, objOperationsDate, arrDate, chartExpensesAndIncome, operationsDateAll);

import addOperationIncome from "./modules/add-operation-income";
addOperationIncome(chartIncome, objOperationsDateIncome, arrDateIncome, chartIncomeBar, operationsDateAll);

import switchCategory from "./modules/switch-category";
switchCategory();