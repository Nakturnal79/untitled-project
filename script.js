function addImage(src, parent, callback) {
  let img = document.createElement("img");

  img.src = src;
  img.width = 250;
  img.onload = function(e) {
    if (typeof callback === "function") {
      setTimeout(function() {
        callback(null, e);
      }, 1000);
    }
  };
  img.onerror = function(e) {
    if (typeof callback === "function") {
      callback("Image cannot be loaded.");
    }
  };
  parent.appendChild(img);
}
let parent = document.getElementById("main");

addImage("1.jpg", parent, function(err) {
  if (err) {
    console.log(err);
  } else {
    addImage("2.jpg", parent, function(err) {
      if (err) {
        console.log(err);
      } else {
        addImage("3.jpg", parent);
      }
    });
  }
});
// ------------------------------------------------------------------------------
function loadImage(src, parent) {
  let promise = new Promise(function(resolve, reject) {
    let img = new Image();
    img.src = src;
    img.width = 250;
    img.onload = resolve;
    img.onerror = reject;
    parent.appendChild(img);
  });
  return promise;
}
var parent1 = document.getElementById("main1");

loadImage("1.jpg", parent1)
  .then(function() {
    return loadImage("2.jpg", parent1);
  })
  .then(function() {
    return loadImage("3.jpg", parent1);
  })
  .catch(function(err) {
    console.log(err);
  });
