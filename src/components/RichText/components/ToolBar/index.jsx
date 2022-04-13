import { memo, useState } from "react";
import { useSelected } from "slate-react";
import styled from "styled-components";
import {
  DROPDOWN_DATA,
  leafType,
  STYLE_BUTTON,
} from "../../RickText.constants";
import { CustomEditor } from "../../RichText.helper";
import { ReactComponent as GithubIcon } from "/src/svg/github.svg";
import { ReactComponent as YuqueIcon } from "/src/svg/yuque.svg";
/*  */
const cssVariables = {
  blue: "#037bff",
};
/*  */
const Toolbar = memo(({ editor }) => {
  const [data, setData] = useState(DROPDOWN_DATA);
  // const [selection, setSelection] = useSelection(editor);
  return (
    <StyleToolBar>
      {console.log("render toolbar")}
      {/* immer+ 状态提升 */}
      {/* TODO:这里的onchange暂时没有使用 */}
      <DropdownList data={data} onChange={(e) => setData(e.value)} />
      {STYLE_BUTTON.map((style) => {
        //一堆leaf的按钮
        return (
          <div key={style}>
            <button
              //TODO:active的时候有深色的背景
              // className={`${
              //   CustomEditor.isStyleActive(editor, style) ? "active" : ""
              // }`}
              onMouseDown={(e) => {
                e.preventDefault();
                CustomEditor.toggleStyle(editor, style); //cur类似leafType.bold
              }}
            >
              {style}
              <div className="tooltip">ctrl+i</div>
            </button>
          </div>
        );
      })}
      <VerticalLine />
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
          // console.log(editor.selection);
          console.log("test");
        }}
      >
        test
      </button>
      <Github link="https://github.com/Mirrorgo/slatejs"></Github>
      <Yuque link="https://www.yuque.com/lalala-wm82o/qvhwgq/qpibaz"></Yuque>
    </StyleToolBar>
  );
});
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
          //FIXME: 没有办法模拟点击事件!!!
          e.preventDefault();
          setShowDropdownList((i) => !i);
          console.log("mask");
          console.log(e.clientX, e.clientY);
        }}
      ></div> */}
    </div>
  );
};

/* --------样式-------- */
const StyleToolBar = styled.div`
  display: flex;
  justify-content: center;
  height: 26px;
  button {
    height: 100%;
    position: relative; //为了tooltip的定位
    border-radius: 4px;
    border: ${cssVariables.blue} 1px solid;
    margin: 0 3px;
    padding: 3px 8px;
    color: ${cssVariables.blue};
    background-color: inherit;
    > .tooltip {
      display: block;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: 100%;
      opacity: 0;
      pointer-events: none;
      transition: ease 0.3s;
      z-index: 10; //显示在上层,防止遮盖
    }
    &.active {
      background-color: #e8e8e8;
    }
    &:hover {
      background-color: #f5f5f5;
      > .tooltip {
        opacity: 1;
      }
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

const VerticalLine = () => {
  return (
    <div
      style={{
        boxSizing: "border-box",
        borderLeft: "1px solid black",
        height: "20px",
        position: "relative",
        top: "50%",
        margin: "0 3px 0 4px",
        transform: "translateY(-50%)",
      }}
    ></div>
  );
};
//TODO:抽离出一个通用按钮(文字+svg+a)
const Github = ({ children, link }) => {
  return (
    <div className="github">
      <A href={link}>
        {children}
        <GithubIcon width="25" height="25" />
      </A>
    </div>
  );
};
const Yuque = ({ children, link }) => {
  return (
    <div className="yuque">
      <A href={link}>
        {children}
        <YuqueIcon width="25" height="25" />
      </A>
    </div>
  );
};

const A = styled.a`
  text-decoration: none; /* 去除默认的下划线 */
  outline: none; /* 去除旧版浏览器的点击后的外虚线框 */
  color: inherit; /* 去除默认的颜色和点击后变化的颜色 */
`;

export { Toolbar };
