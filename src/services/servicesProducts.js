const url = 'http://localhost:3000'

export async function getProduct() {
    const request = `${url}/produto`
    try {
        const response = await fetch(request, {
            method: 'GET'
        })
        const data = await response.json()
        return data.data;
    } catch (e) {

    }
}