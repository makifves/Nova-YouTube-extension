_plugins_conteiner.push({
   name: 'Hide livechat',
   id: 'livechat-collapse',
   depends_on_pages: 'watch',
   restart_on_transition: true,
   opt_section: 'sidebar',
   // desc: '',
   _runtime: user_settings => {

      if (user_settings.livechat_collapse_mode == 'disable') {
         YDOM.HTMLElement.wait('#chat')
            .then(chat => chat.remove());

      } else {
         YDOM.HTMLElement.wait('#chat:not([collapsed]) #show-hide-button #button')
            .then(btn => btn.click());
      }

   },
   opt_export: {
      'livechat_collapse_mode': {
         _tagName: 'select',
         label: 'Mode',
         options: [
            { label: 'collapse', value: 'collapse', selected: true },
            { label: 'remove', value: 'disable' },
         ],
      },
   },
});