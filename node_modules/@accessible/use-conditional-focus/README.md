<hr>
<div align="center">
  <h1 align="center">
    useConditionalFocus()
  </h1>
</div>

<p align="center">
  <a href="https://bundlephobia.com/result?p=@accessible/use-conditional-focus">
    <img alt="Bundlephobia" src="https://img.shields.io/bundlephobia/minzip/@accessible/use-conditional-focus?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="Code coverage report" href="https://codecov.io/gh/accessible-ui/use-conditional-focus">
    <img alt="Code coverage" src="https://img.shields.io/codecov/c/gh/accessible-ui/use-conditional-focus?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="Build status" href="https://travis-ci.org/accessible-ui/use-conditional-focus">
    <img alt="Build status" src="https://img.shields.io/travis/accessible-ui/use-conditional-focus?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="NPM version" href="https://www.npmjs.com/package/@accessible/use-conditional-focus">
    <img alt="NPM Version" src="https://img.shields.io/npm/v/@accessible/use-conditional-focus?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="License" href="https://jaredlunde.mit-license.org/">
    <img alt="MIT License" src="https://img.shields.io/npm/l/@accessible/use-conditional-focus?style=for-the-badge&labelColor=24292e">
  </a>
</p>

<pre align="center">npm i @accessible/use-conditional-focus</pre>
<hr>

A React hook that will focus elements conditionally. By default this will focus on the first focusable
child of the provided root element, but you can optionally include the root as well.

## Quick Start

```jsx harmony
import * as React from 'react'
import useConditionalFocus from '@accessible/use-conditional-focus'

const Component = () => {
  const ref = React.useRef(null)
  const [visible, setVisible] = React.useState(false)
  // Focuses the first focusable child in the `ref` element when
  // visible is `true`
  useConditionalFocus(ref, visible)

  return (
    <div>
      <div ref={ref}>
        // This button will be focused when `visible` is true
        <button onClick={() => setVisible(false)}>Close me</button>
      </div>
      <button onClick={() => setVisible(true)}>Click me</button>
    </div>
  )
}
```

## API

### useConditionalFocus(target, shouldFocus, options?)

#### Arguments

| Prop        | Type                                                                                     | Default                                      | Required? | Description                                                                    |
| ----------- | ---------------------------------------------------------------------------------------- | -------------------------------------------- | --------- | ------------------------------------------------------------------------------ |
| target      | <code>React.RefObject&lt;T&gt; &#124; T &#124; Window &#124; Document &#124; null</code> |                                              | Yes       | A React ref, element, `window`, or `document`                                  |
| shouldFocus | `boolean`                                                                                | `false`                                      | Yes       | Provide a `true` value here to focus the first focusable child in the element. |
| options     | [`UseConditionalFocusOptions`](#useconditonalfocusoptions)                               | `{includeRoot: false, preventScroll: false}` | No        | See [`UseConditionalFocusOptions`](#useconditonalfocusoptions).                |

#### `UseConditonalFocusOptions`

| Prop          | Type      | Default | Required? | Description                                                                                                          |
| ------------- | --------- | ------- | --------- | -------------------------------------------------------------------------------------------------------------------- |
| includeRoot   | `boolean` | `false` | No        | When `true` this will try to focus on the root element in addition to its children.                                  |
| preventScroll | `boolean` | `false` | No        | When `true` this will prevent your browser from scrolling the document to bring the newly-focused element into view. |

#### Returns `void`

## LICENSE

MIT
