// import areEqual from "deep-equal";
import { useCallback, useState } from "react";
export default function useSelection(editor) {
  const [selection, setSelection] = useState(editor.selection);
  const setSelectionOptimized = useCallback(
    (newSelection) => {
      // don't update the component state if selection hasn't changed.
      if (areEqual(selection, newSelection)) {
        return;
      }
      setSelection(newSelection);
    },
    [setSelection, selection]
  );
  return [selection, setSelectionOptimized];
}
