// TODO(DEVELOPER): Change the values below using values from the initialization snippet: Firebase Console > Overview > Add Firebase to your web app.
// Initialize Firebase
var config = {
  apiKey: "AIzaSyCuuaAWv4pHoOIo7NzGd7Ry95NXrsvySyY",
  databaseURL: "https://whodis-6326a.firebaseio.com",
  storageBucket: "whodis-6326a.appspot.com"
};
firebase.initializeApp(config);

/**
 * initApp handles setting up the Firebase context and registering
 * callbacks for the auth status.
 *
 * The core initialization is in firebase.App - this is the glue class
 * which stores configuration. We provide an app name here to allow
 * distinguishing multiple app instances.
 *
 * This method also registers a listener with firebase.auth().onAuthStateChanged.
 * This listener is called when the user is signed in or out, and that
 * is where we update the UI.
 *
 * When signed in, we also authenticate to the Firebase Realtime Database.
 */
function initApp() {
  // Listen for auth state changes.
  firebase.auth().onAuthStateChanged(function(user) {
    console.log('User state change detected from the Background script of the Chrome Extension:', user);
  });
}

window.onload = function() {
  initApp();
};

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab)
{
    //console.log("Sending message"); //Doesn't show
    SendMessageToActiveTab({function: "OnURLChange", args: {ti: tabId, ci: changeInfo, t: tab}});
});


function SendMessageToActiveTab(object)
{
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, object, function(response) {
        //console.log(response.farewell);
      });
    });
}
