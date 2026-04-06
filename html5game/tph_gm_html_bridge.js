console.log("Bridge JS loaded");

window.restoreGameData = function (data) {
  try {
    notifyMessage("in window.restoreGameData, data: ", data);
    if (window.gml_Script_gmcallback_restoreGameData) {
      window.gml_Script_gmcallback_restoreGameData("", "", data);
    }
  } catch (e) {}
};

function notifyMessage(data) {
  if (window.ReactNativeWebView?.postMessage) {
    window.ReactNativeWebView.postMessage(
      JSON.stringify({
        type: "message",
        payload: data,
      })
    );
  }
}

function notifyGameExit() {
  if (window.ReactNativeWebView?.postMessage) {
    window.ReactNativeWebView.postMessage(
      JSON.stringify({
        type: "game_exit",
      })
    );
  }
}

function notifyGameSave(data) {
  if (window.ReactNativeWebView?.postMessage) {
    window.ReactNativeWebView.postMessage(
      JSON.stringify({
        type: "game_save",
        payload: data,
      })
    );
  }
}

function notifyGameLoad() {
  if (window.ReactNativeWebView?.postMessage) {
    window.ReactNativeWebView.postMessage(
      JSON.stringify({
        type: "game_load",
      })
    );
  }
}

function notifyGameSaveReset() {
  if (window.ReactNativeWebView?.postMessage) {
    window.ReactNativeWebView.postMessage(
      JSON.stringify({
        type: "reset_save",
      })
    );
  }
}
