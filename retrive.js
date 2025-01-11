
var proi;

fs.collection('pro').onSnapshot((snap) => {
  if(snap.empty){
    console.log('no data has been uploaded');
  }
  
  snap.forEach((doc)=>{
    var d=doc.data();
    var bu=document.createElement('input');
    bu.type="button"
    bu.value="buy";
    bu.setAttribute('id','ordb')
    bu.onclick= function(){
      window.location.href="order.html"
      proi=doc.id;
      sessionStorage.setItem('id',proi)
    }
    if(d.link){
    var link=d.link;
    console.log(link)
    var te=d.titl;
    var conpr=document.createElement('div');
    var card=document.createElement('div');
    conpr.appendChild(card);
    conpr.style.display='block'
    conpr.style.backgroundColor='#000000'
    card.appendChild(bu);
     

     card.style.height = '600px';
     card.style.width = "80vw";
     card.style.borderRadius = '3px';
     card.style.margin = '10%';
     card.style.borderColor = '#000000';
     card.style.backgroundColor = "#00000"/*RGBA(225,225,0.5)"*/;
     card.style.backdropfilter="blur(10px)";
     var tex = document.createElement('div');
     tex.innerHTML += "Price:"+d.pr+'<br>'+te+'<br>AR T No.'+doc.id;
     tex.style.position = 'relative';
     tex.style.top = '400px';
    
     tex.style.borderWidth='20px';
     tex.style.borderCollapse='#000000';
     tex.style.color='#FFFFFF';
     card.appendChild(tex);
     var im=document.createElement('img');
     im.setAttribute('src',link)
     card.appendChild(im);
     im.style.height = '40%';
     im.style.width = '100%';
     document.body.appendChild(conpr)
     
    }
  })
})