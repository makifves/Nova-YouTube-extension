_plugins.push({
   name: 'Player hotkeys always active',
   id: 'player-focused-onkeydown',
   section: 'player',
   depends_page: 'watch',
   desc: 'shortcuts priority [SPACE/F] etc.',
   _runtime: user_settings => {

      ["keydown"/*, "focus"*/].forEach(event => {
         document.addEventListener(event, captureFocus);
      });

      function captureFocus(event) {
         // console.log('captureFocus', document.activeElement);

         if (document.activeElement.tagName.toLowerCase() !== "input" &&
            document.activeElement.slot.toLowerCase() !== "input"
            // && !window.getSelection()
         ) {
            // document.activeElement.style.border = "2px solid red";
            document.querySelector("video").focus();
            // console.log('focused');
         }
      }

   },
});