const form = document.querySelector('#app form');
const result = document.querySelector('.result b');

result.classList.add('prev-rst')

form.addEventListener('submit', e => {
  e.preventDefault()
  let inputFields = e.currentTarget.children
  let amount, percentage;
  Array.from(inputFields).forEach(e => {
    if(e.className === 'input-field'){
      let children = e.children;
      if(children.amount){
        amount = Number(children.amount.value);
      }
      if(children.percentage){
        percentage = Number(children.percentage.value);
      }
    }
  })
  result.textContent = `$ ${amount + (amount * percentage/100)}`
  result.classList.remove('prev-rst')
})
