let spinBtn = document.querySelector('.spinbtn')
let spinWheel = document.querySelector('.wheel')
let value = Math.ceil(Math.random() * 3600);

spinBtn.addEventListener('click', function(){
    spinWheel.style.transform = `rotate(${value}deg)`
    value += Math.ceil(Math.random() * 3600);
})