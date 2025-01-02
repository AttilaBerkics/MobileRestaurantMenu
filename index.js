import { menuArray } from "./data.js";

const orderForm = document.getElementById('order-form')
let orderArr = []
let lisItemsTotal = 0

/*Event listeners */
document.addEventListener('click', function(e){
  
  if(e.target.dataset.id){
    orderArr.push(menuArray[e.target.dataset.id])
    document.getElementById('order-confirm').style.display='none'
    renderOrderItems(e.target.dataset.id, menuArray)
  } 
  else if(e.target.dataset.ida){
    orderArr.splice(e.target.dataset.ida,1)
    if(orderArr.length != 0) {
      renderOrderItems(e.target.dataset.ida, menuArray) 
    }
    else {
      document.getElementById('order-container').innerHTML =''
    }
  }
  else if((e.target.id) ==='action-btn'){
    document.getElementById('form-container').style.display='block'
  }
}) 

orderForm.addEventListener('submit', function(e){
  e.preventDefault()

  const orderFormData = new FormData(orderForm)
  const orderConfirm = document.getElementById('order-confirm')

  document.getElementById('form-container').style.display='none'
  document.getElementById('order-container').innerHTML =''

  orderConfirm.style.display='block'
  orderConfirm.innerHTML=`
    <p class="order-confirm-text">Thanks, ${orderFormData.get('name')}! Your order is on its way!</p>`
  
  orderArr = []
})


/* Functions */
function renderItems(menuArr) {
  return  menuArr.map(function(item){
     return ` 
    <div class="item-card">
      <div class="item-img-container">
        <img src="images/${item.img}" alt="food picture">
      </div>
      <div class="item-text-container">
        <h2 class="item-text-name">${item.name}</h2>
        <p class="item-text-ingredients"> ${item.ingredients}</p>
        <p class="item-text-price">$${item.price}</p>
      </div>
      <div class="item-btn-container">
        <button class="item-btn" data-id="${item.id}"> + </button>
      </div>
    </div>`
  }).join('')
}

function renderOrderItems(id, menuArr) {
  lisItemsTotal = 0
  let index = 0
  for(let order of orderArr){
     lisItemsTotal += order.price
   }
  
   const lisItemsString = orderArr.map( function(item) {
     return `
          <li>
            <p class="highlight-text">${item.name}</p>
            <button type="button" class="order-container-btn" data-ida="${index++}">remove</button>
            <p class="order-container-price">$${item.price}</p>
          </li>
      `
    }).join('')
  document.getElementById('order-container').innerHTML = `
    <div class="order-container">
      <h2 class="header2">Your order</h2>
      <ul id="order-list">
        ${lisItemsString}
      </ul>
      <div class="price-container">
        <p class="highlight-text"> Total price</p>
        <p> $${lisItemsTotal}</p>
      </div>
      <button type="button" class="action-btn" id="action-btn"> Complete order</button>
    </div>
  `

}
/* Call functions */
document.getElementById('items-container').innerHTML = renderItems(menuArray)
