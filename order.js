let nameu;
let phu;
let addu;
var dat2;
var postal;

var proi=sessionStorage.getItem('id');
var prof=proi
console.log(prof);
var user=sessionStorage.getItem('userName');
console.log(user)
function us() {
fs.collection('users').doc(user).get().then((doc)=>{
  if(doc.exists){
    var nn=doc.data();
    nameu=nn.n
    phu=nn.ph
    addu=nn.address
    postal=nn.po
    console.log(addu)
    var pr=document.getElementById('info-per')
    pr.innerHTML += 'Name:'+nameu+'<br>phone Number:'+phu+'<br>Address:'+addu+'<br>Postal Code:'+nn.po;
  }
})
}

function or() {
  fs.collection("pro").doc(prof).get().then((sp) => {
    if (sp.exists) { // Check if the document exists
      const data = sp.data(); // Access the document's data
      console.log(data.link); // Assuming 'link' is a field in the document
      var pr=document.getElementById('pro');
      var imd=document.createElement('img');
      imd.setAttribute('src',data.link);
      imd.style.width='100%';
      pr.appendChild(imd);
      var over=document.getElementById('ovvi');
      var chov=document.createElement('b');
      chov.textContent='price:'+data.pr;
      over.appendChild(chov);
      dat2=data;
    } else {
      console.log('No document found');
    }
  }).catch((error) => {
    console.error('Error fetching document:', error);
  });
}
or();
us();
document.getElementById('bu').addEventListener("click",function () {
  const inf={
    cosname:nameu,cosph:phu,cosadd:addu,
    prlk:dat2.link,prpr:dat2.pr,prti:dat2.titl,prart:prof,cosi:user,postl:postal
  };
    fs.collection('orders').doc(user).set(inf).then(()=>{
      alert('order placed');
    }).catch((error)=>{
      alert(error.message);
    })
})

