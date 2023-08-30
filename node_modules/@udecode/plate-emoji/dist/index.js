'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var plateCommon = require('@udecode/plate-common');
var react = require('react');
var emojiMartData = require('@emoji-mart/data');
var plateCombobox = require('@udecode/plate-combobox');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var emojiMartData__default = /*#__PURE__*/_interopDefaultLegacy(emojiMartData);

const EmojiCategory = {
  Activity: 'activity',
  Custom: 'custom',
  Flags: 'flags',
  Foods: 'foods',
  Frequent: 'frequent',
  Nature: 'nature',
  Objects: 'objects',
  People: 'people',
  Places: 'places',
  Symbols: 'symbols'
};

const KEY_EMOJI = 'emoji';
const EMOJI_TRIGGER = ':';
const EMOJI_MAX_SEARCH_RESULT = 60;
const emojiTriggeringControllerOptions = {
  trigger: EMOJI_TRIGGER,
  limitTriggeringChars: 2
};
const defaultCategories = [EmojiCategory.People, EmojiCategory.Nature, EmojiCategory.Foods, EmojiCategory.Activity, EmojiCategory.Places, EmojiCategory.Objects, EmojiCategory.Symbols, EmojiCategory.Flags];
const EmojiSettings = {
  buttonSize: {
    value: 36
  },
  perLine: {
    value: 8
  },
  showFrequent: {
    value: true,
    limit: 16
  },
  categories: {
    value: undefined
  }
};
const DEFAULT_FREQUENTLY_USED_EMOJI = {
  '+1': 1,
  grinning: 1,
  kissing_heart: 1,
  heart_eyes: 1,
  pray: 1,
  laughing: 1,
  clap: 1,
  joy: 1,
  scream: 1,
  rocket: 1,
  see_no_evil: 1,
  hugging_face: 1,
  heart: 1
};
const NUM_OF_CATEGORIES = Object.values(EmojiCategory).length;
const i18n = {
  search: 'Search all emoji',
  clear: 'Clear',
  searchNoResultsTitle: 'Oh no!',
  searchNoResultsSubtitle: 'That emoji couldn’t be found',
  pick: 'Pick an emoji...',
  searchResult: 'Search Results',
  categories: {
    activity: 'Activity',
    custom: 'Custom',
    flags: 'Flags',
    foods: 'Food & Drink',
    frequent: 'Frequently used',
    nature: 'Animals & Nature',
    objects: 'Objects',
    people: 'Smileys & People',
    places: 'Travel & Places',
    symbols: 'Symbols'
  },
  skins: {
    choose: 'Choose default skin tone',
    '1': 'Default',
    '2': 'Light',
    '3': 'Medium-Light',
    '4': 'Medium',
    '5': 'Medium-Dark',
    '6': 'Dark'
  }
};

const setVisibleSections = (entries, visibleSections) => {
  for (const entry of entries) {
    const id = entry.target.dataset.id;
    visibleSections.set(id, entry.isIntersecting);
  }
};

const getSectionInFocus = visibleSections => {
  for (const [id, ratio] of visibleSections) {
    if (ratio) {
      return id;
    }
  }
};

const observeCategories = ({
  ancestorRef,
  emojiLibrary,
  setFocusedAndVisibleSections
}) => {
  const observerOptions = {
    root: ancestorRef.current,
    threshold: 0
  };
  const visibleSections = new Map();
  const observer = new IntersectionObserver(entries => {
    setVisibleSections(entries, visibleSections);
    const focusedSectionId = getSectionInFocus(visibleSections);
    focusedSectionId && setFocusedAndVisibleSections(visibleSections, focusedSectionId);
  }, observerOptions);

  for (const section of emojiLibrary.getGrid().sections()) {
    if (section.root.current) observer.observe(section.root.current);
  }

  return observer;
};

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

class EmojiTriggeringController {
  constructor(options = emojiTriggeringControllerOptions) {
    this.options = options;

    _defineProperty(this, "_isTriggering", false);

    _defineProperty(this, "_hasTriggeringMark", false);

    _defineProperty(this, "text", '');

    _defineProperty(this, "pos", void 0);
  }

  get isTriggering() {
    return this._isTriggering;
  }

  setIsTriggering(isTriggering) {
    this._isTriggering = isTriggering;
    return this;
  }

  get hasTriggeringMark() {
    return this._hasTriggeringMark;
  }

