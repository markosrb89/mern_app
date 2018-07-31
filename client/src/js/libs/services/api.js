
async function getItems() {
    const response = await fetch(`${baseApiUrl}/items`);
    return response.json();
}

async function createItem(name, price) {
    const response = await fetch(`${baseApiUrl}/items`, {
        method: "POST",
        body: { name, price }
    });
    return response.json();
}

async function deleteItem(itemId) {
    const response = await fetch(`${baseApiUrl}/items/${itemId}`, {
        method: "DELETE"
    });
    return response.json();
}

async function updateItem(itemId) {
    const response = await fetch(`${baseApiUrl}/items/${itemId}`, {
        method: "PUT"
    });
    return response.json();
}

export { getItems, createItem, deleteItem, updateItem }