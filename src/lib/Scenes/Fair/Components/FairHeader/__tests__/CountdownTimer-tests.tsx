import { render } from "enzyme"
import { mockTimezone } from "lib/tests/mockTimezone"
import React from "react"
import { CountdownTimer } from "../CountdownTimer"

const dateString = m => new Date(m).toISOString()

describe("CountdownTimer", () => {
  beforeEach(() => {
    mockTimezone("America/Los_Angeles")
    jest.useFakeTimers()
    Date.now = () => 1525983752000 // Thursday, May 10, 2018 8:22:32.000 PM UTC in milliseconds
  })

  it("renders upcoming properly", () => {
    const comp = render(<CountdownTimer startAt="2018-05-10T20:22:42+00:00" endAt="2018-05-14T10:24:31+00:00" />)
    expect(comp.text()).toContain("Opens May 10 at 4pm")
  })

  it("renders current properly", () => {
    const comp = render(<CountdownTimer startAt="2018-04-14T20:00:00+00:00" endAt="2018-05-14T20:00:00+00:00" />)
    expect(comp.text()).toContain("Closes May 14 at 4pm")
  })

  it("renders closed properly", () => {
    const comp = render(
      <CountdownTimer startAt={dateString(Date.now() - 2000)} endAt={dateString(Date.now() - 1000)} />
    )
    expect(comp.text()).toContain("")
  })
})
