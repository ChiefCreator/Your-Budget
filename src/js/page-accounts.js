import AirDatepicker from 'air-datepicker';
import 'air-datepicker/air-datepicker.css';

let dateText = document.querySelector(".main-date__value");
let currentDate = new Date().getFullYear() + "-" + ("0" + (+(new Date()).getMonth() + 1)).slice(-2);
dateText.textContent = transformDate()
if (!localStorage.getItem("currentDate")) {
    localStorage.setItem("currentDate", currentDate);
}
if (localStorage.getItem("currentDate")) {
    dateText.textContent = transformDate(localStorage.getItem("currentDate")); 
} else if (localStorage.getItem("currentDate") == undefined) {
    dateText.textContent = "Выберите дату"; 
} else {
    dateText.textContent = "Выберите дату"; 
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

        changeStorage();

        function changeStorage() {
            localStorage.setItem("currentDate", formattedDate);
        
            sortArrayByCurrentDate(JSON.parse(localStorage.getItem("itemOperationExpenses")), "itemOperationExpensesSortedByCurrenDate");
            sortArrayByCurrentDate(JSON.parse(localStorage.getItem("itemOperationIncome")), "itemOperationIncomeSortedByCurrenDate");
            
            if (JSON.parse(localStorage.getItem("itemOperationExpensesSortedByCurrenDate").length > 0)) {
                localStorage.setItem("operationsExpensesDate", JSON.stringify(sortDates(createObjectDateKeys("itemOperationExpensesSortedByCurrenDate"))));
            }
            if (JSON.parse(localStorage.getItem("itemOperationIncomeSortedByCurrenDate").length > 0)) {
                localStorage.setItem("operationsIncomeDate", JSON.stringify(sortDates(createObjectDateKeys("itemOperationIncomeSortedByCurrenDate"))));
            }
        
            localStorage.setItem("operationsAllDate", JSON.stringify(uniteObjectsByDate(JSON.parse(localStorage.getItem("operationsExpensesDate")), JSON.parse(localStorage.getItem("operationsIncomeDate")))));
        
            localStorage.setItem("itemCategoriesExpensesSortedByCurrenDate", JSON.stringify(createArrayCategoriesByCurrentDate("operations", "itemOperationExpensesSortedByCurrenDate")))
            localStorage.setItem("itemCategoriesIncomeSortedByCurrenDate", JSON.stringify(createArrayCategoriesByCurrentDate("operationsIncome", "itemOperationIncomeSortedByCurrenDate")))

            if (localStorage.getItem("operationsExpensesDate")) changeArrayForCharts(JSON.parse(localStorage.getItem("operationsExpensesDate")), "objOfBgOfOperationsExpenses", "arrOfCostsOfOperationsExpenses");
            if (localStorage.getItem("operationsIncomeDate")) changeArrayForCharts(JSON.parse(localStorage.getItem("operationsIncomeDate")), "objOfBgOfOperationsIncome", "arrOfCostsOfOperationsIncome");
        }
        
        return formattedDate;
        },
    buttons: buttonYear,
})

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

function createObjectDateKeys(arr) {
    let newObjDate = {}
    JSON.parse(localStorage.getItem(arr)).forEach(item => {
        if (!newObjDate[item.date]) {
            newObjDate[item.date] = [item];
        } else {
            newObjDate[item.date].push(item);
        }
    });

    return newObjDate;
}

function sortDates(obj) {
    const sortedDates = Array.from(Object.keys(obj).sort((a, b) => new Date(b) - new Date(a))).reverse();
    const sortedObj = sortedDates.reduce((acc, date) => {
        acc[date] = obj[date];
        return acc;
    }, {});

    return sortedObj;
}

function createArrayCategoriesByCurrentDate(arr1, arr2) {
    let mergedArray = [];
                
    if (localStorage.getItem(arr2)) {
        mergedArray = [...JSON.parse(localStorage.getItem(arr1)), ...JSON.parse(localStorage.getItem(arr2))];
    } else {
        mergedArray = [...JSON.parse(localStorage.getItem(arr1))];
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

    return Object.values(grouped);
}

function changeArrayForCharts(objKeyDates, objBgNameStorage, arrCostsNameStorage) {
    let obj = {}
    if (objKeyDates) obj = sortDates(objKeyDates)
    console.log(objKeyDates)
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
    console.log(objKeyDates)
    for (let key of Object.keys(objKeyDates)) {
        let temp = key.split(".").reverse()
        temp = temp.join("-")
        arrDate.push(temp);
    }

    localStorage.setItem(objBgNameStorage, JSON.stringify(bgArray))
    localStorage.setItem(arrCostsNameStorage, JSON.stringify(OperationSumCosts))
}