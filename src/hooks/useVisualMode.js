import { useState } from 'react';
export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  // Transitions mode to transition mode. If replace is true, then replaces history. Else adds to the history
  function transition(transitionMode, replace) {
    if (replace) {
      setHistory(() => {
        if (history) {
          let newHistory = history.slice();
          newHistory[newHistory.length - 1] = transitionMode;
          return newHistory;
        } else {
          return [transitionMode];
        }

      });
    } else {
      setHistory(() => {
        return history ? history.concat(transitionMode) : [transitionMode];
      });
    }
    setMode(() => {
      return transitionMode;
    });
  }

  // Mode changes to the previous mode that is available in history.
  function back() {
    //set Mode to the one in history
    setMode(() => {
      if (history.length > 1) {
        setMode(history[history.length - 2]);
        setHistory(() => {
          let newHistory = history.slice(0, history.length - 1);
          newHistory[newHistory.length - 1] = history[history.length - 2];
          return newHistory;
        })
      } else {
        setMode(mode);
      }
    });
  }
  return { mode, transition, back }
}
