<hr>
<div align="center">
  <h1 align="center">
    tabbable()
  </h1>
</div>

<p align="center">
  <a href="https://bundlephobia.com/result?p=@accessible/tabbable">
    <img alt="Bundlephobia" src="https://img.shields.io/bundlephobia/minzip/@accessible/tabbable?style=for-the-badge&labelColor=24292e">
  </a>
  <!--
  <a aria-label="Code coverage report" href="https://codecov.io/gh/accessible-ui/tabbable">
    <img alt="Code coverage" src="https://img.shields.io/codecov/c/gh/accessible-ui/tabbable?style=for-the-badge&labelColor=24292e">
  </a>
  -->
  <a aria-label="Build status" href="https://travis-ci.org/accessible-ui/tabbable">
    <img alt="Build status" src="https://img.shields.io/travis/accessible-ui/tabbable?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="NPM version" href="https://www.npmjs.com/package/@accessible/tabbable">
    <img alt="NPM Version" src="https://img.shields.io/npm/v/@accessible/tabbable?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="License" href="https://jaredlunde.mit-license.org/">
    <img alt="MIT License" src="https://img.shields.io/npm/l/@accessible/tabbable?style=for-the-badge&labelColor=24292e">
  </a>
</p>

<pre align="center">npm i @accessible/tabbable</pre>
<hr>

Returns an array of all\* tabbable DOM nodes within a containing node. (\* "all" has some necessary caveats, which you'll learn about by reading below.)

The following are considered tabbable:

- `<button>`
- `<input>`
- `<select>`
- `<textarea>`
- `<a>` with `href` or `xlink:href` attributes
- `<audio>` and `<videos>` with `controls` attributes
- `[contenteditable]` elements
- anything with a non-negative `tabindex`

Any of the above will _not_ be considered tabbable, though, if any of the following are also true about it:

- negative `tabindex`
- `disabled`
- either the node itself _or an ancestor of it_ is hidden via `display: none` or `visibility: hidden`
- it's an `<input type="radio">` and a different radio in its group is `checked`

**If you think a node should be included in your array of tabbables _but it's not_, all you need to do is add `tabindex="0"` to deliberately include it.** (Or if it is in your array but you don't want it, you can add `tabindex="-1"` to deliberately exclude it.) This will also result in more consistent cross-browser behavior. For information about why your special node might _not_ be included, see ["More details"](#more-details), below.

## API

### `tabbable(rootNode: HTMLElement, includeRootNode: boolean = false): HTMLElement[]`

Returns an array of ordered tabbable node within the `rootNode`.

Summary of ordering principles:

- First include any nodes with positive `tabindex` attributes (1 or higher), ordered by ascending `tabindex` and source order.
- Then include any nodes with a zero `tabindex` and any element that by default receives focus (listed above) and does not have a positive `tabindex` set, in source order.

## More details

- **Tabbable tries to identify elements that are reliably tabbable across (not dead) browsers.** Browsers are stupidly inconsistent in their behavior, though — especially for edge-case elements like `<object>` and `<iframe>` — so this means _some_ elements that you _can_ tab to in _some_ browsers will be left out of the results. (To learn more about that stupid inconsistency, see this [amazing table](https://allyjs.io/data-tables/focusable.html)). To provide better consistency across browsers and ensure the elements you _want_ in your tabbables list show up there, **try adding `tabindex="0"` to edge-case elements that Tabbable ignores**.
- (Exemplifying the above ^^:) **The tabbability of `<iframe>`, `<embed>`, `<object>`, `<summary>`, and `<svg>` is [inconsistent across browsers](https://allyjs.io/data-tables/focusable.html)**, so if you need an accurate read on one of these elements you should try giving it a `tabindex`. (You'll also need to pay attention to the `focusable` attribute on SVGs in IE & Edge.) But you also might _not_ be able to get an accurate read — so you should avoid relying on it.
- **Radio groups have some edge cases, which you can avoid by always having a `checked` one in each group** (and that is what you should usually do anyway). If there is no `checked` radio in the radio group, _all_ of the radios will be considered tabbable. (Some browsers do this, otherwise don't — there's not consistency.)
- Although Tabbable tries to deal with positive tabindexes, **you should not use positive tabindexes**. Accessibility experts seem to be in (rare) unanimous and clear consent about this: rely on the order of elements in the document.
- Safari on Mac OS X does not Tab to `<a>` elements by default: you have to change a setting to get the standard behavior. Tabbable does not know whether you've changed that setting or not, so it will include `<a>` elements in its list.

## Why fork?

The creator is looking for a new maintainer and `@accessibile` packages don't need some of the features
in the original, so I can make a smaller package with TypeScript types by forking :P

## Credit

This library is forked from [tabbable](https://github.com/davidtheclark/tabbable)

## LICENSE

MIT
