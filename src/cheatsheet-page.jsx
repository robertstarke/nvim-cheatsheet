import { Page } from "@nakedjsx/core/page";

const shortcuts = {
  navigation: {
    "h, j, k, l": "arrow keys (left, down, up, right)",
    "0, $": "start or end of line",
    "^": "start of line after whitespace",
    "b, w": "previous or next word",
    "ge, e": "previous or next end of word",
    "gg, G": "start or end of document",
    gd: "definition of element under cursor",
    gr: "refernces of the element under cursor",
    ":{number}": "goto line {number}",
    "%": "next matching ()[]{}",
    "<C-O>, <C-I>": "previous or next document location",
    gf: "file under cursor",
    "[f, ]f, [F, ]F": "previous or next function start and end",
    "[[, ]]": "previous or next reference of a variable",
    "[t, ]t": "previous or next TODO",
    "'{modifier}":
      "put cursor in position given by <modifier> (see popup help screen)",
    "/{search}":
      "search forward (use n and N to go to next or previous result)",
  },
  "window navigation": {
    "<leader>ww":
      "switch to other window (useful if lazy, mason etc block view)",
    "<C-h>, <C-l>":
      "left or right window (useful for switching between file explorer and open file)",
    "<S-h>, <S-l>": "left or right tab",
    "[b, ]b": "left or right tab",
    "<leader>bd, <leader>bD": "close or force close current tab",
    "^": "start of line after whitespace",
    "^": "start of line after whitespace",
    "<leader>bo": "close other tabs",
  },
  "flit & leap": {
    "f{char}{label}": "jump to occurence with corresponding label",
    "s{char}{char}{label}":
      "jump to occurence of {char}s with corresponding {label}",
  },
  telescope: {
    "<leader>ff": "find files",
    "<leader>sw": "search for word",
    "<leader>ss": "search for symbol",
  },
  editing: {
    ":w": "write file / save",
    "d, dd": "delete with modifier, delete whole line",
    A: "append at end of line (useful for adding semicolons or commas)",
    ".": "redo last operation",
    "<leader>cr": "smart rename",
    "g~": "toggle case with modifier",
    "gzrn{current}{new}":
      "replace next {current} surround with {new} one (cursor has to be placed before first surrond)",
  },
  "copy & paste": {
    "y, yy": "copy with modifier or copy whole line",
    "p, P": "paste on new line below or above",
  },
  "insert mode": {
    "<A-k>, <A-j>": "move line up and down",
    "<C-a>": "insert previously inserted text",
    "<C-u>": "delete everything left of cursor",
    "<C-w>": "delete word left of cursor",
  },
  "visual mode": {
    v: "start visual mode without selection",
    "<C-space>": "start visual mode with smart selection",
    "<backspace>":
      "exit visual mode (cursor returns to beginning of selection)",
    "<esc>": "exit visual mode (cursor stays at current position)",
    "va<modifier>":
      "select everything between <modifier> including the <modifier> (valid modifiers: \",',`,b,B,<,[,w,s,p,t)",
    "vi<modifier>":
      "select everything between <modifier> without the <modifier> (valid modifiers: \",',`,b,B,<,[,w,s,p,t)",
  },
  nvim: {
    ":q, :qa":
      "close current or all files (if last or all files are closed nvim exits)",
    "<leader>l": "open lazy package manager",
    "<leader>cm": "open mason language manager",
    "<leader>e": "open file explorer",
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
