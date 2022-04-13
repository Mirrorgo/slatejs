import { elementType, SHORTCUTS } from "./RickText.constants";
import { Editor, Range, Text, Transforms } from "slate";
const withShortcuts = (editor) => {
  //TODO: 👇是做什么的?猜测用于保留方法修改前的部分内容
  const { deleteBackward, insertText } = editor;
  //NOTE:why是text而不是character? 因为有一次输入了多个内容的情况,比如中文输入法的输入和粘贴进来的大段文本
  editor.insertText = (text) => {
    console.log("text:", text);
    const { selection } = editor;
    if (
      text === " " &&
      selection.anchor.offset < 8 &&
      Range.isCollapsed(selection)
    ) {
      //NOTE: range:选中的范围; range坍缩成光标的情况 => Range.isCollapsed(selection)
      //range是一个类,表示拖蓝这个类. selection是当前editor对象上的实际拖蓝, 也就是说,传入的selection就是一个拖蓝
      const { anchor } = selection; //由于range坍缩成光标了,anchor和focus只要有一个就可以了
      const block = Editor.above(editor); //由于需要得知当前的block style,所以只能用above而不是previous
      const start = Editor.start(editor, block[1]);
      const range = { anchor, focus: start };
      //Editor.above: Get the matching ancestor above a location in the document.
      //above返回的是一个数组res[],res[0]为当前祖先的内容,此处为block的内容,res[1]是
      //如果使用previous则返回的是同级的节点
      const beforeText = Editor.string(editor, range);
      const newType = SHORTCUTS[beforeText];
      if (newType) {
        Transforms.select(editor, range);
        Transforms.delete(editor);
        Transforms.setNodes(
          editor,
          { type: newType === block[0].type ? elementType.paragraph : newType },
          {
            match: (n) => Editor.isBlock(editor, n),
          }
        );
        return; //要有return,否则会多一个空格
      }
    }
    insertText(text); //保证原内容正常插入,可自由添加使得插入的内容更多
  };
  //yuque的设计没有做deleteBackward的部分,暂时搁置
  return editor;
};
export { withShortcuts };
