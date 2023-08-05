// JavaScript para a funcionalidade do quadro de desenho
///
//
//
//
window.open = function init() {
  document.getElementById('paleta').style.display = 'none';
  document.getElementById('fundo_cap').style.display = 'none';
  document.getElementById('tamanhos').style.display = 'none';
  document.getElementById('brush').style.border = '2px solid black';
  document.getElementById('brush').style.background = 'cadetblue';
  document.getElementById('brush').style.filter = 'invert()';
  document.getElementById('brush').style.borderRadius = '15px';
  document.getElementById('opc').style.display = 'none';
};

//constantes

const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 50;

let context = canvas.getContext('2d');
let start_background_color = 'white';
context.fillStyle = start_background_color;

context.fillRect(0, 0, canvas.width, canvas.height);

let draw_color = 'black';
let draw_width = '2';
let line_cap = 'round';
let is_drawing = false;
let tool_select = "brush";

let restore_array = [];
let index = -1;

canvas.addEventListener('touchstart', start, false);
canvas.addEventListener('mousedown', start, false);
canvas.addEventListener('pointerdown', start, false);

canvas.addEventListener('touchmove', draw, false);
canvas.addEventListener('mousemove', draw, false);
canvas.addEventListener('pointmove', draw, false);

canvas.addEventListener('touchend', stop, false);
canvas.addEventListener('mouseup', stop, false);
canvas.addEventListener('mouseout', stop, false);
canvas.addEventListener('pointerup', stop, false);
canvas.addEventListener('pointercancel', stop, false);

//cor a partir da paleta de cores
function corAtual(e) {
  draw_color = e;

  document.getElementById('cor_atual').style.background = draw_color;

  //fechar a paleta após selecionar a cor

  var paleta = docuemnt.getElementById('paleta');
  if (paleta.style.display == 'block') {
    paleta.style.display = 'none';
  } else {
    paleta.style.display = 'block';
  }
}

//cor a partir do seletor de cores

function change_color(element) {
  draw_color = element.style.background;
  document.getElementById('cor_atual').style.background = draw_color;
}

//setar o tipo de linha
function linecap(e) {
  line_cap = e;
  if (e == 'squere') {
    document.getElementById('linha').style.borderRadius = '0px';
  } else {
    document.getElementById('linha').style.borderRadius = '30px';
  }
}

function start(event) {
  document.getElementById('tamanhos').style.display = 'none';
  document.getElementById('paleta').style.display = 'none';
  document.getElementById('fundo_cap').style.display = 'none';

  is_drawing = true;

  context.beginPath();
  context.moveTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);

  mpx = event.clientX - canvas.offsetLeft;
  mpy = event.clientY - canvas.offsetTop;
  event.preventDefault();
}

//setar a ferramenta seleciona

function tools(e) {
  tool_select = e;

  //setar as imagens das ferramentas padrão
  // brush
  document.getElementById('brush').style.border = '0';
  document.getElementById('brush').style.background = 'none';
  document.getElementById('brush').style.filter = 'none';
  document.getElementById('brush').style.borderRadius = '0';

  // borracha
  document.getElementById('borracha').style.border = '0';
  document.getElementById('borracha').style.background = 'none';
  document.getElementById('borracha').style.filter = 'none';
  document.getElementById('borracha').style.borderRadius = '0';

  // linha
  document.getElementById('lin').style.border = '0';
  document.getElementById('lin').style.background = 'none';
  document.getElementById('lin').style.filter = 'none';
  document.getElementById('lin').style.borderRadius = '0';

  // quadrado
  document.getElementById('retangulo').style.border = '0';
  document.getElementById('retangulo').style.background = 'none';
  document.getElementById('retangulo').style.filter = 'none';
  document.getElementById('retangulo').style.borderRadius = '0';

  // circulo
  document.getElementById('circulo').style.border = '0';
  document.getElementById('circulo').style.background = 'none';
  document.getElementById('circulo').style.filter = 'none';
  document.getElementById('circulo').style.borderRadius = '0';

  // triangulo
  document.getElementById('triangulo').style.border = '0';
  document.getElementById('triangulo').style.background = 'none';
  document.getElementById('triangulo').style.filter = 'none';
  document.getElementById('triangulo').style.borderRadius = '0';

  //setar a ferramenta selecionada
  document.getElementById(e).style.border = '2px solid black';
  document.getElementById(e).style.background = 'cadetblue';
  document.getElementById(e).style.filter = 'invert()';
  document.getElementById(e).style.borderRadius = '15px';

}

