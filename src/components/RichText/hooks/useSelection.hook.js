import equal from "fast-deep-equal";
import { useCallback, useRef, useState } from "react";
// 暂时先使用,后续再研究
export default function useSelection(editor) {
  const [selection, setSelection] = useState(editor.selection);
  const previousSelection = useRef(null);
  const setSelectionOptimized = useCallback(
    (newSelection) => {
      if (equal(selection, newSelection)) {
        return;
      }
      previousSelection.current = selection;
      setSelection(newSelection);
    },
    [setSelection, selection]
  );

  return [previousSelection.current, selection, setSelectionOptimized];
}
