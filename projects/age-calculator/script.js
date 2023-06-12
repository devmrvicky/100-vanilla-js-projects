
document.querySelector('#app form').addEventListener('submit', e => {
  e.preventDefault();
  let currentDate = new Date();
  let dateOfBirth = new Date(e.target.children.dateOfBirth.value);
  let year = currentDate.getFullYear() - dateOfBirth.getFullYear();
  let month;
  if(currentDate.getMonth() >= dateOfBirth.getMonth()){
    month = currentDate.getMonth() - dateOfBirth.getMonth()
  }else{
    month = dateOfBirth.getMonth() - currentDate.getMonth(); 
    year = year - 1;    
    month = 12 - month;
  }
  
  document.querySelector('.result').textContent = `You are ${year} years and ${month} months old.`
})