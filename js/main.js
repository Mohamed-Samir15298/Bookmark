var siteName=document.getElementById('siteName');
var siteUrl=document.getElementById('siteUrl');
var nameError=document.getElementById('nameError');
var urlError=document.getElementById('urlError');
var inputs=document.getElementsByClassName('input');
var addBtn=document.getElementById('addBtn');
var searchInput=document.getElementById('searchInput');
var currentIndex=0;
var bookMarks=[];
if(JSON.parse(localStorage.getItem('bookmarksList')) !=null){
    bookMarks=JSON.parse(localStorage.getItem('bookmarksList'));
    displayData();
}
addBtn.onclick=function(){
    if(addBtn.innerHTML == 'Submit')
    {
        addData();
    }
    else {
        updateBookmark();
    }
   
}

function displayData(){
    var cartoona=``;
    for(var i=0; i<bookMarks.length; i++)
    {
        cartoona+=`<div class="bookmark-details row">
        <h2>${bookMarks[i].name}</h2>
         <a class="btn btn-primary" href="${bookMarks[i].url}" target="_blank">visit</a>
         <button onclick="deleteBookmark(${i})" class="btn btn-danger btndelete">Delete</button>
         <button onclick="getBookmark(${i})" class="btn btn-warning ">Update</button>
    </div>`
    }
    document.getElementById('bookmarkList').innerHTML=cartoona;
}
function addData(){
    var validName=siteName.value;
    var validUrl=siteUrl.value;
    if(checkName(validName) && checkUrl(validUrl))
    {
        validUrl=addUrl(validUrl);
        var bookmark={
            name:validName,
            url:validUrl,
        }
        bookMarks.push(bookmark);
        localStorage.setItem('bookmarksList',JSON.stringify(bookMarks));
        displayData();
        clearForm();
        var nameError=document.getElementById('nameError');
        nameError.style.display='none';
        var urlError=document.getElementById('urlError');
        urlError.style.display='none';
    }
    else {
        if(!checkName(validName))
        {
            showErrorName('this name already exist');
        }
        if(!checkUrl(validUrl))
        {
            showErrorName('this url already exist');
        }
        if(validName == null || validName == "")
        {
            showErrorName('Name is required');
        }
        if(validUrl == null || validUrl == "")
        {
            showErrorUrl('Url Field is required');
        }
    }
}
function showErrorName(message){
    var nameError=document.getElementById('nameError');
    nameError.innerHTML=message;
    nameError.style.display='block';
}
function showErrorUrl(message){
    var urlError=document.getElementById('urlError');
    urlError.innerHTML=message;
    urlError.style.display='block';
}
function checkName(nameAttr){
     if(nameAttr == null || nameAttr ==""){return false;}
     for(var i=0;i<bookMarks.length;i++)
     {
        if (bookMarks[i].name === nameAttr){return false}
     }
     return true;
}
function checkUrl(urlAttr){
     if(urlAttr == null || urlAttr == ""){return false;}
     for(var i=0;i<bookMarks.length;i++)
     {
        if (bookMarks[i].url === urlAttr){return false;}
     }
     return true;
}
function addUrl(urlAttribute){
  if(urlAttribute.search("http://") == -1 && urlAttribute.search("https://") == -1)
  {
    return "http://" + urlAttribute;
  }
  return urlAttribute;
}
function deleteBookmark(index){
    bookMarks.splice(index,1);
    displayData();
    localStorage.setItem('bookmarksList',JSON.stringify(bookMarks));
}
function clearForm(){
    for(var i=0;i<inputs.length;i++)
    {
     inputs[i].value='';
    }
 }
function getBookmark(index){
    currentIndex=index;
    var currentBookmark=bookMarks[index];
    siteName.value=currentBookmark.name;
    siteUrl.value=currentBookmark.url;
    addBtn.innerHTML="Update";
}
function updateBookmark(){
    var validName=siteName.value;
    var validUrl=siteUrl.value;
    if(checkName(validName) && checkUrl(validUrl))
    {
        validUrl=addUrl(validUrl);
        var bookmark={
            name:validName,
            url:validUrl,
        }
        bookMarks[currentIndex]=bookmark;
        localStorage.setItem('bookmarksList',JSON.stringify(bookMarks));
        displayData();
        clearForm();
        var nameError=document.getElementById('nameError');
        nameError.style.display='none';
        var urlError=document.getElementById('urlError');
        urlError.style.display='none';
    }
    else {
        if(!checkName(validName))
        {
            showErrorName('this name already exist');
        }
        if(!checkUrl(validUrl))
        {
            showErrorName('this url already exist');
        }
        if(validName == null || validName == "")
        {
            showErrorName('Name is required');
        }
        if(validUrl == null || validUrl == "")
        {
            showErrorUrl('Url Field is required');
        }
    }
    addBtn.innerHTML='Submit';
}
searchInput.onkeyup=function(){
    var cartoona=``;
    for(var i=0; i<bookMarks.length; i++)
    {
        if(bookMarks[i].name.toLowerCase().includes(searchInput.value.toLowerCase()))
        {
            cartoona+=`<div class="bookmark-details row">
        <h2>${bookMarks[i].name}</h2>
         <a class="btn btn-primary" href="${bookMarks[i].url}" target="_blank">visit</a>
         <button onclick="deleteBookmark(${i})" class="btn btn-danger btndelete">Delete</button>
         <button onclick="getBookmark(${i})" class="btn btn-warning ">Update</button>
    </div>`
        }
    }
    document.getElementById('bookmarkList').innerHTML=cartoona;
}