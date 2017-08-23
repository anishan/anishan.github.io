var GLOBAL = { projects: [],
               projectsFileName: "content/projects.csv"};

window.addEventListener('load', runPortfolio());

function runPortfolio()
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
    projectItem.appendChild(titleDiv)
    // H3 type
    var title = document.createElement("h2")
    titleDiv.appendChild(title)
    titleDiv.className = "title"
    titleDiv.style.display = 'none'
    // Actual text
    var titleText = document.createTextNode(GLOBAL.projects[i]["Title"])
    title.appendChild(titleText);

    var infoDiv = document.createElement("div")
    infoDiv.className = "info"
    projectItem.appendChild(infoDiv)

    // Create and add the text to the div
    // Wrapper div
    var descriptionDiv = document.createElement("div")
    descriptionDiv.className = "description"
    infoDiv.appendChild(descriptionDiv)
    // p type
    var description = document.createElement("p")
    descriptionDiv.appendChild(description)
    // Actual text
    var descriptionText = document.createTextNode(GLOBAL.projects[i]["Description"])
    description.appendChild(descriptionText);
    // hide the description to start with
    descriptionDiv.style.display = 'none'

    // Skills
    var skillsList = GLOBAL.projects[i]["Skills"]
    var date = GLOBAL.projects[i]["Date"]
    var skillsDiv = document.createElement("div")
    skillsDiv.className = "skills"
    infoDiv.appendChild(skillsDiv)
    // p type
    if (date != '')
    {
        var dateField = document.createElement("p")
        skillsDiv.appendChild(dateField)
        // Actual text
        var dateText = document.createTextNode(date)
        dateField.appendChild(dateText);
    }
    if (skillsList != '')
    {
        var skills = document.createElement("p")
        skillsDiv.appendChild(skills)
        // Actual text
        var skillsText = document.createTextNode("Skills: " + skillsList)
        skills.appendChild(skillsText);
    }
    // hide the description to start with
    skillsDiv.style.display = 'none'

    // Website
    // Wrapper div
    var websiteURL = GLOBAL.projects[i]["Website"]
    var githubURL = GLOBAL.projects[i]["Github"]
    var collabText = GLOBAL.projects[i]["Collaborators"]
    var linksDiv = document.createElement("div")
    linksDiv.className = "links"
    infoDiv.appendChild(linksDiv)
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
        var links = document.createElement("a")
        linksp.appendChild(links)
        links.setAttribute('class', 'collab');
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
    if (GLOBAL.projects[i]["Photo"] != '')
    {
        var image = document.createElement("img")
        var imageFilename = "images/" + GLOBAL.projects[i]["Photo"]
        image.src = imageFilename
        image.setAttribute('height', '300px');
        image.style.margin = "0 0";
        image.style.display = "block"
        image.className = "imageTag"
        imageDiv.appendChild(image)
        var hoverTextDiv = document.createElement("p")
        imageDiv.appendChild(hoverTextDiv)
        var hoverText = document.createTextNode(GLOBAL.projects[i]["Title"])
        hoverTextDiv.style.position = "absolute"
        hoverTextDiv.style.fontSize = "1.5em"
        hoverTextDiv.style.fontWeight = "900"
        hoverTextDiv.style.color = "white"
        hoverTextDiv.style.textAlign = "center";
        hoverTextDiv.style.verticalAlign = "middle";
        hoverTextDiv.style.top = "calc(50% - 0.75em)"; // - half of text height
        hoverTextDiv.style.left = "0";
        hoverTextDiv.style.right = "0";
        hoverTextDiv.style.margin = "auto";
        hoverTextDiv.style.display = "none";
        hoverTextDiv.className = "hoverTitle";
        if (GLOBAL.projects[i]["WhiteBackground"] == 1){
            image.className += " whiteBackground"
            image.style.opacity = "0.97"
        }
        
        hoverTextDiv.appendChild(hoverText);
        imageDiv.onmouseover = function(d)
        {
            image = d.target.parentElement.getElementsByClassName("imageTag")[0]
            image.style.opacity = "0.5";
            hoverTextDiv = d.target.parentElement.getElementsByClassName("hoverTitle")[0]
            hoverTextDiv.style.display = ''
        }
        imageDiv.onmouseout = function(d)
        {
            image = d.target.parentElement.getElementsByClassName("imageTag")[0]
            if (image.className.indexOf("whiteBackground") != -1){
                image.style.opacity = "0.97";
            } else{
                image.style.opacity = "1";
            }
            
            hoverTextDiv = d.target.parentElement.getElementsByClassName("hoverTitle")[0]
            hoverTextDiv.style.display = 'none'
        }
    }

    // When the title is clicked, toggle the question
    imageDiv.onclick = function (d) {
      var project = d.target.parentElement.parentElement
      var title = project.getElementsByClassName("title")[0]
      var text = project.getElementsByClassName("description")[0]
      var skills = project.getElementsByClassName("skills")[0]
      var image = project.getElementsByClassName("image")[0]
      var links = project.getElementsByClassName("links")[0]
      // if you want to hide the info
      if (text.style.display != 'none')
      {
        title.style.display = 'none'
        text.style.display = 'none'
        skills.style.display = 'none'
        links.style.display = 'none'
        project.style.margin = "0px 5px"
        project.style.padding = ""
        image.childNodes[0].setAttribute('height', '300px');
        image.childNodes[0].setAttribute('width', '');
        image.style.width = "";
        smoothScrollFast(project)
      }
      // if you want to show info
      else
      {
        title.style.display = ''
        text.style.display = ''
        skills.style.display = ''
        links.style.display = ''
        project.style.margin = "0px 5px 8px 5px"
        project.style.padding = "0px 5px 20px 5px"
        image.childNodes[0].setAttribute('height', '');
        image.style.width ='40%';
        image.childNodes[0].setAttribute('width', '100%');

        // scroll
        smoothScroll(project)
      }

    };
  }
}


