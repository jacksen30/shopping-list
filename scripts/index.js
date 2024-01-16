import { commonItemList } from '/scripts/commonItemList.js';
const addItemInput = document.getElementById('text-input');
const addItemBtn = document.getElementById('add-item-btn');
const itemListDisplayed = document.getElementById('list-of-items');
const autoCompleteSuggestionsList = document.getElementById('auto-complete-suggestion-list');

let currentItemList = [];

// Function to captalise first character of a string
const capitaliseString = (str) => {
    if (str && typeof str === 'string') {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    return str;
}

// Function to update autocomplete suggestions
const updateSuggestions = (userInput) => {
    autoCompleteSuggestionsList.innerHTML = "";
    let suggestionHTML = "";

    // filter commonItemList for items that starts with user inputted text
    const filteredItems = commonItemList.filter(item => item.toLowerCase().startsWith(userInput.toLowerCase()));
    // Get the first 3 items from filteredItems
    const filteredItemsTop3 = filteredItems.slice(0, 3);

    if (userInput === "") {
        autoCompleteSuggestionsList.style.display = "none";
        return;
    }

    if (filteredItems.length === 0) {
        autoCompleteSuggestionsList.style.display = "none";
        return;
    }

    filteredItemsTop3.forEach(item => {
        suggestionHTML += `<li>${item}</li>`;
        console.log(suggestionHTML);
    });

    autoCompleteSuggestionsList.innerHTML = suggestionHTML;
    autoCompleteSuggestionsList.style.display = "block";
}



addItemInput.addEventListener('input', function(){
    updateSuggestions(addItemInput.value);
})


addItemBtn.addEventListener('click', function(){
    // let itemToAdd = addItemInput.value;
    let itemToAdd = capitaliseString(addItemInput.value);
    // If item is already in currentItemList don't allow it to be added again
    if (!currentItemList.includes(itemToAdd)) {
        currentItemList.push(itemToAdd);
        renderList(currentItemList);
    } else {
        console.log('Duplicate items can not be added to the list!');
    }
    // Regardless of if itemToAdd already is included in currentItemList clear user input field
    addItemInput.value = "";
    // Hides autoCompleteSuggestionsList one addItemBtn is clicked
    autoCompleteSuggestionsList.style.display = "none";
});

autoCompleteSuggestionsList.addEventListener('click', function(e) {
    // let itemToAdd = addItemInput.value;
    let itemToAdd = capitaliseString(e.target.textContent);
    // If item is already in currentItemList don't allow it to be added again
    if (!currentItemList.includes(itemToAdd)) {
        currentItemList.push(itemToAdd);
        renderList(currentItemList);
    } else {
        console.log('Duplicate items can not be added to the list!');
    }
});

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
