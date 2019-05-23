import React from "react"
import { TouchableWithoutFeedback, ViewProperties } from "react-native"
import NavigatorIOS from "react-native-navigator-ios"
import { Image } from "../Elements/Image"
import { theme } from "../Elements/Theme"

interface ContainerWithBackButtonProps extends ViewProperties {
  navigator: NavigatorIOS
}

interface StaticBackButtonProps extends ViewProperties {
  top?: number
  onBack(): void
}

export const StaticBackButton: React.FC<StaticBackButtonProps> = ({ onBack, ...viewProps }) => (
  <TouchableWithoutFeedback onPress={onBack}>
    <Image
      position="absolute"
      top={theme.space[3]}
      left={theme.space[3]}
      source={require("../../../../../images/angle-left.png")}
      style={{ zIndex: 10 }} // Here the style prop is intentionally used to avoid making zIndex too handy.
      {...viewProps}
    />
  </TouchableWithoutFeedback>
)

export class BackButton extends React.Component<ContainerWithBackButtonProps> {
  goBack = () => {
    this.props.navigator.pop()
  }

  render() {
    return <StaticBackButton onBack={this.goBack} {...this.props} />
  }
}
