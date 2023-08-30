import * as React from 'react'
import {render, fireEvent, screen} from '@testing-library/react'
import useFocus from './index'

describe('useFocus()', () => {
  it('should focus when true', () => {
    const Component = ({focus}) => {
      const ref = React.useRef(null)
      useFocus(ref, focus)
      const [child, setChild] = React.useState<string | null>('unfocused')

      return (
        <div ref={ref} data-testid='container'>
          <button
            data-testid='btn'
            onFocus={() => setChild('focused')}
            children={child}
          />
        </div>
      )
    }

    const result = render(<Component focus={false} />)
    const containerInstance = screen.getByTestId('container')
    const btnInstance = screen.getByTestId('btn')
    // @ts-ignore
    Object.defineProperty(btnInstance, 'offsetParent', {
      value: containerInstance,
    })
    // @ts-ignore
    btnInstance.node = {
      type: 'button',
    }
    // @ts-ignore
    containerInstance.querySelectorAll = () => [btnInstance]
    expect(btnInstance).toHaveTextContent('unfocused')
    result.rerender(<Component focus={true} />)
    expect(screen.getByTestId('btn')).toHaveTextContent('focused')
  })

  it('should focus when true and transition has ended', () => {
    const Component = ({focus}) => {
      const ref = React.useRef(null)
      useFocus(ref, focus)
      const [child, setChild] = React.useState<string | null>('unfocused')

      return (
        <div ref={ref} data-testid='container'>
          <button
            data-testid='btn'
            onFocus={() => setChild('focused')}
            children={child}
          />
        </div>
      )
    }

    const result = render(<Component focus={false} />)
    const containerInstance = screen.getByTestId('container')
    const btnInstance = screen.getByTestId('btn')
    // @ts-ignore
    Object.defineProperty(btnInstance, 'offsetParent', {
      value: containerInstance,
    })
    // @ts-ignore
    btnInstance.node = {
      type: 'button',
    }
    // @ts-ignore
    containerInstance.querySelectorAll = () => [btnInstance]
    expect(btnInstance).toHaveTextContent('unfocused')
    result.rerender(<Component focus={true} />)
    fireEvent.transitionEnd(containerInstance)
    expect(screen.getByTestId('btn')).toHaveTextContent('focused')
  })

  it('should not focus when elements are not tabbable', () => {
    const Component = ({focus}) => {
      const ref = React.useRef(null)
      useFocus(ref, focus)
      const [child, setChild] = React.useState<string | null>('unfocused')

      return (
        <div ref={ref} data-testid='container'>
          <button
            data-testid='btn'
            onFocus={() => setChild('focused')}
            children={child}
          />
        </div>
      )
    }

    const result = render(<Component focus={false} />)
    const containerInstance = screen.getByTestId('container')
    const btnInstance = screen.getByTestId('btn')
    // @ts-ignore
    Object.defineProperty(btnInstance, 'offsetParent', {
      value: null,
    })
    // @ts-ignore
    btnInstance.node = {
      type: 'button',
    }
    // @ts-ignore
    containerInstance.querySelectorAll = () => [btnInstance]
    expect(btnInstance).toHaveTextContent('unfocused')
    result.rerender(<Component focus={true} />)
    expect(screen.getByTestId('btn')).toHaveTextContent('unfocused')
    fireEvent.transitionEnd(containerInstance)
    expect(screen.getByTestId('btn')).toHaveTextContent('unfocused')
  })
})
