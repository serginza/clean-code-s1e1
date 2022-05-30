//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.

// Event handling, user interaction is what starts the code execution.

function todo() {
    const taskInput=document.getElementById("new-task");//Add a new task.
    const addButton=document.getElementsByTagName("button")[0];//first button
    const incompleteTaskHolder = document.getElementById("incomplete-tasks");//ul of #incompleteTasks
    const completedTasksHolder = document.getElementById("completed-tasks");//completed-tasks

    //New task list item
    const createNewTaskElement = function(taskString) {

        const listItem = document.createElement("li");

        //input (checkbox)
        const checkBox = document.createElement("input");//checkbx
        //label
        const label = document.createElement("label");//label
        //input (text)
        const editInput = document.createElement("input");//text
        //button.edit
        const editButton = document.createElement("button");//edit button

        //button.delete
        const deleteButton = document.createElement("button");//delete button
        const deleteButtonImg = document.createElement("img");//delete button image

        listItem.className = "element__str"
        label.innerText = taskString;
        label.className = 'element__task';

        //Each elements, needs appending
        checkBox.type = "checkbox";
        checkBox.className = "element__check";
        editInput.type = "text";
        editInput.className = "element__task_text";

        editButton.innerText = "Edit"; //innerText encodes special characters, HTML does not.
        editButton.className = "element__edit btn";

        deleteButton.className = "element__delete btn";
        deleteButtonImg.src = "../assets/icons/remove.svg";
        deleteButtonImg.className = "element__delete_img";
        deleteButton.appendChild(deleteButtonImg);

        //and appending.
        listItem.appendChild(checkBox);
        listItem.appendChild(label);
        listItem.appendChild(editInput);
        listItem.appendChild(editButton);
        listItem.appendChild(deleteButton);
        return listItem;
    };

    const addTask = function() {
        console.log("Add Task...");
        //Create a new list item with the text from the #new-task:
        if (!taskInput.value) {
            alert("The string cannot be empty!"); 
            return;
        };

        const listItem = createNewTaskElement(taskInput.value);

        //Append listItem to incompleteTaskHolder
        incompleteTaskHolder.appendChild(listItem);
        bindTaskEvents(listItem, taskCompleted);

        taskInput.value = "";
    };

    //Edit an existing task.
    const editTask = function() {
        console.log("Edit Task...");
        console.log("Change 'edit' to 'save'");

        const listItem = this.parentNode;

        const editInput = listItem.querySelector('input[type=text]');
        const label = listItem.querySelector("label");
        const editBtn = listItem.querySelector(".element__edit");
        const containsClass = listItem.classList.contains("edit-mode");
        //If class of the parent is .editmode
        if(containsClass) {

            //switch to .editmode
            //label becomes the inputs value.
            label.innerText = editInput.value;
            editBtn.innerText = "Edit";
        } else {
            editInput.value = label.innerText;
            editBtn.innerText = "Save";
        }

        //toggle .editmode on the parent.
        listItem.classList.toggle("edit-mode");
    };

    //Delete task.
    const deleteTask = function() {
        console.log("Delete Task...");

        const listItem = this.parentNode;
        const ul = listItem.parentNode;
        //Remove the parent list item from the ul.
        ul.removeChild(listItem);
    };


    //Mark task completed
    const taskCompleted = function() {
        console.log("Complete Task...");

        //Append the task list item to the #completed-tasks
        const listItem = this.parentNode;

        completedTasksHolder.appendChild(listItem);
        bindTaskEvents(listItem, taskIncomplete);
    };

    const taskIncomplete = function() {
        console.log("Incomplete Task...");
        //Mark task as incomplete.
        //When the checkbox is unchecked
        //Append the task list item to the #incompleteTasks.
        const listItem = this.parentNode;
        incompleteTaskHolder.appendChild(listItem);
        bindTaskEvents(listItem,taskCompleted);
    };

    const ajaxRequest=function() {
        console.log("AJAX Request");
    };

    //The glue to hold it all together.


    //Set the click handler to the addTask function.
    //addButton.onclick = addTask;
    addButton.addEventListener("click",addTask);
    addButton.addEventListener("click",ajaxRequest);

    const bindTaskEvents = function(taskListItem,checkBoxEventHandler) {
        console.log("bind list item events");
        //select ListItems children
        const checkBox = taskListItem.querySelector("input[type=checkbox]");
        const editButton = taskListItem.querySelector("button.element__edit");
        const deleteButton = taskListItem.querySelector("button.element__delete");

        //Bind editTask to edit button.
        editButton.onclick = editTask;
        //Bind deleteTask to delete button.
        deleteButton.onclick = deleteTask;
        //Bind taskCompleted to checkBoxEventHandler.
        checkBox.onchange = checkBoxEventHandler;
    };

    //cycle over incompleteTaskHolder ul list items
    //for each list item
    for (let i = 0; i < incompleteTaskHolder.children.length;i++) {

        //bind events to list items chldren(tasksCompleted)
        bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
    };

    //cycle over completedTasksHolder ul list items
    for (let i = 0; i < completedTasksHolder.children.length;i++) {
        //bind events to list items chldren(tasksIncompleted)
        bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
    };

};

todo();

// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.