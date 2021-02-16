// 
// 2. add lintercode
// 3. Feature 1: Pagination
//        2 buttons, readjson from file2 
// 4. Feature 2: Templating
// 5. Feature 3: Styling with Flexbox 
// 6. Feature 4: Sort the image


//create an event listner on a click

function sortingImages(arrayOfImages) {
    arrayOfImages.sort((a, b) => {
        if (a.horns < b.horns) {
            return -1;
        } else if (a.horns > b.horns) {
            return 1;
        }
        return 0;
    })
    return arrayOfImages;
};

// 



if (!arrayOfImages.includes(this)) {
    arrayOfImages.push(this);
}

///////////////////

    //////////////////

  //  <button id="Page1" onclick="sort1()">Sort by Title</button>
   //   <button id="Page2" onclick="sort2()">Sort by Horns</button>
