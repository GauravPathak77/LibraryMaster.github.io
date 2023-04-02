console.log("Connected");
document.getElementById('night').onclick = NIGHT;
document.getElementById('day').onclick = DAY;
const tbody = document.getElementById('tbody');
tbody.innerHTML = localStorage.getItem('innerHTML');
function NIGHT(){
    document.getElementById('bdy').style.background = "rgb(40, 37, 37)"; 
    document.getElementById('bdy').style.color = "white";
}

function DAY() {
    document.getElementById('bdy').style.background = "white";
    document.getElementById('bdy').style.color = "black";
}

function alert(){
    const alert = document.getElementById('alert');
    alert.innerHTML = `<div class="warn" role="alert">
    Insert Some data...
    </div>
    `
    setTimeout(()=>{
        alert.innerHTML=``
    },1500);

}

const deleted=function(r){
    const rownumber=r.parentNode.parentNode.rowIndex
    tbody.deleteRow(rownumber-1);
    localStorage.setItem('innerHTML', tbody.innerHTML)
}

class Book{
    constructor(bkname, autname, booktype){
        this.bkname=bkname;
        this.autname=autname;
        this.booktype=booktype;
    }
}
var i=0;
class DisplayBook{
    constructor(Book){
    this.Book=Book;
    }
    addtable = function(){
        ++i;
        tbody.innerHTML += `<tr class="rw">
            <td>${i}</td>
            <td> ${this.Book.bkname}</td>
            <td> ${this.Book.autname}</td>
            <td> ${this.Book.booktype}</td>
            <td><button class="btn-del" onclick={deleted(this)}>❌</button></td>
        </tr>`
        localStorage.setItem('innerHTML',tbody.innerHTML)
    }
}

const submit=document.getElementById('res');

let data=function(e){
     e.preventDefault();
    const bkname= document.getElementById('txt').value;
    const autname= document.getElementById('aut').value;
    const coding= document.getElementById('coding');
    const advt= document.getElementById('adv');
    const thril = document.getElementById('thr');
    var booktype = '';
    if(coding.checked)
    {
        booktype=coding.value;
    }
    else if (advt.checked) {
        booktype = advt.value;
    }
    else if (thril.checked) {
        booktype = thril.value;
    }
   // console.log(bkname, autname, booktype,'submitted✅');
   
   if(bkname!="" && autname!=""){
    const Book1 =new Book(bkname,autname,booktype);
    const display1= new DisplayBook(Book1);
    display1.addtable();
    submit.reset();
   }
   else
   alert();
}
submit.addEventListener('submit', data );
