<hr>
<div align="center">
  <h1 align="center">
    useKey()
  </h1>
</div>

<p align="center">
  <a href="https://bundlephobia.com/result?p=@accessible/use-key">
    <img alt="Bundlephobia" src="https://img.shields.io/bundlephobia/minzip/@accessible/use-key?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="Code coverage report" href="https://codecov.io/gh/accessible-ui/use-key">
    <img alt="Code coverage" src="https://img.shields.io/codecov/c/gh/accessible-ui/use-key?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="Build status" href="https://travis-ci.org/accessible-ui/use-key">
    <img alt="Build status" src="https://img.shields.io/travis/accessible-ui/use-key?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="NPM version" href="https://www.npmjs.com/package/@accessible/use-key">
    <img alt="NPM Version" src="https://img.shields.io/npm/v/@accessible/use-key?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="License" href="https://jaredlunde.mit-license.org/">
    <img alt="MIT License" src="https://img.shields.io/npm/l/@accessible/use-key?style=for-the-badge&labelColor=24292e">
  </a>
</p>

<pre align="center">npm i @accessible/use-key</pre>
<hr>

A React hook for handling `keydown` events on specific `event.key` values. It also
normalizes non-standard `event.key` values from IE to their modern equivalents.

## Quick Start

```jsx harmony
import * as React from 'react'
import useKey from '@accessible/use-key'

const Component = () => {
  const ref = React.useRef(null)

  // Listens to keydown events on the `ref` above
  useKey(ref, {
    // Logs event when the Escape key is pressed
    Escape: console.log,
    // Logs "Key was pressed: Enter" to the console when Enter is pressed
    Enter: (event) => console.log('Key was pressed:', event.key),
  })

  // Listens to keydown events on the window
  useKey(window, {
    // Logs event when the Escape key is pressed
    Escape: console.log,
    // Logs "Key was pressed: Enter" to the console when Enter is pressed
    Enter: (event) => console.log('Key was pressed:', event.key),
  })

  return <div ref={ref} />
}
```

## API

### useKey(target, handlers)

#### Arguments

| Argument | Type                                                                                     | Required? | Description                                                                                                                    |
| -------- | ---------------------------------------------------------------------------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------ |
| target   | <code>React.RefObject&lt;T&gt; &#124; T &#124; Window &#124; Document &#124; null</code> | Yes       | A React ref, element, `window`, or `document` to add the key listener to                                                       |
| handlers | `Record<string, (event?: KeyboardEvent) => any>`                                         | Yes       | A mapping with keys matching the `event.key` string you want to listen on. The value for each key should be an event listener. |

#### Returns `void`

## LICENSE

MIT
