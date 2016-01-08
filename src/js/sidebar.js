const sidebar = document.querySelector('.main-menu');
const zoomInButton = document.querySelector('[data-click="zoomIn"]');
const zoomOutButton = document.querySelector('[data-click="zoomOut"]');


export default {
  /**
   * @param {Number} number of people currently online
   */
  setOnlineCount(n) {
    sidebar.querySelector('.online-counter').textContent = n;
  },

  setZoomInHandler(fn) {
    zoomInButton.addEventListener('click', fn);
  },

  setZoomOutHandler(fn) {
    zoomOutButton.addEventListener('click', fn);
  }
};
