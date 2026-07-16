let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

showTasks();

document.getElementById("addBtn").addEventListener("click", addTask);

function addTask() {
    let input = document.getElementById("taskInput");

    if(input.value.trim() === "") return;

    tasks.push({
        text: input.value,
        done: false
    });

    input.value = "";

    saveData();
    showTasks();
}

function showTasks(type = "all") {

    let list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach((task,index)=>{

        if(type==="active" && task.done) return;
        if(type==="completed" && !task.done) return;

        let li=document.createElement("li");

        if(task.done){
            li.classList.add("completed");
        }

        li.innerHTML=`
        <span onclick="toggleTask(${index})">${task.text}</span>

        <div>
        <button onclick="editTask(${index})">Edit</button>
        <button onclick="deleteTask(${index})">Delete</button>
        </div>
        `;

        list.appendChild(li);
    });

}

function toggleTask(index){
    tasks[index].done=!tasks[index].done;
    saveData();
    showTasks();
}

function deleteTask(index){
    tasks.splice(index,1);
    saveData();
    showTasks();
}

function editTask(index){
    let value=prompt("Edit Task",tasks[index].text);

    if(value!==null && value.trim()!==""){
        tasks[index].text=value;
        saveData();
        showTasks();
    }
}

function filterTask(type){
    showTasks(type);
}

function saveData(){
    localStorage.setItem("tasks",JSON.stringify(tasks));
}