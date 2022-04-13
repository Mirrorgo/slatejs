// Define our own custom set of helpers.
import { Editor, Range, Text, Transforms } from "slate";
import { elementType } from "./RickText.constants";
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
  isCodeBlockActive(editor) {
    //TODO：理解这个nodes的使用方式
    const [match] = Editor.nodes(editor, {
      match: (n) => n.type === elementType["code-block"],
    });
    return !!match;
  },
  isQuoteBlockActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.type === elementType["quote-block"],
    });
    return !!match;
  },
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

export { CustomEditor };
