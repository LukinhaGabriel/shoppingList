const $itemForm = document.getElementById("itemform");
const $itemsList = document.getElementById("items-list");
const $inputItem = document.getElementById("item");
function loadItems() {
    const items = localStorage.getItem("items");
    return items ? JSON.parse(items) : [];
}
function saveItems(items) {
    localStorage.setItem("items", JSON.stringify(items));
}
//Adiciona Itens
function addItem(nome) {
    const items = loadItems();
    const newItem = {
        id: new Date().toISOString(),
        nome: nome
    };
    items.push(newItem);
    saveItems(items);
}
//Edita Itens
function editItem(id, newnome) {
    const items = loadItems();
    const item = items.find(item => item.id === id);
    if (item) {
        item.nome = newnome;
        saveItems(items);
    }
}
//Remove Item
function removeItem(id) {
    const items = loadItems();
    const newItems = items.filter(item => item.id !== id);
    saveItems(newItems);
}
function renderItems() {
    const items = loadItems();
    $itemsList.innerHTML = "";
    items.forEach(item => {
        const $li = document.createElement("li");
        $li.className = 'list-group-item';
        $itemsList.appendChild($li);
        const $text = document.createElement("p");
        $text.textContent = item.nome;
        $text.contentEditable = "true";
        $li.appendChild($text);
        $text.addEventListener("blur", (event) => {
            const newNome = event.target.textContent;
            if (newNome.trim() === "") {
                removeItem(item.id);
            }
            else {
                editItem(item.id, newNome);
            }
            renderItems();
        });
        const $btnRemove = document.createElement("button");
        $btnRemove.className = "btn btn-danger btn-sm float-right";
        $btnRemove.type = "button";
        $btnRemove.textContent = "X";
        $itemsList.appendChild($btnRemove);
        $btnRemove.addEventListener("click", () => {
            removeItem(item.id);
            renderItems();
        });
    });
}
$itemForm.addEventListener("click", (event) => {
    event.preventDefault();
    const nome = $inputItem.value.trim();
    if (nome) {
        addItem(nome);
        $inputItem.value = "";
        renderItems();
    }
});
renderItems();
