
const baseApiUrl = "http://localhost:4000/api";

async function getProducts() {
    const response = await fetch(`${baseApiUrl}/products`);
    return response.json();
}

async function createProduct(name, price) {
    const response = await fetch(`${baseApiUrl}/products`, {
        method: "POST",
        body: JSON.stringify({ name, price })
    });
    return response.json();
}

async function deleteProduct(productId) {
    const response = await fetch(`${baseApiUrl}/products/${productId}`, {
        method: "DELETE"
    });
    return response.json();
}

async function updateProduct(productId, name, price) {
    const response = await fetch(`${baseApiUrl}/products/${productId}`, {
        method: "PUT",
        body: JSON.stringify({ name, price })
    });
    return response.json();
}

export { getProducts, createProduct, deleteProduct, updateProduct }