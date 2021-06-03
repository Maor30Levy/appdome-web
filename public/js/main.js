const form = document.getElementById('form');
const errorElement = document.getElementById('error');
const user = form.children[0];
const pass = form.children[1];
const resElement = document.getElementById('res');
form.addEventListener('submit', async (event) => {
    event.preventDefault();
    errorElement.className = 'none';
    try {
        const result = await fetch('/server', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user: user.value, pass: pass.value })
        });
        if (!result.ok) {
            throw {
                status: result.status,
                message: result.statusText
            }
        }
        const data = (await result.json());
        resElement.innerHTML = data.data;
        resElement.className = 'on';
        console.log(resElement)
    } catch (err) {
        console.log(err.status)
        errorElement.innerText = err.message;
        errorElement.className = 'on';
    }
});