function add_to_cart(pid, pname, price) {
    let cart = localStorage.getItem("cart");
    if (cart == null) {
        let products = [];
        let product = { productId: pid, productName: pname, productQuantity: 1, productPrice: price }
        products.push(product);
        localStorage.setItem("cart", JSON.stringify(products));
        alert("Product is added for the first time");
    } else {

        let pcart = JSON.parse(cart);
        let oldProduct = pcart.find((item) => item.productId == pid);
        if (oldProduct) {

            oldProduct.productQuantity = oldProduct.productQuantity + 1;
            pcart.map((item) => {
                if (item.productId == oldProduct.productId) {
                    item.productQuantity = oldProduct.productQuantity;
                }
            })

            localStorage.setItem("cart", JSON.stringify(pcart));
            alert("Product quantity is increased");

        } else {

            let product = { productId: pid, productName: pname, productQuantity: 1, productPrice: price }
            pcart.push(product);
            localStorage.setItem("cart", JSON.stringify(pcart));
            alert("Product is added");
        }
    }
    updateCart();
}

function updateCart() {
    let cartString = localStorage.getItem("cart");
    let cart = JSON.parse(cartString);
    if (cart == null || cart.length == 0) {
        console.log("Cart is Empty!!");
        $(".cart-items").html("( 0 )");
        $(".cart-body").html("<h2> Cart does not have any items....</h2>");
        $(".checkout-btn").addClass('disabled');
    } else {
        console.log(cart);
        $(".cart-items").html(`( ${cart.length} )`);

        let table = `
        <table class="table">
                <thead class="thead-light">
                    <tr>
                        <th>Item Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total Price</th>
                        <th>Action</th>
                    </tr>
                </thead>`;

        let totalPrice = 0;
        cart.map((item) => {
            table += `
                    <tr>
                        <td>${item.productName}</td>
                        <td>${item.productPrice}</td>
                        <td>${item.productQuantity}</td>
                        <td>${item.productQuantity * item.productPrice}</td>
                        <td><button  onclick='deleteItemFromCart(${item.productId})' class='btn btn-danger btn-sm'>Remove</button></td>
                    </tr>`

            totalPrice += item.productPrice * item.productQuantity;
        });

        table = table + `
                   <tr><td colspan='5' class='text-right font-weight-bold m-5'><b>Total Price : ${totalPrice}</b></td></tr> 
                  </table>`
        $(".cart-body").html(table);
    }
}

function deleteItemFromCart(pid) {
    let cart = JSON.parse(localStorage.getItem('cart'));
    let newcart = cart.filter((item) => item.productId != pid);
    localStorage.setItem('cart', JSON.stringify(newcart));
    updateCart();
}

$(document).ready(function () {
    updateCart();
});

function Checkout() {
    window.location.href = "checkout.html"
}
