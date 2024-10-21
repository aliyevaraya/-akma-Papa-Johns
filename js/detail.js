const url = window.location.search.split("&");
const cat = url[0].split("=").at(-1);
const id = url[1].split("=").at(-1);

const PRODUCT = [];
fetch(`https://papajson.vercel.app/${cat}/${id}`)
  .then((res) => res.json())
  .then((data) => {
    PRODUCT.push(data);
    getProduct();
  });

const product = document.getElementById("product");

function getProduct() {
  PRODUCT.map((item) => {
    product.innerHTML = `
           <div class="w-full sm:w-1/2 xs:mr-5">
                <h4 class="font-bold text-[22px]">${item.title}</h4>
                <p class="mt-4"><b>Tərkibi:</b> ${item.composition}</p>
                <p class="font-bold my-2 text-[18px]">Qiyməti: <span id="qiymetntc">${item.price}</span>&#8380;</p>
                ${cat == "pizza" ?
                  `<div id="productType" class="flex rounded py-2 w-[60%]">
                    <button onclick="getSelect('Ənənəvi')" class="bg-green-700 w-1/2 text-center text-white px-2 py-1">Ənənəvi</button>
                    <button onclick="getSelect('Nazik')" class="bg-gray-200 w-1/2 text-center text-green-700 px-2 py-1">Nazik</button>
                  </div>
                  <div class="font-semibold w-[60%]">
                      <select onchange="changeType()" class="w-full bg-red-700 outline-none my-5 px-3 py-1 text-[15px] text-white">
                        ${item.variations
                        .filter(el => el.type == "Ənənəvi")
                        .map(el => `<option value="${el.price}">${el.size}</option>`).join("")}
                      </select>
                  </div>`
                  :''
                }
                <div class="py-2">
                    <div class="flex items-center sm:text-[20px] text-white py-2">
                        <button onclick="hesabla(-1,${item.price})" class="w-[50px] bg-gray-400 font-black">-</button>
                        <span id="countDiv" class="w-[50px] flex justify-center text-black font-semibold">1</span>
                        <button onclick="hesabla(1, ${item.price})" class="w-[50px] bg-green-600 font-black">+</button>
                    </div>
                    <button onclick="addToBasket('${item.id}', '${item.img}', '${item.title}', '${item.price}')" class="bg-green-700 text-white w-[200px] p-2 my-5 rounded-md">Səbətə at</button>
                </div>
            </div>
            <div class="w-full sm:w-1/2 flex justify-center">
                <img class="w-full md:w-[80%]" src="${item.img}" alt="" />
            </div>
            
        `;
  });
}

function getSelect(type) {
  const select = document.querySelector("select");
  select.innerHTML = "";
  PRODUCT[0].variations
    .filter((elem) => elem.type == type)
    .map(elem => {
      select.innerHTML += `
        <option value="${elem.price}">${elem.size}</option>
      `;
    })
}
    
let flag = false
function changeType() {
  flag = true
  const select = document.querySelector("select");
  const qiymetntc = document.getElementById('qiymetntc')
  const countDiv = document.getElementById("countDiv");
  countDiv.innerHTML = 1
  qiymetntc.innerHTML = select.value
  PRODUCT[0].price = select.value
  // localStorage.setItem("basket", JSON.stringify(basketArr))

}
  
;
