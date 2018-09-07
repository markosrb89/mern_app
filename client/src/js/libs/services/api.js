
import Auth from "../services/auth";

const baseApiUrl = process.env.API_URL;

async function getProducts() {
    try {
        const response = await fetch(`${baseApiUrl}/products`, {
            headers: generateHeaders()
        });
        return isTokenExpired(response);
    } catch (error) {
        throw new Error(error);
    }
}

async function createProduct(name, price) {
    try {
        const response = await fetch(`${baseApiUrl}/products`, {
            method: "POST",
            headers: generateHeaders(),
            body: JSON.stringify({ name, price })
        });
        return isTokenExpired(response);
    } catch (error) {
        throw new Error(error);
    }
}

async function deleteProduct(productId) {
    try {
        const response = await fetch(`${baseApiUrl}/products/${productId}`, {
            method: "DELETE",
            headers: generateHeaders()
        });
        return isTokenExpired(response);
    } catch (error) {
        throw new Error(error);
    }
}

async function updateProduct(productId, name, price) {
    try {
        const response = await fetch(`${baseApiUrl}/products/${productId}`, {
            method: "PUT",
            headers: generateHeaders(),
            body: JSON.stringify({ name, price })
        });
        return isTokenExpired(response);
    } catch (error) {
        throw new Error(error);
    }
}

async function send(name, email, message) {
    try {
        const response = await fetch(`${baseApiUrl}/send`, {
            method: "POST",
            headers: generateHeaders(),
            body: JSON.stringify({ name, email, message })
        });
        return isTokenExpired(response);
    } catch(error) {
        throw new Error(error);
    }
}

function generateHeaders() {
    return new Headers({
        "Content-Type": "application/json",
        "Authorization": `Bearer ${Auth.getToken()}`
    });
}

function isTokenExpired(response) {
    if (response.status === 401) {
        throw new Error("token_expired");
    } else {
        return response.json();
    }
}

export { getProducts, createProduct, deleteProduct, updateProduct, send }