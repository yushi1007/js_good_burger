  //Implement Your Code Here
  const burgerMenu = document.querySelector('div#burger-menu')

  // const menuDiv = document.querySelector('div.menu')
  
  
  function burgerDetails(burger){
  const div = document.createElement('div')
  div.dataset.id = burger.id
  div.classList.add('burger')
  
  const h3 = document.createElement('h3')
  h3.classList.add('burger_title')
  h3.textContent = burger.name
  
  const img = document.createElement('img')
  // console.log(img)
  img.src = burger.image
  
  const ptag = document.createElement('p')
  ptag.classList.add('burger_description')
  ptag.textContent = burger.description
  
  const btn = document.createElement('button')
  btn.classList.add('button')
  btn.dataset.id = burger.id
  btn.textContent = 'Add to Order'
  
  div.append(h3, img, ptag, btn)
  
  const burgerMenu = document.querySelector('div#burger-menu')
  
  burgerMenu.append(div)
  }
  
  
  function seeBurgerMenu(){
  fetch('http://localhost:3000/burgers')
  
    .then(response => response.json())
    .then(burgerArray => {
    burgerArray.forEach(burger => {burgerDetails(burger)})
  })
  }
  
  burgerMenu.addEventListener('click', event => {
  
  if(event.target.matches('button')){
  fetch(`http://localhost:3000/burgers/${event.target.dataset.id}`)
    .then(response => response.json())
    .then(orders => {
      const orderDiv = document.querySelector('ul#order-list')
      const li = document.createElement('li')
      li.dataset.id = orders.id
      li.textContent = orders.name
      orderDiv.append(li)
    
    })
      
    
  
  }
  })
  
  const updateMenu = document.querySelector('form#custom-burger')
  updateMenu.addEventListener('submit', event => {
    event.preventDefault()
  
    const name = event.target.name.value
    const description = event.target.description.value
    const image = event.target.image.value
    console.log(image)
  
    fetch ('http://localhost:3000/burgers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json'
      },
      body: JSON.stringify({
        name,
        image,
        description
      })
    })
      .then(response => response.json())
      .then(newBurger => {
      burgerDetails(newBurger)
      }) 
  
    
  })
  
  
  
  seeBurgerMenu()