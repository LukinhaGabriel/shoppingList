interface shopping{
    id: string
    nome: string
}

const $itemForm = document.getElementById("itemform") as HTMLFormElement;
const $itemsList = document.getElementById("items-list") as HTMLUListElement;
const $inputItem = document.getElementById("item") as HTMLInputElement;

function loadItems():shopping[] {
    const items = localStorage.getItem("items");
    return items ? JSON.parse(items) : [];
}

function saveItems(items: shopping[]):void {
    localStorage.setItem("items", JSON.stringify(items));
}


//Adiciona Itens
function addItem(nome: string): void {
    const items = loadItems();
    const newItem:shopping =  {
        id: new Date().toISOString(),
        nome: nome
    };
    items.push(newItem);
    saveItems(items);
}

//Edita Itens
function editItem(id: string, newnome: string): void{
    const items = loadItems();
    const item  = items.find(item => item.id === id);
    if(item){
        item.nome = newnome;
        saveItems(items)
    }
}

//Remove Item
function removeItem(id: string):void{
    const items = loadItems();
    const newItems  = items.filter(item => item.id !== id);
    saveItems(newItems);
}



function renderItems(): void{
    const items = loadItems();
    $itemsList.innerHTML = "";
    items.forEach(item => {
        const $li = document.createElement("li") as HTMLLIElement;
        $li.className = 'list-group-item';
        $itemsList.appendChild($li);
        
        const $text = document.createElement("p") as HTMLParagraphElement;
        $text.textContent = item.nome;
        $text.contentEditable = "true";
        $li.appendChild($text);
        
        $text.addEventListener("blur", (event) => {
            const newNome = (event.target as HTMLParagraphElement).textContent;
            if(newNome.trim() === ""){
                removeItem(item.id);
            } else{
                editItem(item.id, newNome)
            }
            renderItems();
        });

        const $btnRemove = document.createElement("button") as HTMLButtonElement;
        $btnRemove.className = "button button-remove";
        $btnRemove.type = "button";
        $btnRemove.textContent = "X";
        $li.appendChild($btnRemove);

        $btnRemove.addEventListener("click", () => {
            removeItem(item.id);
            renderItems();
        });
    });
}


$itemForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const nome = $inputItem.value.trim();

    if(nome){
        addItem(nome);
        $inputItem.value = "";
        renderItems();
    }
})

renderItems();