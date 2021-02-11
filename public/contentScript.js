
var pageLinks = document.links;
var reg = /(https?:\/\/(.+?\.)?github\.com(\/[A-Za-z0-9\-\._~:\/\?#\[\]@!$&'\(\)\*\+,;\=]*)?)/;
var dataArrary = [];
var tempData = null;

async function MainApp() {
  for (var i = 0; i < pageLinks.length; i++) {
    let regpath = new URL(pageLinks[i].href).pathname;

    if (pageLinks[i].href.match(reg)) {
      var pathComponents = regpath.split("/");

      var filteredComponents = pathComponents.filter(function (el) {
        if (
          el === "" ||
          el === "login" ||
          el === "about" ||
          el === "pricing" ||
          el === "contact" ||
          el === "join" ||
          el === "security" ||
          el === "discover" ||
          el === "forked" ||
          el === "starred" ||
          el === "team" ||
          el === "enterprise" ||
          el === "marketplace" ||
          el === "features" ||
          el === "careers" ||
          el === "site-map" ||
          el === "readme" ||
          el === "customer-stories" ||
          el === "git-guides" 
        ) {
          return false;
        } else {
          return true;
        }
      });

      if (filteredComponents.length > 0 && filteredComponents.length == 1) {
        //console.log(regpath);

        const divContent = document.createElement("div");
        divContent.setAttribute("style", "height:300px; width:400px;");
        divContent.setAttribute("id", "extension-div" + String(i));
        divContent.innerHTML =
          '<div style="position:relative; top:0px; right:0px;"><button>x</button><br/></div><iframe id="gitRanker' +
          String(i) +
          '" style="height:100%"></iframe>';

        pageLinks[i].parentNode.appendChild(divContent);

        tempData = await fetch(
          "https://ratings-api.dev.reputationaire.com/api/request-rating",
          {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
              "Content-Type": "application/json",
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify({ githubId: filteredComponents[0] }), // body data type must match "Content-Type" header
          }
        )
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            if (data["message"]["uuid_github"] != "") {
              //chrome.runtime.sendMessage(
              //  { configData: data["message"]["uuid_github"] },
              //  (response) => {}
              //);

              return data["message"]["uuid_github"];
            }
          });
        const iframe = document.getElementById("gitRanker" + String(i));
        iframe.src = chrome.extension.getURL("index.html?id=" + tempData+"&profile="+filteredComponents[0]);
        iframe.frameBorder = 0;
        var nametext = pageLinks[i].textContent;

        const dialog = document.getElementById("extension-div" + String(i));
        dialog.querySelector("button").addEventListener("click", () => {
          // Pointing iframe to a blank page frees up most of the memory.
          iframe.src = "about:blank";

          try {
            iframe.contentWindow.document.write("");
            iframe.contentWindow.document.clear();
          } catch (e) {}

          // Remove iframe from the page
          iframe.parentNode.removeChild(iframe);
          dialog.remove();
        });


      }
    }
  }
}
MainApp();
