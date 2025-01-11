
/**
 * Loads and includes an HTML document
 * @param {HTMLElement} element HTML Element to load the file of and replace
 */
function includeHTML(element) {
  let file = element?.getAttribute('w3-html-include');
  if (!file) {
    console.error(`Unable to determine include file for element with #${element}`);
    return;
  }
  fetch(file)
    .then(resp => {
      if (resp.status >= 200 && resp.status < 400) {
        return resp.text();
      } else {
        throw new Error(`HTML ${resp.status} ${resp.statusText}`);
      }
    })
    .then(text => {
      let fragment = new DocumentFragment();
      fragment.innerHTML = text;
      element.parentElement.replaceChild(element, fragment);
    })
    .catch(error => {
      console.error(`Unable to fetch ${file}.  ${error.message}`);
    });
}

/**
 * Navigates to the homepage
 */
function loadTop() {
  location.href = location.origin;
}

/**
 * Trigger the includes after initial DOM load
 */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[w3-html-include]')
    .forEach(element => {
      includeHTML(element);
    });
});