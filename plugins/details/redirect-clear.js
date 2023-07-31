window.nova_plugins.push({
   id: 'redirect-disable',
   title: 'Clear links from redirect',
   'title:zh': '清除重定向中的链接',
   'title:ja': 'リダイレクトからリンクをクリアする',
   'title:ko': '리디렉션에서 링크 지우기',
   'title:id': 'Hapus tautan dari pengalihan',
   'title:es': 'Borrar enlaces de redireccionamientos',
   'title:pt': 'Limpar links de redirecionamentos',
   'title:fr': 'Effacer les liens des redirections',
   'title:it': 'Cancella i collegamenti dal reindirizzamento',
   // 'title:tr': 'Yönlendirmeden bağlantıları temizle',
   'title:de': 'Links aus Weiterleitungen löschen',
   'title:pl': 'Wyczyść linki z przekierowań',
   'title:ua': 'Очистити посилання від перенаправлення',
   run_on_pages: 'watch, channel',
   section: 'details',
   desc: 'Direct external links',
   'desc:zh': '直接链接到外部站点',
   'desc:ja': '外部サイトへの直接リンク',
   'desc:ko': '직접 외부 링크',
   'desc:id': 'Tautan eksternal langsung',
   'desc:es': 'Enlaces externos directos',
   'desc:pt': 'Links externos diretos',
   'desc:fr': 'Liens externes directs',
   'desc:it': 'Collegamenti esterni diretti',
   // 'desc:tr': 'Doğrudan harici bağlantılar',
   'desc:de': 'Direkte externe Links',
   'desc:pl': 'Bezpośrednie łącza zewnętrzne',
   'desc:ua': 'Прямі зовнішні посилання',
   _runtime: user_settings => {

      // alt1 - https://greasyfork.org/en/scripts/445867-replace-youtube-redirect-links
      // alt2 - https://greasyfork.org/en/scripts/449286-clean-youtube-redirect-urls
      // alt3 - https://greasyfork.org/en/scripts/470482-url-redirect-redirecter

      // mouse left click
      document.addEventListener('click', evt => evt.isTrusted && patchLink(evt.target), { capture: true });
      // mouse middle click
      document.addEventListener('auxclick', evt => evt.isTrusted && evt.button === 1 && patchLink(evt.target), { capture: true });

      function patchLink(target = required()) {
         const linkSelector = 'a[href*="/redirect?"]';

         if (!target.matches(linkSelector)) {
            if (!(target = target.closest(linkSelector))) return;
         }

         if (q = NOVA.queryURL.get('q', target.href)) {
            target.href = decodeURIComponent(q);
            // alert(target.href);
         }
      }

   },
});
