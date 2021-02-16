'use strict'
var keywordsArray = [];
let arrayOfImages = [];

function Images(image_url, title, description, keyword, horns) {
    this.image = image_url;
    this.titleImg = title;
    this.descriptionImg = description;
    this.keywordImg = keyword;
    this.hornsImg = horns;
    arrayOfImages.push(this);
}

Images.prototype.render = function () {
    let imageClone = $('#photo-template').clone();
    imageClone.find('h2').text(this.titleImg);
    imageClone.find('img').attr('src', this.image);
    imageClone.find('p').text(this.descriptionImg);
    imageClone.addClass(this.keywordImg)
    imageClone.toggleClass('remove-template')
    $('main').append(imageClone);
    // let template = $("#photo-template").html();
    // Mustache.render(template,this);
    // $('main').append(template);

}// create a method that each time it will add an item to the object/ constractor
// first: do JSON quest.

function readJson() {
    const ajaxSettings = {
        method: 'get',
        dataType: 'json'
    };
    $.ajax('../data/page-1.json', ajaxSettings)
        .then(data => {
            data.forEach(element => {
                let newImage = new Images(element.image_url, element.title, element.description, element.keyword, element.horns);
                newImage.render();
                if (keywordsArray.includes(element.keyword) === false) {
                    keywordsArray.push(element.keyword);
                }
            });
            makeDropDownList(keywordsArray)
        });
}

function makeDropDownList(keywords) {
    keywords.forEach(item => {
        let option = $('<option> </option>').text(item);
        $('#drop-down').append(option);
    })
}

$(document).ready(() => {
    readJson();
});

$('#drop-down').on('change', function (event) {
    let val = event.target.value;
    arrayOfImages.forEach(item => {
        if (val === item.keywordImg) {
            $('main section').addClass('remove-template')
            $('main section.' + item.keywordImg).removeClass('remove-template')

        }
    })

})
