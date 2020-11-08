
document.addEventListener('DOMContentLoaded', () => {
  Storage.storageInitialization();
  UI.contentInitialization();
  initRouteActions();
});

const initRouteActions = () => {
  window.addEventListener('hashchange', () => {
    UI.contentInitialization();
  });
};

