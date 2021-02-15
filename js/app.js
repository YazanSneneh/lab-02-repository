'use strict'
let keywordsArray = []
function Images(image_url, title, description, keyword, horns) {
    this.image = image_url;
    this.titleImg = title;
    this.descriptionImg = description;
    this.keywordImg = keyword;
    this.hornsImg = horns;
}

Images.prototype.render = function () {
    let $imageClone = $('#photo-template').clone();
    $('main').append($imageClone);
    $imageClone.find('h2').text(this.titleImg);
    $imageClone.find('img').attr('src', this.image);
    $imageClone.find('p').text(this.descriptionImg);
    $imageClone.removeClass('remove-template');

}// create a method that each time it will add an item to the object/ constractor
// first: do JSON quest.
// 
function readJson() {
    const ajaxSettings = {
        method: 'get',
        dataType: 'json'
    };
    $.ajax('../data/page-1.json', ajaxSettings)
        .then(data => {
            data.forEach(element => {
                let newImage = new Images(element.image_url, element.title, element.description, element.keyword, element.horns);
                keywordsArray.push(element.keyword);
                newImage.render();
            });
            makeDropDownList(keywordsArray)
        });
}

function makeDropDownList(keywords){
    keywords.forEach(item =>{
        let option = $('<option> </option>').text(item);
        $('#drop-down').append(option);
    })
}
function displayFiltered(e){
    let keyword = e.target.value;
    alert(keyword)
}

// function filt(item){
//     let result = [];
//     if(result.length ===0){
//         result.push(item);
//     }
//     for(let i=0; i<result.length; i++){
//         if(item !== result[i]){
//             result.push(item)
//         }
//     }
// }
$(document).ready(() => {
    readJson();
    $('#drop-down').on('change',displayFiltered)
    
});

 /*
 2. render elements in the dropdown list.
       select element from html
       create option for each element in the array
       append it to selec element
    
 */