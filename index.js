const fileUpload=document.querySelector(".fileUPPP");
const inputForm=document.querySelector(".input__contents");
const input=document.querySelector("input");
const button=document.getElementsByClassName("submit")[0];
const WhatYouGot=document.getElementsByClassName("value")[0];
const list=document.getElementsByClassName("arrayList")[0];
const anonymous=document.getElementsByClassName("anonymous")[0];
const rinaPic=document.getElementsByClassName("rinaLocation")[0];
const downloadButton=document.getElementsByClassName("download")[0];
const uploadFile=document.getElementsByClassName("fileUpload")[0];
let inputArray=[];
let files;
let fileArray;
checkBoolean=false;

function saveFile(){
    const whatyouget=document.getElementsByClassName("arrayList")[0].querySelectorAll("span");
    if(whatyouget.length<=0){
        alert("please insert more than 1.");
    }else{
       var listOfArray=[];
       for(var i=0;i<whatyouget.length;i++){
        console.log(whatyouget[i].id)
        listOfArray.push(whatyouget[i].id);
       }
       console.log(listOfArray);
        var textDownload=document.createElement('a');
       textDownload.href='data:attachment/text,'+encodeURI(listOfArray.join('\n'));
       textDownload.target='_blank';
       textDownload.download='lots.txt';
       textDownload.click();
       
    }
   
    
}

function deleteToDo(event) {
    const btn = event.target;
    const li = btn.parentNode;
    list.removeChild(li);
}

function handleCheckButton(){
    checking=anonymous.checked;
    console.log(checking);
    if(checking){
        input.type="password";
        input.style="ime-mode:auto";
        checkBoolean=true;
    }else{
        input.type="text";
        checkBoolean=false;
    }
}
function handleInput(event){
    event.preventDefault();
    if(input.value.length==0){
        alert("please input value.");
        return;
    }
    console.log(input.value);
    const potato=document.createElement("li");
    const delBtn=document.createElement("button");
    delBtn.innerText="X";
    delBtn.addEventListener("click",deleteToDo);
    const span=document.createElement("span");
    if(checkBoolean){
        span.innerText="*****";
        span.setAttribute("id","secret_"+input.value);
        potato.appendChild(span);

    }else{
        span.innerText=input.value;
        span.setAttribute("id",input.value);
        potato.appendChild(span);
    }
   
    potato.appendChild(delBtn);
    list.appendChild(potato);
    inputForm.reset();
}

function handleButton(event){
    const whatyouget=document.getElementsByClassName("arrayList")[0].querySelectorAll("span");
    console.log(whatyouget);
    if(whatyouget.length>1){
        const ranNumber=Math.floor(Math.random()*(whatyouget.length-1+1));
        if(whatyouget[ranNumber].id.startsWith('secret_')){
            console.log(whatyouget[ranNumber].id)
            WhatYouGot.innerText=whatyouget[ranNumber].id.substr(7,whatyouget[ranNumber].id.length);
        }else{
            WhatYouGot.innerText=whatyouget[ranNumber].id;
        }
       
    }else{
        alert("please insert more than 1.");
    }
}
function readFile1(e) { 
    var file = e.target.files[0];
    console.log(file);
    if (!file) {
           return;
    }
    var reader = new FileReader();
    
    reader.onload = function(e) {
        files=reader.result.split('\n');
        console.log(files);
        for(var i=0;i<files.length;i++){
            if(files[i].length==0){
                continue;
            }
            console.log(files[i]);
            const potato=document.createElement("li");
            const delBtn=document.createElement("button");
            delBtn.innerText="X";
            delBtn.addEventListener("click",function(event) {
                const btn = event.target;
                const li = btn.parentNode;
                list.removeChild(li);
              })
            const span=document.createElement("span");
            span.setAttribute("id",files[i]);
            if(files[i].startsWith("secret_")){
                span.innerText="*****";
            }else{
                span.innerText=files[i];
            }
            potato.appendChild(span);
            potato.appendChild(delBtn);
            list.appendChild(potato);
        }
        
        //file데이터를 읽어서 처리할 로직.
    };
    console.log(files);
    reader.readAsText(file, 'utf-8');
}


uploadFile.addEventListener("change",readFile1);


if(button){
    button.addEventListener("click",handleButton);
}
inputForm.addEventListener("submit",handleInput);
anonymous.addEventListener("click",handleCheckButton);

downloadButton.addEventListener("click",saveFile)

console.log(window.innerHeight,window.innerWidth);

window.addEventListener("resize",handleWebSize);
