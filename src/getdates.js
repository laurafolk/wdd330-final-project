    //Gets the current year
    // let currentYear = new Date().getFullYear();
    

    //Displays the current year in the HTML span element with id "currentYear"
    // document.getElementById("currentYear").textContent = currentYear;

    //Gets the last modified date of the document
    let lastModifiedDate = document.lastModified;


    document.getElementById("lastModified").innerHTML = "Last Modified: " + lastModifiedDate;