  hasEnclosingTriggeringMark() {
    return this.endsWithEnclosingMark(this.text);
  }

  setText(text) {
    this._hasTriggeringMark = this.startsWithTriggeringMark(text);
    this.setIsTriggering(this._hasTriggeringMark && text.length > this.options.limitTriggeringChars);
    this.text = this.isTriggering ? text : '';
    return this;
  }

  startsWithTriggeringMark(text) {
    return new RegExp(`^${this.options.trigger}`).test(text);
  }

  endsWithEnclosingMark(text) {
    return new RegExp(`${this.options.trigger}$`).test(text);
  }

  getText() {
    return this.text.replace(/(^:)|(:$)/g, '');
  }

  getTextSize() {
    return this.text.length;
  }

  reset() {
    this.text = '';
    this.setIsTriggering(false);
    this._hasTriggeringMark = false;
    return this;
  }

}

class Grid {
  constructor() {
    _defineProperty(this, "rowsCount", 1);

    _defineProperty(this, "sectionsIds", []);

    _defineProperty(this, "grid", new Map());
  }

  addSection(sectionId, section, elements) {
    section.setIndexRowStart(this.rowsCount).addElements(elements[sectionId]);
    this.rowsCount += section.rowsNum;
    this.grid.set(sectionId, section);
    this.sectionsIds.push(sectionId);
    return this;
  }

  get size() {
    return this.grid.size;
  }

  indexOf(sectionId) {
    return this.sectionsIds.indexOf(sectionId);
  }

  sections() {
    return Array.from(this.grid.values());
  }

  section(sectionId) {
    return this.grid.get(sectionId);
  }

  updateSection(sectionId, elements) {
    if (this.grid.has(sectionId)) {
      const section = this.grid.get(sectionId);
      section.updateElements(elements);
    }

    return this;
  }

}

class AGridSection {
  constructor(_id, perLine = 8) {
    this._id = _id;
    this.perLine = perLine;

    _defineProperty(this, "rows", []);

    _defineProperty(this, "_root", void 0);

    _defineProperty(this, "_rowsNum", 0);

    _defineProperty(this, "_indexRowStart", 0);

    this.createRootRef();
  }

  setIndexRowStart(start) {
    this._indexRowStart = start;
    return this;
  }

  addElements(elements) {
    this._rowsNum = Math.ceil(elements.length / this.perLine);
    this.initRows(elements);
    return this;
  }

  updateElements(elements) {
    this.rows = [];
    this.addElements(elements);
    return this;
  }

  initRows(elements) {
    let i = 0;

    while (i < this.rowsNum) {
      this.addRow(elements, i++);
    }
  }

  addRow(elements, lastPosition) {
    const start = lastPosition * this.perLine;
    const end = start + this.perLine;
    this.rows.push({
      elements: elements.slice(start, end),
      id: this._indexRowStart + lastPosition
    });
  }

  get rowsNum() {
    return this._rowsNum;
  }

  get id() {
    return this._id;
  }

  get root() {
    return this._root;
  }

  getRows() {
    return this.rows;
  }

}

class EmojiFloatingGrid extends Grid {
  createRootRef() {
    return /*#__PURE__*/react.createRef();
  }

}
class EmojiGridSectionWithRoot extends AGridSection {
  createRootRef() {
    this._root = /*#__PURE__*/react.createRef();
  }

}

class EmojiFloatingGridBuilder {
  constructor(localStorage, sections, elements, settings) {
    this.localStorage = localStorage;
    this.sections = sections;
    this.elements = elements;
    this.settings = settings;

    _defineProperty(this, "grid", new EmojiFloatingGrid());
  }

  addFrequent() {
    if (this.settings.showFrequent.value) {
      const id = 'frequent';
      this.grid.addSection(id, new EmojiGridSectionWithRoot(id, this.settings.perLine.value), {
        [id]: this.localStorage.getList()
      });
    }
  }

  build() {
    this.addFrequent();
    this.sections.forEach(id => {
      this.grid.addSection(id, new EmojiGridSectionWithRoot(id, this.settings.perLine.value), this.elements);
    });
    return this.grid;
  }

}

class EmojiInlineLibrary {
  constructor(library = emojiMartData__default["default"]) {
    _defineProperty(this, "_hash", {});

    _defineProperty(this, "_keys", []);

    _defineProperty(this, "_emojis", void 0);

    this._emojis = library.emojis;
    this.init();
  }

