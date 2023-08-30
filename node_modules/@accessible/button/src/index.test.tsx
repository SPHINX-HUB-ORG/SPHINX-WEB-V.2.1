/* eslint-disable jsx-a11y/click-events-have-key-events */
/* jest */
import * as React from 'react'
import {render, fireEvent, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {Button} from './index'

describe('<Button>', () => {
  it(`should fire click event once for buttons on click`, () => {
    const cb = jest.fn()
    render(
      <Button>
        <button onClick={cb} />
      </Button>
    )
    // mousedown
    fireEvent.click(screen.getByRole('button'))
    expect(cb).toBeCalledTimes(0)
    fireEvent.mouseDown(screen.getByRole('button'))
    fireEvent.click(screen.getByRole('button'))
    expect(cb).toBeCalledTimes(1)
    // touchstart
    fireEvent.click(screen.getByRole('button'))
    expect(cb).toBeCalledTimes(1) // should reset between clicks
    fireEvent.touchStart(screen.getByRole('button'))
    fireEvent.click(screen.getByRole('button'))
    expect(cb).toBeCalledTimes(2)
  })

  it(`should fire click event once for buttons on space`, () => {
    const cb = jest.fn()
    render(
      <Button>
        <button onClick={cb} />
      </Button>
    )

    fireEvent.keyDown(screen.getByRole('button'), {key: ' '})
    expect(cb).toBeCalledTimes(1)
  })

  it(`should fire click event once for buttons on enter`, () => {
    const cb = jest.fn()
    render(
      <Button>
        <button onClick={cb} />
      </Button>
    )

    fireEvent.keyDown(screen.getByRole('button'), {key: 'Enter'})
    expect(cb).toBeCalledTimes(1)
  })

  it(`should fire click event once for divs on click`, () => {
    const cb = jest.fn()
    render(
      <Button>
        <div onClick={cb} />
      </Button>
    )

    fireEvent.click(screen.getByRole('button'))
    expect(cb).toBeCalledTimes(0)
    userEvent.click(screen.getByRole('button'))
    expect(cb).toBeCalledTimes(1)
  })

  it(`should fire click event once for divs on space`, () => {
    const cb = jest.fn()
    render(
      <Button>
        <div onClick={cb} />
      </Button>
    )

    fireEvent.keyDown(screen.getByRole('button'), {key: ' '})
    expect(cb).toBeCalledTimes(1)
  })

  it(`should fire click event once for divs on enter`, () => {
    const cb = jest.fn()
    render(
      <Button>
        <div onClick={cb} />
      </Button>
    )

    fireEvent.keyDown(screen.getByRole('button'), {key: 'Enter'})
    expect(cb).toBeCalledTimes(1)
  })

  it(`should add accessible roles`, () => {
    expect(
      render(
        <Button>
          <div />
        </Button>
      ).asFragment()
    ).toMatchSnapshot('role=button, tabIndex=0')
  })

  it(`should allow roles to be overridden`, () => {
    expect(
      render(
        <Button>
          <div role='menu' tabIndex={-1} />
        </Button>
      ).asFragment()
    ).toMatchSnapshot('role=menu, tabIndex=-1')
  })
})
