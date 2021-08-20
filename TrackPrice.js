// Firebase App (the core Firebase SDK) is always required and must be listed first
const firebase = require('firebase')
const firebaseConfig = {
    apiKey: "AIzaSyD3yhbWUSflgRV0MYV4X2eyXw9-SXDZbkw",
    authDomain: "mandiapp83-f3c73.firebaseapp.com",
    databaseURL: "https://mandiapp83-f3c73-default-rtdb.firebaseio.com",
    projectId: "mandiapp83-f3c73",
    storageBucket: "mandiapp83-f3c73.appspot.com",
    messagingSenderId: "285979018863",
    appId: "1:285979018863:web:101e49cefe31ae0a06ef9a",
    measurementId: "G-7DDXENRZW1",
  };
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app(); // if already initialized, use that one
  }
  
const puppeteer = require('puppeteer');
const soyabeanurl = 'https://m.moneycontrol.com/commodity/ncdex/sybeanidr-price.html'
const chanaurl = 'https://m.moneycontrol.com/commodity/ncdex/chana-price.html'
const kapasurl='https://www.moneycontrol.com/commodity/ncdex/kapas-price.html#29apr2022'
const cottonoilcakeurl ='https://m.moneycontrol.com/commodity/ncdex/cocudakl-price.html'
const gehuurl ='https://m.moneycontrol.com/commodity/ncdex/wheatfaq-price.html'

if (!soyabeanurl) {
    throw "Please provide soyabeanURL as a first argument";
}

console.log("STart");
async function run () {
    setInterval(async() => {
        //soyabean
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(soyabeanurl);
        const bhav = await page.evaluate(
            () => document.querySelector(".acctab2").innerHTML
          );
         let  bhavup1=  bhav.replace('<p>','').replace('</p>','').replace(',','').replace('n','')
         console.log( "Soyabean :"+bhavup1.match(/\d+/)[0]);
       //chana  
         const chanapage = await browser.newPage();
         await chanapage.goto(chanaurl);
        
         const chanabhav = await chanapage.evaluate(
             () => document.querySelector(".acctab2").innerHTML
           );
          let  chanabhavup1=  chanabhav.replace('<p>','').replace('</p>','').replace(',','').replace('n','').match(/\d+/)[0]
          console.log("Chana :"+ chanabhavup1);
          //Kapas
          const kapaspage = await browser.newPage();
await kapaspage.goto(kapasurl);

const kapasbhav = await kapaspage.evaluate(
    () => document.querySelector(".gr_30").innerText
  );
 let  kapasbhavup1=  kapasbhav.replace('<p>','').replace('</p>','').replace(',','').replace('n','').match(/\d+/)[0]
 console.log("Cotton  :"+'Kapas'+ kapasbhavup1*5);
 //cottonoilcake
 const cottonoilcakepage = await browser.newPage();
 await cottonoilcakepage.goto(cottonoilcakeurl);
 
 const cottonoilcakebhav = await cottonoilcakepage.evaluate(
     () => document.querySelector(".acctab2").innerHTML
   );
  let  cottonoilcakebhavup1=  cottonoilcakebhav.replace('<p>','').replace('</p>','').replace(',','').replace('n','').match(/\d+/)[0]
  console.log("Cotton Seed OilCake  :"+ cottonoilcakebhavup1);
//gehu
 //gehu
 const gehupage = await browser.newPage();
 await gehupage.goto(gehuurl);
 
 const gehubhav = await gehupage.evaluate(
     () => document.querySelector(".acctab2").innerHTML
   );
  let  gehubhavup1=  gehubhav.replace('<p>','').replace('</p>','').replace(',','').replace('n','').match(/\d+/)[0]
  console.log("गेहू   :"+ gehubhavup1);
 console.log('---------------------------------------------------------------------------------')
         browser.close();
         firebase  
         .database()
         .ref('Bhavupdate')
         .set({
        Soyabean:bhavup1.match(/\d+/)[0]   ,
        Chana:chanabhavup1.match(/\d+/)[0],
        Kapas:kapasbhavup1.match(/\d+/)[0]*5,
        Cottonoilcake:cottonoilcakebhavup1.match(/\d+/)[0],
        Gehu:gehubhavup1.match(/\d+/)[0]
        });
    
    
       
       
     }, 6000);
  
}
run();
