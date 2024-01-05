const addItemSelector = document.getElementById('most-common');
const addItemInput = document.getElementById('text-input'); // maybe change to access value later
const addItemBtn = document.getElementById('add-item-btn');
const itemListDisplayed = document.getElementById('list-of-items');

let currentItemList = [];

addItemBtn.addEventListener('click', function(){
    let itemToAdd = addItemInput.value;
    currentItemList.push(itemToAdd);
    addItemInput.value = "";

    // console.log(currentItemList);
    renderList(currentItemList);
});

addItemSelector.addEventListener('change', function(){
    let itemToAdd = addItemSelector.value;
    currentItemList.push(itemToAdd);

    // console.log(currentItemList);
    renderList(currentItemList);
})

const renderList = (currentItemList) => {
    let listInHTML = "";
    for (let item of currentItemList) {
        listInHTML += `
            <div class="list-item" id="${item}">
                <div class="list-item__item-text"><p><span class="emoji">🟢</span>${item}</p></div>
                <div class="remove-item-btn">X</div>
            </div>`
    }

    itemListDisplayed.innerHTML = listInHTML;
}

itemListDisplayed.addEventListener('click', function(e) {
    // Checks that the click was on the remove btn
    if (e.target.classList.contains('remove-item-btn')) {
        // id of the parent element of the remove btn that was clicked
        let idToRemove = e.target.parentElement.id;
        // Remove the idToRemove from the currentItemList
        const tempArray = currentItemList.filter((item) => item != idToRemove);
        currentItemList = tempArray;
        // re render the item list to the ui once an item has been removed
        renderList(currentItemList);
    }
})

// const removeItemFromList = (e) => {
//     (e.target.id)
// }