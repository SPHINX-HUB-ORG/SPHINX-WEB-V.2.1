import * as React from 'react'
import {render, fireEvent, screen} from '@testing-library/react'
import useKey from './index'

describe('useKey()', () => {
  it('should call function when keycode matches', () => {
    const mock = jest.fn()

    const Component = () => {
      const ref = React.useRef(null)
      useKey(ref, {Escape: mock})
      return <button data-testid='btn' ref={ref} />
    }

    render(<Component />)
    fireEvent.keyDown(screen.getByTestId('btn'), {key: 'Escape'})
    expect(mock).toBeCalled()
  })

  it('should not call function when keycode does not match', () => {
    const mock = jest.fn()

    const Component = () => {
      const ref = React.useRef(null)
      useKey(ref, {Escape: mock})
      return <button data-testid='btn' ref={ref} />
    }

    render(<Component />)
    fireEvent.keyDown(screen.getByTestId('btn'), {key: 'Enter'})
    expect(mock).not.toBeCalled()
  })

  it('should listen to window events', () => {
    const mock = jest.fn()

    const Component = () => {
      useKey(window, {Escape: mock})
      return <button />
    }

    render(<Component />)
    fireEvent.keyDown(window, {key: 'Escape'})
    expect(mock).toBeCalled()
  })

  it('should listen to document events', () => {
    const mock = jest.fn()

    const Component = () => {
      useKey(document, {Escape: mock})
      return <button />
    }

    render(<Component />)
    fireEvent.keyDown(document, {key: 'Escape'})
    expect(mock).toBeCalled()
  })

  it('should listen to body events', () => {
    const mock = jest.fn()

    const Component = () => {
      useKey(document.body, {Escape: mock})
      return <button />
    }

    render(<Component />)
    fireEvent.keyDown(document.body, {key: 'Escape'})
    expect(mock).toBeCalled()
  })
})
