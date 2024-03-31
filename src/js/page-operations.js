if (localStorage.getItem("operationsAllDate")) {
    let blockToPaste = document.querySelector(".list-all-operation");
        if (blockToPaste) {
            for (let [key, value] of Object.entries(JSON.parse(localStorage.getItem("operationsAllDate"))).reverse()) {

                let block = `<div class="list-all-operation__wrapper" data-dat="all${key}">
                        <p class="list-all-operation__date">${key}</p>
                    </div>`;
                function parserBlockToPaste(block) {
                    var parser = new DOMParser();
                    let teg = parser.parseFromString(block, 'text/html');
                    let item = teg.querySelector(".list-all-operation__wrapper");
                    return item;
                }
                blockToPaste.append(parserBlockToPaste(block));
                for (let i = 0;i < value.length;i++) {
    
                    let itemCategory = "";
                        if (value[i].comment) {
                            itemCategory = `<div class="list-category__item item-category expand-operation">
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
                            itemCategory = `<div class="list-category__item item-category expand-operation">
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
                    document.querySelector(`[data-dat="all${key}"]`).append(parser(itemCategory))
                }
            } 
        }
}

const ctxBubbles = document.getElementById('chartAllOperation');
const chartOperationsBubbles = new Chart(ctxBubbles, {
    type: 'bubble',
    data: {
        datasets: [

        ],
    },
    options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: false
          }
        },
        scales: {
            x: {
                type: "time",
                time: {
                    unit: "day"
                },
                ticks: {
                    stepSize: 5
                }
            },
            y: {
                ticks: {
                    stepSize: 200
                }
            }
        },
      },
});

function operationToChart() {
    let obj = JSON.parse(localStorage.getItem("operationsAllDate"))

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
    for (let key of Object.keys(JSON.parse(localStorage.getItem("operationsAllDate")))) {
        let temp = key.split(".").reverse()
        temp = temp.join("-")
        arrDate.push(temp);
    }
    console.log(arrDate)
    
    let total = 0;
    for (let i = 0;i < OperationSumCosts.length;i++) {
        for (let k = 0;k < OperationSumCosts[i].length;k++) {
            total += OperationSumCosts[i][k]
        }   
    }
    console.log(OperationSumCosts)
    console.log(total)

    let radiusesArr = []
    for (let i = 0;i < OperationSumCosts.length;i++) {
        radiusesArr.push([]);
        for (let k = 0;k < OperationSumCosts[i].length;k++) {
            radiusesArr[i].push(OperationSumCosts[i][k] / total * 150)
        }   
    }
    console.log(radiusesArr)

    
    chartOperationsBubbles.data.labels = arrDate;
    for (let i = 0;i < OperationSumCosts.length;i++) {
        if (!chartOperationsBubbles.data.datasets[i]) {
            chartOperationsBubbles.data.datasets.push({
                label: 'Dataset 1',
                backgroundColor: [],
                data: [],
                radius: [],
            })
        }
        
        chartOperationsBubbles.data.datasets[i].data = OperationSumCosts[i];
        chartOperationsBubbles.data.datasets[i].backgroundColor = bgArray[i];
        chartOperationsBubbles.data.datasets[i].radius = radiusesArr[i];
    }
    chartOperationsBubbles.update();
}
operationToChart()

import expandOperation from "./modules/expand-operation";
expandOperation();

import deleteOperationExpenses from "./modules/delete-operation-expenses";
deleteOperationExpenses();