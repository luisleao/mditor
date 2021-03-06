(function(){
  init();
})();

function init(){
  setListeners();
  askFileName();
  equalizeSizes();

  marked.setOptions({
    gfm: true,
    pedantic: false,
    sanitize: true
  });
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
      docList  = document.querySelector('.openLocal'),
      w        = document.body.offsetWidth,
      h        = document.body.offsetHeight,
      t        = 60;

  textarea.style.width   = w-10 + 'px';
  textarea.style.height  = h-t  + 'px';
  textarea.style.top     = t    + 'px';
  textarea.style.padding = '10px';
  preview.style.top      = '-'+ (h + 50) + 'px';
  preview.style.width    = w  + 'px';
  preview.style.height   = h  + 'px';
  preview.style.display  = 'block';
  preview.style.padding  = '10px;';
  docList.style.top      = '-'+ (h + 50) + 'px';
}

function keyPressed(){
  var docID    = 'doc' + window.sessionStorage.getItem('timestamp'),
      textarea = document.querySelector('.markdown').value,
      docName  = document.querySelector('.documentName').innerHTML;
  saveDocument(window.sessionStorage.getItem('timestamp'));
}


// Actions
function askFileName(){
  var documentName = prompt('Give your document a name');

  if(documentName){
    document.querySelector('.documentName').innerHTML = documentName;
    document.querySelector('.markdown').focus();
    document.querySelector('.markdown').value = '# '+ documentName + '\n';
    saveNewDocument(documentName, document.querySelector('.markdown').value);
  } else {
    return false;
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

  tableH = '<table cellspacing="0">' +
           '<tr><th colspan="2">Document list</th></tr>';
  tableF = '</table>';

  for (var i=0; i < localStorage.length; i++){
    thisDoc  = 'doc' + JSON.parse(localStorage.getItem(localStorage.key(i))).createdAt,
    tableRow = tableRow +
               '<tr class="document">'+
                 '<td onclick=\'loadDocument("'+ thisDoc +'")\'>'+ JSON.parse(localStorage.getItem(localStorage.key(i))).title +'</td>'+
                 '<td class="del" onclick=\'deleteDocument("'+ thisDoc +'")\'>&times;</td>'+
               '</tr>';
  }
  docList.innerHTML = tableH + tableRow + tableF;
  docList.style.top = '0';
}

// Preview in HTML the markdown code
function previewModal(e){
  e.preventDefault();

  var preview        = document.querySelector('.preview'),
      previewContent = document.querySelector('.preview .content'),
      textarea       = document.querySelector('.markdown');
      btnClose       = document.querySelector('.closeit');

  previewContent.innerHTML = marked(textarea.value);

  if(preview.style.top !== '0' && preview.style.top !== '0px'){
    // preview.style.display = 'block';
    preview.style.top = '0';
    btnClose.style.top = '.5em';
  } else {
    // preview.style.display = 'none';
    preview.style.top = '-'+ (document.body.offsetHeight + 50) +'px';
    btnClose.style.top = '-50em';
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
function deleteDocument(docID){
  var sureDel = confirm('Are you sure you want to delete this document?');
  if(sureDel === true){
    window.localStorage.removeItem(docID);
  } else {
    return false;
  }

  openLocal();

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
  docList.style.top = '-'+ (document.body.offsetHeight + 50) + 'px';
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
