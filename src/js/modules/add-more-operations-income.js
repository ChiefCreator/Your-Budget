function addMoreOperationsIncome() {
    let more = document.querySelector(".operation-list__more_income");
    let moreText = more.querySelector(".tool-operation__item-text");
    let blockToPaste = document.querySelector(".operation-list__item_income");

    more.addEventListener("click", addOperations);

    function addOperations() {

        if (!more.classList.contains("open")) {
            setAllOperationToList();

            moreText.textContent = "Свернуть операции";
            more.classList.add("open");
        } else {
            setThreeOperationsToList();

            moreText.textContent = "Все операции";
            more.classList.remove("open");
        }
    }

    function setAllOperationToList() {

        if (localStorage.getItem("operationsIncomeDate")) {

            blockToPaste.querySelectorAll(".list-operation__wrapper").forEach(block => {
                block.remove()
            })
        
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
                more.classList.add("operation-list__more_act")
            }   
        }
    }
    function setThreeOperationsToList() {
        if (localStorage.getItem("operationsIncomeDate")) {
            
            blockToPaste.querySelectorAll(".list-operation__wrapper").forEach(block => {
                block.remove()
            })

            let count = 0;
            for (let [key, value] of Object.entries(JSON.parse(localStorage.getItem("operationsIncomeDate"))).reverse()) {

                let block = `<div class="list-operation__wrapper" data-dat-wrapper="income${key}">
                <p class="list-operation__date">${key}</p>
                <div class="list-operation__wrapper-content" data-dat="income${key}">
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
                more.classList.add("operation-list__more_act")
            } 
        }
    }
}

export default addMoreOperationsIncome;