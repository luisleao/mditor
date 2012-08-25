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
      btnOpen     = document.querySelector('#btn_Open'),
      btnPreview  = document.querySelector('#btn_Preview'),
      btnClear    = document.querySelector('#btn_Clear'),
      btnClose    = document.querySelector('#btn_Close'),
      btnTM       = document.querySelector('#btn_TM'),
      btnTDefault = document.querySelector('#btn_TDefault'),
      btnTP       = document.querySelector('#btn_TP');

  textarea.addEventListener('keyup', keyPressed, false);
  btnNew.addEventListener('click', newDocument, false);
  btnOpen.addEventListener('click', openList, false);
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

  textarea.style.width   = w-10 + 'px';
  textarea.style.height  = h-t  + 'px';
  textarea.style.top     = t-10 + 'px';
  textarea.style.padding = '10px';
  preview.style.width    = w + 'px';
  preview.style.height   = h + 'px';
  preview.style.padding  = '10px;';
}

function keyPressed(){
  var docID    = 'doc' + window.sessionStorage.getItem('timestamp'),
      textarea = document.querySelector('.markdown').value,
      docName  = document.querySelector('.documentName').innerHTML;
  saveDocument(window.sessionStorage.getItem('timestamp'));
}


// Actions
function askFileName(){
  var documentName = prompt('Name the new document or cancel to load the last one.');

  if(documentName){
    document.querySelector('.documentName').innerHTML = documentName;
    document.querySelector('.markdown').focus();
    document.querySelector('.markdown').value = '# '+ documentName + '\n';
    saveNewDocument(documentName, document.querySelector('.markdown').value);
  } else {
    openLocal();
  }
}

function newDocument(e){
  e.preventDefault();
  askFileName();
}

function openList(e){
  e.preventDefault();
  openLocal();
}

function openLocal(){
  var docList  = document.querySelector('.openLocal'),
      thisDoc  = '',
      tableRow = '',
      tableH   = '',
      tableF   = '';
  docList.style.display = 'block';

  tableH = '<table width="100%">' +
           '<tr><th>Document title</th></tr>';
  tableF = '</table>';

  for (var i=0; i < localStorage.length; i++){
    thisDoc  = 'doc' + JSON.parse(localStorage.getItem(localStorage.key(i))).createdAt,
    tableRow = tableRow +
               '<tr>'+
                 '<td onclick=\'loadDocument("'+ thisDoc +'")\'>'+ JSON.parse(localStorage.getItem(localStorage.key(i))).title +'</td>'+
               '</tr>';
  }

  docList.innerHTML = tableH + tableRow + tableF;

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
function saveDocument(docID){
  var timestamp   = window.sessionStorage.getItem('timestamp'),
      content     = document.querySelector('.markdown').value,
      docName     = document.querySelector('.documentName').innerHTML,
      theDocument = {
        createdAt : timestamp,
        title     : docName,
        content   : content
      };
  window.localStorage.setItem('doc'+timestamp, JSON.stringify(theDocument));
}
function saveNewDocument(docName, content){
  var timestamp = new Date().getTime(),
      theDocument = {
        createdAt : timestamp,
        title     : docName,
        content   : content
      };
  window.sessionStorage.setItem('timestamp', timestamp);
  window.localStorage.setItem('doc'+timestamp, JSON.stringify(theDocument));
}
function loadDocument(docID){
  var docInfo   = window.localStorage.getItem(docID),
      docList   = document.querySelector('.openLocal');
      timestamp = JSON.parse(docInfo).createdAt,
      title     = JSON.parse(docInfo).title,
      content   = JSON.parse(docInfo).content;

  document.querySelector('.markdown').value = (content);
  document.querySelector('.documentName').innerHTML = title;
  window.sessionStorage.setItem('timestamp', timestamp);
  docList.style.display = 'none';
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
