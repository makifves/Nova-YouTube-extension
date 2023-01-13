
// for testing
// https://www.youtube.com/watch?v=LhKT9NTH9HA - dont have 480p
// https://www.youtube.com/watch?v=FZovbrEP53o - dont have 480p

window.nova_plugins.push({
   id: 'video-quality',
   title: 'Video quality',
   'title:zh': '视频质量',
   'title:ja': 'ビデオ品質',
   'title:ko': '비디오 품질',
   'title:id': 'Kualitas video',
   'title:es': 'Calidad de video',
   'title:pt': 'Qualidade de vídeo',
   'title:fr': 'Qualité vidéo',
   'title:it': 'Qualità video',
   // 'title:tr': 'Video kalitesi',
   'title:de': 'Videoqualität',
   'title:pl': 'Jakość wideo',
   'title:ua': 'Якість відео',
   run_on_pages: 'watch, embed',
   section: 'player',
   // desc: '',
   _runtime: user_settings => {

      let selectedQuality = user_settings.video_quality;

      NOVA.waitElement('#movie_player')
         .then(movie_player => {
            // keep save manual quality in the session
            if (user_settings.video_quality_manual_save_in_tab && NOVA.currentPage == 'watch') { // no sense if in the embed
               movie_player.addEventListener('onPlaybackQualityChange', quality => {
                  // console.debug('document.activeElement,',document.activeElement);
                  if (document.activeElement.getAttribute('role') == 'menuitemradio' // focuse on setting menu
                     && quality !== selectedQuality // the new quality
                  ) {
                     console.info(`keep quality "${quality}" in the session`);
                     selectedQuality = quality;
                  }
               });
            }

            if (user_settings.video_quality_in_music_playlist
               && location.search.includes('list=')
               // && (NOVA.queryURL.has('list')/* || movie_player?.getPlaylistId()*/)
               && NOVA.isMusic()
            ) {
               selectedQuality = user_settings.video_quality_in_music_quality;
            }

            setQuality(); // init

            movie_player.addEventListener('onStateChange', setQuality); // update
         });

      function setQuality(state) {
         if (!selectedQuality) return console.error('selectedQuality unavailable', selectedQuality);
         // console.debug('playerState', NOVA.getPlayerState(state));

         // if ((1 == state || 3 == state) && !setQuality.quality_busy) {
         if (['PLAYING', 'BUFFERING'].includes(NOVA.getPlayerState(state)) && !setQuality.quality_busy) {
            setQuality.quality_busy = true;

            const waitQuality = setInterval(() => {
               const availableQualityLevels = movie_player.getAvailableQualityLevels();

               if (availableQualityLevels?.length) {
                  clearInterval(waitQuality);

                  const maxAvailableQuality = Math.max(availableQualityLevels.indexOf(selectedQuality), 0);
                  const newQuality = availableQualityLevels[maxAvailableQuality];

                  // if (!newQuality || movie_player.getPlaybackQuality() == selectedQuality) {
                  //    return console.debug('skip set quality');
                  // }

                  // if (!availableQualityLevels.includes(selectedQuality)) {
                  //    console.info(`no has selectedQuality: "${selectedQuality}". Choosing instead the top-most quality available "${newQuality}" of ${JSON.stringify(availableQualityLevels)}`);
                  // }

                  if (movie_player.hasOwnProperty('setPlaybackQuality')) {
                     // console.debug('use setPlaybackQuality');
                     movie_player.setPlaybackQuality(newQuality);
                  }

                  // set QualityRange
                  if (movie_player.hasOwnProperty('setPlaybackQualityRange')) {
                     // console.debug('use setPlaybackQualityRange');
                     movie_player.setPlaybackQualityRange(newQuality, newQuality);
                  }

                  // console.debug('availableQualityLevels:', availableQualityLevels);
                  // console.debug("try set quality:", newQuality);
                  // console.debug('current quality:', movie_player.getPlaybackQuality());
               }
            }, 50); // 50ms

            // } else if (['UNSTARTED', 'ENDED'].includes(NOVA.getPlayerState(state))) {
         } else if (state <= 0) {
            setQuality.quality_busy = false;
         }
      }

      // error detector
      NOVA.waitElement('.ytp-error [class*="reason"]')
         .then(error_reason_el => {
            if (alertText = error_reason_el.textContent) {
               // err ex:
               // This video isn't available at the selected quality. Please try again later.
               // An error occurred. Please try again later. (Playback ID: Ame9qzOk-p5tXqLS) Learn More
               // alert(alertText);
               throw alertText; // send to _pluginsCaptureException
            }
         });

   },
   options: {
      video_quality: {
         _tagName: 'select',
         label: 'Default quality',
         'label:zh': '默认视频质量',
         'label:ja': 'デフォルトのビデオ品質',
         'label:ko': '기본 비디오 품질',
         'label:id': 'Kualitas bawaan',
         'label:es': 'Calidad predeterminada',
         'label:pt': 'Qualidade padrão',
         'label:fr': 'Qualité par défaut',
         'label:it': 'Qualità predefinita',
         // 'label:tr': 'Varsayılan kalite',
         'label:de': 'Standardvideoqualität',
         'label:pl': 'Domyślna jakość',
         'label:ua': 'Звичайна якість',
         title: 'If unavailable, set max available quality',
         'title:zh': '如果不可用，将选择可用的最高质量。',
         'title:ja': '利用できない場合は、利用可能な最高の品質が選択されます。',
         'title:ko': '사용할 수 없는 경우 사용 가능한 최대 품질을 설정합니다.',
         'title:id': 'Jika tidak tersedia, atur kualitas maksimal yang tersedia',
         'title:es': 'Si no está disponible, establezca la calidad máxima disponible',
         'title:pt': 'Se não estiver disponível, defina a qualidade máxima disponível',
         'title:fr': 'Si non disponible, définissez la qualité maximale disponible',
         'title:it': 'Se non disponibile, imposta la massima qualità disponibile',
         // 'title:tr': 'Mevcut değilse, maksimum kullanılabilir kaliteyi ayarlayın',
         // 'title:de': 'Wenn nicht verfügbar, stellen Sie die maximal verfügbare Qualität ein',
         'title:pl': 'Jeśli nie dostępna, ustaw maksymalną dostępną jakość',
         'title:ua': 'Якщо недоступно, обрати максимальну доступну якість',
         // multiple: null,
         options: [
            // Available ['highres','hd2880','hd2160','hd1440','hd1080','hd720','large','medium','small','tiny']
            { label: '8K/4320p', value: 'highres' },
            // { label: '5K/2880p', value: 'hd2880' }, // missing like https://www.youtube.com/watch?v=Hbj3z8Db4Rk
            { label: '4K/2160p', value: 'hd2160' },
            { label: 'QHD/1440p', value: 'hd1440' },
            { label: 'FHD/1080p', value: 'hd1080', selected: true },
            { label: 'HD/720p', value: 'hd720' },
            { label: 'SD/480p', value: 'large' },
            { label: 'SD/360p', value: 'medium' },
            { label: 'SD/240p', value: 'small' },
            { label: 'SD/144p', value: 'tiny' },
            // { label: 'Auto', value: 'auto' }, // no sense, deactivation does too
         ],
      },
      video_quality_manual_save_in_tab: {
         _tagName: 'input',
         // label: 'Manually selected qualities are saved in the current tab' // too much long
         label: 'Save manually selected for the same tab',
         'label:zh': '手动选择的质量保存在当前选项卡中',
         'label:ja': '手動で選択した品質が現在のタブに保存されます',
         'label:ko': '동일한 탭에 대해 수동으로 선택한 저장',
         'label:id': 'Simpan dipilih secara manual untuk tab yang sama',
         'label:es': 'Guardar seleccionado manualmente para la misma pestaña',
         'label:pt': 'Salvar selecionado manualmente para a mesma guia',
         'label:fr': 'Enregistrer sélectionné manuellement pour le même onglet',
         'label:it': 'Salva selezionato manualmente per la stessa scheda',
         // 'label:tr': 'Aynı sekme için manuel olarak seçili kaydet',
         'label:de': 'Manuell für dieselbe Registerkarte ausgewählt speichern',
         'label:pl': 'Właściwości dla obecnej karty',
         'label:ua': 'Зберігати власноруч обрану якість для вкладки',
         type: 'checkbox',
         title: 'Affects to next videos',
         'title:zh': '对下一个视频的影响',
         'title:ja': '次の動画への影響',
         'title:ko': '다음 동영상에 영향',
         'title:id': 'Mempengaruhi video berikutnya',
         'title:es': 'Afecta a los siguientes videos',
         'title:pt': 'Afeta para os próximos vídeos',
         'title:fr': 'Affecte aux prochaines vidéos',
         'title:it': 'Influisce sui prossimi video',
         // 'title:tr': 'Sonraki videoları etkiler',
         'title:de': 'Beeinflusst die nächsten Videos',
         'title:pl': 'Zmiany w następnych filmach',
         'title:ua': 'Впливає на наступні відео',
      },
      video_quality_in_music_playlist: {
         _tagName: 'input',
         label: 'Diff quality for music in playlists',
         // 'label:zh': '',
         // 'label:ja': '',
         // 'label:ko': '',
         // 'label:id': '',
         // 'label:es': '',
         // 'label:pt': '',
         // 'label:fr': '',
         // 'label:it': '',
         // 'label:tr': '',
         // 'label:de': '',
         // 'label:pl': '',
         // 'label:ua': '',
         type: 'checkbox',
         title: 'to save traffic / increase speed',
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
         // 'title:ua': '',
      },
      video_quality_in_music_quality: {
         _tagName: 'select',
         label: 'Quality for music',
         // 'label:zh': '',
         // 'label:ja': '',
         // 'label:ko': '',
         // 'label:id': '',
         // 'label:es': '',
         // 'label:pt': '',
         // 'label:fr': '',
         // 'label:it': '',
         // 'label:tr': '',
         // 'label:de': '',
         // 'label:pl': '',
         // 'label:ua': '',
         // multiple: null,
         options: [
            // Available ['highres','hd2880','hd2160','hd1440','hd1080','hd720','large','medium','small','tiny']
            { label: '8K/4320p', value: 'highres' },
            // { label: '5K/2880p', value: 'hd2880' }, // missing like https://www.youtube.com/watch?v=Hbj3z8Db4Rk
            { label: '4K/2160p', value: 'hd2160' },
            { label: 'QHD/1440p', value: 'hd1440' },
            { label: 'FHD/1080p', value: 'hd1080' },
            { label: 'HD/720p', value: 'hd720' },
            { label: 'SD/480p', value: 'large', selected: true },
            { label: 'SD/360p', value: 'medium' },
            { label: 'SD/240p', value: 'small' },
            { label: 'SD/144p', value: 'tiny' },
            // { label: 'Auto', value: 'auto' }, // no sense, deactivation does too
         ],
         'data-dependent': { 'video_quality_in_music_playlist': true },
      },
   }
});
