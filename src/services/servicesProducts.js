const url = 'http://localhost:3000'

export async function getProducts() {
    const request = `${url}/produto`
    try {
        const response = await fetch(request, {
            method: 'GET'
        })
        const data = await response.json()
        console.log(data);
        
        return data.dados;
    } catch (e) {
        console.error("Erro produtos:", e);
        return [];
    }
}