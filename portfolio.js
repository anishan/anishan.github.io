var GLOBAL = { projects: [],
               projectsFileName: "content/projects.csv"};

function run()
{
  update_projects();
}

function update_projects()
{
  readCSV(function(data)
  {
    fillPortfolio(data)
  });
}

function readCSV(f)
{
    d3.csv(GLOBAL.projectsFileName, function(error, data) {
      if (error)
      {
        //If error is not null, something went wrong.
         console.log(error);  //Log the error.
      }
      else
      {
        // add the new data to GLOBAL.data
         GLOBAL.projects.push.apply(GLOBAL.projects, data)
         f(data)
      }
    });
}

function fillPortfolio(data)
{
  // Define which div (from the html file) we will be using
  var projectElement = document.getElementById("project_list");

  for (var i = 0; i < GLOBAL.projects.length; i++)
  {
    // Create div to hold all info for each project
    var projectItem = document.createElement("div")
    projectElement.appendChild(projectItem)
    projectItem.className = "project_item"

    // Create and add the title to the div, as a H3 level
    // Wrapper div
    var titleDiv = document.createElement("div")
    titleDiv.className = "title"
    // When the title is clicked, toggle the question
    titleDiv.onclick = function () {
      var text = this.parentElement.getElementsByClassName("description")[0]
      var image = this.parentElement.getElementsByClassName("image")[0]
      var links = this.parentElement.getElementsByClassName("links")[0]
      string = this.childNodes[0].innerHTML
      if (text.style.display != 'none')
      {
        text.style.display = 'none'
        image.style.display = 'none'
        links.style.display = 'none'
        // And change the symbol in front of  the title
        this.childNodes[0].innerHTML = "\u25b8" + string.substr(1, string.length)
      }
      else
      {
        text.style.display = ''
        image.style.display = ''
        links.style.display = ''
        // Change the symbol in front of the title
        this.childNodes[0].innerHTML = "\u25be" + string.substr(1, string.length)
      }
    };
    projectItem.appendChild(titleDiv)
    // H3 type
    var title = document.createElement("h2")
    titleDiv.appendChild(title)
    // Actual text
    var titleText = document.createTextNode("\u25b8 " + GLOBAL.projects[i]["Title"])
    title.appendChild(titleText);



    // Create and add the text to the div
    // Wrapper div
    var descriptionDiv = document.createElement("div")
    descriptionDiv.className = "description"
    projectItem.appendChild(descriptionDiv)
    // p type
    var description = document.createElement("p")
    descriptionDiv.appendChild(description)
    // Actual text
    var descriptionText = document.createTextNode(GLOBAL.projects[i]["Description"])
    description.appendChild(descriptionText);
    // hide the description to start with
    descriptionDiv.style.display = 'none'

    // Website
    // Wrapper div
    var websiteURL = GLOBAL.projects[i]["Website"]
    var githubURL = GLOBAL.projects[i]["Github"]
    var collabText = GLOBAL.projects[i]["Collaborators"]
    var linksDiv = document.createElement("div")
    linksDiv.className = "links"
    projectItem.appendChild(linksDiv)
    // p type
    var linksp = document.createElement("p")
    linksDiv.appendChild(linksp)
    if (websiteURL != '')
    {
        var links = document.createElement("a")
        linksp.appendChild(links)
        links.href = websiteURL
        links.target = "_blank"
        // Actual text
        var websiteText = document.createTextNode("Website | ")
        links.appendChild(websiteText);
    }
    if (githubURL != '')
    {
        var links = document.createElement("a")
        linksp.appendChild(links)
        links.href = githubURL
        links.target = "_blank"
        // Actual text
        var websiteText = document.createTextNode("Github | ")
        links.appendChild(websiteText);
    }
    if (collabText != '')
    {
        // var collab = document.createElement("div")
        // collab.className = "collab"
        // linksp.appendChild(collab)
        var links = document.createElement("a")
        linksp.appendChild(links)
        // links.href = "#"
        links.setAttribute('class', 'collab');
        // links.target = "_blank"
        // Actual text
        var websiteText = document.createTextNode(collabText)
        links.appendChild(websiteText);
    }
    // hide the description to start with
    linksDiv.style.display = 'none'

    // Create and add the image to the div
    // Wrapper div
    var imageDiv = document.createElement("div")
    imageDiv.className = "image"
    projectItem.appendChild(imageDiv)
    // center
    var center = document.createElement("center")
    imageDiv.appendChild(center)
    // image
    var image = document.createElement("img")
    var imageFilename = "images/" + GLOBAL.projects[i]["Photo"]
    image.src = imageFilename
    image.setAttribute('height', '400px');
    image.style.margin = "0 auto";
    center.appendChild(image)
    // hide the description to start with
    imageDiv.style.display = 'none'
  }
}

// $(document).ready(function(){
//     $('.title').click(function(){
//         $(this).siblings('.description').slideToggle();
//     });
// });
