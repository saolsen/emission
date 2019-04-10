import React from "react"
import { ActivityIndicator } from "react-native"
import * as renderer from "react-test-renderer"
import Text from "../TextInput"

it("shows an activity indicator when searching ", () => {
  const component = renderer.create(<Text text={{ value: "My mocked" }} searching={true} />).toJSON()
  expect(component).toMatchSnapshot()
})

it("does not have an activity when not searching ", () => {
  const component = renderer.create(<Text text={{ value: "My mocked" }} searching={false} />)
  expect(component.root.findAllByType(ActivityIndicator)).toHaveLength(0)
})

it("calls onFocus", () => {
  const mockOnFocus = jest.fn()
  const component = renderer.create(<Text text={{ value: "My mocked", onFocus: mockOnFocus }} searching={false} />)
  component.root.findByProps({ autoCorrect: false }).instance.props.onFocus()
  expect(mockOnFocus).toHaveBeenCalled()
})

it("does not call onFocus if not set", () => {
  const component = renderer.create(<Text text={{ value: "My mocked", onFocus: null }} searching={false} />)
  expect(() => component.root.findByProps({ autoCorrect: false }).instance.props.onFocus()).not.toThrow()
})

it("calls onBlur", () => {
  const mockOnBlur = jest.fn()
  const component = renderer.create(<Text text={{ value: "My mocked", onBlur: mockOnBlur }} searching={false} />)
  component.root.findByProps({ autoCorrect: false }).instance.props.onBlur()
  expect(mockOnBlur).toHaveBeenCalled()
})

it("does not call onBlur if not set", () => {
  const component = renderer.create(<Text text={{ value: "My mocked", onBlur: null }} searching={false} />)
  expect(() => component.root.findByProps({ autoCorrect: false }).instance.props.onBlur()).not.toThrow()
})
