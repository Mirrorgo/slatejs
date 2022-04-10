// Define our own custom set of helpers.
import { Editor, Text, Transforms } from "slate";
import { elementType } from "./App.constants";
const CustomEditor = {
  /* -----Leaf------ */
  isBoldMarkActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.bold === true,
      universal: true, // 这里的true or false是匹配方式的区别
    });

    return !!match;
  },
  /* -----block----- */
  isQuoteBlockActive(editor) {
    //TODO清除魔术字符串
    const [match] = Editor.nodes(editor, {
      match: (n) => n.type === elementType["block-quote"],
    });
    return !!match;
  },
  isCodeBlockActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.type === elementType["code-block"],
    });

    return !!match;
  },
  /* --------------toggle-------------- */
  toggleBoldMark(editor) {
    const isActive = CustomEditor.isBoldMarkActive(editor);
    Transforms.setNodes(
      editor,
      { bold: isActive ? null : true },
      { match: (n) => Text.isText(n), split: true }
    );
  },

  toggleCodeBlock(editor) {
    const isActive = CustomEditor.isCodeBlockActive(editor);
    Transforms.setNodes(
      editor,
      { type: isActive ? null : elementType["code-block"] },
      { match: (n) => Editor.isBlock(editor, n) }
    );
  },
};

const withShortcuts = (editor) => {
  const {} = editor;
  return editor;
};

/* ---------各种键鼠操作---------- */
const handleKeyDown = (event, editor) => {
  if (!event.ctrlKey) {
    return;
  }
  // 使用我们新编写的命令来替代 onKeyDown 中的逻辑
  switch (event.key) {
    case "`": {
      event.preventDefault();
      CustomEditor.toggleCodeBlock(editor);
      break;
    }
    case "b": {
      event.preventDefault();
      CustomEditor.toggleBoldMark(editor);
      break;
    }
  }
};
//TODO: 如何在with中使用onkeydown
export { CustomEditor, withShortcuts, handleKeyDown };
