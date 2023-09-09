import {  useEffect } from "react";

const isSameTarget = (ref: any, event: { target: any; }) =>
  !ref.current || ref.current.contains(event.target);

const useOnClickOutside = (ref: any , handler: Function) => {
  useEffect(() => {
    const listener = (event: any) => {
      if (ref instanceof Array) {
        for (const refItem of ref) {
          if (isSameTarget(refItem, event)) return;
        }
      } else {
        if (isSameTarget(ref, event)) return;
      }

      handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
};

export default useOnClickOutside;
