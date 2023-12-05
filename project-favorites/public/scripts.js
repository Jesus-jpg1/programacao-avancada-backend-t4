const ul = document.querySelector('ul');
const input = document.querySelector('input');
const form = document.querySelector('form');

function addElement({ name, url }) {
    const li = document.createElement('li');
    const a = document.createElement('a');
    const trash = document.createElement('span');

    // Verifica se a URL é válida usando a função URL do JavaScript
    try {
        new URL(url);
    } catch (error) {
        alert('Digite uma URL válida.');
        return;
    }

    a.href = url;
    a.innerHTML = name || url; // Usa o próprio link se o nome não for fornecido
    a.target = "_blank";

    trash.innerHTML = "x";
    trash.onclick = () => removeElement(li);

    ul.append(li);
    li.append(a);
    li.append(trash);
}

function removeElement(element) {
    element.remove();
}

form.addEventListener('submit', (event) => {
    event.preventDefault();

    let { value } = input;

    if (!value) {
        return alert('Preencha o campo!');
    }

    let [name, url] = value.split(',');

    // Se não houver vírgula, considera que o usuário inseriu apenas a URL
    if (!url) {
        url = name;
        name = ""; // Define como vazio para usar o próprio link como texto do link
    }

    addElement({ name, url });

    input.value = '';
});
