import { Page } from "@nakedjsx/core/page";

const shortcuts = {
  navigation: {
    "<h>,<j>,<k>,<l>": "arrow keys (left, down, up, right)",
    "<0>,<$>": "start or end of line",
    "<^>": "start of line after whitespace",
    "<b>,<w>": "previous or next word",
    "<g><e>,<e>": "previous or next end of word",
    "<g><g>,<G>": "start or end of document",
    "<g><d>": "definition of element under cursor",
    "<g><r>": "refernces of the element under cursor",
    "<:>{number}": "goto line {number}",
    "<%>": "next matching ()[]{}",
    "<ctrl>+<o>,<ctrl>+<i>": "previous or next document location",
    "<g><f>": "file under cursor",
    "<[><f>,<]><f>,<[><F>,<]><F>": "previous or next function start and end",
    "<[><[>,<]><]>": "previous or next reference of a variable",
    "<[><t>,<]><t>": "previous or next TODO",
    "<'>{modifier}":
      "put cursor in position given by <modifier> (see popup help screen)",
    "</>{search}": "search forward (n and N for next or previous result)",
    "<{>,<}>": "move cursor one paragraph/code block up or down",
  },
  "window navigation": {
    "<leader><w><w>": "switch to other window (useful if overlay blocks view)",
    "<ctrl>+<h>,<ctrl>+<l>":
      "left or right window (e.g. from file explorer to active tab)",
    "<shift>+<h>,<shift>+<l>,<[><b>,<]><b>": "left or right tab",
    "<leader><b><d>,<leader><b><D>": "close or force close current tab",
    "<^>": "start of line after whitespace",
    "<leader><b><o>": "close other tabs",
  },
  "flit & leap": {
    "<f>{char}{label},<F>{char}{label}":
      "find {char} and jump to {label} forwards or backwards",
  },
  telescope: {
    "<leader><f><f>": "find files",
    "<leader><s><w>": "search for word",
    "<leader><s><s>": "search for symbol",
  },
  editing: {
    "<:><w>": "write file / save",
    "<d>,<d><d>": "delete with modifier, delete whole line",
    "<A>": "append at end of line (useful for adding semicolons or commas)",
    "<J>": "join current and next line",
    "<o>,<O>": "insert new line below or above current line",
    "<.>": "redo last operation",
    "<leader><c><r>": "smart rename",
    "<g><~>": "toggle case with modifier",
    "<g><z><r><n>{current}{new}":
      "replace next {current} surround with {new} one (cursor has to be placed before first surround)",
    "<u>,<ctrl>+<r>": "undo or redo last changes in normal mode",
  },
  macros: {
    "<q>{register}{sequence}<q>":
      "record macro with {sequence} into {register}",
    "<@>{register},<@><@>": "replay macro in {register} or repeat last",
  },
  "copy & paste": {
    "<d>,<d><d>": "delete and copy with modifier or whole line",
    "<c>,<c><c>":
      "delete and copy with modifier or whole line and enter insert mode",
    "<y>,<y><y>": "copy with modifier or whole line",
    "<p>,<P>": "paste on new line below or above",
  },
  "insert mode": {
    "<alt>+<k>,<alt>+<j>": "move line up and down",
    "<ctrl>+<a>": "insert previously inserted text",
    "<ctrl>+<u>": "delete everything left of cursor",
    "<ctrl>+<w>": "delete word left of cursor",
  },
  "visual mode": {
    "<v>": "start visual mode without selection",
    "<ctrl>+<space>": "start visual mode with smart selection",
    "<backspace>":
      "exit visual mode (cursor returns to beginning of selection)",
    "<esc>": "exit visual mode (cursor stays at current position)",
    "<v><a>{modifier}":
      "select everything between <modifier> including the {modifier} (valid modifiers: \",',`,b,B,<,[,w,s,p,t)",
    "<v><i>{modifier}":
      "select everything between <modifier> without the {modifier} (valid modifiers: \",',`,b,B,<,[,w,s,p,t)",
  },
  "nvim & lazyvim": {
    "<:><q>,<:><q><a>":
      "close current or all files :width: ,(if last or all files are closed nvim exits)",
    "<leader><l>": "open lazy package manager",
    "<leader><c><m>": "open mason language manager",
    "<leader><e>": "open file explorer",
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
  <section>
    <h2>{section}</h2>
    <div class="list">{getKeys(keys)}</div>
  </section>
);

const Key = (key, description) => (
  <div class="row">
    <div class="keys">{formatKey(key)}</div>
    <div class="description">{description}</div>
  </div>
);

const formatKey = (key) => {
  const regex = /<(.+?)>|([^<]+)/g;
  const match = [...key.matchAll(regex)];

  return match.reduce((acc, [matched, keyMatch, textMatch]) => {
    if (keyMatch) {
      acc.push(<span class="key">{keyMatch}</span>);
    } else if (textMatch) {
      acc.push(<span class="text">{textMatch}</span>);
    }
    return acc;
  }, []);
};

const BodyContent = () => <div id="main">{getSections(shortcuts)}</div>;

Page.Create("en");
Page.AppendHead(<title>Nvim Cheatsheet</title>);
Page.AppendHead(<link rel="stylesheet" href="./css/normalize.css" />);
Page.AppendHead(<link rel="stylesheet" href="./css/style.css" />);
Page.AppendBody(<BodyContent />);
Page.Render();
