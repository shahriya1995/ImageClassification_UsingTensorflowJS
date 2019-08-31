$(document).ready(function () {
    // Init
    $('.image-section').hide();
    $('.loader').hide();
    $('#result').hide();
    // Upload Preview


    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                let dataURL = e.target.result;
                $('#imagePreview').css('background-image', 'url(' + e.target.result + ')');
                $('#imagePreview').hide();
                $('#imagePreview').fadeIn(650);
                img_url = event.target.result;
                document.getElementById("test-image").src = img_url;


            };
            reader.readAsDataURL(input.files[0]);
        }
    }
    $("#imageUpload").change(function() {
        $('.image-section').show();
        $('#btn-predict').show();
        $('#result').text('');
        $('#result').hide();
        readURL(this);
    });
    
    let model;
    (async function () {
      // Load the model.
      model = await mobilenet.load();
    })();


    // Predict
    $("#btn-predict").click(async function () {

    $("#predict-list").empty();
    $("#predictions").empty();
    $("#probability").empty();
    let image  = document.getElementById("test-image");

    let tensor = tf.browser.fromPixels(image)
    .resizeNearestNeighbor([224, 224])
    .toFloat()
    .expandDims();

    let predictions = await model.classify(tensor);
    // display top one predictions of the model
    document.getElementById("predict-box").style.display = "block";
    document.getElementById("prediction").innerHTML = " <b>Prediction  :  "  + predictions[0].className;
    document.getElementById("probability").innerHTML = "<b>Probability  :  " + predictions[0].probability;


    // display top predictions of the model
     var ul = document.getElementById("predict-list");
     predictions.forEach(function (p) {
        console.log(p.className + " " + p.probability.toFixed(6));
        var li = document.createElement("LI");
        li.innerHTML =" <b>Prediction  :  "  + p.className + "      Probability  :  " + p.probability.toFixed(6);
        ul.appendChild(li);
        
        });

        });
   });
