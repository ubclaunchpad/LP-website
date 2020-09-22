// A dumb hack to make sure anchor links scroll
window.onload = function() {
  requestAnimationFrame(function() {
    if (location.hash) {
      const element = document.getElementById(location.hash.slice(1));
      if (element) {
        element.scrollIntoView();
      }
    }
  });
}
