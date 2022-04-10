import { useCallback } from "react";
import { DefaultElement } from "slate-react";
import { elementType } from "./App.constants";
import { CodeElement } from "./AppChild";
export default function useEditorConfig(editor) {
  return { renderElement, renderLeaf };
}
//三行能写完的直接在这写,更多的卸载appChild中
const renderElement = (props) => {
  const { element, children, attributes } = props;
  console.log(props, "renderElement");
  switch (element.type) {
    case elementType["code-block"]:
      return <CodeElement {...props} />;
    case elementType["block-quote"]:
      return <blockquote {...attributes}>{children}</blockquote>;
    case elementType["bulleted-list"]:
      return <ul {...attributes}>{children}</ul>;
    case elementType["heading-one"]:
      return <h1 {...attributes}>{children}</h1>;
    case elementType["heading-two"]:
      return <h2 {...attributes}>{children}</h2>;
    case elementType["heading-three"]:
      return <h3 {...attributes}>{children}</h3>;
    case elementType["heading-four"]:
      return <h4 {...attributes}>{children}</h4>;
    case elementType["heading-five"]:
      return <h5 {...attributes}>{children}</h5>;
    case elementType["heading-six"]:
      return <h6 {...attributes}>{children}</h6>;
    case elementType["list-item"]:
      return <li {...attributes}>{children}</li>;
    case elementType.image:
      return <Image {...props} />;
    default:
      return <DefaultElement {...props} />;
  }
};
//why选中就会重复渲染?
const renderLeaf = (props) => {
  const { leaf, children, attributes, text } = props;
  console.log(props, "renderLeaf");
  return (
    <span {...attributes} style={{ fontWeight: leaf.bold ? "bold" : "normal" }}>
      {children}
    </span>
  );
};
