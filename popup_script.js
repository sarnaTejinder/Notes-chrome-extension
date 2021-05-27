const main = document.querySelector('.notes')
const input = document.querySelector('.input')
const submit = document.querySelector('.submit-button')

let notes = []


 chrome.runtime.sendMessage({
    message:"get_notes"
},response=>{
    console.log(response)
    if(response.message === "success"){
    if(response.payload.length > 0)
    notes = [...response.payload]
    if(notes.length > 0 ){
    for(let i = 0 ; i < notes.length ;i++){
        console.log(notes[i])
       makeNote(notes[i],i)
    }
    }
    addDelete();
}
})


const addDelete =()=>{
    if(notes.length > 0 ){
        const deletes = document.querySelectorAll('p.delete')
        deletes.forEach(button =>{
            button.addEventListener('click',()=>{
                const id = button.id;
                notes.splice(id-1,id);
                const note = document.getElementById(id)
                note.parentNode.removeChild(note);
                
                chrome.runtime.sendMessage({
                    message:"set_notes",
                    payload:notes
                },response=>{
                    console.log(response)
                })
            })
        })
        }
}

const makeNote = (value,id=notes.length)=>{
    const span = document.createElement('span')
    const del = document.createElement('p')
    const p = document.createElement('p')
    del.classList.add(`delete`)
    del.id = `${id+1}`
    del.innerText = 'X'
    p.innerText = value;
    span.classList.add('note')
    span.id = `${id+1}`
    span.append(p)
    span.append(del)
    main.append(span)
}

submit.addEventListener('click',()=>{
    if(input.value.trim()=== ""){
        input.classList.add('error')
        return
    }
    if(input.classList.contains('error')){
        input.classList.remove('error')
    }
    
    makeNote(input.value)
    notes.push(input.value)
    addDelete();
    console.log(notes)

    chrome.runtime.sendMessage({
        message:"set_notes",
        payload:notes
    },response=>{
        console.log(response)
    })
        console.log('send')
    input.value = ""
})


