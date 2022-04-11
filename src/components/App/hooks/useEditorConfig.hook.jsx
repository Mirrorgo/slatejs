import isHotkey from "is-hotkey";
import { useCallback } from "react";
import { DefaultElement } from "slate-react";
import styled from "styled-components";
import { elementType } from "../App.constants";
import { CodeElement } from "../AppChild";
export default function useEditorConfig(editor) {
  /* const onKeyDown = useCallback(
    (e) => {
      console.log("onkeydown");
      // if (isHotkey("mod+b", e)) {
      // if (isHotkey("mod+b")(e)) {
      // if (isHotkey("Control+S", e)) {
      if (isHotkey("Control+S")(e)) {
        console.log("mod+b");
      }
    },
    [editor]
  ); */
  /* new */
  const onKeyDown = useCallback(
    (event) => {
      if (isHotkey("mod+b", event)) {
        console.log("mod+b");
        return;
      }
    },
    [editor]
  );

  return { renderElement, renderLeaf, onKeyDown };
}
//三行能写完的直接在这写,更多的卸载appChild中
const renderElement = (props) => {
  const { element, children, attributes } = props;
  console.log(props, "renderElement()");
  switch (element.type) {
    case elementType.paragraph:
      return <p {...attributes}>{children}</p>;
    case elementType["code-block"]:
      return <CodeElement {...props} />;
    case elementType["quote-block"]:
      return <blockquote {...attributes}>{children}</blockquote>;
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
    case elementType["h5"]:
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
//TODO:why选中就会重复渲染?所在element有几段就会渲染几次
function renderLeaf(props) {
  const { attributes, children, leaf, text } = props;
  console.log(props, "renderLeaf()");
  let el = <>{children}</>;
  if (leaf.bold) {
    return <Bold {...attributes}>{el}</Bold>;
  }
  if (leaf.code) {
    el = <code>{el}</code>;
  }
  if (leaf.italic) {
    el = <em>{el}</em>;
  }
  if (leaf.underline) {
    el = <u>{el}</u>;
  }
  return <span {...attributes}>{el}</span>;
}

const Bold = styled.span`
  font-weight: bold;
`;