//desenhar
function draw(event) {
  if (is_drawing) {

    //desenhar com o pincel
    if (tool_select == 'brush') {

      context.lineTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
      context.globalCompositeOperation = "source-over";
      context.strokeStyle = draw_color;
      context.lineWidth = draw_width;
      context.lineCap = line_cap;
      context.lineJoin = line_cap;

      context.stroke();
    }

    //borracha
    if (tool_select == 'borracha') {
      context.lineTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
      context.globalCompositeOperation = "destination-out";
      context.lineWidth = draw_width;
      context.lineCap = line_cap;
      context.lineJoin = line_cap;

      context.stroke();
    }
    //linha
    if (tool_select == 'lin') {
      context.globalCompositeOperation = "source-over";
      context.strokeStyle = draw_color;
      context.lineWidth = draw_width;
      context.beginPath();
      context.moveTo(mpx, mpy);
      context.lineTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);

      context.stroke();
    }

    //quadrado
    if (tool_select == 'retangulo') {
      context.putImageData(restore_array[index], 0, 0);
      context.globalCompositeOperation = 'source-over';
      context.strokeStyle = draw_color;
      context.lineWidth = draw_width;
      context.beginPath();

      context.rect(mpx, mpy, mpx - event.clientX - canvas.offsetLeft / 20, event.clientY - mpy - canvas.offsetTop / 20);

      context.stroke();
    }

    //circulo

    if (tool_select == 'circulo') {
      context.putImageData(restore_array[index], 0, 0);
      context.globalCompositeOperation = 'source-over';
      context.strokeStyle = draw_color;
      context.lineWidth = draw_width;
      context.beginPath();

      context.rect(mpx, mpy, event.clientX - mpx, o, 2 * Math.PI, false);
      context.stroke();

    }
    //triangulo

    if (tool_select == 'triangulo') {
      context.putImageData(restore_array[index], 0, 0);
      context.globalCompositeOperation = 'source-over';
      context.strokeStyle = draw_color;
      context.lineWidth = draw_width;
      context.beginPath();

      context.moveTo(mpx + (event.clientX - canvas.offsetLeft - mpx) / 2, mpy);
      context.lineTo(mpx, event.clientY - canvas.offsetTop);
      context.lineTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);

      context.closePath();
      context.stroke();

    }
  }
  event.preventDefault();
}
function stop(event) {

  if (is_drawing) {
    context.stroke();
    context.closePath();
    is_drawing = false;
  }
  event.preventDefault();

  if (event.type != 'mouseout') {
    restore_array.push(context.getImageData(0, 0, canvas.width, canvas.height));
    index += 1;
  }

}

function clear_canvas() {
  context.fillStyle = start_background_color;
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillRect(0, 0, canvas.width, canvas.height);
  restore_array = [];
  index = -1;
}

//control + z
document.addEventListener('keydown', function(event){
  if(event.ctrlKey && event.key == 'z'){
    undo();
  }
});

// desfazer
function undo(){
  if(index <= 0){
    clear_canvas();
  } else{
    index -= 1;
    restore_array.pop();
    context.putImageData(restore_array[index], 0, 0);
  }
}

//exibir paleta de cores
function paleta(){
  var paleta = document.getElementById('paleta');
  if(paleta.style.display =='none'){
    paleta.style.display = 'block';
  }else{
    paleta.style.display = 'none';
  }
}

//exibir a div do tipo de linha
function linecap_exib (){
  var capt = document.getElementById('fundo_cap');
if(capt.style.display == 'none'){
  capt.style.display = 'block';
} else{
  capt.style.display = 'none';
}
}

//setar o tamanho do tamanho no texto a todo momento que o valor do range mudar

var ranged = document.getElementById('pen_range');
ranged.addEventListener('input', function changed(){
var ranged = document.getElementById('pen_range').value;
var rangedText = document.getElementById('text_range');
rangedText.innerText = ranged + "px";
}, false);

//setar o tamanho do pincel de acordo com que o usuario escolheu
function width(e) {
  draw_width = e;
  var ranged = document.getElementById("pen_range");
  var rangedText = document.getElementById('text_range');
  rangedText.innerText = e +"px";
  ranged.value = e;
  var tmh = document.getElementById ('tamanhos');
  tmh.style.display  = 'none';
}

//fazer aparecer ou desaparecer a opção de tamanho do pincel

function exibTam(){
  var jan = document.getElementById('tamanhos');
  if (jan.style.display == 'block'){    
    jan.style.display = 'none';
  } else{
    jan.style.display = 'block';
  }
}
//baixar imagem
//aparecer a opção de baixar a imagem

function opc(){
  var fileSave = document.getElementById ('opc');
  if(fileSave = document.getElementById == 'none'){
    fileSave.style.display = 'block';
  } else{
    fileSave.style.display = 'none';
  }
}

//função salvar baixar
function salvar (){
  var nome = document.getElementById('nome').value;
  var formato = document.getElementById('formatos').value;
  var canvas = document.getElementById('canvas');
  var imagem = canvas.toDataURL("image/" +formato+"", 1.0).replace ("image/" + formato+ "", "imagem/octet-stream");
  var link = document.createElement ('a');
  link.download ="" +nome+ "";
  link.href = imagem;

  link.click();
  document.getElementById('opc').style.display = 'none';
}