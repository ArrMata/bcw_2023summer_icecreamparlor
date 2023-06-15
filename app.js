const iceCream = [
    {
        name: 'Cookie Dough',
        image: 'https://celebratingsweets.com/wp-content/uploads/2014/04/Cookie-Dough-Ice-Cream-1-5.jpg',
        price: 1.25
    }, {
        name: 'Vanilla',
        image: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/ultimate-vanilla-ice-cream-1628511695.jpg',
        price: 1
    }, {
        name: 'Strawberry',
        image: 'https://www.realfoodwithjessica.com/wp-content/uploads/2017/07/paleostrawberryicecream2.jpg',
        price: 1.25
    }
]

const toppings = [
    {
        name: 'Sprinkles',
        image: 'https://upload.wikimedia.org/wikipedia/commons/f/f6/Sprinkles2.jpg',
        price: .25
    }, {
        name: 'Chocolate Chips',
        image: 'https://www.eatthis.com/wp-content/uploads/sites/4/2020/05/chocolate-chips.jpg?quality=82&strip=1&resize=640%2C360',
        price: .50
    }, {
        name: 'Gummy Worms',
        image: 'https://images.unsplash.com/photo-1499195333224-3ce974eecb47?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1051&q=80',
        price: .75
    }
]

const containers = [
    {
        name: 'Waffle Cone',
        image: 'https://m.media-amazon.com/images/I/71VNjBMakfL._SL1500_.jpg',
        price: 2
    }, {
        name: 'Waffle Bowl',
        image: 'http://images.wbmason.com/350/L_JOY66050.jpg',
        price: 4
    }, {
        name: 'Bowl',
        image: 'https://images.unsplash.com/photo-1510035618584-c442b241abe7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Ym93bHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60',
        price: .75
    }
]

let cart = [

]

function populateMenu() {
    let allMenuItems = [toppings, containers, iceCream]
    const menuElement = document.getElementById('menuCard')

    allMenuItems.forEach(menuCategory => {
        menuCategory.forEach(menuItem => {
            menuElement.innerHTML += `
            <div class="col-4">
                <div class="menu-item">
                    <div class="menu-img-container">
                        <img src="${menuItem.image}"
                        alt="${menuItem.name} Icecream">
                    </div>
                    <div class="p-2 d-flex w-100 align-items-end justify-content-between">
                        <div>
                            <h5>${menuItem.name}</h5>
                            <p>$${menuItem.price}</p>
                        </div>
                        <button onclick="addItemToCart('${menuItem.name}')" class="btn btn-primary">Add to Cart</button>
                    </div>
                </div>
            </div>
            `
        })
    })
}

function addItemToCart(itemName) {
    const allItems = getAllMenu()
    let foundItem = allItems.find(item => item.name == itemName)
    let itemInCart = cart.find(cartItem => cartItem.name == itemName)

    if (containers.find(container => container.name == foundItem.name)) {
        const containerCheck = checkContainerAlreadyAdded(foundItem)
        console.log(containerCheck)
        if (containerCheck) {
            return
        }
    }

    if (!itemInCart) {
        let cartItem = {
            name: foundItem.name,
            quantity: 1,
            price: foundItem.price
        }
        cart.push(cartItem)
        drawCart()
    }
    else {
        itemInCart.quantity += 1
        drawCart()
    }
}

function checkContainerAlreadyAdded(inputItem) {
    let containerExists = false
    cart.forEach(cartItem => {
        if (containers.find(container => container.name == cartItem.name)) {
            Swal.fire(
                'Already chose a container!',
                'You are stuck with it 😈',
                'error'
            )
            containerExists = true
        }
    })
    return containerExists
}

function drawCart() {
    const cartTotalElement = document.getElementById('cartTotal')
    let cartTotal = 0
    resetCart()

    cart.forEach(item => {
        let itemTotal = item.price * item.quantity
        cartTable.innerHTML += `
        <tr class="table-row">
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>${item.price.toFixed(2)}</td>
            <td>${itemTotal.toFixed(2)}</td>
        </tr>
        `
        cartTotal += itemTotal
    })

    cartTotalElement.innerText = cartTotal.toFixed(2)
}

function getAllMenu() {
    let firstCombined = toppings.concat(containers)
    let lastCombined = firstCombined.concat(iceCream)
    return lastCombined
}

function resetCart() {
    const cartTable = document.getElementById('cartTable')
    const cartTotalElement = document.getElementById('cartTotal')

    cartTotalElement.innerText = 0
    cartTable.innerHTML = `
    <tr>
        <th class="px-2">Name</th>
        <th>Qty</th>
        <th>Each</th>
        <th>Total</th>
    </tr>
    `
}

function checkoutCart() {
    Swal.fire({
        title: 'Would you like to Checkout?',
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Checkout!'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'Purchased!',
                'Enjoy your meal!',
                'success'
            )
            cart = []
            resetCart()
        }
    })
}

populateMenu()