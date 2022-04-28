import { memo, useCallback, useMemo, useState } from "react";
import { createEditor, Editor } from "slate";
import { withHistory } from "slate-history";
import { Editable, Slate, withReact } from "slate-react";
import { INITIAL_CONTENT } from "./RickText.constants";
import { withShortcuts } from "./RichText.plugin";
import Toolbar from "./components/ToolBar";
import useEditorConfig from "./hooks/useEditorConfig.hook";
function RichText() {
  const editor = useMemo(
    () => withShortcuts(withHistory(withReact(createEditor()))),
    []
  );
  const [value, setValue] = useState(INITIAL_CONTENT);
  const { renderElement, renderLeaf, onKeyDown } = useEditorConfig(editor);
  return (
    <>
      {console.log("render app")}
      <Slate editor={editor} value={value} onChange={(opt) => setValue(opt)}>
        <Toolbar editor={editor} />
        <hr />
        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          placeholder="markdown here"
          onKeyDown={onKeyDown}
        />
      </Slate>
      {/* <button
        onClick={() => {
          console.log(value);
        }}
      >
        check state
      </button> */}
    </>
  );
}
export default RichText;
