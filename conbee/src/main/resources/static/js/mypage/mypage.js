    function sample6_execDaumPostcode() {
        new daum.Postcode({
            oncomplete: function (data) {
                var addr = ''; 
            
                if (data.userSelectedType === 'R') { 
                    addr = data.roadAddress;
                } else { 
                    addr = data.jibunAddress;
                }
            
                // 우편번호와 주소 정보를 해당 필드에 넣는다.
                document.getElementById('postcode').value = data.zonecode;
                document.getElementById("address").value = addr;
                // 커서를 상세주소 필드로 이동한다.
                document.getElementById("detailAddress").focus();
            }
        }).open();
    }
    
    
        /* 프로필 이미지 미리보기, 제거 */

        const img_profile = document.querySelector("#img_profile"); // img 태그
        let imageInput = document.querySelector("#imageInput"); // input 태그
        const deleteImage = document.querySelector("#deleteImage"); // x 버튼


        let statusCheck = -1;

        let backupInput;

        if(imageInput != null) {
        
            const changeImageFn = e => {
            
                console.log(e.target);
                console.log(e.target.value);
                console.log(e.target.files[0]);
            
                const uploadFile = e.target.files[0];
            
                if(uploadFile == underfined){
                    console.log("파일 선택 취소");
                
                    imageInput.after(temp);
                    imageInput.remove();
                
                    imageInput =temp;
                    imageInput.addEventListener("change",changeImageFn);
                    return;
                }
            
                const maxSize = 1024 * 1024;
            
                if(uploadFile.size > maxSize) {
                    alert("1MB 이하의 이미지만 업로드 가능");
                
                    if(imageInput.value == -1 ) {
                    
                        imageInput.value = '';
                    
                        statusCheck = -1;
                    } else {
                    
                        const temp = backupInput.cloneNode(true);
                    
                        imageInput.after(temp);
                    
                        imageInput.remove();
                    
                        imageInput = temp;
                        imageInput.addEventListener("change", changeImageFn);
                    
                        statusCheck = 1;
                    
                    }
                        return;
                
                }
            
                // 선택된 이미지 파일을 읽어와 미리보기 만들기
            
                const reader = new FileReader();
            
                reader.readAsDataURL(uploadFile)
            
                reader.onload = e => {
                
                    profileImg.setAttribute("src", reader.result);
                
                    statusCheck = 1;       
                    
                    backupInput = imageInput.cloneNode(true);
                
                }
            
            }
        
            // 이미지 선택 버튼을 클릭하여 선택된 파일이 변했을 때 함수 수행

            imageInput.addEventListener("change" , changeImageFn);

            // x버튼 클릭 시 기본 이미지로 변경

            deleteImage.addEventListener('click', () => {
                profileImg.setAttribute("src" ,deleteImage)

                imageInput.value = "";
                backupInput.value = "";
                statusCheck = 0;
            });
        
           // 프로필 이미지 변경 form 태그 제출 시 동작

           const mypageFrm = document.getElementById("mypageFrm");

           mypageFrm.addEventListener("submit", e => {

            let flag = true;

            if(loginMembermypageFrm != null && statusCheck == 0) flag =false;

            if(loginMembermypageFrm == null && statusCheck == 1) flag =false;

            if(loginMembermypageFrm != null && statusCheck == 1) flag =false;

            if(flag) {
                e.preventDefault();
                alert("이미지 변경 후 클릭 해주세요");
            }

        });
        
    }