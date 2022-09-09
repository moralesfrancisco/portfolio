
const cards = document.querySelectorAll('.card');
const right_arrow = document.querySelector('.arrow.right');
const left_arrow = document.querySelector('.arrow.left');

const shopping_cart = document.querySelector('.shopping-cart');
const cart_btns = document.querySelectorAll('.add-to-cart');

let left = 0;
let card_size = 25.4;
let total_card_size = cards.length * card_size - card_size * 4;

if (window.matchMedia('(max-width: 768px)').matches) {
    card_size = 52;
    total_card_size = cards.length * card_size - card_size * 2;
}

left_arrow.onclick = () => {
    left -= card_size;

    if (left <= 0) left = 0;
    moveCards(left);
    checkArrowVisibility(left);
}

left_arrow.style.opacity = '0';

right_arrow.onclick = () => {
    left += card_size;

    if (left >= total_card_size) left = total_card_size;
    moveCards(left);
    checkArrowVisibility(left);
}

function moveCards(left) {
    for (card of cards) {
        card.style.left = -left + "%";
    }
}

function checkArrowVisibility(pos) {
    if (pos == 0) {
        left_arrow.style.opacity = '0';
    } else {
        left_arrow.style.opacity = '1';
    }
    if (pos >= total_card_size) {
        right_arrow.style.opacity = '0';
    } else {
        right_arrow.style.opacity = '1';
    }
}

// Fly To Shopping Cart Effect

for (cart_btn of cart_btns) {
    cart_btn.onclick = (e) => {

        shopping_cart.classList.add('active');

        let product_count = Number(shopping_cart.getAttribute('data-product-count')) || 0;
        shopping_cart.setAttribute('data-product-count', product_count + 1);

        // finding first grand parent of target button 
        let target_parent = e.target.parentNode.parentNode.parentNode;
        target_parent.style.zIndex = "100";
        // Creating separate Image
        let img = target_parent.querySelector('img');
        let flying_img = img.cloneNode();
        flying_img.classList.add('flying-img');

        target_parent.appendChild(flying_img);

        // Finding position of flying image

        const flying_img_pos = flying_img.getBoundingClientRect();
        const shopping_cart_pos = shopping_cart.getBoundingClientRect();

        let data = {
            left: shopping_cart_pos.left - (shopping_cart_pos.width / 2 + flying_img_pos.left + flying_img_pos.width / 2),
            top: shopping_cart_pos.bottom - flying_img_pos.bottom + 30
        }

        console.log(data.top);

        flying_img.style.cssText = `
                                --left : ${data.left.toFixed(2)}px;
                                --top : ${data.top.toFixed(2)}px;
                                `;


        setTimeout(() => {
            target_parent.style.zIndex = "";
            target_parent.removeChild(flying_img);
            shopping_cart.classList.remove('active');
        }, 1000);
    }
}




