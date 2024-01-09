const btn = document.querySelectorAll('.button')
const body = document.querySelector('body')
// console.log(btn);


btn.forEach((item) => {
// console.log(item, ' item');
item.addEventListener('click', (e)=> {
// console.log(e.target.id, ' e');
if(e.target.id === 'grey'){
    body.style.backgroundColor = e.target.id
}if(e.target.id === 'green'){
    body.style.backgroundColor = e.target.id
}if(e.target.id === 'red'){
    body.style.backgroundColor = e.target.id
}if(e.target.id === 'blue'){
    body.style.backgroundColor = e.target.id
}
})

})






const form = document.querySelector("form")
console.log(form);

form.addEventListener('submit', (e) => {
    console.log(e);
})