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
    let invalidChars = /[g-z]/i;
    if (!hex || invalidChars.test(hex)) return false;

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
const alteredColorText = document.getElementById('alteredColorText');
const alteredColor = document.getElementById('alteredColor');
//lightenText, darkenText, toggleBtn

//click event listener to the toggle btn
//
const lightenText = document.getElementById('lightenText');
const darkenText = document.getElementById('darkenText');
const toggleBtn = document.getElementById('toggleBtn');



hexInput.addEventListener("keyup", handleKeyUp);

function handleKeyUp() {
    const hex = hexInput.value;
    if (!isValidHex(hex)) {
        return;
    }

    changeBackground(inputColor, hex);
    reset();

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
    const secondPair = ("0" + g.toString(16)).slice(-2);
    const thirdPair = ("0" + b.toString(16)).slice(-2);

    const hex = "#" + firstPair + secondPair + thirdPair;
    return hex;
}

//get a reference to the slider and sliderText DOM elements
//create an input event listener for slider element
//display the value of the slider 

// down below my OWN solution: 

// slider.addEventListener('input', () => {
//     //check if hex is valid
//     if (!isValidHex(hexInput.value)) {
//         return;
//     }
//     sliderText.textContent = `${slider.value}%`;
//     let percentage = slider.value;

//     let hexNoHash = formatHex(hexInput.value).slice(1); // make sure there is a starting # then remove it with slice(1)

//     //get the altered hex value
//     const alteredHex = alterColor(hexNoHash, percentage);

//     //update the altered color
//     let alteredColorDiv = document.getElementById('alteredColor');
//     changeBackground(alteredColorDiv, alteredHex);
//     alteredColorText.textContent = `Altered Color: ${alteredHex}`;
// })

// down below MENTOR's solution:

slider.addEventListener('input', () => {
    if (!isValidHex(hexInput.value))
        return;

    sliderText.textContent = `${slider.value}%`;
    //calulcate the appropriate value for the color alteration
    //between positive and negative
    const valueAddition =
        toggleBtn.classList.contains('toggled') ?
        -slider.value :
        slider.value;

    const alteredHex = alterColor(hexInput.value, valueAddition);
    alteredColor.style.backgroundColor = alteredHex;
    alteredColorText.innerText = `Altered Color ${alteredHex}`;
})



//Create the alterColor function which accepts hex value and percentage
//convert the hex value to rgb
//increase each r,g,b value by appropriate amount (percentage of 255)
//use the new r,g,b values to convert to a hex value
//return the hex value

// my OWN solution: 

// function increaseByPercentage(num, percentage) {
//     return Math.round(num + (percentage / 100) * 255);
// }

// function alterColor(hex, percentage) {
//     const rgbObj = convertHexToRGB(hex);
//     let { r, g, b } = rgbObj;
//     console.log('r: ', r, 'g: ', g, 'b: ', b);
//     r = increaseByPercentage(r, percentage);
//     r = r > 255 ? 255 : r;
//     g = increaseByPercentage(g, percentage);
//     g = g > 255 ? 255 : g;
//     b = increaseByPercentage(b, percentage);
//     b = b > 255 ? 255 : b;
//     console.log('r: ', r, 'g: ', g, 'b: ', b);
//     let hexColor = converRGBToHex(r, g, b);
//     return hexColor;
// }

// mentor's solution:

const alterColor = (hex, percentage) => {
    const { r, g, b } = convertHexToRGB(hex);

    const amount = Math.floor((percentage / 100) * 255);

    const newR = increaseWithin0To255(r, amount);
    const newG = increaseWithin0To255(g, amount);
    const newB = increaseWithin0To255(b, amount);
    return converRGBToHex(newR, newG, newB);
}

function increaseWithin0To255(value, amount) {
    // const newValue = value + amount;
    // if (newValue > 255) return 255;
    // if (newValue < 0) return 0;
    // return newValue;
    return Math.min(255, Math.max(0, value + amount));
}

toggleBtn.addEventListener('click', () => {
    toggleBtn.classList.toggle('toggled');
    lightenText.classList.toggle('unselected');
    darkenText.classList.toggle('unselected');
    reset();
})

function reset() {
    slider.value = 0;
    sliderText.textContent = '0%';

    alteredColor.style.backgroundColor = inputColor.style.backgroundColor;
    if (!isValidHex(hexInput.value)) {
        console.log('should dipsplay invalid hex');
        alteredColorText.textContent = 'Original Color: invalid hex';
    } else {
        console.log('should display only if hexInput.value is isValidHex');
        alteredColorText.textContent = `Original Color: ${formatHex(hexInput.value)}`;
    }



}