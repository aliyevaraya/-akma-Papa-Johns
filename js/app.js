const lang_mob = document.getElementById("lang_mob");
const lang_desk = document.getElementById("lang_desk");
const sideBar = document.getElementById("sideBar");

function openLang() {
  lang_mob.classList.toggle("h-[110px]");
  lang_desk.classList.toggle("h-[80px]");
}

function openBasket() {
  sideBar.classList.toggle("!grid");
}

function hesabla(arg, price) {
  const countDiv = document.getElementById("countDiv");
  let deyer = arg + +countDiv.innerHTML;
  if (deyer < 1) deyer = 1;
  countDiv.innerHTML = deyer;
  document.getElementById("qiymetntc").innerHTML = (deyer * price).toFixed(2);
}

let basketArr = JSON.parse(localStorage.getItem('basket')) || [];

function addToBasket(id, img, title, price) {
  const countDiv = document.getElementById("countDiv");
  const select = document.querySelector("select");
  changeType()
  const obj = {
    id,
    img,
    title,
    price: select.value,
    count: +countDiv.innerHTML,
    total: price * countDiv.innerHTML
  };

  const elem = basketArr.find((item) => item.id == id);
  if (!elem) basketArr.push(obj);
  else {
    elem.count += +countDiv.innerHTML;
    elem.total = elem.price * elem.count
  }

  countDiv.innerHTML = 1;
  document.getElementById("qiymetntc").innerHTML = obj.price;
  handleBasket();
  getAllPrice()
  
  localStorage.setItem("basket", JSON.stringify(basketArr))
  console.log(price);
  console.log(select.value);
  
}

function getAllPrice() {
  const totalPrice = document.querySelectorAll(".totalPrice");
  totalPrice.forEach((item) => item.innerHTML = basketArr.reduce((sum, product) => sum + +product.total, 0));

  const basketCount = document.querySelectorAll(".basketCount");
  basketCount.forEach((item) => (item.innerHTML = basketArr.reduce((sum, item) => sum + item.count, 0)));
}
getAllPrice()

const basket = document.getElementById("basket");

function handleBasket() {
  basket.innerHTML = "";
  basketArr.map((item) => {
    basket.innerHTML += `
      <div class="flex flex-col xs:flex-row justify-between items-center py-3 border border-slate-400 mt-2">
        <div class="w-full xs:w-1/2 flex gap-2 items-center">
          <img
            class="w-[50px]"
            src="${item.img}"
            alt=""
          />
            <h3 class="sm:text-[20px] font-bold">${item.title}</h3>
        </div>
        <div class="w-full xs:w-1/2 flex items-center gap-3 px-2">
          <div class="flex items-center sm:text-[20px] text-white p-2">
            <button onclick="editCount(-1, '${item.id}')" class="px-2 sm:px-3 pb-1 bg-gray-400 font-black">-</button>
            <span class="px-2 sm:px-3 text-black">${item.count}</span>
            <button onclick="editCount(1, '${item.id}')" class="px-2 sm:px-3 pb-1 bg-green-600 font-black">+</button>
          </div>
          <div class="font-bold">
            <span class="text-[22px]">${item.total} &#8380;</span>
            <span onclick="deleteProduct('${item.id}')" class="fa-solid fa-xmark text-gray-600 ml-2"></span>
          </div>
        </div>
      </div>
    `;
  });
}

function editCount(deyer, id) {
  const element = basketArr.find((item) => item.id == id);
  const say = +element.count + deyer;
  if (say >= 1) element.count = say;
  element.total = element.count * element.price;
  localStorage.setItem("basket", JSON.stringify(basketArr))
  handleBasket();
  getAllPrice()
}

function deleteProduct(id) {
  basketArr.splice(id, 1)
  localStorage.setItem("basket", JSON.stringify(basketArr))
  handleBasket();
  getAllPrice()
}

window.onload = function () {
  handleBasket();
  getAllPrice();
}