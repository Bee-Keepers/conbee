const storeChange = document.getElementById("storeChange");
const storeNo = document.getElementById("storeNo");
const storeTel = document.getElementById("storeTel");
const storeAddress = document.getElementById("storeAddress");


storeChange.addEventListener("change", ()=>{
  fetch("/myPage/myPage-store/select?storeNo=" + storeChange.value)
  .then(resp=>resp.json())
  .then(store=>{
    storeNo.innerText = store.storeNo;
    storeTel.value = store.storeTel;
    storeAddress.innerText = store.storeAddress;
  })
  .catch(e=>console.log(e));
});