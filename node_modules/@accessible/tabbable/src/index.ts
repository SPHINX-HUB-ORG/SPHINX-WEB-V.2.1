// Credit:
// https://github.com/davidtheclark/tabbable
const candidateSelector =
  'input,select,textarea,a[href],button,[tabindex],' +
  'audio[controls],video[controls],' +
  '[contenteditable]:not([contenteditable="false"])'

export interface Tabbables {
  documentOrder: number
  tabIndex: number
  node: HTMLElement | HTMLInputElement
}

const matches: Element['matches'] =
  typeof Element === 'undefined'
    ? () => false
    : Element.prototype.matches ||
      // @ts-ignore
      Element.prototype.msMatchesSelector ||
      Element.prototype.webkitMatchesSelector

const tabbable = (el: HTMLElement, includeRootNode = false): HTMLElement[] => {
  const regularTabbables: HTMLElement[] = []
  const orderedTabbables: Tabbables[] = []

  let candidates: HTMLElement[] | NodeListOf<HTMLElement> = el.querySelectorAll(
    candidateSelector
  )

  if (includeRootNode && matches.call(el, candidateSelector)) {
    candidates = Array.prototype.slice.apply(candidates) as HTMLElement[]
    candidates.unshift(el)
  }

  let i, candidate, candidateTabindex
  for (i = 0; i < candidates.length; i++) {
    candidate = candidates[i]
    if (!isNodeMatchingSelectorTabbable(candidate)) continue
    candidateTabindex = getTabindex(candidate)

    if (candidateTabindex === 0) {
      regularTabbables.push(candidate)
    } else {
      orderedTabbables.push({
        documentOrder: i,
        tabIndex: candidateTabindex,
        node: candidate,
      })
    }
  }

  return orderedTabbables
    .sort(sortOrderedTabbables)
    .map((a) => a.node)
    .concat(regularTabbables)
}

const isNodeMatchingSelectorTabbable = (node: HTMLElement) =>
  !(
    !isNodeMatchingSelectorFocusable(node) ||
    (node.tagName === 'INPUT' &&
      (node as HTMLInputElement).type === 'radio' &&
      !isTabbableRadio(node as HTMLInputElement)) ||
    getTabindex(node) < 0
  )

const isNodeMatchingSelectorFocusable = (node: HTMLElement) =>
  !(
    (node as HTMLInputElement).disabled ||
    (isInput(node) && (node as HTMLInputElement).type === 'hidden') ||
    // offsetParent being null will allow detecting cases where an element
    // is invisible or inside an invisible element,  as long as the element
    // does not use position: fixed. For them, their visibility has to be
    // checked directly as well.
    node.offsetParent === null ||
    getComputedStyle(node).visibility === 'hidden'
  )

const getTabindex = (node: HTMLElement) => {
  const tabindexAttr = parseInt(node.getAttribute('tabindex') || '', 10)
  if (!isNaN(tabindexAttr)) return tabindexAttr
  // Browsers do not return `tabIndex` correctly for contentEditable nodes;
  // so if they don't have a tabindex attribute specifically set, assume it's 0.
  if (node.contentEditable === 'true') return 0
  return node.tabIndex
}

// @ts-ignore
const sortOrderedTabbables = (a: Tabbables, b: Tabbables) =>
  a.tabIndex === b.tabIndex
    ? a.documentOrder - b.documentOrder
    : a.tabIndex - b.tabIndex

const isInput = (node: HTMLElement) => node.tagName === 'INPUT'

const isTabbableRadio = (node: HTMLInputElement) => {
  if (!node.name) return true
  // This won't account for the edge case where you have radio groups with the
  // same in separate forms on the same page.
  if (node.ownerDocument) {
    const radioSet = node.ownerDocument.querySelectorAll(
      'input[type="radio"][name="' + node.name + '"]'
    )

    for (let i = 0; i < radioSet.length; i++)
      if ((radioSet[i] as HTMLInputElement).checked) return radioSet[i] === node

    return true
  }

  return false
}

export default tabbable
