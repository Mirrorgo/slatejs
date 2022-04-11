import { memo, useState } from "react";
import { useSelected } from "slate-react";
import styled from "styled-components";
import { dropdownData } from "./App.constants";
import { CustomEditor } from "./App.helper";
import useSelection from "./hooks/useSelection.hook";

export { CodeElement, DefaultElement, Toolbar };

/*  */
const cssVariables = {
  blue: "#037bff",
};
/*  */
const Toolbar = memo(({ editor }) => {
  const [data, setData] = useState(dropdownData);
  // const [selection, setSelection] = useSelection(editor);
  return (
    <StyleToolBar>
      {console.log("render toolbar")}
      {/* immer+ 状态提升 */}
      {/* TODO:这里的onchange暂时没有使用 */}
      <DropdownList data={data} onChange={(e) => setData(e.value)} />
      <button
        onMouseDown={(e) => {
          e.preventDefault();
          CustomEditor.toggleBoldMark(editor);
        }}
      >
        bold
      </button>
      <button
        onMouseDown={(e) => {
          e.preventDefault();
          console.log(editor);
        }}
      >
        see editor
      </button>
      <button
        onMouseDown={(e) => {
          // console.log(selection);
          console.log(editor.selection);
          console.log("test");
        }}
      >
        test
      </button>
    </StyleToolBar>
  );
});
const CodeElement = (props) => {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  );
};
const DefaultElement = (props) => {
  return <p {...props.attributes}>{props.children}</p>;
};

//TODO: 一个自己的dropDown
const DropdownList = (props) => {
  const { data, onChange } = props;
  const selectedItem = data.list[data.selected];
  const [showDropdownList, setShowDropdownList] = useState(false);
  const handleOnMouseDown = (e) => {
    e.preventDefault();
  };
  const handleOnClick = (e) => {
    console.log("click");
    setShowDropdownList((i) => !i);
    console.dir(e.target);
  };
  return (
    <div className="dropdown" onMouseDown={(e) => e.preventDefault()}>
      <button
        onMouseDown={handleOnMouseDown}
        onMouseUp={(e) => {
          console.log("up");
        }}
        onClick={handleOnClick}
        className="dropdownBtn"
      >
        {selectedItem.label}
      </button>
      <div className={`dropdown-content ${showDropdownList ? "show" : ""}`}>
        {data.list.map((cur) => {
          return <div key={cur.order}>{cur.label}</div>;
        })}
      </div>
      {/* <div
        className={`mask ${showDropdownList ? "show" : ""}`}
        onMouseDown={(e) => {
          //FIXME
          e.preventDefault();
          setShowDropdownList((i) => !i);
          console.log("mask");
        }}
      ></div> */}
    </div>
  );
};

/* --------样式-------- */
const StyleToolBar = styled.div`
  display: flex;
  justify-content: center;
  button {
    border-radius: 4px;
    border: ${cssVariables.blue} 1px solid;
    margin: 0 3px;
    padding: 3px 8px;
  }
  button {
    color: ${cssVariables.blue};
    background-color: inherit;
    &:hover {
      background-color: #f5f5f5;
    }
  }
  .dropdown {
    position: relative;
    .dropdownBtn {
      color: white;
      background-color: ${cssVariables.blue};
      position: relative;
      padding-right: 25px;
      &::after {
        position: absolute;
        content: "";
        width: 0;
        right: 10px;
        top: 9px;
        box-sizing: border-box;
        border: solid 4px;
        border-color: white transparent transparent transparent;
      }
    }
    .dropdown-content {
      position: absolute;
      max-height: 0;
      overflow-y: hidden;
      left: 0;
      transition: ease 0.3s;
      padding: 0 8px;
      box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1),
        0 2px 4px -2px rgb(0 0 0 / 0.1);
      &.show {
        max-height: 500px;
      }
    }
    .mask {
      position: fixed; //TODO: fixed但脱离文档流
      background-color: rgb(165, 164, 164);
      opacity: 0;
      width: 0;
      height: 0;
      z-index: 100;
      left: 0;
      top: 0;
      &.show {
        width: 100vw;
        height: 100vh;
      }
    }
  }
`;
