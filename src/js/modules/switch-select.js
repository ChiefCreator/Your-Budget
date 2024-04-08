function switchSelect() {
    document.querySelectorAll(".select").forEach(function(dropdownWrapper) {

        const dropdownButtom = dropdownWrapper.querySelector(".select__button")
        const dropdown = dropdownWrapper.querySelector(".select__dropdown")
        const dropdownList = dropdownWrapper.querySelector(".select__dropdown-list")
        const dropdownListItems =  dropdownWrapper.querySelectorAll(".select__dropdown-item")
        const dropdownInput = dropdownWrapper.querySelector(".select__input-hidden")
        
        dropdownButtom.addEventListener("click", function() {
           
            dropdownList.classList.toggle("select__dropdown-list_visible");
            dropdown.classList.toggle("select__dropdown_visible");
            this.classList.add("select__button_active");
        })
        
        dropdownListItems.forEach(item => {
            item.addEventListener("click", function (e) {
                e.stopPropagation()
                dropdownButtom.textContent = this.textContent;
                dropdownButtom.focus();
                dropdownInput.value = this.dataset.value
                dropdownList.classList.remove("select__dropdown-list_visible");
                dropdown.classList.remove("select__dropdown_visible");
            })
        })
        
        document.addEventListener("click", function(e) {
            if (e.target != dropdownButtom) {
                dropdownList.classList.remove("select__dropdown-list_visible");
                dropdown.classList.remove("select__dropdown_visible");
            }
        })
    })
}

export default switchSelect;