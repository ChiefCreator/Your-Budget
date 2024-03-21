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
let arrDate = new Set();
let objOperationsDate = {};
if (!localStorage.getItem("operationsExpensesDate")) {
    objOperationsDate = {};
} else {
    objOperationsDate = JSON.parse(localStorage.getItem("operationsExpensesDate"));
    arrDate = new Set(Object.keys(objOperationsDate));
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
 
const ctxExpensesAndIncome = document.getElementById('chartExpensesAndIncome');
const chartExpensesAndIncome = new Chart(ctxExpensesAndIncome, {
    type: 'bar',
    data: {
        labels: Array.from(arrDate),
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
        y: {
          display: false
        }
      }
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

let arrDateIncome = new Set();
let objOperationsDateIncome = {};
if (!localStorage.getItem("operationsIncomeDate")) {
    objOperationsDateIncome = {};
} else {
    objOperationsDateIncome = JSON.parse(localStorage.getItem("operationsIncomeDate"));
    arrDateIncome = new Set(Object.keys(objOperationsDateIncome));
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
        labels: Array.from(arrDateIncome),
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