
var customerCart = [];

module.exports.addItem = (neededItem) => {
    console.log("Adding cart: " + neededItem[0].title);
    return new Promise((resolve, reject) => {
        customerCart.push(neededItem[0]);
        resolve(customerCart.length);
    });
}

module.exports.removeItem = (neededItem) => {
    return new Promise((resolve, reject) => {
        for (var i = 0; i < customerCart.length; i++) {
            if (customerCart[i].title == neededItem) {
                customerCart.splice(i, 1);
                i = customerCart.length;
            }
        }
        resolve();
    });
}

module.exports.getCart = () => {
    return new Promise((resolve, reject) => {
        resolve(customerCart);
    });
}

module.exports.checkout = () => {
    return new Promise((resolve, reject) => {
        var price = 0; 
        if (customerCart) {
            customerCart.forEach(x => {
                price += Number(x.price);
            });
        }
        resolve(price);
    });
}