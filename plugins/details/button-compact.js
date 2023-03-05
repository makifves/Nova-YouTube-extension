window.nova_plugins.push({
   id: 'button-no-labels',
   title: 'Buttons without labels',
   // title: 'Compact button labels',
   'title:zh': '没有标签的按钮',
   'title:ja': 'ラベルのないボタン',
   'title:ko': '라벨이 없는 버튼',
   'title:id': 'Tombol tanpa label',
   'title:es': 'Botones sin etiquetas',
   'title:pt': 'Botões sem rótulos',
   'title:fr': 'Boutons sans étiquettes',
   'title:it': 'Bottoni senza etichette',
   // 'title:tr': '',
   'title:de': 'Knöpfe ohne Beschriftung',
   'title:pl': 'Guziki bez etykiet',
   'title:ua': 'Кнопки без написів',
   run_on_pages: 'watch, -mobile',
   section: 'details',
   // desc: '',
   _runtime: user_settings => {

      // alt1 - https://greasyfork.org/en/scripts/443136-youtube-compact-button-labels
      // alt2 - https://greasyfork.org/en/scripts/449799-clean-yt-interface
      // alt3 - https://greasyfork.org/en/scripts/441087-youtube-watch-page-no-icon-labels

      let styles =
         // `ytd-watch-metadata #actions button ${user_settings.buttons_hide ? '' : '[class*="--button-text-content"]'} {
         `ytd-watch-metadata #actions button ${user_settings.buttons_hide ? '' : '.cbox'} {
            display: none;
         }
         ytd-watch-metadata #actions button .yt-spec-button-shape-next__icon {
            margin: 0 !important;
         }
         /* exept like-dislike */
         ytd-watch-metadata #actions ytd-segmented-like-dislike-button-renderer ~ * button,
         ytd-watch-metadata #actions #top-level-buttons-computed ~ * button.yt-spec-button-shape-next--size-m {
            padding: 0 7px;
         }`;

      if (user_settings.button_no_labels_opacity) {
         styles +=
            `#subscribe-button:not(:hover),
            ytd-watch-metadata #actions #menu:not(:hover) {
               transition: opacity .2s ease-in-out;
               opacity: .1;
            }`;
      }

      NOVA.css.push(styles);

   },
   options: {
      buttons_hide: {
         _tagName: 'input',
         label: 'Hide buttons completely',
         'label:zh': '隐藏按钮',
         'label:ja': 'ボタンを隠す',
         'label:ko': '버튼 숨기기',
         'label:id': 'Sembunyikan tombol',
         'label:es': 'Ocultar botones',
         'label:pt': 'Ocultar botões',
         'label:fr': 'Masquer les boutons',
         'label:it': 'Nascondi pulsanti',
         // 'label:tr': 'Düğmeleri gizle',
         'label:de': 'Verstecken tasten',
         'label:pl': 'Ukryj przyciski',
         'label:ua': 'Сховати кнопки',
         type: 'checkbox',
      },
      button_no_labels_opacity: {
         _tagName: 'input',
         label: 'Opacity',
         'label:zh': '不透明度',
         'label:ja': '不透明度',
         'label:ko': '불투명',
         'label:id': 'Kegelapan',
         'label:es': 'Opacidad',
         'label:pt': 'Opacidade',
         'label:fr': 'Opacité',
         'label:it': 'Opacità',
         // 'label:tr': 'Opaklık',
         'label:de': 'Opazität',
         'label:pl': 'Przejrzystość',
         'label:ua': 'Прозорість',
         type: 'checkbox',
      },
   }
});