

//Displays the original image after being uploaded
function displayOriginalImage(event) {
  if (event.files.length != 0) {
    if (checkFileName(event.files[0].name)) {
      document.getElementById("inputImage").src = window.URL.createObjectURL(event.files[0]);
      document.getElementById("originalImage").style.display = "initial";
      document.getElementById("transformation").style.display = "initial";
      document.getElementById("result").style.display = "none";
    }
  }
}

function getslope(x1,x2,y1,y2){
  var slope=(y2-y1)*1.0/(x2-x1);
  var constant = y1-slope*x1;
  return {slope,constant};
};

//Makes sure the uploaded file is a png or jpg image 
function checkFileName(fileName) {
  if (fileName == "") {
    alert("Browse to upload a valid File with png or jpg extension");
    return false;
  }
  else if (fileName.split(".")[1].toUpperCase() == "PNG" || fileName.split(".")[1].toUpperCase() == "JPG")
    return true;
  else {
    alert("File with " + fileName.split(".")[1] + " is invalid. Upload a valid file with png or jpg extensions");
    return false;
  }
}

//Displays the corresponding form to the selected transformation and hides the other forms
function showTransformForm() {
  const increaseBrightnessForm = document.getElementById("increaseBrightnessForm");
  const decreaseBrightnessForm = document.getElementById("decreaseBrightnessForm");
  const increaseContrastForm = document.getElementById("increaseContrastForm");
  const decreaseContrastForm = document.getElementById("decreaseContrastForm");
  const inverseForm = document.getElementById("inverseForm");

  
  
  //Write your code here for the other forms

  const mylist = document.getElementById("myList");

  //Storing the type chosen in a variable
  transformType = mylist.options[mylist.selectedIndex].text;

  //Displaying to the user the type he chose by changing the text element of id= transformType to the selected type
  document.getElementById("transformType").value = mylist.options[mylist.selectedIndex].text;

  if (transformType == "Increase Brightness") {
    document.getElementById("increaseBrightnessInputs").style.display = "initial";
    document.getElementById("decreaseBrightnessInputs").style.display = "none";
    document.getElementById("increaseContrastInputs").style.display = "none";
    document.getElementById("decreaseContrastInputs").style.display = "none";
    document.getElementById("inverseInputs").style.display = "none"; 

  } else if (transformType == "Decrease Brightness") {
    document.getElementById("increaseBrightnessInputs").style.display = "none";
    document.getElementById("decreaseBrightnessInputs").style.display = "initial";
    document.getElementById("increaseContrastInputs").style.display = "none";
    document.getElementById("decreaseContrastInputs").style.display = "none"; 
    document.getElementById("inverseInputs").style.display = "none"; 
      //write your code here

  } else if (transformType == "Increase Contrast") {
    document.getElementById("increaseBrightnessInputs").style.display = "none";
    document.getElementById("decreaseBrightnessInputs").style.display = "none";
    document.getElementById("increaseContrastInputs").style.display = "initial";
    document.getElementById("decreaseContrastInputs").style.display = "none"; 
    document.getElementById("inverseInputs").style.display = "none"; 
    //Write your code here

  } else if ((transformType == "Decrease Contrast")) {
    document.getElementById("increaseBrightnessInputs").style.display = "none";
    document.getElementById("decreaseBrightnessInputs").style.display = "none";
    document.getElementById("increaseContrastInputs").style.display = "none";
    document.getElementById("decreaseContrastInputs").style.display = "initial"; 
    document.getElementById("inverseInputs").style.display = "none"; 
    //Write your code here
  }
  else{
    document.getElementById("increaseBrightnessInputs").style.display = "none";
    document.getElementById("decreaseBrightnessInputs").style.display = "none";
    document.getElementById("increaseContrastInputs").style.display = "none";
    document.getElementById("decreaseContrastInputs").style.display = "none"; 
    document.getElementById("inverseInputs").style.display = "initial"; 
  }

  // Listener to the event of submiting the increase brightness form
  increaseBrightnessForm.addEventListener("submit", (e) => {
    e.preventDefault()
    var ib = document.getElementById("ib").value
    increaseBrightness(Number(ib))
  });

  decreaseBrightnessForm.addEventListener("submit", (e) => {
    e.preventDefault()
    var ib2 = document.getElementById("ib2").value
    decreaseBrightness(Number(ib2))
  });

  increaseContrastForm.addEventListener("submit", (e) => {
    e.preventDefault()
    var ib3 = document.getElementById("ib3").value
    var ib4 = document.getElementById("ib4").value
    var ib5 = document.getElementById("ib5").value
    var ib6 = document.getElementById("ib6").value
    increaseContrast(Number(ib3),Number(ib4),Number(ib5),Number(ib6))
  });

  decreaseContrastForm.addEventListener("submit", (e) => {
    e.preventDefault()
    var ib7 = document.getElementById("ib7").value
    var ib8 = document.getElementById("ib8").value
    var ib9 = document.getElementById("ib9").value
    var ib10 = document.getElementById("ib10").value
    decreaseContrast(Number(ib7),Number(ib8),Number(ib9),Number(ib10))
  });

  inverseForm.addEventListener("submit", (e) => {
    e.preventDefault()
    inverse()
  });
  //Write your code here for EventListeners for the other forms using the constants you will create in the transform function


  //Applies pixel-wise transformations to increase brightness
  function increaseBrightness(ib) {
    const img = document.getElementById("inputImage");
    const canvas = document.getElementById("resultImage");
    const ctx = canvas.getContext('2d');

    var transformedImage = [];
    var val;

    //Images are displayed in the RGBA format so a greyscale pixel could look like (25,25,25,255)
    rgba = getRGBAValues(img, canvas, ctx);

    for (i = 0; i < img.width * img.height * 4; i += 4) {
      val = rgba[i] + ib;
      if (val > 255) {
        val = 255;
      }
      transformedImage.push(val, val, val, rgba[i + 3]);
    }

    displayResultImage(img, transformedImage, ctx);

  }

  function decreaseBrightness(ib2) {
    const img = document.getElementById("inputImage");
    const canvas = document.getElementById("resultImage");
    const ctx = canvas.getContext('2d');

    var transformedImage = [];
    var val;

    //Images are displayed in the RGBA format so a greyscale pixel could look like (25,25,25,255)
    rgba = getRGBAValues(img, canvas, ctx);

    for (i = 0; i < img.width * img.height * 4; i += 4) {
      val = rgba[i] - ib2;
      if (val > 255) {
        val = 255;
      }
      transformedImage.push(val, val, val, rgba[i + 3]);
    }

    displayResultImage(img, transformedImage, ctx);

  }

  function increaseContrast(ib3,ib4,ib5,ib6) {
    const img = document.getElementById("inputImage");
    const canvas = document.getElementById("resultImage");
    const ctx = canvas.getContext('2d');

    var transformedImage = [];
    var val;

    //Images are displayed in the RGBA format so a greyscale pixel could look like (25,25,25,255)
    rgba = getRGBAValues(img, canvas, ctx);
    let slope1 = getslope(0,ib3,0,ib5).slope;
    let con1 = getslope(0,ib3,0,ib5).constant;
    let slope2 = getslope(ib4,255,ib6,255).slope;
    let con2 = getslope(ib4,255,ib6,255).constant;
    let slope3 = getslope(ib3,ib4,ib5,ib6).slope;
    let con3 = getslope(ib3,ib4,ib5,ib6).constant;
    for (i = 0; i < img.width * img.height * 4; i += 4) {
      if( rgba[i]<ib3){
           val = Math.floor(rgba[i]*slope1+con1);
      }
      else if( rgba[i]>ib4){
          val = Math.floor(rgba[i]*slope2+con2);
      }
      else {
          val = Math.floor(rgba[i]*slope3+con3);
      }
      transformedImage.push(val, val, val, rgba[i + 3]);
    }
    displayResultImage(img, transformedImage, ctx);
  }

  function decreaseContrast(ib7,ib8,ib9,ib10) {
    const img = document.getElementById("inputImage");
    const canvas = document.getElementById("resultImage");
    const ctx = canvas.getContext('2d');

    var transformedImage = [];
    var val;

    //Images are displayed in the RGBA format so a greyscale pixel could look like (25,25,25,255)
    rgba = getRGBAValues(img, canvas, ctx);
    let slope1 = getslope(0,ib7,0,ib9).slope;
    let con1 = getslope(0,ib7,0,ib9).constant;
    let slope2 = getslope(ib8,255,ib10,255).slope;
    let con2 = getslope(ib8,255,ib10,255).constant;
    let slope3 = getslope(ib7,ib8,ib9,ib10).slope;
    let con3 = getslope(ib7,ib8,ib9,ib10).constant;
    for (i = 0; i < img.width * img.height * 4; i += 4) {
      if( rgba[i]<ib7){
           val = Math.floor(rgba[i]*slope1+con1);
      }
      else if( rgba[i]>ib8){
          val = Math.floor(rgba[i]*slope2+con2);
      }
      else {
          val = Math.floor(rgba[i]*slope3+con3);
      }
      transformedImage.push(val, val, val, rgba[i + 3]);
    }
    displayResultImage(img, transformedImage, ctx);
  }



  function inverse() {
    const img = document.getElementById("inputImage");
    const canvas = document.getElementById("resultImage");
    const ctx = canvas.getContext('2d');

    var transformedImage = [];
    var val;

    //Images are displayed in the RGBA format so a greyscale pixel could look like (25,25,25,255)
    rgba = getRGBAValues(img, canvas, ctx);

    for (i = 0; i < img.width * img.height * 4; i += 4) {
      val = 255-rgba[i];
      if (val > 255) {
        val = 0;
      }
      transformedImage.push(val, val, val, rgba[i + 3]);
    }

    displayResultImage(img, transformedImage, ctx);

  }





  //Write your code here for three more functions for the other transformations



  //Extracts rgba 1D array of all the pixels in the original image
  function getRGBAValues(img, canvas, ctx) {
    canvas.width = img.width;
    canvas.height = img.height;

    ctx.drawImage(img, 0, 0);

    var rgba = ctx.getImageData(
      0, 0, img.width, img.height
    ).data;
    return rgba;
  }

  //Displays the transformed image
  function displayResultImage(img, transformedImage, ctx) {
    //Get a pointer to the current location in the image.
    var palette = ctx.getImageData(0, 0, img.width, img.height); //x,y,w,h
    //Wrap your array as a Uint8ClampedArray
    palette.data.set(new Uint8ClampedArray(transformedImage)); // assuming values 0..255, RGBA, pre-mult.
    //Repost the data.
    ctx.putImageData(palette, 0, 0);
    document.getElementById("result").style.display = "initial";
  }
  
  


}
