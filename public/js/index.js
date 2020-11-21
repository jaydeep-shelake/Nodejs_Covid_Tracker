const btns = document.querySelectorAll('.all');
const none =document.querySelector('.none');
const modal = document.querySelector('.modal');
const feedback = document.getElementById('feedback');
const subBtn = document.getElementById('subBtn');
const msgArea=document.querySelector('.msg-area');
const i = document.querySelector('.burger i');
const cross = document.getElementById('cross');

btns.forEach((btn)=>{
  btn.addEventListener('click',(e)=>{
   const preElement=e.target.previousElementSibling;
   const button=e.target;
    preElement.classList.toggle('none');
  
    if(button.innerText=='See All'){
      button.innerText='See less';
    }
    else{
        button.innerText='See All';
    }
});


  
});

 
feedback.addEventListener('click',()=>{
    modal.classList.add('fill');
})

window.addEventListener('click',(e)=>{
    if(e.target==modal){
        modal.classList.remove('fill');
    }
});

cross.addEventListener('click',()=>{
    modal.classList.remove('fill');
});

subBtn.addEventListener('click',()=>{
  msgArea.style.top='15%'
});

