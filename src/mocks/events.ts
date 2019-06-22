// JSDom has no implementation for common methods of HTML media elements.
// Tests will fail without this. Sad but true.
// https://github.com/jsdom/jsdom/issues/2155#issuecomment-366703395
export const mockHTMLMediaMethods = (): void => {
  window[`HTMLMediaElement`].prototype.load = () => { /* do nothing */ };
  window[`HTMLMediaElement`].prototype.play = () => { /* do nothing */ };
  window[`HTMLMediaElement`].prototype.pause = () => { /* do nothing */ };
};
