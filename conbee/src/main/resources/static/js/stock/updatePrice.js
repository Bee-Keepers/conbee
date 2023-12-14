const storeNoSelect = document.getElementById("storeNoSelect");
const storeSearch = document.getElementById("storeSearch");
// 지점 이름으로 검색
storeSearch.addEventListener("change", e=>{

    fetch("/revenueManage/storeSearch?inputStoreName=" + e.target.value)
    .then(resp=>resp.json())
    .then(list=>{
        storeSelect.innerHTML = "";
        console.log(list);
        if(list.length == 0){
            storeSelect.innerText = "검색된 지점이 없습니다.";
        } else{
            for(let opt of list){
                const option = document.createElement("option");
                option.value = opt.storeNo;
                option.innerText = opt.storeName;
                storeSelect.append(option);
            }
        }
    })
    .catch(e=>console.log(e));
});

// 상세검색 버튼 누르면 제출
const revenueSearchForm = document.getElementById("revenueSearchForm");
const revenueSearchBtn = document.getElementById("revenueSearchBtn");
revenueSearchBtn.addEventListener("click", ()=>{
  revenueSearchForm.submit();
});

/* 입고가 수정 누르면 빈칸 채우기 */
const stockUpdateBtn = document.getElementById("stockUpdateBtn");

stockUpdateBtn.addEventListener("click", () => {

  const checkbox = document.querySelector("input[type='checkbox']:checked");
  const row = checkbox.closest("tr");
  document.getElementById("goodsNoUpdate").value = row.children[1].innerText;
  document.getElementById("goodsName").value = row.children[2].innerText;
  document.getElementById("lcategoryNameUpdate").value = row.children[3].innerText;
  document.getElementById("scategoryNameUpdate").value = row.children[4].innerText;
  document.getElementById("stockInPrice").value = row.children[6].innerText;
  document.getElementById("stockOutPriceUpdate").value = row.children[7].innerText;
  document.getElementById("stockDiscountUpdate").value = row.children[9].innerText;
  document.getElementById("storeNoUpdate").value = row.children[11].innerText;
});