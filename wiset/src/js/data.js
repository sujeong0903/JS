const inputArea = document.querySelector(".input_area"),
    presentList = document.querySelector(".present_list"),
    popupArea = document.querySelector(".popup_area"),
    player = document.querySelector(".lottie"),
    popupTitle =  document.querySelector(".popup_title"),
    popupImg = document.querySelector(".popup_img"),
    selectedList = document.querySelector(".selected_list"),
    bgAudio = document.querySelector(".bg_audio"),
    soundAudio = document.querySelector(".sound_audio");

let list = []; // exel에서 추출한 데이터 저장 (원본)
let drawList = []; // list를 수정한 값 (복사본)
let chosenPerson = {1:[], 2:[], 3:[], 4:[]}
const title = ["", "애플 에어팟 프로 (1명)", "BBQ 황금올리브세트 (5명)", "맘스터치 싸이버거 세트 (10명)", "베스킨라빈스 더블주니어 (20명)"]

// 뽑기 
const drawPerson = (rank, num) => {
    // 1등
    if(rank == 1 ) {
        let count = [];
        let finalList =[];
    
        // 여자 && 횟수 구하기 
        list.forEach((item) => {
            if(item["성별"] == "여")  {
                if(item["연락처"] in count) {
                    count[item["연락처"]] = count[item["연락처"]]+1;
                }
                else {
                    count[item["연락처"]] = 1;
                }
            }
        });
    
        Object.keys(count).forEach((item) => {
            if(count[item] >= 5 ) {
                finalList.push(list.find((element) => {
                    return element["연락처"] == item
                }))
            }
        })

        // 조건에 해당하는 사람 없을 때, 고정 값
        if(finalList.length==0) {
            chosenPerson[1] = [{'학교명': '', '성명': '서민서', '성별': '여', '연락처': '010-0000-3601'}]
        }
    
        else {
            chosenPerson[1] = [finalList[Math.floor(Math.random() * finalList.length)]];
        }
    }

    // 2~4등
    else {
        let i=0; 
        if(chosenPerson[rank].length == 0) {
            while(i<num) {
                const person = drawList[Math.floor(Math.random() * drawList.length)];
                chosenPerson[rank].push({"학교명" : person["학교명"], "성명" : person["성명"], "성별" : person["성별"], "연락처" : person["연락처"]});
                drawList = drawList.filter((element) => {
                    // 이미 뽑힌 사람 리스트에서 제거
                    if(element["연락처"] !== person["연락처"])  {
                        return true;
                    }
                });
                i++;
            }
        }
    }
    openPopup(rank);
}

// 연락처 마스킹
const maskingPhone = (phone) => {
    return phone.substr(phone.length-4, phone.length);
}

// 이름 마스킹
const maskingName = (name) => {
    const origin = name.split('');
    if(origin.length > 2) {
        origin.forEach((ch, i) => {
            if(i == 0 || i == origin.length-1) return;
            origin[i]='*'
        })
    } 
    else {
        origin[origin.length-1] = '*'
    }
    return origin.join('');
}

// 팝업
const openPopup = (rank) => {
    popupTitle.innerHTML = title[rank];
    popupImg.src = `./src/images/${rank}.png`;
    selectedList.innerHTML="";
    chosenPerson[rank].forEach((item) => {
        const span = document.createElement("span");
        span.classList.add("item");
        span.innerHTML = `${maskingName(item["성명"])}(${maskingPhone(item["연락처"])})`;
        selectedList.appendChild(span);
    })
    popupArea.classList.add("showing");
    bgAudio.pause();
    soundAudio.play();
    setTimeout(() => {
        player.stop();
        player.play();
    }, 2000);

    if(rank == 1) {
        setTimeout(()=>{
            exportExcel();
        }, 8000)
    }
}

const closePopup = () => {
    popupArea.classList.remove("showing");
    bgAudio.play();
    soundAudio.pause();
    soundAudio.currentTime = 0;
}

//준비
const readyTochoice = () => {
    inputArea.classList.remove("showing");
    presentList.classList.add("showing");
    bgAudio.play();
}

// 엑셀 파일 읽기
const readExcel = (event) => {
    const input = event.target;
    const reader = new FileReader();
    reader.onload = () => {
        const data = reader.result;
        const file = XLSX.read(data, { type: 'binary' });
        const rows = XLSX.utils.sheet_to_json(file.Sheets[file.SheetNames[0]]); // 첫번째 시트만
        list = rows.map((item) =>{
            let obj = {}
            obj["학교명"] = item["학교명"];
            obj["성명"] = item["성명"];
            obj["성별"] = item["성별"];
            obj["연락처"] = item["연락처"].replace(/\-/g,'');
            return obj;
        })
        drawList = list;
        readyTochoice();
    };
    reader.readAsBinaryString(input.files[0]);
}

//엑셀 추출
const s2ab =(s)=> { 
    var buf = new ArrayBuffer(s.length);
    var view = new Uint8Array(buf);
    for (var i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;    
}

const excelHandler = {
    getExcelFileName : ()=> {
        return 'GEW_당첨자.xlsx';
    },
    getSheetName : ()=> {
        return '당첨자 목록';
    },
    getExcelData : () => {
        // 헤더 추가
        const p = [['등수', '학교명' , '성명', '성별', '연락처']];
        // 당참자 추가
        for(let i = 1; i <=4 ; i++) {
            chosenPerson[i].forEach((item) => {
                p.push([i, item['학교명'], item['성명'], item['성별'], item['연락처']]);
            })
        }
        return p;
    },
    getWorksheet : function(){ // this는 화살표 함수에서 사용 xx
        return XLSX.utils.aoa_to_sheet(this.getExcelData());
    }
}

const exportExcel = () => {
    const wb = XLSX.utils.book_new();
    const newWorksheet = excelHandler.getWorksheet();
    XLSX.utils.book_append_sheet(wb, newWorksheet, excelHandler.getSheetName());
    var wbout = XLSX.write(wb, {bookType:'xlsx',  type: 'binary'});
    saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), excelHandler.getExcelFileName());
}