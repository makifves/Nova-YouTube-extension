_plugins.push({
   name: 'Disable Comments',
   id: 'disable-comments',
   section: 'comments',
   depends_page: 'watch',
   desc: 'Remove comments section',
   _runtime: user_settings => {

      YDOM.waitFor('#comments', el => el.parentNode.removeChild(el));

   }
});
