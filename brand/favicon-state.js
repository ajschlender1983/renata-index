/* Renata dynamic favicon — swap the tab icon to the live agent state.
   Usage:  renataFavicon('found')   // 'present' | 'working' | 'found' | 'timing' | 'alert'
   The whole mark takes the state colour, so the state reads even at 16px. */
(function (global) {
  var COLOR = {
    present: '#574FC7', listening: '#574FC7', working: '#574FC7',
    found: '#0F7256', timing: '#8A5A0C', alert: '#A6342E'
  };
  var MASK =
    "<defs><mask id='a'>" +
      "<rect width='100' height='100' fill='#000'/>" +
      "<path d='M25 14 L39 14 L40 86 L24 86 Z' fill='#fff'/>" +
      "<circle cx='50' cy='36' r='22' fill='#fff'/>" +
      "<path d='M44 54 L56 51 L85 86 L68 86 Z' fill='#fff'/>" +
      "<path d='M50 26 L61 37 L50 48 L39 37 Z' fill='#000'/>" +
    "</mask></defs>";

  function svg(color) {
    return "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'>" +
      MASK + "<rect width='100' height='100' fill='" + color + "' mask=\"url(#a)\"/></svg>";
  }

  function renataFavicon(state) {
    var color = COLOR[state] || COLOR.present;
    var href = 'data:image/svg+xml,' + encodeURIComponent(svg(color));
    var link = document.querySelector("link[rel~='icon']");
    if (!link) { link = document.createElement('link'); link.rel = 'icon'; document.head.appendChild(link); }
    link.type = 'image/svg+xml';
    link.href = href;
  }

  global.renataFavicon = renataFavicon;
})(typeof window !== 'undefined' ? window : this);
