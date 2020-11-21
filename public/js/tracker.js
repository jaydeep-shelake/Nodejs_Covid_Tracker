//https://corona.Imao.ninja/v2/countries/USA
//5214677
const searchBtn = document.getElementById('searchBtn');
const country = document.getElementById('country');
const rowName = document.getElementById('row-name');
const coloumnName = document.getElementById('coloumn-name');
const table = document.querySelector('.table');
searchBtn.addEventListener('click',Search)

 async function Search(e){
    country.innerHTML='LODING...'
    const serachBar = document.getElementById('searchBar').value;
    console.log(serachBar);

const url = `https://corona.lmao.ninja/v2/countries/${serachBar}`;
const INDurl =`https://api.covid19india.org/data.json`

const res= await fetch(url)
const data= await res.json();

if(serachBar=='India'){
    const sateArray=[];
    let string;
    table.style.display='block';
    const Indres = await fetch(INDurl);
    const Inddata = await Indres.json();
    const statewise=Inddata.statewise;
    console.log(Inddata);
    statewise.forEach((state)=>{
      sateArray.push(state.state);
      string=`<tr><th>${state.state}</th>
      <td class="text-danger">${state.confirmed}</td>
      <td class="text-primary">${state.active}</td>
      <td class="text-seconadry">${state.deaths}</td>
      <td class="text-success">${state.recovered}</td></tr>`
      coloumnName.innerHTML+=string;
    });
    
    console.log(sateArray);

}
    
    console.log(data);
    const totalCase=  data.cases;
    const totalDeath = data.deaths;
    const todyCase=  data.todayCases;
    const active= data.active;
    const critical=  data.critical;
    const recoverd=  data.recovered;
    const totalTest=  data.tests;
    const countryName = data.country;
    
    //todayDeaths: 0
    //todayRecovered: 2723
     const flag=data.countryInfo.flag;//img
     const name= data.countryInfo.iso3;//name
    //  

     const str=`<h2>${countryName.toUpperCase()}</h2>
         <div id="flag">
         <img src="${flag}" alt="">
      </div>`;

    country.innerHTML=str;
    console.log(country);
    console.log(totalDeath);
    
    

    // count effect
   const totaCaseCounter = document.getElementsByClassName("counter")[0].setAttribute('data-target',totalCase);
   const totalDeathCounter = document.getElementsByClassName("counter")[1].setAttribute('data-target',totalDeath);
   const activeCasesCounter = document.getElementsByClassName("counter")[2].setAttribute('data-target',active);
   const recoverdCasesCounter = document.getElementsByClassName("counter")[3].setAttribute('data-target',recoverd);
   const criticalCasesCounter = document.getElementsByClassName("counter")[4].setAttribute('data-target',critical);
   const testCounter = document.getElementsByClassName("counter")[5].setAttribute('data-target',totalTest);

   const counters = document.querySelectorAll('.counter');
   const speed =200;

   counters.forEach((counter)=>{
       const updateCount=()=>{
           const target =+counter.getAttribute('data-target');
           const countNum =+counter.innerHTML;

           const incriment = target/speed;

           if(countNum<target){
             counter.innerHTML= Math.ceil(countNum+incriment);
             setTimeout(updateCount,1);
           }
           else{
               counter.innerText=target;
           }
       }
       updateCount();
   })
   

    



}


// const days=["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];

// const a = new Date()
// const b = days[a.getDay()];
// console.log(b);