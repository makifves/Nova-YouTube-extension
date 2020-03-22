_plugins.push({
   name: 'Clear video thumbnails',
   id: 'thumbnail-clear',
   section: 'other',
   depends_page: 'all, -embed',
   desc: 'Replaces the predefined thumbnail',
   _runtime: user_settings => {

      const markAttrName = 'timestamps-updated';

      YDOM.waitHTMLElement('#thumbnail:not([' + markAttrName + ']) img', imgElement => {
         // if (imgElement.hasAttribute(markAttrName)) return; // Bug. Very strange, interrupts the replacement
         // console.log('switchAttrUName', imgElement);
         imgElement.setAttribute(markAttrName, true);

         const re = /(hq1|hq2|hq3|hqdefault|mqdefault|hq720).jpg/i;

         if (re.test(imgElement.src)) {
            imgElement.src = imgElement.src.replace(re, `${(user_settings.thumbnail_time_stamp || 'hq1')}.jpg`);
         }

      }, 'hard waitHTMLElement listener');

   },
   export_opt: (function () {
      return {
         'thumbnail_time_stamp': {
            _elementType: 'select',
            label: 'Thumbnail timestamps',
            title: 'Thumbnail display video timestamps',
            options: [
               { label: 'start', value: 'hq1' }, // often shows intro
               { label: 'middle', value: 'hq2', selected: true },
               { label: 'end', value: 'hq3' },
            ]
         },
      };
   }()),
});