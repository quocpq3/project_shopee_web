
// const products = [
//   {
//     id: 1,
//     name: "Google Pixel 9 Pro",
//     image: "./img/google_pixel_9pro.webp",
//   },
//   {
//     id: 2,
//     name: "Iphone 16 ProMax",
//     image: "./img/iphone.webp",
//   }
// ];

// hiển thị chi tiết sản phẩm
function showProductDetail(event) {
  if (event.target.closest('.btn_exit_x')) {
    return;
  }
  
  event.preventDefault();
  
  const productItem = event.currentTarget.closest('.product_item_li');
  const productName = productItem.querySelector('.item_name_phone').textContent;
  const productImg = productItem.querySelector('.product_item_img_img').src;
  const priceNew = productItem.querySelector('.item_price_new').textContent;
  const priceOld = productItem.querySelector('.item_price_old').textContent;

  // tao container moi
  const detailContainer = document.createElement('div');
  detailContainer.className = 'container_detail_product';
  detailContainer.innerHTML = `
    <div class="detail_product">
      <div class="img_detail_product"> 
        <img class="item_img_detail_prodcut" src="${productImg}" alt="${productName}">
      </div>
      <div class="info_detail_product">
        <div class="favorite_name_detail_product">
          <span class="favorite_detail_product"> 
            <i class="fa-solid fa-check check_favorite_detail_product"></i>Yêu thích
          </span>
          <h4 class="name_detail_product">${productName}</h4>
        </div>
        <div class="sold_star_detail_prodcut">
          <span class="sold_detail_product">88 đã bán</span>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star fa-star-5"></i>
        </div>
        <div class="price_detail_product">
          <span class="price_new_detail_product">${priceNew}</span>
          <span class="price_old_detail_product">${priceOld}</span>
        </div>
        <div class="quantity_detail_product">
          <span class="number_label_quantity_detail_product">Số Lượng</span>
          <button class="reduce_quantity_detail_product btn_quantity">-</button>
          <input class="number_quantity_detail_product btn_quantity" outline="none" type="number" value="1" min="1">
          <button class="increase_quantity_detail_product btn_quantity">+</button>
        </div>
        <div class="btn_exit">
          <button class="btn_exit_x">X</button>
        </div>
        <button class="shopping_cart_add_detail_product">Thêm vào giỏ hàng</button>
      </div>
    </div>
  `;

  productItem.appendChild(detailContainer);
  detailContainer.querySelector('.btn_exit_x').addEventListener('click', closeProductDetail);
  detailContainer.querySelector('.shopping_cart_add_detail_product').addEventListener('click', function(){
    const quantity = parseInt(detailContainer.querySelector('.number_quantity_detail_product').value);
    addCart(productImg, productName, priceNew, quantity);
  });
   setupQuantityControls(detailContainer);
}

function closeProductDetail(event) {
  event.preventDefault();
  event.stopPropagation();
  
  const container = event.target.closest('.container_detail_product');
  if (container) {
    container.remove();
  }
}

document.addEventListener('DOMContentLoaded', function() {
  const productItems = document.querySelectorAll('.product_item_li');
  
  productItems.forEach(item => {
    item.addEventListener('click', showProductDetail);
  });
});
document.addEventListener('DOMContentLoaded', function() {
});
// thêm giỏ hàng
const btn = document.querySelectorAll(".shopping_cart_add_detail_product");

btn.forEach(function (button, index) {
  button.addEventListener("click", function (event) {
    var btnItem = event.target;
    var product = btnItem.parentElement;
    var productImg = document.querySelector(".item_img_detail_prodcut").src;
    var productName = product.querySelector(".name_detail_product").innerText;
    var productPrice = product.querySelector(".price_new_detail_product").innerText;
    addCart(productImg, productName, productPrice);
  });
});

function addCart(productImg, productName, productPrice, quantity =1) {
  var cartDiv = document.querySelector(".container_cart_1");
  var cartItems = cartDiv.querySelectorAll(".card_list_item");

  var productExists = false;
  cartItems.forEach(function (item) { 
    var itemName = item.querySelector(".name_card_head h4").innerText;
    //kiểm tr nếu đã tồn tại sản phẩm chỉ tăng số lượng
    if (itemName === productName) {
      var quantityInput = item.querySelector(".input_cart_head input");
      var currentQuantity = parseInt(quantityInput.value);
      quantityInput.value = currentQuantity + quantity;
      productExists = true;
    }
  });

  if (!productExists) {
    var divContent = `
      <div class="card_list_item">
        <div class="img_cart_list_item">
          <img src=${productImg}alt="${productName}">
        </div>
        <div class="name_card_head">
          <h4>${productName}</h4>
        </div>
        <div class="price_cart_head">
          <span>${productPrice}</span>
        </div>
        <div class="input_cart_head"><input type="number" outline="none" value="${quantity}" min="1"></div>
        <div class="remove_cart_head"><button>Xóa</button></div>
      </div>`;
      
    cartDiv.innerHTML += divContent;
  }
  cartTotal() //tổng trên icon 
  deleteCart() //xóa sản phẩm
}
//icon tổng sản phẩm 
 function cartTotal(){
  var cartItem = document.querySelectorAll(".card_list_item .name_card_head")
  var countItem = 0
  for (var i = 0; i<cartItem.length;i++){
    var inputValue = cartItem[i].querySelector("h4")
    if(inputValue){
      // console.log(h4.textContent);
      countItem++;
    }
 } var countUpdate = document.querySelector(".note_fa-cart-shopping")
 if(countUpdate){
  countUpdate.textContent = countItem
 }
 }
//xóa sản phẩm trong giỏ hàng 
function deleteCart() {
  var deleteButtons = document.querySelectorAll(".remove_cart_head button");

  deleteButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      var cartItem = button.closest(".card_list_item");
      cartItem.remove();
      cartTotal();
    });
  });
}
//tăng giảm số lượng sản phẩm trong giỏ hàng
function setupQuantityControls(detailContainer) {
  const decreaseBtn = detailContainer.querySelector('.reduce_quantity_detail_product');
  const increaseBtn = detailContainer.querySelector('.increase_quantity_detail_product');
  const quantityInput = detailContainer.querySelector('.number_quantity_detail_product');

  if(!decreaseBtn || !increaseBtn || !quantityInput) {
    console.error('One or more quantity control elements are missing.');
    return;
  }
  quantityInput.value = 1;

  quantityInput.addEventListener('input', function(e) {
    let value = this.value.replace(/[^0-9]/g, '');
    if (value === '' || parseInt(value) < 1) {
      value = 1;
    }
    this.value = value;
  });


  decreaseBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    let currentValue = parseInt(quantityInput.value) || 1;
    if (currentValue > 1) {
      quantityInput.value = currentValue - 1;
    }
  });

  increaseBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    let currentValue = parseInt(quantityInput.value) || 1;
    quantityInput.value = currentValue + 1;
  });

  quantityInput.addEventListener('change', function(e) {
    e.stopPropagation();
    let value = parseInt(this.value);
    if (isNaN(value) || value < 1) {
      this.value = 1;
    }
  });
}
