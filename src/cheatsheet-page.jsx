import { Page } from "@nakedjsx/core/page";

const shortcuts = {
  navigation: {
    "h,j,k,l": "arrow keys (left, down, up, right)",
    "0,$": "start and end of line",
    "^": "start of line after whitespace",
    "b,w": "previous and next word",
    "ge,e": "previous and next end of word",
    "gg,G": "start and end of document",
    ":{number}": "goto line {number}",
    "^": "start of line after whitespace",
    "%": "next matching ()[]{}",
    "<C-O>,<C-I>": "go to previous and next document location",
    gf: "goto file under cursor",
  },
  editing: {
    "d, dd": "delete with modifier, delete whole line",
    ".": "redo last operation",
  },
  "copy & paste": {
    "y, yy": "copy with modifier, copy whole line",
    "p, P": "paste on new line below or above",
  },
};

const getSections = (shortcuts) =>
  Object.entries(shortcuts).reduce((acc, [section, keys]) => {
    acc.push(Section(section, keys));
    return acc;
  }, []);

const getKeys = (keys) =>
  Object.entries(keys).reduce((acc, [key, description]) => {
    acc.push(Key(key, description));
    return acc;
  }, []);

const Section = (section, keys) => (
  <>
    <h2>{section}</h2>
    {getKeys(keys)}
  </>
);

const Key = (key, description) => (
  <div class="key">
    <span>{key}</span>
    <span>{description}</span>
  </div>
);

const BodyContent = () => (
  <>
    <h1>Nvim Cheatsheet</h1>
    {getSections(shortcuts)}
  </>
);

Page.Create("en");
Page.AppendHead(<title>Nvim Cheatsheet</title>);
Page.AppendBody(<BodyContent />);
Page.Render();