  init() {
    Object.values(this._emojis).forEach(emoji => {
      const searchableString = this.createSearchableString(emoji);

      this._keys.push(searchableString);

      this._hash[searchableString] = emoji.id;
    });
  }

  createSearchableString(emoji) {
    const {
      id,
      name,
      keywords
    } = emoji;
    return `${id},${this.getName(name)},${keywords.join(',')}`;
  }

  getName(name) {
    return name.toLowerCase().split(' ').join(',');
  }

  get keys() {
    return this._keys;
  }

  getEmoji(id) {
    return this._emojis[id];
  }

  getEmojiId(key) {
    return this._hash[key];
  }

}

class EmojiFloatingLibrary extends EmojiInlineLibrary {
  constructor(settings, localStorage, library = emojiMartData__default["default"]) {
    var _settings$categories$;

    super(library);
    this.settings = settings;
    this.localStorage = localStorage;
    this.library = library;

    _defineProperty(this, "categories", defaultCategories);

    _defineProperty(this, "emojis", {});

    _defineProperty(this, "grid", void 0);

    this.categories = (_settings$categories$ = settings.categories.value) !== null && _settings$categories$ !== void 0 ? _settings$categories$ : this.categories;
    this.initEmojis(library.categories);
    this.grid = new EmojiFloatingGridBuilder(this.localStorage, this.categories, this.emojis, settings).build();
  }

  static getInstance(settings, localStorage, library = emojiMartData__default["default"]) {
    if (!EmojiFloatingLibrary.instance) {
      EmojiFloatingLibrary.instance = new EmojiFloatingLibrary(settings, localStorage, library);
    }

    return EmojiFloatingLibrary.instance;
  }

  initEmojis(categoriesLibrary) {
    for (const category of categoriesLibrary) {
      this.emojis[category.id] = category.emojis;
    }
  }

  updateFrequentCategory(emojiId) {
    this.localStorage.update(emojiId);
    this.grid.updateSection(EmojiCategory.Frequent, this.localStorage.getList());
  }

  getGrid() {
    return this.grid;
  }

  indexOf(focusedCategory) {
    const index = this.grid.indexOf(focusedCategory);
    return index < 1 ? 0 : index;
  }

}

_defineProperty(EmojiFloatingLibrary, "instance", void 0);

const initialState = {
  isOpen: false,
  searchValue: '',
  emoji: undefined,
  hasFound: false,
  isSearching: false,
  searchResult: [],
  focusedCategory: undefined,
  visibleCategories: new Map(),
  frequentEmoji: undefined
};
const EmojiPickerState = () => {
  const [cache, dispatch] = react.useReducer((state, action) => {
    const {
      type,
      payload
    } = action;

    switch (type) {
      case 'CLEAR_SEARCH':
        return { ...state,
          searchValue: '',
          isSearching: false,
          hasFound: false,
          focusedCategory: EmojiCategory.Frequent
        };

      case 'UPDATE_SEARCH_RESULT':
        return { ...state,
          ...payload,
          isSearching: true,
          focusedCategory: undefined
        };

      case 'SET_FOCUSED_CATEGORY':
        return { ...state,
          ...payload,
          searchValue: '',
          isSearching: false,
          hasFound: false
        };

      case 'SET_OPEN':
        return { ...state,
          isOpen: true
        };

      case 'SET_CLOSE':
        return { ...state,
          emoji: undefined,
          isOpen: false
        };

      case 'UPDATE_FREQUENT_EMOJIS':
        return { ...state,
          ...payload,
          emoji: undefined
        };

      case 'SET_SEARCH':
      case 'SET_EMOJI':
      case 'SET_FOCUSED_AND_VISIBLE_CATEGORIES':
        return { ...state,
          ...payload
        };

      default:
        {
          throw new Error(`Unhandled action type: ${type}`);
        }
    }
  }, initialState);
  return [cache, dispatch];
};

const getEmojiOnInsert = ({
  key = KEY_EMOJI
} = {}) => (editor, item) => {
  const {
    options: {
      createEmoji
    }
  } = plateCommon.getPlugin(editor, key);
  plateCommon.withoutNormalizing(editor, () => {
    plateCommon.focusEditor(editor);
    const value = createEmoji(item);
    plateCommon.insertText(editor, value);
  });
};

