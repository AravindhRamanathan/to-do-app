//insert task button
const task_btn=document.getElementById('add-task-btn');

task_btn.addEventListener('click',(e)=>{
    let task_to_be_added=document.getElementById('user_task').value;
    if(task_to_be_added.length==0)
        alert('give valid input');
    else{
    const options={
        method:"POST",
        headers:{
            Accept:'application/json',
            'content-type':'application/json'
        },
        body:JSON.stringify({task:task_to_be_added})
    };
    fetch('http:localhost:5000/addTask',options)
    .then((result)=>result.json())
    .then(resData=>display_task(resData.id,resData.task))
    }
});

//delete taskbutton
let deleteTask=(id)=>{
    const options={
        method:"DELETE",
        headers:{
            Accept:'application/json',
            'content-type':'application/json'
        },
        body:JSON.stringify({id:id})
    };
    fetch('http:localhost:5000/deleteTask',options)
    .then(res=>res.json())
    .then(resData=>document.getElementById(resData.id).remove());
}


//display_task_function
let display_task=(id,task)=>{
    let div1=document.createElement("div");
    div1.innerHTML='<p class="para">'+task+'</p><button type="button" class="but btn btn-danger btn-sm "  id="'+id+'" onclick=deleteTask(this.id)>Delete!</button>'
    div1.setAttribute('class','display_task');
    div1.setAttribute('id',id);
    document.getElementById("display_content").append(div1);
}

