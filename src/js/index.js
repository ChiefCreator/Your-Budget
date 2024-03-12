let bgArr = [];
let costArr = [];
if (localStorage.getItem("categories")) {
    let arrOfCategories = JSON.parse(localStorage.getItem("categories"));
    
    arrOfCategories.forEach(item => {
        bgArr.push(item.bg);
        costArr.push(item.cost);
    })
}
const ctx = document.getElementById('myChart');
  
const chartExpenses = new Chart(ctx, {
    type: 'doughnut',
    data: {
        datasets: [{
            data: [...costArr],
            backgroundColor: [...bgArr],
            borderWidth: 1,
        }]
    },
});

import addCategory from "./modules/add-category";
addCategory();

import chooseIcon from "./modules/choose-icon";
chooseIcon(chartExpenses, bgArr,costArr);

// import graphis from "./modules/graphis";
// graphis();