const useEmojiPicker = ({
  editor,
  emojiLibrary,
  indexSearch,
  closeOnSelect
}) => {
  const [state, dispatch] = EmojiPickerState();
  const refs = react.useRef({
    contentRoot: /*#__PURE__*/react.createRef(),
    content: /*#__PURE__*/react.createRef()
  });
  const onToggle = react.useCallback(() => {
    dispatch({
      type: state.isOpen ? 'SET_CLOSE' : 'SET_OPEN'
    });
  }, [dispatch, state.isOpen]);
  const setFocusedAndVisibleSections = react.useCallback((visibleSections, categoryId) => {
    dispatch({
      type: 'SET_FOCUSED_AND_VISIBLE_CATEGORIES',
      payload: {
        focusedCategory: categoryId,
        visibleCategories: visibleSections
      }
    });
  }, [dispatch]);
  const handleSearchInput = react.useCallback(input => {
    const value = String(input).replace(/\s/g, '');

    if (!value && !input) {
      dispatch({
        type: 'CLEAR_SEARCH'
      });
      return;
    }

    const hasFound = indexSearch.search(value).hasFound();
    dispatch({
      type: 'UPDATE_SEARCH_RESULT',
      payload: {
        searchValue: value,
        hasFound,
        searchResult: indexSearch.get()
      }
    });
  }, [dispatch, indexSearch]);
  const setSearch = react.useCallback(value => {
    value ? handleSearchInput(value) : dispatch({
      type: 'CLEAR_SEARCH'
    });
  }, [dispatch, handleSearchInput]);
  const clearSearch = react.useCallback(() => {
    dispatch({
      type: 'CLEAR_SEARCH'
    });
  }, [dispatch]);
  const onMouseOver = react.useCallback(emoji => {
    dispatch({
      type: 'SET_EMOJI',
      payload: {
        emoji
      }
    });
  }, [dispatch]);
  const updateFrequentEmojis = react.useCallback(emojiId => {
    emojiLibrary.updateFrequentCategory(emojiId);
    dispatch({
      type: 'UPDATE_FREQUENT_EMOJIS',
      payload: {
        frequentEmoji: emojiId,
        isOpen: closeOnSelect ? false : state.isOpen
      }
    });
  }, [closeOnSelect, dispatch, emojiLibrary, state.isOpen]);
  const onSelectEmoji = react.useCallback(emoji => {
    const selectItem = getEmojiOnInsert();
    selectItem(editor, {
      key: emoji.id,
      text: emoji.name,
      data: {
        id: emoji.id,
        emoji: emoji.skins[0].native,
        name: emoji.name,
        text: emoji.name
      }
    });
    updateFrequentEmojis(emoji.id);
  }, [editor, updateFrequentEmojis]);
  const handleCategoryClick = react.useCallback(categoryId => {
    dispatch({
      type: 'SET_FOCUSED_CATEGORY',
      payload: {
        focusedCategory: categoryId
      }
    });

    const getSectionPositionToScrollIntoView = () => {
      var _refs$current$content, _refs$current$content2, _refs$current$content3, _refs$current$content4, _section$root$current, _section$root$current2;

      const trashHold = 1;
      const section = emojiLibrary.getGrid().section(categoryId);
      const contentRootScrollTop = (_refs$current$content = (_refs$current$content2 = refs.current.contentRoot.current) === null || _refs$current$content2 === void 0 ? void 0 : _refs$current$content2.scrollTop) !== null && _refs$current$content !== void 0 ? _refs$current$content : 0;
      const contentRootTopPosition = (_refs$current$content3 = (_refs$current$content4 = refs.current.contentRoot.current) === null || _refs$current$content4 === void 0 ? void 0 : _refs$current$content4.getBoundingClientRect().top) !== null && _refs$current$content3 !== void 0 ? _refs$current$content3 : 0;
      const sectionTopPosition = (_section$root$current = section === null || section === void 0 ? void 0 : (_section$root$current2 = section.root.current) === null || _section$root$current2 === void 0 ? void 0 : _section$root$current2.getBoundingClientRect().top) !== null && _section$root$current !== void 0 ? _section$root$current : 0;
      return trashHold + contentRootScrollTop + sectionTopPosition - contentRootTopPosition;
    };

    if (refs.current.contentRoot.current) {
      refs.current.contentRoot.current.scrollTop = getSectionPositionToScrollIntoView();
    }
  }, [dispatch, emojiLibrary]);
  react.useEffect(() => {
    if (state.isOpen && !state.isSearching) {
      observeCategories({
        ancestorRef: refs.current.contentRoot,
        emojiLibrary,
        setFocusedAndVisibleSections
      });
    }
  }, [emojiLibrary, state.isOpen, state.isSearching, setFocusedAndVisibleSections]);
  return {
    onToggle,
    i18n,
    setSearch,
    clearSearch,
    emoji: state.emoji,
    onMouseOver,
    onSelectEmoji,
    emojiLibrary,
    handleCategoryClick,
    refs,
    ...state
  };
};

