const mainTodoElem = document.querySelector(".todo-lists-elem");
const inputValue = document.getElementById("inputValue");

const getTodoListFromLocal = () => {
   return JSON.parse(localStorage.getItem("youtubeTodoList"));
};

const addTodoListLocalStorage = (localTodoLists) =>{
    return localStorage.setItem("youtubeTodoList" , JSON.stringify(localTodoLists));

}

let localTodoLists = getTodoListFromLocal() || [];

const addTodoDynamicElement = (curElem) => {
    const divElement = document.createElement("div");
    divElement.classList.add("main_todo_div");
    divElement.innerHTML = ` <li>${curElem}</li> 
    <button class="deleteBtn">Delete</button>`
    mainTodoElem.append(divElement);
}


const addTodoList =(e) =>{
    e.preventDefault();
    const todolistValue = inputValue.value.trim();

    inputValue.value = "";
   
    if(todolistValue !="" && !localTodoLists.includes(todolistValue)){
    localTodoLists.push(todolistValue);
    localTodoLists = [...new Set(localTodoLists)];
    console.log(localTodoLists);
    localStorage.setItem("youtubeTodoList" ,  JSON.stringify(localTodoLists)
 );
    
    addTodoDynamicElement(todolistValue);
    }

};
const showTodoList =() =>{
    console.log(localTodoLists);

    localTodoLists.forEach((curElem) =>{
     addTodoDynamicElement(curElem);
    });
    
};

showTodoList();

// remove 
    const removeTodoElem =(e) => {
        
        
    const todoToRemove = e.target;
    let todoListContent = todoToRemove.previousElementSibling.innerText;
    console.log(todoListContent);
    let parentElem = todoToRemove.parentElement; 

     localTodoLists = localTodoLists.filter((curTodo) => {
         return curTodo != todoListContent.toLowerCase();
     });


    addTodoListLocalStorage(localTodoLists);
    parentElem.remove();

    console.log(localTodoLists);
};


mainTodoElem.addEventListener('click', (e) => {
   e.preventDefault();
   if(e.target.classList.contains("deleteBtn")){
        removeTodoElem(e);
    } 
});
document.querySelector(".btn").addEventListener("click", (e) =>{
    
    addTodoList(e);

});
