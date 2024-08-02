const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask(){                         //for add button we click every time
    if(inputBox.value === ''){
        alert("You Must Write Something!");  //for empty add, generates alert box
    }
    else{
        let li = document.createElement("li"); //storing element in li
        li.innerHTML = inputBox.value;          // text inside html
        listContainer.appendChild(li);          //to display the text
        
        let span= document.createElement("span"); //to crete cross icon
        span.innerHTML= "\u00d7";                   //cross inside html
        li.appendChild(span);               //display the cross
    }
    inputBox.value="";                      // keps the box empty after adding the text
    saveData(); //we call it every time. saves updated content
}

// JavaScript for click function
listContainer.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){                  //if we have clicked on li checked css will apear
        e.target.classList.toggle("checked");   //it will remove bcz of toggle
        saveData();
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove(); //remove parent elemnt if we click on cross
        saveData();
    }
}, false);

//to store even after refreshing the screen
function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
}

//to display the data after refreshing
function showTask(){
    listContainer.innerHTML = localStorage.getItem("data");
}
showTask()