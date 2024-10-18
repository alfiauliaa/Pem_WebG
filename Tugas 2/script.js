// Mendapatkan referensi ke elemen HTML
const inputBox = document.getElementById("inputBox");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");

// Variable untuk menyimpan todo yang sedang diedit
let todoBeingEdited = null;

// ========== FUNGSI OPERASI DASAR TODO ==========

// tambah to do
function addTodo() {
    const todoText = inputBox.value.trim();
    
    if (todoText.length <= 0) {
        alert("Please enter valid task");
        return;
    }

    if (isEditMode()) {
        handleEditTodo(todoText);
    } else {
        createNewTodo(todoText);
    }

    inputBox.value = "";
}

function isEditMode() {
    return addBtn.value === "Edit";
}

function handleEditTodo(newText) {
    // Update teks di localStorage
    updateTodoInStorage(todoBeingEdited.target.previousElementSibling.innerHTML, newText);
    
    // Update teks di tampilan
    todoBeingEdited.target.previousElementSibling.innerHTML = newText;
    
    // Reset mode edit
    addBtn.value = "Add";
    todoBeingEdited = null;
}

function createNewTodo(text) {
    const li = createTodoElement(text);
    todoList.appendChild(li);
    saveTodoToStorage(text);
}

function createTodoElement(text) {
    // Buat elemen li sebagai container
    const li = document.createElement("li");
    
    // Tambahkan teks todo
    const p = document.createElement("p");
    p.innerHTML = text;
    li.appendChild(p);
    
    // Tambahkan tombol edit
    const editBtn = createButton("Edit", ["btn", "editBtn"]);
    li.appendChild(editBtn);
    
    // Tambahkan tombol hapus
    const deleteBtn = createButton("Remove", ["btn", "deleteBtn"]);
    li.appendChild(deleteBtn);
    
    return li;
}

// Fungsi untuk membuat button dengan class tertentu
function createButton(text, classes) {
    const button = document.createElement("button");
    button.innerText = text;
    button.classList.add(...classes);
    return button;
}

// Fungsi untuk menangani klik pada todo (edit/delete)
function handleTodoClick(event) {
    if (event.target.innerHTML === "Remove") {
        handleRemoveTodo(event);
    } else if (event.target.innerHTML === "Edit") {
        handleStartEdit(event);
    }
}

// Fungsi untuk menangani penghapusan todo
function handleRemoveTodo(event) {
    const todoElement = event.target.parentElement;
    todoList.removeChild(todoElement);
    deleteTodoFromStorage(todoElement);
}

// Fungsi untuk memulai proses edit
function handleStartEdit(event) {
    inputBox.value = event.target.previousElementSibling.innerHTML;
    inputBox.focus();
    addBtn.value = "Edit";
    todoBeingEdited = event;
}

// ========== FUNGSI LOCALSTORAGE ==========

// Fungsi untuk menyimpan todo ke localStorage
function saveTodoToStorage(todo) {
    const todos = getTodosFromStorage();
    todos.push(todo);
    updateStorage(todos);
}

// Fungsi untuk mengambil todos dari localStorage
function getTodosFromStorage() {
    return JSON.parse(localStorage.getItem("todos")) || [];
}

// Fungsi untuk update localStorage
function updateStorage(todos) {
    localStorage.setItem("todos", JSON.stringify(todos));
}

// Fungsi untuk menghapus todo dari localStorage
function deleteTodoFromStorage(todoElement) {
    const todos = getTodosFromStorage();
    const todoText = todoElement.children[0].innerHTML;
    const todoIndex = todos.indexOf(todoText);
    
    if (todoIndex > -1) {
        todos.splice(todoIndex, 1);
        updateStorage(todos);
    }
}

// Fungsi untuk mengupdate todo di localStorage
function updateTodoInStorage(oldText, newText) {
    const todos = getTodosFromStorage();
    const todoIndex = todos.indexOf(oldText);
    
    if (todoIndex > -1) {
        todos[todoIndex] = newText;
        updateStorage(todos);
    }
}

// Fungsi untuk memuat todos saat halaman dimuat
function loadTodos() {
    const todos = getTodosFromStorage();
    todos.forEach(todo => {
        createNewTodo(todo);
    });
}

// ========== EVENT LISTENERS ==========
document.addEventListener("DOMContentLoaded", loadTodos);
addBtn.addEventListener("click", addTodo);
todoList.addEventListener("click", handleTodoClick);