class AIndexSearch {
  constructor(library) {
    this.library = library;

    _defineProperty(this, "result", []);

    _defineProperty(this, "scores", {});

    _defineProperty(this, "maxResult", EMOJI_MAX_SEARCH_RESULT);

    _defineProperty(this, "input", void 0);
  }

  search(input) {
    this.input = input.toLowerCase();
    const value = this.input;

    if (value) {
      this.createSearchResult(value);
      this.sortResultByScores(this.result, this.scores);
    } else {
      this.scores = {};
      this.result = [];
    }

    return this;
  }

  createSearchResult(value) {
    this.scores = {};
    this.result = [];

    for (const key of this.library.keys) {
      const score = key.indexOf(`${value}`);
      if (score === -1) continue;
      const emojiId = this.library.getEmojiId(key);
      this.result.push(emojiId);
      this.scores[emojiId] || (this.scores[emojiId] = 0);
      this.scores[emojiId] += emojiId === value ? 0 : score + 1;
    }
  }

  sortResultByScores(result, scores) {
    result.sort((a, b) => {
      const aScore = scores[a];
      const bScore = scores[b];

      if (aScore === bScore) {
        return a.localeCompare(b);
      }

      return aScore - bScore;
    });
  }

  hasFound(exact = false) {
    if (exact && this.input) {
      return this.result.indexOf(this.input) !== -1;
    }

    return this.result.length > 0;
  }

  get() {
    const emojis = [];

    for (const key of this.result) {
      var _this$library;

      const emoji = (_this$library = this.library) === null || _this$library === void 0 ? void 0 : _this$library.getEmoji(key);
      emojis.push(this.transform(emoji));
      if (emojis.length >= this.maxResult) break;
    }

    return emojis;
  }

  getEmoji() {
    return this.get()[0];
  }

}

class EmojiFloatingIndexSearch extends AIndexSearch {
  constructor(library) {
    super(library);
    this.library = library;
  }

  static getInstance(library) {
    if (!EmojiFloatingIndexSearch.instance) {
      EmojiFloatingIndexSearch.instance = new EmojiFloatingIndexSearch(library);
    }

    return EmojiFloatingIndexSearch.instance;
  }

  transform(emoji) {
    return emoji;
  }

}

_defineProperty(EmojiFloatingIndexSearch, "instance", void 0);

class EmojiInlineIndexSearch extends AIndexSearch {
  constructor(library) {
    super(library);
    this.library = library;
  }

  static getInstance() {
    if (!EmojiInlineIndexSearch.instance) {
      EmojiInlineIndexSearch.instance = new EmojiInlineIndexSearch(new EmojiInlineLibrary());
    }

    return EmojiInlineIndexSearch.instance;
  }

  transform(emoji) {
    const {
      id,
      name,
      skins
    } = emoji;
    return {
      key: id,
      text: name,
      data: {
        id,
        emoji: skins[0].native,
        name,
        text: name
      }
    };
  }

}

_defineProperty(EmojiInlineIndexSearch, "instance", void 0);

const getEmojiOnSelectItem = ({
  key = KEY_EMOJI
} = {}) => (editor, item) => {
  const {
    options: {
      createEmoji,
      emojiTriggeringController
    }
  } = plateCommon.getPlugin(editor, key);
  plateCommon.withoutNormalizing(editor, () => {
    plateCommon.withoutMergingHistory(editor, () => plateCommon.deleteText(editor, {
      distance: emojiTriggeringController.setIsTriggering(false).getTextSize(),
      reverse: true
    }));
    const value = createEmoji(item);
    plateCommon.insertText(editor, value);
  });
  return plateCombobox.comboboxActions.reset();
};

const isSpaceBreak = char => !!char && /\s/.test(char);

const getPreviousChar = (editor, point) => point ? plateCommon.getEditorString(editor, plateCommon.getRange(editor, point, plateCommon.getPointBefore(editor, point))) : undefined;