function scrollTo(element, to, duration) {
    if (duration <= 0) return;
    var difference = to - element.scrollTop;
    var perTick = difference / duration * 10;

    setTimeout(function() {
        element.scrollTop = element.scrollTop + perTick;
        if (element.scrollTop === to) return;
        scrollTo(element, to, duration - 10);
    }, 10);
}

function smoothScroll(target) {
    var scrollContainer = target;
    do { //find scroll container
        scrollContainer = scrollContainer.parentNode;
        if (!scrollContainer) return;
        scrollContainer.scrollTop += 1;
    } while (scrollContainer.scrollTop == 0);

    var targetY = 0;
    do { //find the top of target relatively to the container
        if (target == scrollContainer) break;
        targetY += target.offsetTop;
    } while (target = target.offsetParent);

    scroll = function(c, a, b, i) {
        i++; if (i > 25) return;
        c.scrollTop = a + (b - a) / 30 * i;
        setTimeout(function(){ scroll(c, a, b, i); }, 20);
    }
    // start scrolling
    scroll(scrollContainer, scrollContainer.scrollTop, targetY, 0);
}

function smoothScrollFast(target) {
    var scrollContainer = target;
    do { //find scroll container
        scrollContainer = scrollContainer.parentNode;
        if (!scrollContainer) return;
        scrollContainer.scrollTop += 1;
    } while (scrollContainer.scrollTop == 0);

    var targetY = 0;
    do { //find the top of target relatively to the container
        if (target == scrollContainer) break;
        targetY += target.offsetTop;
    } while (target = target.offsetParent);

    scroll = function(c, a, b, i) {
        i++; if (i > 35) return;
        c.scrollTop = a + (b - a) / 30 * i;
        setTimeout(function(){ scroll(c, a, b, i); }, 4);
    }
    // start scrolling
    scroll(scrollContainer, scrollContainer.scrollTop, targetY, 0);
}