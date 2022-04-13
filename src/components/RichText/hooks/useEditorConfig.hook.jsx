import { useCallback } from "react";
import styled from "styled-components";
import { elementType, leafType } from "../RickText.constants";
import isHotkey from "is-hotkey";
import { CustomEditor } from "../RichText.helper";
export default function useEditorConfig(editor) {
  const onKeyDown = useCallback(
    //NOTE:这个每次修改后,需要重写刷新才能更新事件,hmr无效
    (e) => {
      if (isHotkey("mod+b", e)) {
        CustomEditor.toggleStyle(editor, leafType.bold);
        return;
      }
      if (isHotkey("mod+i", e)) {
        CustomEditor.toggleStyle(editor, leafType.italic);
        return;
      }
      if (isHotkey("mod+u", e)) {
        CustomEditor.toggleStyle(editor, leafType.underline);
        return;
      }
      // NOTE:isHotkey对于👇无法prevent浏览器的ctrl+e
      /*  if (isHotkey("mod+e", event)) {
        CustomEditor.toggleStyle(editor, leafType.code);
        return;
      } */
      if (!e.ctrlKey) {
        return;
      }
      //NOTE:保留按键
      if (new Set(["a", "c", "v", "z", "ArrowLeft", "ArrowRight"]).has(e.key)) {
        return;
      }
      // 只有下面的写法能够prevent浏览器的ctrl+e
      switch (e.key) {
        case "e": {
          e.preventDefault();
          CustomEditor.toggleStyle(editor, leafType.code);
          break;
        }
        case "`": {
          e.preventDefault();
          CustomEditor.toggleCodeBlock(editor);
          break;
        }
        //NOTE注意大小写
        case "U": {
          e.preventDefault();
          CustomEditor.toggleQuoteBlock(editor);
          break;
        }
        case "W": {
          e.preventDefault();
          CustomEditor.toggleQuoteBlock(editor);
          break;
        }
        default:
          console.log("key:", e.key);
          e.preventDefault(); //清除所有第三方ctrl的快捷键
      }
    },
    [editor]
  );

  return { renderElement, renderLeaf, onKeyDown };
}
//三行能写完的直接在这写,更多的卸载appChild中
const renderElement = (props) => {
  const { element, children, attributes } = props;
  console.log("renderElement()");
  switch (element.type) {
    case elementType.paragraph:
      return <p {...attributes}>{children}</p>;
    case elementType["code-block"]:
      return <CodeElement {...props} />;
    case elementType["quote-block"]:
      return <Blockquote {...attributes}>{children}</Blockquote>;
    case elementType["bulleted-list"]:
      return <ul {...attributes}>{children}</ul>;
    case elementType["h1"]:
      return <h1 {...attributes}>{children}</h1>;
    case elementType["h2"]:
      return <h2 {...attributes}>{children}</h2>;
    case elementType["h3"]:
      return <h3 {...attributes}>{children}</h3>;
    case elementType["h4"]:
      return <h4 {...attributes}>{children}</h4>;
    case elementType["h5"]: //TODO: 目前从五级开始就太小了,需要整体修改每级标题的字号
      return <h5 {...attributes}>{children}</h5>;
    case elementType["h6"]:
      return <h6 {...attributes}>{children}</h6>;
    case elementType["list-item"]:
      return <li {...attributes}>{children}</li>;
    case elementType.image:
      return <Image {...props} />;
    default:
      return <p {...attributes}>{children}</p>;
  }
};
const CodeElement = (props) => {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  );
};
const Blockquote = styled.blockquote`
  margin-left: 5px;
  margin-right: 5px;
  padding-left: 10px;
  border-left: 2px solid #dedede;
  color: #666666;
`;

//TODO:why选中就会重复渲染?所在element有几段就会渲染几次
function renderLeaf(props) {
  const { attributes, children, leaf, text } = props;
  console.log("renderLeaf()");
  //由于这个是叠加的,所以得等到最后才能return
  let el = <>{children}</>;
  if (leaf[leafType.bold]) {
    el = <Bold>{el}</Bold>;
  }
  if (leaf[leafType.code]) {
    el = <code>{el}</code>;
  }
  if (leaf[leafType.italic]) {
    el = <em>{el}</em>;
  }
  if (leaf[leafType.underline]) {
    el = <u>{el}</u>;
  }
  return <span {...attributes}>{el}</span>;
}

const Bold = styled.span`
  font-weight: bold;
`;

/* ------无效代码------ */

const handleKeyDown = (event, editor) => {
  // if(isHotkey('mod+b',event)){

  // }
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
