const elementType = {
  //消除魔术字符串https://es6.ruanyifeng.com/#docs/symbol#%E5%AE%9E%E4%BE%8B%EF%BC%9A%E6%B6%88%E9%99%A4%E9%AD%94%E6%9C%AF%E5%AD%97%E7%AC%A6%E4%B8%B2
  //STAR:在前后端传递的时候不知道如何操作symbol, 还是使用string而不是symbol比较好
  "code-block": "code",
  "quote-block": "block-quote",
  "bulleted-list": "bulleted-list",
  h1: "heading-one",
  h2: "heading-two",
  h3: "heading-three",
  h4: "heading-four",
  h5: "heading-five",
  h6: "heading-six",
  "list-item": "list-item",
  image: "image",
  paragraph: "paragraph", //普通的内容都是paragraph吗
};

const leafType = {
  bold: "bold",
  code: "code",
  italic: "italic",
  underline: "underline",
};

const INITIAL_CONTENT = [
  {
    type: elementType["h1"],
    children: [{ text: "Heading 1" }],
  },
  {
    type: elementType["h2"],
    children: [{ text: "Heading 2" }],
  },
  {
    type: elementType["h3"],
    children: [{ text: "Heading 3" }],
  },
  {
    type: elementType["h4"],
    children: [{ text: "Heading 4" }],
  },
  {
    type: elementType["h5"],
    children: [{ text: "Heading 5" }],
  },
  {
    type: elementType["h6"],
    children: [{ text: "Heading 6" }],
  },
  {
    type: elementType.paragraph,
    children: [
      { text: "Hello World! This is my paragraph inside a sample document." },
      { text: "Bold text.", bold: true, code: true },
      { text: "Italic text.", italic: true },
      { text: "Bold and underlined text.", bold: true, underline: true },
      { text: "variableFoo", code: true },
    ],
  },
];

const DROPDOWN_DATA = {
  selected: 0,
  list: [
    {
      order: 0,
      label: "正文",
      type: elementType.paragraph,
    },
    {
      order: 1,
      label: "标题1",
      type: elementType.h1,
    },
    {
      order: 2,
      label: "标题2",
      type: elementType.h2,
    },
    {
      order: 3,
      label: "标题3",
      type: elementType.h3,
    },
    {
      order: 4,
      label: "标题4",
      type: elementType.h4,
    },
    {
      order: 5,
      label: "标题5",
      type: elementType.h5,
    },
    {
      order: 6,
      label: "标题6",
      type: elementType.h6,
    },
  ],
};
const STYLE_BUTTON = [...Object.values(leafType)]; //TODO：完善成类似DROPDOWN_DATA
const SHORTCUTS = {
  ">": elementType["quote-block"],
  "#": elementType.h1,
  "##": elementType.h2,
  "###": elementType.h3,
  "####": elementType.h4,
  "#####": elementType.h5,
  "######": elementType.h6,
};
export {
  INITIAL_CONTENT,
  STYLE_BUTTON,
  elementType,
  leafType,
  DROPDOWN_DATA,
  SHORTCUTS,
};
