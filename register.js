const MODULE_ID = 'avatar-ru-translate';
console.log(`${MODULE_ID} | register.js loaded`);

Hooks.on('init', () => {
  console.log(`${MODULE_ID} | init hook`);
  game.settings.register(MODULE_ID, 'autoRegisterBabel', {
    name: 'Automatically activate translation via Babele',
    scope: 'world',
    config: true,
    default: true,
    type: Boolean,
  });
});

Hooks.once('babele.init', (babele) => {
  console.log(`${MODULE_ID} | babele.init hook`);
  if (game.settings.get(MODULE_ID, 'autoRegisterBabel')) {
    babele.register({
      module: MODULE_ID,
      lang: 'ru',
      dir: 'compendium/ru',
    });
    console.log(`${MODULE_ID} | registered with babele`);
  }
});

Hooks.on('ready', () => {
  console.log(`${MODULE_ID} | ready hook, game.babele:`, !!game.babele);
  if (game.babele && game.babele.modules.length === 0) {
    console.log(`${MODULE_ID} | babele has 0 modules, trying to register via ready`);
    game.babele.register({
      module: MODULE_ID,
      lang: 'ru',
      dir: 'compendium/ru',
    });
    console.log(`${MODULE_ID} | registered via ready hook`);
  }
});
