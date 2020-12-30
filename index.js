//check to see whether the input from the user is a valid
//hex color
//1. #000000 or 000000
//2. check the length - should be either 3 or 6 characters

// function isHexValid() {
//     const hexInput = document.getElementById('hexInput');
//     hexValue = hexInput.value;
//     const hexArr = [...hexValue];
//     if (isFirstCharHash(hexArr[0])) {
//         hexArr.shift();
//     }
//     return hexArr.length === 6 || hexArr.length === 3
// }

// function isFirstCharHash(char) {
//     return char === '#';
// }

const isValidHex = (hex) => {
    if (!hex) return false;

    const strippedHex = hex.replace('#', '');
    return strippedHex.length === 3 || strippedHex.length === 6;
}

//Get a reference to hexInput and inputColor DOM elements
//Create a keyup event handler for hexInput
//Check if hex color is valid
//If hex color is valid, update the background color of inputColor

const hexInput = document.getElementById('hexInput'); // the input field
const inputColor = document.getElementById('inputColor');
const slider = document.getElementById('slider');
const sliderText = document.getElementById('sliderText');


hexInput.addEventListener("keyup", handleKeyUp);

function handleKeyUp() {
    const hex = hexInput.value;
    if (!isValidHex(hex)) {
        return;
    }

    changeBackground(inputColor, hex);

}

function formatHex(color) {
    if (color[0] !== '#') {
        color = '#' + color;
    }
    return color;
}

function changeBackground(element, color) {
    const formattedHexColor = formatHex(color);
    element.style.backgroundColor = formattedHexColor;
}
// mentor's solution: 
// hexInput.addEventListener('keyup', () => {

//     const hex = hexInput.value;
//     if(!isValidHex(hex)) return;

//     const strippedHex = hex.replace('#', '');

//     inputColor.style.backgroundColor = "#" + strippedHex;  
//   })

//Create a function to convert Hex to RGB
//this should work with 3 or 6 character hex values
//Hint - use parseInt("", 16) to convert a hex value to a decimal value
//should return an object with 3 properties - r,g, and b
//Test your function with a few different use cases


//own solution below:

// function hexToDecimal(hex) {
//     return parseInt(hex, 16);
// }

// function checkHex(hex) {
//     if (hex[0] === '#') {
//         hexArr = hexArr.shift();
//     }
//     return hex;
// }

// function hexToRGB(hex) {
//     let hexArr = [...hex];
//     hexArr = checkHex(hexArr);
//     let r, g, b;
//     if (hexArr.length === 3) {
//         [r, g, b] = hexArr;
//     } else {
//         r = hexArr.slice(0, 2);
//         g = hexArr.slice(2, 4);
//         b = hexArr.slice(4);
//     }
//     r = hexToDecimal(r);
//     g = hexToDecimal(g);
//     b = hexToDecimal(b);

//     return { 'r': r, 'g': g, 'b': b };

// }

// mentor's solution below:

const convertHexToRGB = (hex) => {
    if (!isValidHex(hex)) return null;

    let strippedHex = hex.replace('#', '');

    if (strippedHex.length === 3) {
        strippedHex = strippedHex[0] + strippedHex[0] +
            strippedHex[1] + strippedHex[1] +
            strippedHex[2] + strippedHex[2];
    }
    const r = parseInt(strippedHex.substring(0, 2), 16);
    const g = parseInt(strippedHex.substring(2, 4), 16);
    const b = parseInt(strippedHex.substring(4, 6), 16);

    return { r, g, b };

}

//create the function converRGBToHex
//take in 3 parameters - r,g, and b
//for each (r,g,b) - create a hex pair that is two characters long
//return hex value starting with a hashtag
//example - r.toString(16)

// below is my OWN solution: 

// function addZeroAtTheBeginning(chr) {
//     return '0' + chr;
// }

// function converRGBToHex(r, g, b) {
//     let rHex = r.toString(16);
//     if (rHex.length === 1) {
//         rHex = addZeroAtTheBeginning(rHex);
//     }
//     let gHex = g.toString(16);
//     if (gHex.length === 1) {
//         gHex = addZeroAtTheBeginning(gHex);
//     }
//     let bHex = b.toString(16);
//     if (bHex.length === 1) {
//         bHex = addZeroAtTheBeginning(bHex);
//     }
//     return '#' + rHex + gHex + bHex;
// }


//mentors trick add a 0 string than slice - give me the last two characters :))
const converRGBToHex = (r, g, b) => {
    const firstPair = ("0" + r.toString(16)).slice(-2);
    const secondPair = ("0" + r.toString(16)).slice(-2);
    const thirdPair = ("0" + r.toString(16)).slice(-2);

    const hex = "#" + firstPair + secondPair + thirdPair;
    return hex;
}

//get a reference to the slider and sliderText DOM elements
//create an input event listener for slider element
//display the value of the slider 



slider.addEventListener('input', () => {
    sliderText.textContent = `${slider.value}%`;
})


//Create the alterColor function which accepts hex value and percentage
//convert the hex value to rgb
//increase each r,g,b value by appropriate amount (percentage of 255)
//use the new r,g,b values to convert to a hex value
//return the hex value