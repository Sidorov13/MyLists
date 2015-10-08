//работа со списком
var lists=[];
var activlist;

function myList(name,shop) {
    this.name=name;
    this.products=[];
    this.shop=shop;
    
    this.runButton=createButton();
    this.runButton.innerHTML="optimal.P";

    this.pExist=function(productName) {

        for(var i=0;i<this.products.length;i++) {
            if(productName ===this.products[i].name)
            {
                alert("такой продукт уже есть");
                return true;
            }
          
        }
        return false;
    };
    this.pushProduct=function(item) {
    this.products.push(item);
    this.runButton.onclick=(this.products.length>=7) ? newpath : map;
    };
    
    this.popProduct=function(index){
        this.products.splice(index,1);
        this.runButton.onclick=(this.products.length>=7) ? newpath : map;
    };

}
function addProduct(name){
var product={"name":name,"selected":false,"x":0,"y":0};
//activlist.products.push(product);
    activlist.pushProduct(product);
var tr=createproductrow(product);
var tb=document.getElementById("tb2");	
	tb.appendChild(tr);
}

function addList(name) {
     if(listexist(name)) {
	alert("такой список уже есть");
	return;
  }

  var market={"name":"магазин.","selected":false,"x":0,"y":0};
  /*var list={
      "name":name,
      "products":[],
      "shop":market,
  addProduct: function(item) {
  this.products.push(item);
  }
  };
*/
    var list=new myList(name,market);
    
  lists.push(list);
  add2table(list);
  storesave();
}
function myTrim(x) {
    return x.replace(/^\s+|\s+$/gm,'');
}
function addFrom() {
	var elem=document.getElementById("txtname");
	if(elem == null) {
		elem=document.getElementById("txt2");
        var trimName=myTrim(elem.value);
        if(trimName === "") {
            alert("введите имя продукта");
            return;
        }
		if(activlist.pExist(trimName)) {
			return;
		}
		//elem=document.getElementById("txt2");
		addProduct(trimName);
		
			storesave();
	}
	else  {
	 addList(elem.value);
	 elem.value="";
	}		
}

function add2table(item){
	var tb=document.getElementById("tb");
	var tr=createlistrow(item);

	tb.appendChild(tr);
}
function createlists(){
storeload();
var mine=document.getElementById("mine");
mine.innerHTML="";
var tb=createTable();
//tb.id="tb";

var tr=document.createElement("tr");
var td=crtd(tr,"col-xs-4");
    

td.innerText="название списка";
tb.appendChild(tr);

td=crtd(tr,"col-xs-6");
var input=document.createElement("input");
input.type="text";
input.className="form-control";
input.id="txtname";
td.appendChild(input);

td=crtd(tr,"col-xs-2");
var button=createButton("glyphicon glyphicon-plus");
button.onclick=addFrom;
td.appendChild(button);

    var tableTwo=createTable();
    tableTwo.id="tb";
forone(lists,function(item) {
    tr=createlistrow(item);
	tableTwo.appendChild(tr);
       }
);
/*for(var i=0;i<lists.length;i++) {
	tr=createlistrow(lists[i]);
	tb.appendChild(tr);
}*/
    mine.appendChild(tb);
mine.appendChild(tableTwo);


}
function createTable() {
    
    var tb=document.createElement("table");
    tb.className="table table-striped";

    return tb;
}
function createButton(name) {
 var button=document.createElement("button");
    button.className="btn btn-success";
    if(name) {
        var sp=document.createElement("span");
        sp.className=name;
        button.appendChild(sp);
        

        //<span class="glyphicon glyphicon-trash"></span>
    }
    return button;
}
function createlistrow(list) {
var	tr=document.createElement("tr");
var td=crtd(tr,"col-xs-10");  //col-xs-11

	td.onclick=function() {
		createlist(this.innerText);
	};  
	td.innerText=list.name;
	td.style.cursor="pointer";


td=crtd(tr,"col-xs-2");  //col-xs-1
    var button=createButton("glyphicon glyphicon-trash");
    button.onclick=function() {
	  var row=this.parentNode.parentNode;
	  var listname=row.childNodes[0].innerText;
	if (confirm("вы действительно хотите удалить ВЕСЬ СПИСОК" +  " " + listname + "?") ) {
		var index=-1;
forone(lists,function(item,i){
 	if(item.name==listname) {index=i;}
 } ); 
 	lists.splice(index,1);
 	row.parentNode.removeChild(row);
 	
 	storesave();
 	
} else {

  alert("Вы нажали кнопку отмена")

}

};

td.appendChild(button);

	
	return tr;
}

