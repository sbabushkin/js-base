var resultcost = 0;

function buy(event) {
    let element = event.currentTarget;
    let name = element.getAttribute('data-name');
    let price = Number(element.getAttribute('data-cost'));    
    let cell = document.createElement("div");
    cell.className = 'basket_stroke';
    cell.innerHTML = '<div class="basket_stroke_title">' + name + '</div><div class="basket_stroke_price">' + price + '</div>';
    document.getElementById('aside').appendChild(cell);
    resultcost = resultcost + price;
    document.getElementById('total').innerHTML = resultcost;
}