document.addEventListener("DOMContentLoaded", showList);

const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
    const task = inputBox.value.trim();
    if (!task) {
        alert("Please enter a task!");
        return;
    }

    const li = document.createElement("li");
    li.textContent = task;

    const span = document.createElement("span");
    span.innerHTML = "\u00D7";
    span.setAttribute("aria-label", "Remove task");
    span.onclick = () => {
        li.remove();
        saveData();
    };

    li.appendChild(span);

    // Mark task as completed
    li.onclick = (e) => {
        if (e.target.tagName !== "SPAN") {
            li.classList.toggle("completed");
            saveData();
        }
    };

    listContainer.appendChild(li);
    inputBox.value = "";
    saveData();
}

function saveData() {
    localStorage.setItem("tasks", listContainer.innerHTML);
}

function showList() {
    listContainer.innerHTML = localStorage.getItem("tasks") || "";
    Array.from(listContainer.children).forEach((li) => {
        li.querySelector("span").onclick = () => {
            li.remove();
            saveData();
        };
        li.onclick = (e) => {
            if (e.target.tagName !== "SPAN") {
                li.classList.toggle("completed");
                saveData();
            }
        };
    });
}