const getPreviousPoint = (editor, point) => point ? plateCommon.getPointBefore(editor, point) : undefined;

const isBeginningOfTheLine = (editor, point) => {
  const previousPoint = getPreviousPoint(editor, point);
  return (point === null || point === void 0 ? void 0 : point.path[0]) !== (previousPoint === null || previousPoint === void 0 ? void 0 : previousPoint.path[0]);
};

const getFindTriggeringInput = (editor, emojiTriggeringController) => ({
  char = '',
  action = 'insert'
} = {
  char: '',
  action: 'insert'
}) => {
  const {
    selection
  } = editor;

  if (!selection || !plateCommon.isCollapsed(selection) || isSpaceBreak(char)) {
    emojiTriggeringController.setIsTriggering(false);
    return;
  }

  const startPoint = selection.anchor;
  let currentPoint = startPoint;
  let previousPoint;
  let foundText = char;
  let previousChar;

  do {
    previousChar = getPreviousChar(editor, currentPoint);
    foundText = previousChar + foundText;
    previousPoint = getPreviousPoint(editor, currentPoint);

    if (isBeginningOfTheLine(editor, currentPoint)) {
      break;
    }

    currentPoint = previousPoint;
  } while (!isSpaceBreak(previousChar));

  foundText = foundText.trim();
  if (action === 'delete') foundText = foundText.slice(0, -1);
  emojiTriggeringController.setText(foundText);
};

const withEmoji = (editor, {
  options: {
    id,
    emojiTriggeringController
  }
}) => {
  const emojiInlineIndexSearch = EmojiInlineIndexSearch.getInstance();
  const findTheTriggeringInput = getFindTriggeringInput(editor, emojiTriggeringController);
  const {
    apply,
    insertText,
    deleteBackward,
    deleteForward
  } = editor;

  editor.insertText = char => {
    const {
      selection
    } = editor;

    if (!plateCommon.isCollapsed(selection)) {
      return insertText(char);
    }

    findTheTriggeringInput({
      char
    });
    return insertText(char);
  };

  editor.deleteBackward = unit => {
    findTheTriggeringInput({
      action: 'delete'
    });
    return deleteBackward(unit);
  };

  editor.deleteForward = unit => {
    findTheTriggeringInput();
    return deleteForward(unit);
  };

  editor.apply = operation => {
    apply(operation);

    if (!(emojiTriggeringController !== null && emojiTriggeringController !== void 0 && emojiTriggeringController.hasTriggeringMark)) {
      return;
    }

    const searchText = emojiTriggeringController.getText();

    switch (operation.type) {
      case 'set_selection':
        emojiTriggeringController.reset();
        plateCombobox.comboboxActions.reset();
        break;

      case 'insert_text':
        if (emojiTriggeringController.hasEnclosingTriggeringMark() && emojiInlineIndexSearch.search(searchText).hasFound(true)) {
          const item = emojiInlineIndexSearch.getEmoji();
          item && getEmojiOnSelectItem()(editor, item);
          break;
        }

        if (!emojiTriggeringController.hasEnclosingTriggeringMark() && emojiTriggeringController.isTriggering && emojiInlineIndexSearch.search(searchText).hasFound()) {
          plateCombobox.comboboxActions.items(emojiInlineIndexSearch.search(searchText).get());
          plateCombobox.comboboxActions.open({
            activeId: id,
            text: '',
            targetRange: editor.selection
          });
          break;
        }

        emojiTriggeringController.reset();
        plateCombobox.comboboxActions.reset();
        break;

      case 'remove_text':
        if (emojiTriggeringController.isTriggering && emojiInlineIndexSearch.search(searchText).hasFound()) {
          plateCombobox.comboboxActions.items(emojiInlineIndexSearch.search(searchText).get());
          plateCombobox.comboboxActions.open({
            activeId: id,
            text: '',
            targetRange: editor.selection
          });
          break;
        }

        emojiTriggeringController.reset();
        plateCombobox.comboboxActions.reset();
        break;
    }
  };

  return editor;
};

const createEmojiPlugin = plateCommon.createPluginFactory({
  key: KEY_EMOJI,
  withOverrides: withEmoji,
  options: {
    trigger: EMOJI_TRIGGER,
    createEmoji: item => item.data.emoji,
    emojiTriggeringController: new EmojiTriggeringController()
  },
  then: (_, {
    key,
    options: {
      trigger,
      createEmoji,
      emojiTriggeringController
    }
  }) => ({
    options: {
      id: key,
      trigger,
      createEmoji,
      emojiTriggeringController
    }
  })
});

