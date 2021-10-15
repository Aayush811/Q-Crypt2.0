let optionSelected = "encrypt"
let btn = document.querySelector("#button");
let inputs = document.querySelectorAll("#input");
let encrypt = document.querySelector(".encrypt");
let decrypt = document.querySelector(".decrypt");
let heading = document.querySelectorAll(".heading");
let select = document.querySelector("#algo");
// let algoSelected = select.value;

encrypt.addEventListener("click" , function(){
    optionSelected = "encrypt";
    btn.innerText = "Encrypt"
    encrypt.style.backgroundColor = "#0d6efd";
    decrypt.style.backgroundColor = "#F6F6F6";
    heading[1].innerText = "Cipher Text";
    heading[0].innerText = "Plain Text";
    heading[1].style.fontSize = "calc(1.325rem + .9vw)";
    heading[0].style.fontSize = "calc(1.325rem + .9vw)";
})

decrypt.addEventListener("click" , function(){
    optionSelected = "decrypt";
    btn.innerText = "Decrypt"
    decrypt.style.backgroundColor = "#0d6efd";
    encrypt.style.backgroundColor = "#F6F6F6";
    heading[0].innerText = "Cipher Text";
    heading[1].innerText = "Plain Text";
    heading[1].style.fontSize = "calc(1.325rem + .9vw)";
    heading[0].style.fontSize = "calc(1.325rem + .9vw)";
})

btn.addEventListener("click" , function(){
    let input = inputs[0].value;
    // console.log(plainText);
    if(select.value === "default")
    {
        alert("Please select an Encription/Decryption algorithm!!!!");
        return;
    }
    // console.log(select.value);
    let depth = document.querySelector(".form-control").value;
    depth = depth - '0';
    let ans = "";

    if(optionSelected === "encrypt") 
    {
        if(select.value === "ceaser")
            ans = plainToCipherCeaser(input , depth)
        else if(select.value === "railFence")
            ans = plainToCipher(input , depth)        
    }
    else if(optionSelected === "decrypt")
    {
        if(select.value === "ceaser")
            ans = cipherToPlainCeaser(input , depth)
        else if(select.value === "railFence")
            ans = cipherToPlain(input , depth)        
    }    
    // console.log(ans);
    inputs[1].value = ans;        
})

function plainToCipher(plainText , depth)
{
    let cipherText = "";    
    let n = plainText.length;

    if(depth >= n) return plainText;

    for(let i = 0 ; i < depth ; i++)
    {
        let j = i;
    
        while (j < n)
        {
            cipherText += plainText.charAt(j);
            j = j + depth;
        }
    }  
    
    return cipherText;
}

function cipherToPlain(cipherText , depth)
{
    let n = cipherText.length;
    console.log(n);
    let i = 0 , count = 0;
    let arr = new Array(depth);
    let minCB = Math.floor(n / depth); //minimum char in a box
    let charLeft = n - minCB * depth;
    let bnpc = charLeft % depth; //box need to put left chars
    let maxCB = minCB + (charLeft / bnpc);
    let plainText = "";

    while(i < n)
    {
        if(bnpc > 0)
        {
            arr[count++] = cipherText.substring(i , i + maxCB);
            i = i + maxCB;
            bnpc--;
        }
        else
        {
            arr[count++] = cipherText.substring(i , i + minCB);
            i = i + minCB; 
        }
    }

    let idx = 0;
    while(plainText.length != cipherText.length)
    {
        for(let i = 0 ; i < depth ; i++)
        {
            let str = arr[i];
            if(idx < str.length)
            {
                plainText += str.charAt(idx);
            }
            else break;
        }
        idx++;
    }

    return plainText;
}

function plainToCipherCeaser(text , key)
{
    plainText ="";
    for(let i = 0 ; i < text.length ; i++)
    {
        let asci = text.charCodeAt(i);
        plainText = plainText + String.fromCharCode((asci + key) % 127);
    }
    return plainText;
}

function cipherToPlainCeaser(text , key)
{
    plainText ="";
    for(let i = 0 ; i < text.length ; i++)
    {
        let asci = text.charCodeAt(i);
        plainText = plainText + String.fromCharCode((asci - key) % 127);
    }
    return plainText;
}