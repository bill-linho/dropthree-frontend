const url = 'http://localhost:3000'

export async function getCategories() {
    try {
        const response = await fetch(`${url}/categoria`);
        const json = await response.json();
        return json.dados;
    } catch (e) {
        console.error("Erro categoria:", e);
        return [];
    }
}