/*START: Wave animation */
(function(){
	"use strict";
	
	var cvs,ctx;
	var nodes = 6;
	var waves = [];
	var waveHeight = 60;
	var colours = ["#f80000","#00f800","#0000f8"];
	
  // Initiator function
	function init() {
		cvs = document.getElementById("canvas");
        cvs.style.background = "transparent"
		ctx = cvs.getContext("2d");
		resizeCanvas(cvs);
    
		for (var i = 0; i < 3; i++) {
			waves.push(new wave(colours[i], 1, nodes));
		}

    update();
	}

	function update() {
    var fill = window.getComputedStyle(document.querySelector(".header_footer"),null).getPropertyValue("background-color");
		ctx.fillStyle = fill;
		ctx.globalCompositeOperation = "source-over";
		ctx.fillRect(0,0,cvs.width,cvs.height);
		ctx.globalCompositeOperation = "screen";
		for (var i = 0; i < waves.length; i++) {
			for (var j = 0; j < waves[i].nodes.length; j++) {
				bounce(waves[i].nodes[j]);
			}
			drawWave(waves[i]);
		}
		ctx.fillStyle = fill;
    
    requestAnimationFrame(update);
	}

	function wave(colour, lambda, nodes) {
    
		this.colour = colour;
		this.lambda = lambda;
		this.nodes = [];
		var tick = 1;
    
		for (var i = 0; i <= nodes+2; i++) {
			var temp = [(i-1) * cvs.width / nodes, 0, Math.random()*200, .3];
			this.nodes.push(temp);
			console.log(temp);
		}
		console.log(this.nodes);
	}

	function bounce(nodeArr) {
		nodeArr[1] = waveHeight/2*Math.sin(nodeArr[2]/20)+cvs.height/2;
		nodeArr[2] = nodeArr[2] + nodeArr[3];
		
	}
	
	function drawWave (obj) {
    
		var diff = function(a,b) {
			return (b - a)/2 + a;
		}
    
		ctx.fillStyle = obj.colour;
		ctx.beginPath();
		ctx.moveTo(0,cvs.height);
		ctx.lineTo(obj.nodes[0][0],obj.nodes[0][1]);
    
		for (var i = 0; i < obj.nodes.length; i++) {
      
			if (obj.nodes[i+1]) {
				ctx.quadraticCurveTo(
					obj.nodes[i][0],obj.nodes[i][1],
					diff(obj.nodes[i][0],obj.nodes[i+1][0]),diff(obj.nodes[i][1],obj.nodes[i+1][1])
				);
			}
      else {
				ctx.lineTo(obj.nodes[i][0],obj.nodes[i][1]);
				ctx.lineTo(cvs.width,cvs.height);
			}
		}
		ctx.closePath();
		ctx.fill();
	}

	function drawNodes (array) {
		ctx.strokeStyle = "#05ea11";
    
		for (var i = 0; i < array.length; i++) {
			ctx.beginPath();
			ctx.arc(array[i][0],array[i][1],4,0,2*Math.PI);
			ctx.closePath();
			ctx.stroke();
		}
		
	}

	function drawLine (array) {
		ctx.strokeStyle = "#05ea11";
    
		for (var i = 0; i < array.length; i++) {
      
			if (array[i+1]) {
				ctx.lineTo(array[i+1][0],array[i+1][1]);
			}
		}
    
		ctx.stroke();
	}

	function resizeCanvas(canvas,width,height) {
    
		if (width && height) {
			canvas.width = width;
			canvas.height = height;
		}
    else {
      
			if (window.innerWidth > 1920) {
				canvas.width = window.innerWidth;
			}
			else {
				canvas.width = 1920;
			}
      
			canvas.height = waveHeight;
		}
	}
  
	document.addEventListener("DOMContentLoaded",init,false);
})();

/*END: Wave animation */





/*Start: Slide animation */
let slider = document.querySelector(".slider-contenedor")
let sliderIndividual = document.querySelectorAll(".contenido-slider")
let contador = 1;
let width = sliderIndividual[0].clientWidth;
let intervalo = 3000;

window.addEventListener("resize", function(){
    width = sliderIndividual[0].clientWidth;
})

setInterval(function(){
    slides();
},intervalo);



function slides(){
    slider.style.transform = "translate("+(-width*contador)+"px)";
    slider.style.transition = "transform .8s";
    contador++;

    if(contador == sliderIndividual.length){
        setTimeout(function(){
            slider.style.transform = "translate(0px)";
            slider.style.transition = "transform 0s";
            contador=1;
        },1500)
    }
}

/*END: Slide animation */







window.addEventListener('scroll', function () {
	
	let menu = document.getElementById("menu");
	let logofest = document.getElementById("logo_olafest");
	let logoforum = document.getElementById("logo_forum");
	/* console.log(background_menu); */
	menu.style.height = "112px";
	menu.style.background = "rgba(0, 0, 0, 1)";
	logofest.style.transform = "scale(0.7)";
	logoforum.style.transform = "scale(0.7)";
	
});
const colors = document.querySelectorAll('.colors span') ;
const image = document.querySelector('.left-column img') ;
const input = document.querySelector('.right-column .colors .quantity input');
const price = document.querySelector('.right-column .price') ;

    input.addEventListener('change',()=> {
        price.textContent = `USD ${input.value * 50}` ;
    }) ;
    colors[0].addEventListener('click' , ()=> {
        image.src = './images/darkblue.png' ;
    }) ;
    colors[1].addEventListener('click' , ()=> {
        image.src = './images/green.png' ;
    }) ;
    colors[2].addEventListener('click' , ()=> {
        image.src = './images/purple.png' ;
    }) ;
    colors[3].addEventListener('click' , ()=> {
        image.src = './images/black.png' ;
    }) ;
      