function crtd(row,className) {
	var td=document.createElement("td");
    if(className) {
       td.className=className;
    }
	row.appendChild(td);
	return td;
}
function listexist(listname) {
	for(var i=0;i<lists.length;i++) {
		if(listname ===lists[i].name) {
			return true;
		}
		
	}
	return false;
}
//function productexist(listname) {
//	for(var i=0;i<activlist.products.length;i++) {
//		if(listname ===activlist.products[i].name) {
//			return true;
//		}
//		
//	}
//	return false;
//}
function productfind(name) {
    
	for(var i=0;i<activlist.products.length;i++) {
		if(name ===activlist.products[i].name) {
			return activlist.products[i];
		}
	}
    if(name + "." === activlist.shop.name) {
        return activlist.shop;
    }
	return null;
}

function createlist(listname) {
  //var listname=td.innerText;
  for(var i=0;i<lists.length;i++) {
	if(listname ===lists[i].name) {
		activlist=lists[i];
		break;
	}
}
    
    
var mine=document.getElementById("mine");
mine.innerHTML="";
    
var dv=document.createElement("div");
dv.innerHTML=listname;
mine.appendChild(dv);

var input=document.createElement("input");
input.className="form-control";
input.type="text";
input.id="txt2";
mine.appendChild(input);
    
var button=createButton("glyphicon glyphicon-arrow-left");
button.style.margin = "5px 5px";
button.onclick=createlists;
    
var button2=createButton("glyphicon glyphicon-plus-sign");
button2.onclick=addFrom;
mine.appendChild(button2);


//mine.appendChild(button2);
mine.appendChild(button);
mine.appendChild(activlist.runButton);
var tb=createTable();
tb.id="tb2";
mine.appendChild(tb);


for(var i=0;i<activlist.products.length;i++) {
	var product=activlist.products[i];
	var tr=createproductrow(product);
    //tr.id="tr2";
	tb.appendChild(tr);
	
}
}

function createproductrow(product){
		
	tr=document.createElement("tr");
    
	
	td=crtd(tr,"span4");
	td.innerText=product.name;
    
	td.style.cursor="pointer";
	
    td=crtd(tr,"span3");
	td.innerText=roundFloat(product.x);

    td=crtd(tr,"span3");
	td.innerText=roundFloat(product.y);
    
    td=crtd(tr,"span1");
    
    var button=createButton("glyphicon glyphicon-globe");
    
	button.onclick=function() {
		getLocation(this);
		storesave();
	}
	
	td.appendChild(button);
	tr.appendChild(td);
	var clean=document.getElementById("txt2");
	clean.value="";
	
	td=crtd(tr,"span1");
    //td.style.paddingRight="200px";
    var button=createButton("glyphicon glyphicon-trash");
//button.innerHTML="delete";
button.onclick=function() {
	var row=this.parentNode.parentNode;
	var listname=row.childNodes[0].innerText;
	if (confirm("вы действительно хотите удалить этот продукт" +  " " + listname + "?") ) {
		var index=-1;
        for(var i=0;i<activlist.products.length;i++){
            var nameX=activlist.products[i].name;
 	if(nameX === listname) {
        index=i;
        }
 }
        if(index == -1) {
            alert("can't find " + listname);
            return;
        }
 	activlist.popProduct(index);
 	row.parentNode.removeChild(row);
 	
 	storesave();
 	
} else {

  alert("Вы нажали кнопку отмена")

}

};
td.appendChild(button);
	
	return tr;
}

var result;
function randomGeo(){
		
	return {
		coords:{
			longitude:Math.random()*360,
            latitude:Math.random()*360
		}
	};
	
}
function roundFloat(num) {
    var str=String(num);
    var mas="";
    for(var i=0;i<str.length;i++) {
        mas+=str[i];
        if(i==6) {
        return mas;
        }
        
    }
    return mas;
}
function forone(array,callback) {
	for(var i=0;i<array.length;i++) {
		callback(array[i],i);
	}
}

