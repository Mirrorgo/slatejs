// Define our own custom set of helpers.
import { Editor, Text, Transforms } from "slate";
import { elementType } from "./App.constants";
const CustomEditor = {
  /* -----Leaf------ */
  //STAR 处理所有leaf
  isStyleActive(editor, style) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n[style] === true,
      universal: true, // 这里的true or false是匹配方式的区别
    });
    return !!match;
  },
  /* -----block----- */
  isCodeBlockActive(editor) {
    //TODO：理解这个nodes的使用方式
    const [match] = Editor.nodes(editor, {
      match: (n) => n.type === elementType["code-block"],
    });
    return !!match;
  },
  isQuoteBlockActive(editor) {
    //TODO清除魔术字符串
    const [match] = Editor.nodes(editor, {
      match: (n) => n.type === elementType["quote-block"],
    });
    return !!match;
  },
  /* --------------toggle-------------- */
  /* -----Leaf------ */
  //STAR
  toggleStyle(editor, style) {
    console.log(style, "style");
    const isActive = CustomEditor.isStyleActive(editor, style);
    Transforms.setNodes(
      editor,
      { [style]: isActive ? false : true }, //注意这里的方括号
      { match: (n) => Text.isText(n), split: true }
    );
  },
  /* -----block----- */
  toggleCodeBlock(editor) {
    const isActive = CustomEditor.isCodeBlockActive(editor);
    Transforms.setNodes(
      editor,
      { type: isActive ? null : elementType["code-block"] },
      { match: (n) => Editor.isBlock(editor, n) }
    );
  },
  toggleQuoteBlock(editor) {
    const isActive = CustomEditor.isQuoteBlockActive(editor);
    Transforms.setNodes(
      editor,
      { type: isActive ? null : elementType["quote-block"] },
      { match: (n) => Editor.isBlock(editor, n) }
    );
  },
};

const withShortcuts = (editor) => {
  //TODO: 👇是做什么的?猜测用于保留方法修改前的部分内容
  const { deleteBackward, insertText } = editor;
  editor.insertText = (text) => {
    const { selection } = editor;
    // if (text === " " && selection && Range.isCollapsed(selection)) {
    if (text === " ") {
      console.log("insert", selection);
    }
    insertText(text); //保证原内容正常插入
  };
  return editor;
};

export { CustomEditor, withShortcuts };
