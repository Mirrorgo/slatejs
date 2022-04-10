export { initialContent, elementType };
const elementType = {
  //消除魔术字符串https://es6.ruanyifeng.com/#docs/symbol#%E5%AE%9E%E4%BE%8B%EF%BC%9A%E6%B6%88%E9%99%A4%E9%AD%94%E6%9C%AF%E5%AD%97%E7%AC%A6%E4%B8%B2
  //STAR:在前后端传递的时候不知道如何操作symbol, 还是使用string而不是symbol比较好
  "code-block": "code",
  "block-quote": "block-quote",
  "bulleted-list": "bulleted-list",
  "heading-one": "heading-one",
  "heading-two": "heading-two",
  "heading-three": "heading-three",
  "heading-four": "heading-four",
  "heading-five": "heading-five",
  "heading-six": "heading-six",
  "list-item": "list-item",
  image: "image",
};

const initialContent = [
  {
    type: elementType["code-block"], //真正保持在storage的时候应该直接使用string
    children: [{ text: "A line of text in a paragraph." }],
  },
];
