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

import togglePopup from "./modules/toggle-popup";
togglePopup();

import addCategoryExpenses from "./modules/add-category-expenses";
addCategoryExpenses(chartExpenses,arrOfCategories);

import addCategoryIncome from "./modules/add-category-income";
addCategoryIncome(chartIncome, categoriesIncome);

import addOperationExpenses from "./modules/add-operation-expenses";
addOperationExpenses(chartExpenses);

import addOperationIncome from "./modules/add-operation-income";
addOperationIncome(chartIncome);

import switchCategory from "./modules/switch-category";
switchCategory();