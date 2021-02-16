'use strict'
let keywordsArray = [];
let arrayOfImages = [];

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

function readJsonFile1() {
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
            // sortImages(arrayOfImages)
            makeDropDownList(keywordsArray);
        });
}
function readJsonFile2() {
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
function makeDropDownList(keywords) {
    keywords.forEach(item => {
        let option = $('<option> </option>').text(item);
        $('#drop-down').append(option);
    })
}

$('#drop-down').on('change', function (event) {
    let val = event.target.value;
    arrayOfImages.forEach(item => {
        if (val === item.keyword) {
            $('main div').addClass('remove-template')
            $('main div.' + item.keyword).removeClass('remove-template')
        } else if (val === 'all') {
            $('main div').removeClass('remove-template')
        }
    })
})

// function sortImages(arr) {
//     arr.sort(compare)
//     // return arr;
//     function compare(a, b) {
//         if (a.horns < b.horns) {
//             return -1;
//         } else if (a.horns > b.horns) {
//             return 1;
//         }
//         return 0;
//     }
//     return arr;
// }
$(document).ready(() => {
    $('#btn1').on('click', readJsonFile1)
    $('#btn2').on('click', readJsonFile2)
    // $('#sort-horns').on('click', readJsonFile1)
    // $('#sort-horns').on('click', readJsonFile2)
});

/*

*/