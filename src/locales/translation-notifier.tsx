import * as React from "react";
import { addTranslationChangedCallback } from "./dynamic";

/** Forces a component to update when locales are loaded or language is changed. */
export const translationNotifier = () => <T extends React.ComponentClass<any>>(
  target: T
): T => {
  const prototype = target.prototype as React.ComponentLifecycle<any, any>;

  if (prototype) {
    // augments the original mount/unmount to be able to add/remove the callback
    const { componentDidMount, componentWillUnmount } = prototype;
    let dispose: () => void;

    prototype.componentDidMount = function(this: React.Component<any, any>) {
      dispose = addTranslationChangedCallback(() => this.forceUpdate());
      if (componentDidMount) {
        componentDidMount.call(this);
      }
    };

    prototype.componentWillUnmount = function(this: React.Component<any, any>) {
      if (dispose) {
        dispose();
      }
      if (componentWillUnmount) {
        componentWillUnmount.call(this);
      }
    };
  }

  return target;
};
