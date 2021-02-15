'use strict'

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
                newImage.render();
            });
        });
}

$(document).ready(readJson);
