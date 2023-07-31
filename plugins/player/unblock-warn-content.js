// for test
// https://www.youtube.com/watch?v=MEZ-0nyiago
// https://www.youtube.com/watch?v=MiQozY6jR0I
// https://www.youtube.com/watch?v=vcw5THyM7Jo
// https://www.youtube.com/watch?v=4QXCPuwBz2E
// https://www.youtube.com/watch?v=ek7JK6pattE
// https://www.youtube.com/watch?v=qAYlTiV-Zf8

window.nova_plugins.push({
   id: 'video-unblock-warn-content',
   title: 'Skip warn about inappropriate or offensive content',
   // 'title:zh': '',
   // 'title:ja': '',
   // 'title:ko': '',
   // 'title:id': '',
   // 'title:es': '',
   // 'title:pt': '',
   // 'title:fr': '',
   // 'title:it': '',
   // 'title:tr': '',
   // 'title:de': '',
   // 'title:pl': '',
   'title:ua': 'Пропустити попередження про неприйнятний або образливий вміст',
   run_on_pages: 'watch, embed, -mobile',
   section: 'player',
   desc: "skip 'The following content may contain suicide or self-harm topics.'",
   // 'desc:zh': '',
   // 'desc:ja': '',
   // 'desc:ko': '',
   // 'desc:id': '',
   // 'desc:es': '',
   // 'desc:pt': '',
   // 'desc:fr': '',
   // 'desc:it': '',
   // 'desc:tr': '',
   // 'desc:de': '',
   // 'desc:pl': '',
   'desc:ua': 'пропустити "Наступний контент може містити теми суїциду або самоушкодження".',
   _runtime: user_settings => {

      // alt - https://greasyfork.org/en/scripts/445870-remove-overlay-messages-on-youtube

      NOVA.waitSelector('ytd-watch-flexy[player-unavailable] yt-player-error-message-renderer #button.yt-player-error-message-renderer button', { destroy_if_url_changes: true })
         .then(btn => btn.click()); // click "I understand and wish to proceed"

   },
});
