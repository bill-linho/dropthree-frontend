const url = 'http://localhost:3000'

export async function getUsuario() {
    const request = `${url}/usuario`;

    try {
        const response = await fetch(request);
        const json = await response.json();
        return json.dados; 
    } catch (e) {
        return null;
    }
}

export async function login(email, senha) {
    const request = `${url}/login`;

    try {
        const response = await fetch(request, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, senha })
        });

        const json = await response.json();
        return json;

    } catch (e) {
        return null;
    }
}
export async function register(nome, email, telefone, senha) {
    const request = `${url}/usuario`;

    try {
        const response = await fetch(request, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nome, email, telefone, senha })
        });

        const json = await response.json();
        return json;

    } catch (e) {
        return null;
    }
}
