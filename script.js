console.log("hello world");
showNotes()
// if user add a note add it into in local storage

let addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click',(e)=>{
    let addTxt = document.getElementById('addTxt');
    let notes = localStorage.getItem('notes');  
    if(notes == null){
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
    }

    notesObj.push(addTxt.value);
    localStorage.setItem("notes",JSON.stringify(notesObj));
    addTxt.value=""
    // console.log(notesObj)
    showNotes()
})

function showNotes(){
    let notes = localStorage.getItem('notes');
    if(notes == null){
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
    }
    let html = ""
   notesObj.forEach((Element,index)=>{
    html += `
    <div class="notecard card mx-3" style="width: 18rem;">
            <div class="card-body">
              <h5 class="card-title">Note ${index+1} </h5>
              <p class="card-text"> ${Element} </p>
              <button id="${index}" onclick="deletenote(this.id)" class="btn btn-primary">Delete Note</button>
            </div>
          </div>`
   })   
    let notesElm = document.getElementById("notes");
    if(notesObj.length != 0){
        notesElm.innerHTML = html;
    }
    else{
        notesElm.innerHTML = `<b>Nothing here please add some notes above</b>`
    }
}

// function to delete a note

function deletenote(index){
    // console.log("im deleting the note", index)
    let notes = localStorage.getItem('notes');
    if(notes == null){
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
    }

    notesObj.splice(index,1);
    localStorage.setItem("notes",JSON.stringify(notesObj));
    showNotes();
}

let search = document.getElementById('searchTxt');
search.addEventListener('input',()=>{
    let inputval = search.value.toLowerCase()
    // console.log("input event fired",inputval)
    let notecards = document.getElementsByClassName('notecard')
    Array.from(notecards).forEach((element)=>{
        let cardTxt = element.getElementsByTagName('p')[0].innerText
        if(cardTxt.includes(inputval)){
            element.style.display = "block"
        }
        else{
            element.style.display = "none"
        }
    })
})
