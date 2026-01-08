const modal=document.querySelector("#modal");
const openModal=document.querySelector(".formBtn");
const closeModal=document.querySelector(".closeBtn");
const container=document.querySelector(".container");
openModal.addEventListener("click",()=>{
    modal.showModal();
})
let myLibrary=[];

function Book(title,author,pages,readStatus,description,uniqueID){
    this.title=title;
    this.author=author;
    this.pages=pages;
    this.readStatus=readStatus;
    this.description=description;
    this.uniqueID=uniqueID;
}
Book.prototype.toggleReadStatus=function(){
    this.readStatus=this.readStatus==="read"?"not-read":"read";
}
function getReadStatus(){
    const readStatus=document.querySelector("input[name='readStatus']:checked");
    if(readStatus!==null){
        return readStatus.value;
    }
    else{
        return null;
    }
}
function getId(){
    return crypto.randomUUID();
}
function removeBook(id){
    myLibrary=myLibrary.filter((book)=>{
        return book.uniqueID!==id;
    })
    renderBook(myLibrary);
}
function getCheckboxStatus(obj,label){
    if(obj.readStatus==="read"){
        label.textContent="Read";
    }
    else{
        label.textContent="Not Read";
    }
}
console.log(getId());
function renderBook(myLibrary){
    container.innerHTML="";
    for(let i=0;i<myLibrary.length;i++){
        let obj=myLibrary[i];
        const div=document.createElement("div");
        div.classList.add("book-card");
        const title=document.createElement("p");
        const author=document.createElement("p");
        const pages=document.createElement("p");
        const check=document.createElement("input");
        check.type="checkbox";
        let label=document.createElement("span");
        const note=document.createElement("p");
        const dltBtn=document.createElement("button");
        title.classList.add("book-title");
        author.classList.add("book-author");
        pages.classList.add("book-pages");
        check.classList.add("book-check");
        note.classList.add("book-note");
        dltBtn.classList.add("book-dltBtn");
        container.appendChild(div);
        label.classList.add("book-label");
        div.append(title,author,pages,check,label,note,dltBtn);
        title.textContent=`Title: ${obj.title}`;
        author.textContent=`Author: ${obj.author}`;
        pages.textContent=`Number of Pages: ${obj.pages}`;
        check.checked=obj.readStatus==="read";
        getCheckboxStatus(obj,label);
        dltBtn.textContent="Delete";
        note.textContent=`Note: ${obj.description}`;
        // div.dataset.id=obj.uniqueID;
        dltBtn.addEventListener("click",()=>{
            removeBook(obj.uniqueID);
        })
        check.addEventListener("change",()=>{
            obj.toggleReadStatus();
            getCheckboxStatus(obj,label);
        })
    }
}
function addBookToLibrary(title,author,pages,readStatus,description,uniqueID){
    const book=new Book(title,author,pages,readStatus,description,uniqueID);
    myLibrary.push(book);
    renderBook(myLibrary);
}
const title=document.querySelector("#title");
const author=document.querySelector("#author");
const pages=document.querySelector("#noPages");
const description=document.querySelector("#description");
const form=document.querySelector(".form");
form.addEventListener("submit",(e)=>{
    e.preventDefault();
    const uniqueID=getId();
    addBookToLibrary(title.value,author.value,pages.value,getReadStatus(),description.value,uniqueID);
    form.reset();
    modal.close();
})