const form = document.querySelector("form");
const titleElem = document.querySelector("#title");
const descElem = document.querySelector("#description");
const body = document.body;
const submitBtn = document.querySelector("#submitBtn");

const sound = new Audio("./sound_1.mp3");
let updatingTodoIndex = null;

const allTasks = localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")) : [];

const allTasksContainer = document.createElement("div");
allTasksContainer.classList.add("allTasksContainer");
body.appendChild(allTasksContainer);

const createTasks = () => {

    allTasksContainer.innerHTML = "";
    allTasks.forEach((item, index) => {

        const task = document.createElement("div");
        task.classList.add("task");

        const title = document.createElement("p");
        title.classList.add("title");
        title.textContent = item.title;

        const desc = document.createElement("p");
        desc.classList.add("desc");
        desc.textContent = item.description;

        const controls = document.createElement("div");
        controls.classList.add("controls");
        // delete btn
        const deleteBtn = document.createElement("i");
        deleteBtn.classList.add("bi", "bi-trash", "delete");

        deleteBtn.addEventListener("click", () => { deleteTask(index) });
        // complete Btn
        const completeBtn = document.createElement("i");
        completeBtn.classList.add("bi", "bi-check-square", "checked");

        completeBtn.addEventListener("click", function () {
            allTasks[index].completed = !allTasks[index].completed;

            localStorage.setItem("tasks", JSON.stringify(allTasks));
            createTasks();
        });

        if (item.completed) {
            title.classList.toggle("completed")
            desc.classList.toggle("completed")
        }

        const updateBtn = document.createElement("i");
        updateBtn.classList.add("bi", "bi-pencil-square");
        updateBtn.addEventListener("click", () => updateTodo(index));

        controls.appendChild(updateBtn);
        controls.appendChild(deleteBtn);
        controls.appendChild(completeBtn);
        task.appendChild(controls);
        task.appendChild(title);
        task.appendChild(desc);
        allTasksContainer.appendChild(task);
    })
};

const deleteTask = (index) => {
    allTasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(allTasks));
    createTasks();
}
const updateTodo = (index) => {
    if (allTasks[index].completed) return;

    updatingTodoIndex = allTasks[index];
    titleElem.value = updatingTodoIndex.title;
    descElem.value = updatingTodoIndex.description;

    submitBtn.textContent = "Update Task";
    window.scrollTo({ top: 0, behavior: "smooth" })
}

const checkValidation = () => {
    if (titleElem.value.trim() === "" || descElem.value.trim() === "") {
        alert("Enter the Title or Description properly  Thank you");
        return false;
    }
    return true;
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!checkValidation()) return null;

    if (updatingTodoIndex || !updatingTodoIndex.completed) {
        submitBtn.textContent = "Update Todo"
        updatingTodoIndex.title = titleElem.value;
        updatingTodoIndex.description = descElem.value;
        updatingTodoIndex = null;

        submitBtn.textContent = "Add Task";
        localStorage.setItem("tasks",JSON.stringify(allTasks));
    } else {
        allTasks.push({
            title: titleElem.value,
            description: descElem.value,
            completed: false,
        });
    }

    sound.play();
    createTasks();

    titleElem.value = "";
    descElem.value = "";

    localStorage.setItem("tasks", JSON.stringify(allTasks));
});

createTasks();