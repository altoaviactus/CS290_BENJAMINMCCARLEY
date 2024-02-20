let items = [];

function addItem() {
    const itemName = document.getElementById('itemName').value.trim();
    const itemAmount = parseInt(document.getElementById('itemAmount').value, 10);
    const itemPriority = document.getElementById('itemPriority').value;

    if (itemName === '') {
        alert('Please enter an item name.');
        return;
    }

    const item = {
        id: items.length + 1,
        name: itemName,
        amount: itemAmount,
        priority: itemPriority,
        obtained: false
    };

    items.push(item);
    document.getElementById('itemName').value = '';
    document.getElementById('itemAmount').value = 1;
    displayItems();
}

function displayItems() {
    const itemsContainer = document.getElementById('items');
    itemsContainer.innerHTML = '';

    items.forEach(item => {
        const itemElement = document.createElement('div');

        switch (item.priority) {
            case 'High':
                itemElement.style.color = 'red';
                break;
            case 'Medium':
                itemElement.style.color = 'orange';
                break;
            case 'Low':
                itemElement.style.color = 'green';
                break;
        }

        const checkBox = document.createElement('input');
        checkBox.type = 'checkbox';
        checkBox.checked = item.obtained;
        checkBox.onclick = () => toggleObtained(item.id);
        itemElement.appendChild(checkBox);

        itemElement.append(`${item.name} - Amount: ${item.amount} (Priority: ${item.priority})`);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Remove';
        deleteButton.onclick = () => deleteItem(item.id);
        itemElement.appendChild(deleteButton);

        itemsContainer.appendChild(itemElement);
    });
}

function deleteItem(itemId) {
    items = items.filter(item => item.id !== itemId);
    displayItems();
}

function toggleObtained(itemId) {
    const item = items.find(item => item.id === itemId);
    if (item) {
        item.obtained = !item.obtained;
        displayItems();
    }
}

function updateDateTime() {
    const now = moment().format('LLLL');
    document.getElementById('dateTime').innerText = `Current Time: ${now}`;
}

updateDateTime();
setInterval(updateDateTime, 60000);
