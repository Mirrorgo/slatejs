import { memo } from "react";
import { CustomEditor } from "./App.helper";

export { CodeElement, Leaf, DefaultElement, Toolbar };
const Toolbar = memo(({ editor }) => {
  return (
    <div>
      {console.log("render toolbar")}
      <button
        onMouseDown={(e) => {
          e.preventDefault();
          CustomEditor.toggleBoldMark(editor);
        }}
      >
        Button:bold
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          console.log(editor);
        }}
      >
        see editor
      </button>
    </div>
  );
});
const CodeElement = (props) => {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  );
};
const Leaf = (props) => {
  return (
    <span
      {...props.attributes}
      style={{ fontWeight: props.leaf.bold ? "bold" : "normal" }}
    >
      {props.children}
    </span>
  );
};
const DefaultElement = (props) => {
  return <p {...props.attributes}>{props.children}</p>;
};
