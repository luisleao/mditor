(function(){
  init();
})();

function init(){
  marked.setOptions({
    gfm: true,
    pedantic: false,
    sanitize: true
  });

  setListeners();
  askFileName();
  equalizeSizes();
}

function setListeners(){
  var textarea    = document.querySelector('.markdown'),
      btnNew      = document.querySelector('#btn_New'),
      btnPreview  = document.querySelector('#btn_Preview'),
      btnClear    = document.querySelector('#btn_Clear'),
      btnClose    = document.querySelector('#btn_Close'),
      btnTM       = document.querySelector('#btn_TM'),
      btnTDefault = document.querySelector('#btn_TDefault'),
      btnTP       = document.querySelector('#btn_TP');

  textarea.addEventListener('keyup', keyPressed, false);
  btnNew.addEventListener('click', newDocument, false);
  btnClear.addEventListener('click', clearText, false);
  btnPreview.addEventListener('click', previewModal, false);
  btnClose.addEventListener('click', previewModal, false);
  btnTM.addEventListener('click', fontSizeIncrease, false);
  btnTDefault.addEventListener('click', fontSizeDefault, false);
  btnTP.addEventListener('click', fontSizeDecrease, false);
}

function equalizeSizes(){
  var preview  = document.querySelector('.preview'),
      textarea = document.querySelector('.markdown'),
      w        = document.body.offsetWidth,
      h        = document.body.offsetHeight,
      t        = 60;

  textarea.style.width   = w-10   + 'px';
  textarea.style.height  = h-t    + 'px';
  textarea.style.top     = t-10   + 'px';
  textarea.style.padding = '10px';
  preview.style.width    = w      + 'px';
  preview.style.height   = h      + 'px';
  preview.style.padding  = '10px;';
}

function keyPressed(){
  var textarea = document.querySelector('.markdown').value,
      docName  = document.querySelector('.documentName').innerHTML;
  saveDocument(docName, textarea);
}


// Actions
function askFileName(){
  var documentName = prompt('Name the new document or cancel to load the last one.');

  if(documentName){
    document.querySelector('.documentName').innerHTML = documentName;
    document.querySelector('.markdown').focus();
    document.querySelector('.markdown').value = '# '+ documentName + '\n';
    saveDocument(documentName);
  } else {
    loadDocument();
  }
}

function newDocument(e){
  e.preventDefault();
  askFileName();
}

// Preview in HTML the markdown code
function previewModal(e){
  e.preventDefault();

  var preview        = document.querySelector('.preview'),
      previewContent = document.querySelector('.preview .content'),
      textarea       = document.querySelector('.markdown');

  previewContent.innerHTML = marked(textarea.value);

  if(preview.style.display == 'block'){
    preview.style.display = 'none';
  } else {
    preview.style.display = 'block';
  }
}

function fontSizeIncrease(e){
  e.preventDefault();

  var textarea = document.querySelector('.markdown');
  if(textarea.style.fontSize === ''){ textarea.style.fontSize = '1em'; }
  textarea.style.fontSize = parseFloat(textarea.style.fontSize) - (0.2) + 'em';
}
function fontSizeDecrease(e){
  e.preventDefault();

  var textarea = document.querySelector('.markdown');
  if(textarea.style.fontSize === ''){ textarea.style.fontSize = '1em'; }
  textarea.style.fontSize = parseFloat(textarea.style.fontSize) + (0.2) + 'em';
}
function fontSizeDefault(e){
  e.preventDefault();

  var textarea = document.querySelector('.markdown');
  textarea.style.fontSize = '1em';
}

// File things
function saveDocument(docName, content){
  var timestamp = new Date();

  window.localStorage.setItem('createdAt', timestamp);
  window.localStorage.setItem('documentName', docName);
  window.localStorage.setItem('content', content);
}
function loadDocument(){
  var savedCreated = window.localStorage.getItem('createdAt'),
      savedName    = window.localStorage.getItem('documentName'),
      savedContent = window.localStorage.getItem('content');

      document.querySelector('.markdown').value = (savedContent);
      document.querySelector('.documentName').innerHTML = savedName;
}
function clearText(e){
  e.preventDefault();

  var confirmClear = confirm('Are you sure you want to clear this document?');
  if(confirmClear === true){
    document.querySelector('.markdown').value = '';
  } else {
    return false;
  }
}
