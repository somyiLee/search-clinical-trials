import React, { useState, useRef } from 'react';
import { ArrowDown, ArrowUp, Escape } from '../shared';

export const usechangeFocus = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const focusRef = useRef<HTMLUListElement>(null);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [focusIdx, setFocusIdx] = useState(-2);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case ArrowDown:
        setFocusIdx(focusIdx + 1);
        if (focusIdx > 5) setFocusIdx(-1);
        break;
      case ArrowUp:
        setFocusIdx(focusIdx - 1);
        if (focusIdx < 0) {
          setFocusIdx(-1);
        }
        break;
      case Escape:
        setFocusIdx(-1);
        break;
      default:
        break;
    }
  };

  return { handleKeyDown, focusRef, focusIdx };
};