class LocalStorage {
  constructor(key, defaultValue) {
    this.key = key;
    this.defaultValue = defaultValue;
  }

  set(value) {
    window.localStorage.setItem(this.key, JSON.stringify(value));
  }

  get() {
    let value = this.defaultValue;
    const valueInLocalStorage = window.localStorage.getItem(this.key);

    if (valueInLocalStorage) {
      try {
        value = JSON.parse(valueInLocalStorage);
      } catch (error) {
        window.localStorage.removeItem(this.key);
      }
    }

    return value;
  }

}

class FrequentEmojiStorage {
  constructor(props, defaultValue = DEFAULT_FREQUENTLY_USED_EMOJI) {
    var _props$limit, _props$prefix, _props$key;

    this.defaultValue = defaultValue;

    _defineProperty(this, "limit", 8);

    _defineProperty(this, "prefix", 'emoji');

    _defineProperty(this, "key", EmojiCategory.Frequent);

    _defineProperty(this, "localStorage", void 0);

    this.limit = (_props$limit = props.limit) !== null && _props$limit !== void 0 ? _props$limit : this.limit;
    const key = `${(_props$prefix = props.prefix) !== null && _props$prefix !== void 0 ? _props$prefix : this.prefix}:${(_props$key = props.key) !== null && _props$key !== void 0 ? _props$key : this.key}`;
    this.localStorage = new LocalStorage(key, defaultValue);
  }

  update(emojiId) {
    const prevEmojis = this.localStorage.get();
    const count = prevEmojis[emojiId] ? prevEmojis[emojiId] + 1 : 1;
    const emojis = { ...prevEmojis,
      [emojiId]: count
    };
    this.localStorage.set(emojis);
    return emojis;
  }

  get() {
    const data = this.localStorage.get();
    return Object.keys(data).sort((a, b) => data[b] - data[a]).reduce((_sortedObj, key) => ({ ..._sortedObj,
      [key]: data[key]
    }), {});
  }

  getList() {
    return Object.keys(this.get()).splice(0, this.limit);
  }

  set(value) {
    this.localStorage.set(value);
  }

}

exports.AGridSection = AGridSection;
exports.AIndexSearch = AIndexSearch;
exports.DEFAULT_FREQUENTLY_USED_EMOJI = DEFAULT_FREQUENTLY_USED_EMOJI;
exports.EMOJI_MAX_SEARCH_RESULT = EMOJI_MAX_SEARCH_RESULT;
exports.EMOJI_TRIGGER = EMOJI_TRIGGER;
exports.EmojiCategory = EmojiCategory;
exports.EmojiFloatingGrid = EmojiFloatingGrid;
exports.EmojiFloatingGridBuilder = EmojiFloatingGridBuilder;
exports.EmojiFloatingIndexSearch = EmojiFloatingIndexSearch;
exports.EmojiFloatingLibrary = EmojiFloatingLibrary;
exports.EmojiGridSectionWithRoot = EmojiGridSectionWithRoot;
exports.EmojiInlineIndexSearch = EmojiInlineIndexSearch;
exports.EmojiInlineLibrary = EmojiInlineLibrary;
exports.EmojiPickerState = EmojiPickerState;
exports.EmojiSettings = EmojiSettings;
exports.EmojiTriggeringController = EmojiTriggeringController;
exports.FrequentEmojiStorage = FrequentEmojiStorage;
exports.Grid = Grid;
exports.KEY_EMOJI = KEY_EMOJI;
exports.LocalStorage = LocalStorage;
exports.NUM_OF_CATEGORIES = NUM_OF_CATEGORIES;
exports.createEmojiPlugin = createEmojiPlugin;
exports.defaultCategories = defaultCategories;
exports.emojiTriggeringControllerOptions = emojiTriggeringControllerOptions;
exports.getEmojiOnInsert = getEmojiOnInsert;
exports.getEmojiOnSelectItem = getEmojiOnSelectItem;
exports.getFindTriggeringInput = getFindTriggeringInput;
exports.i18n = i18n;
exports.observeCategories = observeCategories;
exports.useEmojiPicker = useEmojiPicker;
exports.withEmoji = withEmoji;
//# sourceMappingURL=index.js.map