function newpath() {
	var p=activlist.products.slice();
	var marsh=[];
	var sump=0;
	var m={"name":"магазин","selected":false,"x":0,"y":0};
	var point=m;
	while (p.length > 0) {
		var n=[];
	forone(p,function(item,i) {
		var d=distant(point,item);
		n.push({d:d,index:i,product:item});		
});	
	    n.sort(function(a, b) {
        return a.d - b.d;
     });
     point=n[0].product;
     marsh.push(point);
     sump+=n[0].d;
     p.splice(n[0].index,1);
}
var s="";
forone(marsh,function(product) {
	s+=product.name + ".";
	
});
    var g=$('#myModal').modal('show');
    var mhead=document.getElementById("mhead");
    mhead.innerText="результаты";
    var mbody=document.getElementById("mbody");
    mbody.innerHTML="Расстояние : " + roundFloat(sump) + "   "  + "Маршрут : " + s;
console.log("newpath   " + s + "   " + sump );
}

var hash;


function map() {

        var worker;
	//newpath();
	//return;
    result=[];
    var d = new Date();
    var n = d.getTime();
	var points=[];
	//forone(activlist.products,function(item) {
		//points.push(item.name);
	//});
        hash = new Object();
        hash["магазин"] = activlist.shop;
   
    /*forone(activlist.products,function(item) {
           points.push(item.name);
           hash[item.name]=item;
          
           });*/
    for(var i=0;i<activlist.products.length;i++) {
        var item=activlist.products[i];
        points.push(item.name);
        hash[item.name]=item;
    };
    if (!window. Worker){
        
        alert('WebWorkers не подерживаются!');
    }
    else {
        
        //worker = new Worker('js/Worker.js');
        //worker.postMessage({points:points,name:" + "});
    }
    n=printime(n, "for N1");
    var worker_count=points.length;
    var workers=[];
    var target= {path:"one",d:6789879898989898687687687};
    for(var i=0;i<points.length;i++) {
        
        var w = new Worker('js/Worker.js');
        w.addEventListener('message', function(e) {
         //w.onmessage=function(e) {
                           if(e.data.cmd === "finish") {
                             worker_count--;
                             if(worker_count === 0) {
                                console.log("конец расчетов",result.length);
                                result.push(target);
                                printresult(n);
                           for(var i=0;i<points.length;i++) {
                           workers[i].removeEventListener('message');
                           workers[i].terminate();
                           workers[i]=null;
                           
                           }
                             //конец расчетов ;
                             }
                           }
                           else if(e.data.cmd === "result") {
                             //result.push(e.data);
                           if(e.data.d < target.d) {
                              target = e.data;
                              }
                           //console.log('Worker said: ',worker_count, e.data);
                           }
                           else {
                             console.log("error");
                           }
                           
         },
                           false
                           );
        w.addEventListener('error', function(e) {
                           conosle.log(e);
                           },
                           false);
        workers.push(w);
    }
	for(var i=0;i<points.length;i++) {
		var name=points[i]+".";
        //onestep(points,name);
        //workers[i].postMessage({list:activlist,name:name,cmd:"start",id:i});
        var x=JSON.parse(JSON.stringify(activlist));
        workers[i].postMessage({list:x,name:name,cmd:"start",id:i});

	}
}

var isModalVisible=true;

function toggleModal() {
    var modal=document.getElementById("modalDiv");
    if(isModalVisible){
        modal.style.visibility="visible";
        modalContent.style.webkitAnimationPlayState = "running";
    }
    else{
        modal.style.visibility="hidden";
        modalContent.style.webkitAnimationPlayState = "paused";
        
    }
    isModalVisible=!isModalVisible;
}

function printresult(n) {
   
    var sbody=document.getElementById("sbody");
    var res2=result[0].path.split(".");
    var shortRes="";
    for(var i=1;i<res2.length-2;i++) {
        
       shortRes+=res2[i] + ".";
    }
    sbody.innerHTML="Расстояние " +roundFloat(result[0].d) +  " " + "Маршрут : " +shortRes;
    
    toggleModal();
     //var res2=result[0].path.split(".");
      //var t=document.getElementById("tb2");
    var mas=[];
    for(var i=1;i<res2.length;i++) {
         var a=res2[i];

      for(var j=0;j<activlist.products.length;j++) {
            //a=res2[i+j];
          if(activlist.products[j].name == a) {
              mas.push(activlist.products[j]);
              break;
          }
            //activlist.products[j].name=a;
            //t.childNodes[j].children[0].innerHTML=a;
        }
    }
    activlist.products=mas;
    storesave();
    createlist(activlist.name);
    
   // n=printime(n, "конечный результат");
}

