export default App;
import { memo, useCallback, useMemo, useState } from "react";
import { createEditor, Editor } from "slate";
import { withHistory } from "slate-history";
import { Editable, Slate, withReact } from "slate-react";
import { elementType, initialContent } from "./App.constants";
import { CustomEditor, handleKeyDown, withShortcuts } from "./App.helper";
import { CodeElement, DefaultElement, Leaf, Toolbar } from "./AppChild";
import useEditorConfig from "./useEditorConfig.hook";
function App() {
  const editor = useMemo(
    () => withShortcuts(withHistory(withReact(createEditor()))),
    []
  ); // 创建一个不会在渲染中变化的 Slate 编辑器对象
  const [value, setValue] = useState(initialContent);
  const { renderElement, renderLeaf } = useEditorConfig(editor);
  return (
    <>
      {console.log("render app")}
      <Slate editor={editor} value={value} onChange={(opt) => setValue(opt)}>
        <Toolbar editor={editor} />
        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          placeholder="markdown here"
          onKeyDown={(e) => handleKeyDown(e, editor)}
        />
      </Slate>
    </>
  );
}
