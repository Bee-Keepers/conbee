const addressName = document.getElementById("addressName");
const addressNameBtn = document.getElementById("addressNameBtn");

const url = new URL(location.href);
const urlParams = url.searchParams;


addressNameBtn.addEventListener("click", ()=>{
    const url = new URL(location.href);
    const urlParams = url.searchParams;
    let grade = urlParams.get("grade");
    if(urlParams.get("grade") == null){
        grade = 0;
    }
    location.href = "/address?grade=" + grade + "&query=" + addressName.value;
});