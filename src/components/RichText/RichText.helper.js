// Define our own custom set of helpers.
import { Editor, Text, Transforms } from "slate";
import { elementType } from "./RickText.constants";
const CustomEditor = {
  /* -----Leaf------ */
  //STAR 处理所有leaf
  isMarkActive(editor, format) {
    console.log("isMarkActive");
    const marks = Editor.marks(editor);
    return marks ? marks[format] === true : false;
  },
  toggleMark(editor, format) {
    const isActive = CustomEditor.isMarkActive(editor, format);
    if (isActive) {
      Editor.removeMark(editor, format);
    } else {
      Editor.addMark(editor, format, true);
    }
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
