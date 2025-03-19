const form = document.querySelector("form");
const titleElem = document.querySelector("#title");
const descElem = document.querySelector("#description");
const body = document.body;

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

        const deleteBtn = document.createElement("i");
        deleteBtn.classList.add("bi","bi-trash","delete");

        deleteBtn.addEventListener("click",()=>{
           deleteTask(index)
        });

        const completeBtn = document.createElement("i");
        completeBtn.classList.add("bi","bi-check-square")

        const updateBtn = document.createElement("i");
        updateBtn.classList.add("bi","bi-pencil-square");
       
        controls.appendChild(updateBtn);
        controls.appendChild(deleteBtn);
        controls.appendChild(completeBtn);
        task.appendChild(controls);
        task.appendChild(title);
        task.appendChild(desc);
        allTasksContainer.appendChild(task);
    })
};

const deleteTask = (index)=>{
    allTasks.splice(index,1);
    localStorage.setItem("tasks",JSON.stringify(allTasks));
    createTasks();
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    allTasks.push({
        title: titleElem.value,
        description: descElem.value,
        completed: false,
    });

    createTasks();

    titleElem.value = "";
    descElem.value = "";

    localStorage.setItem("tasks", JSON.stringify(allTasks));
});

createTasks();