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

import addCategory from "./modules/add-category";
addCategory();

import chooseIcon from "./modules/choose-icon";
chooseIcon(chartExpenses,arrOfCategories);

import addOperation from "./modules/add-operation";
addOperation(chartExpenses);