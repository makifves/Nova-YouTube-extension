window.nova_plugins.push({
   id: 'disable-player-sleep-mode',
   title: 'Player stay active forever',
   // title: 'Disable player sleep mode',
   'title:zh': '玩家永远保持活跃',
   'title:ja': 'プレーヤーは永遠にアクティブなままです',
   'title:ko': '플레이어는 영원히 활성 상태를 유지',
   'title:es': 'El jugador permanece activo para siempre',
   'title:pt': 'Jogador permanece ativo para sempre',
   'title:fr': 'Le joueur reste actif pour toujours',
   'title:tr': 'Sayfa uykusunu devre dışı bırak',
   'title:de': 'Spieler bleiben für immer aktiv',
   'title:pl': 'Wyłącz tryb uśpienia odtwarzacza',
   run_on_pages: 'watch, -mobile',
   section: 'player',
   // desc: 'prevent asking you to click "yes" to continue playing?',
   desc: 'prevent [Video paused] alert',
   'desc:zh': '防止[视频暂停]警报',
   'desc:ja': '「Video paused」アラートを防止します',
   'desc:ko': '[Video paused] 알림을 방지합니다',
   'desc:es': 'evitar la alerta de [Video en pausa]',
   'desc:pt': 'evitar o alerta de [Vídeo pausado]',
   'desc:fr': "empêcher l'alerte [Vidéo en pause]",
   'desc:tr': '[Video duraklatıldı] uyarısını engelle',
   'desc:de': 'Warnung [Video pausiert] verhindern',
   'desc:pl': 'zapobiega wyświetlaniu alertu [Film wstrzymany]',
   _runtime: user_settings => {

      // Strategy 1
      window.setInterval(() => document.dispatchEvent(new KeyboardEvent('keyup', { bubbles: true, cancelable: true, keyCode: 143, which: 143 })), 1000 * 60 * 5); // 5 min

      // Strategy 2
      function skipConfirmDialog() {
         // NOVA.waitElement('yt-confirm-dialog-renderer #confirm-button, a.yt-simple-endpoint.style-scope.yt-button-renderer')
         // NOVA.waitElement('[role="dialog"] #confirm-button')
         NOVA.waitElement('#confirm-button')
            .then(btn => {
               console.debug('page page wake up', btn);
               btn.click();
               if (NOVA.videoElement?.paused) NOVA.videoElement.play();
               // movie_player.playVideo();
               skipConfirmDialog(); // recursion init state. What would work more than once
            });
      }

      skipConfirmDialog();
   },
});