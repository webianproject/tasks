var Tasks = {
  init: function() {
    if (!navigator.serviceWorker) {
      return;
    }
    navigator.serviceWorker.register("service_worker.js").then(function(serviceWorker) {
        console.log("Successfully registered Service Worker.");
    }, function(error) {
        console.error("Failed to register Service Worker" + error);
    });
  }
};

Tasks.init();