function printime (n,text) {
    var d1 = new Date();
    var n1 = d1.getTime();
    var t  = n1-n;
    console.log(text + "  time = " + t);
    return n1;
}
function shortpath() { 
	var s=result;
	var i=0;
	while (i<s.length-1) {
		var b=s[i];
		var c=s[i+1];
		if(b.d < c.d) {
			s.splice(i+1,1);
		}
		else if(b.d > c.d) {
			s.splice(i,1);
		}
		else {
			i++;
		}
	}
}
function distpoints(name1,name2){
    var p1 = hash[name1];
    var p2 = hash[name2];
	//var p1=productfind(name1);
	//var p2=productfind(name2);
	var dx=p2.x-p1.x;
	var dy=p2.y-p1.y;
	var d=Math.sqrt(dx * dx + dy * dy);
	return d;
}
function distant(p1,p2){
	var dx=p2.x-p1.x;
	var dy=p2.y-p1.y;
	var d=Math.sqrt(dx * dx + dy * dy);
	return d;
}

function onestep(ar,name){    //показывает все варианты маршрута
	var x=[];
	for(var i=0;i<ar.length;i++) {
		
         if(name.indexOf(ar[i]+".") == -1) {
           x.push(name + ar[i]+".");
         }
	}
	if(x.length == 0) {
        name=activlist.shop.name + name + activlist.shop.name;
		var d=dist(name);
		result.push({path:name,d:d});
		console.log(name + "  " + d);
		return;
	}
	for(var i=0;i<x.length;i++) {
        var mas=[];
        for(var j=0;j<ar.length;j++) {

            if(x[i].indexOf(ar[j]+".") == -1) {
                mas.push(ar[j]);
            }
        }
        onestep(mas,x[i]);
    

		//onestep(ar,x[i]);
	}
}

function dist(path) {   //длинна маршрута
	var m=path.split(".");
	var sum=0;
    for(var i=0;i<m.length-2;i++) {
    	var a=m[i];
    	var b=m[i+1];
    	var d=distpoints(a,b);
    	sum+=d;
    }
	return sum;
	
}                                     
var demo;
var currentbutton;        //geoLocation
function errorHandler(err) {
            if(err.code == 1) {
               alert("Error: Access is denied!");
            }
            
            else if( err.code == 2) {
               alert("Error: Position is unavailable!");
            }
         }	
function getLocation(btn) {
	   currentbutton = btn;
	   var g=randomGeo();
	   showPosition(g);
	   return;
	   
    if (navigator.geolocation) {
    	var options = {timeout:60000};
        navigator.geolocation.getCurrentPosition(showPosition,errorHandler,options);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
	
	var tr=currentbutton.parentNode.parentNode;
	tr.childNodes[1].innerText=roundFloat(position.coords.longitude);
	tr.childNodes[2].innerText=roundFloat(position.coords.latitude);
    var name=tr.childNodes[0].innerText;
    for(var i=0;i<activlist.products.length;i++) {
    	if(name === activlist.products[i].name) {
    		activlist.products[i].x=position.coords.longitude;
    		activlist.products[i].y=position.coords.latitude;
    		break;
    	}
    }
}

function containts(where,who) {	
	where="the  red revalotion";
	who="rev";
	var j,f="";
	    for(var i=0;i<where.length;i++) {
	    	f="";
	    	var o=where[i];
	    	if(o == who[0]) {
		    for(j=0;j<who.length;j++) {
		    	var a=where[i+j];
		    	var b=who[j];
		    	if(a != b ) 
	                   break;
	                   else {
	                   	f+=b;
	                   }
			}
			if(j == who.length) {
				console.log(f);
				return true;
		}	
	}
}
return false;
}
function storesave () {
	if(typeof(Storage) !== "undefined") {
var l=JSON.stringify(lists);
localStorage.setItem('список',l);
 }
} 

function storeload () {
if(typeof(Storage) !== "undefined") {
var s = localStorage.getItem('список');
if(s != null) {
//lists=JSON.parse(s);
    var m=JSON.parse(s);
    lists=[];
    for(var i=0;i<m.length;i++) {
        var item=new myList(m[i].name,m[i].shop);
        for(var j=0;j<m[i].products.length;j++) {
            item.pushProduct(m[i].products[j]);
        }
        lists.push(item);
    }
}

} else {
    alert("Sorry! No Web Storage support..");
}
}
