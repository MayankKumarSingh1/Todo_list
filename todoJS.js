const wrapper=document.querySelector(".wrapper");
const backbtn=document.querySelector(".back-btn");
const menubtn=document.querySelector(".menubtn");

const togglescreen = () => {
    wrapper.classList.toggle("show-category");
}

menubtn.addEventListener("click",togglescreen);
backbtn.addEventListener("click",togglescreen);


const addTaskBtn= document.querySelector(".add-task-btn");
const addTaskForm= document.querySelector(".add-task");
const blackBackdrop= document.querySelector(".black-backdrop");

const toggleAddTaskForm = () => {
    addTaskForm.classList.toggle("active");
    blackBackdrop.classList.toggle("active");
    addTaskBtn.classList.toggle("active");
};

addTaskBtn.addEventListener("click", toggleAddTaskForm);
blackBackdrop.addEventListener("click", toggleAddTaskForm);


let categories=[
    {
        title:"Personal",
        img: "man pic.jpg",
    },
    {
        title:"Work",
        img: "briefcase.webp",
    },
    {
        title:"Medical",
        img: "medical.jpg",
    },
    {
        title: "Shopping",
        img: "shopping.jpg",
    },
    {
        title:"Coding",
        img: "coding.avif",
    },
    {
        title:"Fitness",
        img:"fitness.png",
    },
    {
        title:"Finance",
        img:"finance.jpg",
    },
];

let tasks=[
    {
        id: 1,
        task:"Go for a run",
        category: "Personal",
        completed:false,
    },
    {
        id:2,
        task:"Prepare presentation for the meeting",
        category:"Work",
        completed:false,
    },
];
 
let selectedCategory = categories[0];

const categoriesContainer = document.querySelector(".categories");
const categoryTitle = document.querySelector(".category-title");
const totalCategoryTasks = document.querySelector(".category-tasks");
const categoryImg = document.querySelector("#category-img");
const totalTasks = document.querySelector(".totalTasks");


const calculateTotal = () => {
    const categoryTasks= tasks.filter((task) => task.category.toLowerCase() === selectedCategory.title.toLowerCase()
    );
    totalCategoryTasks.innerHTML = `${categoryTasks.length} Tasks`;
    totalTasks.innerHTML = tasks.length;
}


const renderCategories = () => {
    categoriesContainer.innerHTML= "";
    categories.forEach((category) =>{
        const categoryTasks= tasks.filter((task) => task.category.toLowerCase() === category.title.toLowerCase()
    );

    const div= document.createElement("div");
    div.classList.add("category");
    div.addEventListener("click", ()=>{
        wrapper.classList.add("show-category");
        selectedCategory=category;
        categoryTitle.innerHTML = category.title;
        categoryImg.src=`Images/${category.img}`;
        calculateTotal();
        renderTasks();
    });
    div.innerHTML=`         
                            <div class="left">
                            <img class="manpic" src="Images/${category.img}" alt="${category.title}">
                            <div class="content">
                                <h1>${category.title}</h1>
                                <p>${categoryTasks.length}</p>
                            </div>
                        </div>
                        <div class="options">
                            <div class="toggle">
                                <svg
                                xmlns="https://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                class="w-6 h-6"
                                >
                            <path
                            stroke="linecap=round"
                            stroke-linejoin="round"
                            d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                            />
                        </svg>
                    </div>
                </div>
            `;
    categoriesContainer.appendChild(div);
    });
};

const tasksContainer = document.querySelector(".tasks");

const renderTasks = () => {
    tasksContainer.innerHTML = "";
    const categoryTasks= tasks.filter(
        (task) => task.category.toLowerCase() === selectedCategory.title.toLowerCase()
    );
    if (categoryTasks.length === 0){
        tasksContainer.innerHTML=`
        <p class="no-task">No tasks for this category </p>`
    }  else {
        categoryTasks.forEach((task) => {
            const div= document.createElement("div");
            div.classList.add("task-wrapper");
            const label= document.createElement("label");
            label.classList.add("task");
            label.setAttribute("for", task.id);
            const checkbox= document.createElement("input");
            checkbox.type="checkbox";
            checkbox.id=task.id;
            checkbox.checked=task.completed;

            checkbox.addEventListener("change", () => {
                const index= tasks.findIndex((t) => t.id === task.id);

                tasks[index].completed =!tasks[index].completed;
                saveLocal();
            });
            



            div.innerHTML=`
                   <div class="delete">
                        <svg xmlns="https://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-6 h-6"
                        >
                        <path 
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 0 00-7.5 0"                
                            />
                        </svg>
                    </div>
            `
            label.innerHTML=`
             <span class="checkmark" >
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="w-6 h-6"
                            >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M4.5 12.75l6 6 9-13.5"
                                />
                        </svg>  
                        </span> 
                        <p>
                            ${task.task}
                        </p>
            `
            label.prepend(checkbox);
            div.prepend(label);
            tasksContainer.appendChild(div);

            const deleteBtn= div.querySelector(".delete");
            deleteBtn.addEventListener("click", ()=>{
                const index= tasks.findIndex((t)=> t.id === task.id);

                tasks.splice(index, 1);
                saveLocal();
                renderTasks();
            });
        });

        renderCategories();
        calculateTotal();
    }
};


const saveLocal = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

const getLocal = () => {
    const localTasks= JSON.parse(localStorage.getItem("tasks"));

    if(localTasks){
        tasks=localTasks;
    }
};


const categorySelect=document.querySelector("#category-select");
const cancelBtn=document.querySelector(".cancel-btn");
const addBtn=document.querySelector(".add-btn");

const taskInput= document.querySelector("#task-input");

taskInput.addEventListener("keydown", (event)=>{
    if(event.key === "Enter"){
        addBtn.click();
    }
});

cancelBtn.addEventListener("click", toggleAddTaskForm);

addBtn.addEventListener("click", ()=>{
    const task=taskInput.value;
    const category= categorySelect.value;

    if(task === ""){
        alert("Please enter a task");
    } else {
        const newTask= {
            id: tasks.length + 1,
            task,
            category,
            completed:false,
        };
        tasks.push(newTask);
        saveLocal();
        taskInput.value="";
        toggleAddTaskForm();
        renderTasks();
    }
});



categories.forEach((category)=>{
    const option =document.createElement("option");
    option.value= category.title.toLowerCase();
    option.textContent=category.title;
    categorySelect.appendChild(option);
});

getLocal();
calculateTotal();
renderTasks();