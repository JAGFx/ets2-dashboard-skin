// let navigatorWakeLock = null;

// eslint-disable-next-line
export const switchFullscreen = (fullscreenIsEnabled: boolean) => {
  // const elem = document.querySelector('html');
  //
  // if (!fullscreenIsEnabled) {
  //   // Enable fullscreen
  //
  //   if (elem.requestFullscreen) elem.requestFullscreen();
  //   else if (elem.mozRequestFullScreen) elem.mozRequestFullScreen();
  //   else if (elem.webkitRequestFullscreen) elem.webkitRequestFullscreen();
  //   else if (elem.msRequestFullscreen) elem.msRequestFullscreen();
  //
  //   //this.$pushALog(
  //   //	'Enable fullscreen',
  //   //	HTY_ZONE.ZONE_GAME,
  //   //	HTY_LEVEL.DEBUG
  //   //);
  // } else {
  //   // Disable fullscreen
  //
  //   if (document.exitFullscreen) document.exitFullscreen();
  //   else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
  //   else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
  //   else if (document.msExitFullscreen) document.msExitFullscreen();
  //
  //   //this.$pushALog(
  //   //	'Disable fullscreen',
  //   //	HTY_ZONE.ZONE_GAME,
  //   //	HTY_LEVEL.DEBUG
  //   //);
  // }
  //
  // switchAwakeScreen(fullscreenIsEnabled);
};

export const switchAwakeScreen = () => {
  // if ('wakeLock' in navigator) stayOnFullscreenWithWakeLock();
  // else if ('keepAwake' in screen) stayOnFullscreenWithScreenAwake();
  // else throw new Error('No native keep awake system was found.');
};

// eslint-disable-next-line
export const stayOnFullscreenWithWakeLock = (fullscreenIsEnabled = false) => {
  // if (!fullscreenIsEnabled)
  //   navigator.wakeLock.request('screen').then((wakeLock) => {
  //     navigatorWakeLock = wakeLock;
  //   });
  // else navigatorWakeLock.release();
};

export const stayOnFullscreenWithScreenAwake = (
  // eslint-disable-next-line
  fullscreenIsEnabled = false
) => {
  // screen.keepAwake = fullscreenIsEnabled;
};
