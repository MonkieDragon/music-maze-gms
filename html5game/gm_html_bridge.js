console.log("Bridge JS loaded");

window.resumeGMGMAudio = function () {
  try {
    // GameMaker audio context
    if (typeof g_WebAudioContext !== "undefined") {
      if (g_WebAudioContext.state !== "running") {
        g_WebAudioContext.resume();
      }
    }

    // Force unlock via silent buffer (important for iOS)
    if (typeof g_WebAudioContext !== "undefined") {
      const ctx = g_WebAudioContext;

      const buffer = ctx.createBuffer(1, 1, 22050);
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.connect(ctx.destination);
      source.start(0);
    }
  } catch (e) {
    console.log("resume audio error", e);
  }
};

// Fallback: user interaction
document.addEventListener(
  "touchstart",
  function () {
    window.resumeGMGMAudio();
  },
  { once: true },
);

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
      }),
    );
  }
}

function notifyGameExit() {
  if (window.ReactNativeWebView?.postMessage) {
    window.ReactNativeWebView.postMessage(
      JSON.stringify({
        type: "game_exit",
      }),
    );
  }
}

function notifyGameSave(data) {
  if (window.ReactNativeWebView?.postMessage) {
    window.ReactNativeWebView.postMessage(
      JSON.stringify({
        type: "game_save",
        payload: data,
      }),
    );
  }
}

function notifyGameLoad() {
  if (window.ReactNativeWebView?.postMessage) {
    window.ReactNativeWebView.postMessage(
      JSON.stringify({
        type: "game_load",
      }),
    );
  }
}

function notifyGameSaveReset() {
  if (window.ReactNativeWebView?.postMessage) {
    window.ReactNativeWebView.postMessage(
      JSON.stringify({
        type: "reset_save",
      }),
    );
  }
}
