var NBC_PageReload = function() {
  var reloadInterrupted = false;
  var defaultReloadTimeout = 300000; // 5 mins
  
  function init(config) {    
    $(document).ready(function() {
      NBC_EventManager.subscribe('user.register.start', NBC_PageReload, 'interruptReload');  
      NBC_EventManager.subscribe('user.login.start', NBC_PageReload, 'interruptReload');    
      NBC_EventManager.subscribe('moment.entry.start', NBC_PageReload, 'interruptReload');          
      NBC_EventManager.subscribe('moment.share.click', NBC_PageReload, 'interruptReload');          
      
      var reloadInMs = defaultReloadTimeout;
      if (config && config.timeoutSec) {
        reloadInMs = config.timeoutSec * 1000;
      }
      U.log("reload: timeout set to [" + reloadInMs + "] ms.");
      
      setTimeout(function() {
        reloadPage();
      }, reloadInMs); 
    });
  };

  function reloadPage() {
    if (!reloadInterrupted) {
      U.log("reload: reloading now");
      window.location.reload(true);
    }
  }

  function interruptReload() {
    U.log("reload: Interrupted by user action. Page will not be reloaded.");
    reloadInterrupted = true;
  }
  
  return {
    init: init,
    interruptReload: interruptReload
  };
}();
