'use strict'

// ..................................................... application variables 
let keywordsArray = [];
let arrayOfImages = [];
// .................................................... data and it's methods 
function Images(elementImage) {
    for (let key in elementImage) {
        this[key] = elementImage[key]
    }
    arrayOfImages.push(elementImage)
}

Images.prototype.render = function () {
    let imageClone = $('#photo-template').html()
    let mustache = Mustache.render(imageClone, this)
    $('main').append(mustache)
}

// ................................................... read data from files 
const readJsonFile1 = () => {
    $('main').empty()
    const ajaxSettings = {
        method: 'get',
        dataType: 'json'
    };
    $.ajax('../data/page-1.json', ajaxSettings)
        .then(data => {
            data.forEach(element => {
                let newImage = new Images(element);
                newImage.render();
                if (keywordsArray.includes(element.keyword) === false) {
                    keywordsArray.push(element.keyword);
                }
            });
            makeDropDownList(keywordsArray);
            // arrayOfImages.sort((a, b) => {
            //     let itemA = a.horns
            //     let itemb = b.horns

            //     if (a.horns < b.horns) {
            //         return -1;
            //     } else if (a.horns > b.horns) {
            //         return 1;
            //     }
            //     return 0;
            // })
        });
}
const readJsonFile2 = () => {
    $('main').empty()
    const ajaxSettings = {
        method: 'get',
        dataType: 'json'
    };
    $.ajax('../data/page-2.json', ajaxSettings)
        .then(data => {
            data.forEach(element => {
                let newImage = new Images(element);
                newImage.render();
                if (keywordsArray.includes(element.keyword) === false) {
                    keywordsArray.push(element.keyword);
                }
            });
            makeDropDownList(keywordsArray)
        });
}
//  ........................................................... functions
function makeDropDownList(keywords) {
    keywords.forEach(item => {
        let option = $('<option> </option>').text(item);
        $('#drop-down').append(option);
    })
}

// filter function
const filterImages = (event) => {
    let val = event.target.value;
    arrayOfImages.forEach(item => {
        if (val === item.keyword) {   // find and show noly images with specefic keywords
            $('main div').addClass('remove-template')
            $('main div.' + item.keyword).removeClass('remove-template')
        } else if (val === 'all') {  // special case to show all images
            $('main div').removeClass('remove-template')
        }
    })
}
//............................................................ executable code 
$(document).ready(() => {
    $('#drop-down').on('change', filterImages)
    $('#btn1').on('click', readJsonFile1)
    $('#btn2').on('click', readJsonFile2)
    // $('#sort-horns').on('click', handleSort)
    // $('#sort-title').on('click', handleSort)
});