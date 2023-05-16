const input = $("#input"); // selects the input from the form that the user inputted
const allGifs = $("#allGifs"); // selects the div created to hold all Gifs

function addGif(results) { // Function to add a Gif once the search button has been entered
    let arrLength = results.data.length; // sees how many indexes are in the data array from the API
    let randomGif = Math.floor(Math.random() * arrLength); // picks a random index from that data array
    let newGifURL= results.data[randomGif].images.original.url; // selects the url to the image that was randomly selected from randomGif

    input.val(""); // clears input value after search button is clicked 

    let oneGif = $("<div>") // creates a new div element
    oneGif.attr("id", "oneGif");
    let newGifImage = $("<img>", {src: newGifURL}); // creates a new image element with the src of the random url that was selected

    allGifs.append(oneGif); // appends the new div element to the allGifs did that was already created in teh HTML
    oneGif.append(newGifImage); // appends the new image to the newly created oneGif div. 
    
    $("#removeBtn").on("click", function(e) { // When remove button is clicked, it removes the oneGif did so that way the page does not have to be refreshed if user needs to search again
        e.preventDefault();
        oneGif.remove(); // removes oneGif div with all images
    })
}

$("#searchBtn").on("click", async function(e) { // function that searches the API for Giphy based on the user input
    e.preventDefault(); 
    const response = await axios.get("http://api.giphy.com/v1/gifs/search", {params: {q: input.val(), api_key: "V7zijv82jfHm2ZPzo8uyZVu7MuBXc2db"}}); // Searches the API based on the user input from the text input in the form
    addGif(response.data); // Runs the addGif function with data that was collected based on teh user input. 
})

