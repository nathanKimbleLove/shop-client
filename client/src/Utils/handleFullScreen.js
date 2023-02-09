let fs = false;

export default function handleFullScreen(el, className) {
  if (el.classList.contains(className) && !fs) {
    fs = true;
    el.classList.remove(className);
    el.classList.add('fullScreenPhoto');
  } else if (el.classList.contains('fullScreenPhoto')) {
    fs = false;
    el.classList.remove('fullScreenPhoto');
    el.classList.add(className);
  }
}