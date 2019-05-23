import { color, Flex, space, Spacer } from "@artsy/palette"
import { StaticBackButton } from "lib/Components/Bidding/Components/BackButton"
import React, { useCallback, useMemo, useState } from "react"
import { Dimensions, FlatList, Image, Modal, SafeAreaView, TouchableWithoutFeedback, View } from "react-native"
import ImageViewer from "react-native-image-zoom-viewer"
import { Spring } from "react-spring/dist/native.cjs.js"

interface ImageProps {
  imageURL: string
  aspectRatio: number
}
interface Measurements {
  width: number
  height: number
  marginLeft: number
  marginRight: number
  marginTop: number
  marginBottom: number
  cumulativeOffset: number
}
interface CarouselProps {
  sources: ImageProps[]
}

const windowWidth = Dimensions.get("window").width
const cardHeight = windowWidth >= 375 ? 340 : 290

function getMeasurements(item: ImageProps) {
  // aspect ratio = width / height
  // width = aspect ratio * height
  // height = width / aspect ratio
  let height = cardHeight
  let width = item.aspectRatio * cardHeight
  if (width > windowWidth) {
    width = windowWidth
    height = windowWidth / item.aspectRatio
  }

  const horizontalMargin = (windowWidth - width) / 2
  const verticalMargin = (cardHeight - height) / 2

  return {
    width,
    height,
    marginLeft: horizontalMargin,
    marginRight: horizontalMargin,
    marginTop: verticalMargin,
    marginBottom: verticalMargin,
  }
}

export function FullScreenCarousel({
  sources,
  onDismiss,
  imageIndex,
}: CarouselProps & { imageIndex: number; onDismiss(): void }) {
  const images = useMemo(() => sources.map(({ imageURL }) => ({ url: imageURL })), [sources])

  return (
    <Modal>
      <ImageViewer
        index={imageIndex}
        imageUrls={images}
        backgroundColor="white"
        onSwipeDown={onDismiss}
        enableSwipeDown
      />
      <StaticBackButton onBack={onDismiss} top={space(3) + space(6)} />
    </Modal>
  )
}

export const Carousel: React.FC<CarouselProps> = ({ sources }) => {
  const measurements = useMemo(
    () => {
      const result: Measurements[] = []
      for (const item of sources) {
        const sizes = getMeasurements(item)
        if (result.length === 0) {
          result.push({ ...sizes, cumulativeOffset: 0 })
        } else {
          const prev = result[result.length - 1]
          const marginLeft = Math.max(sizes.marginLeft - prev.marginRight, 0)
          result.push({
            ...sizes,
            cumulativeOffset: prev.cumulativeOffset + windowWidth - (sizes.marginRight - marginLeft),
            marginLeft,
          })
        }
      }
      return result
    },
    [sources]
  )

  const offsets = useMemo(() => measurements.map(({ cumulativeOffset }) => cumulativeOffset), [measurements])
  const [fullScreen, setFullScreen] = useState(false)
  const [imageIndex, setImageIndex] = useState(0)

  const onScroll = useCallback(
    e => {
      const newPageNum = Math.round(e.nativeEvent.contentOffset.x / windowWidth)
      setImageIndex(newPageNum)
    },
    [setImageIndex]
  )
  return (
    <View>
      <FlatList<ImageProps>
        data={sources}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToOffsets={offsets}
        decelerationRate="fast"
        keyExtractor={item => item.imageURL}
        onScroll={onScroll}
        renderItem={({ item, index }) => {
          let styles = getMeasurements(item)
          if (index > 0) {
            const prevStyles = getMeasurements(sources[index - 1])
            styles = { ...styles, marginLeft: Math.max(styles.marginLeft - prevStyles.marginLeft, 0) }
          }
          return (
            <TouchableWithoutFeedback onPress={() => setFullScreen(true)}>
              <Image
                source={{ uri: item.imageURL }}
                style={{
                  ...styles,
                }}
              />
            </TouchableWithoutFeedback>
          )
        }}
      />
      {fullScreen && (
        <FullScreenCarousel imageIndex={imageIndex} sources={sources} onDismiss={() => setFullScreen(false)} />
      )}
      <Spacer mb={space(2)} />
      <Flex flexDirection="row" justifyContent="center">
        {sources.map((_, index) => (
          <PaginationDot key={index} diameter={5} selected={index === imageIndex} />
        ))}
      </Flex>
    </View>
  )
}

const PaginationDot: React.FC<{ diameter: number; selected: boolean }> = ({ diameter, selected }) => {
  return (
    <View
      style={{
        width: diameter,
        height: diameter,
        marginHorizontal: diameter * 0.8,
      }}
    >
      <Dot diameter={diameter} backgroundColor={color("black10")} />
      <Spring
        from={{
          diameter: selected ? 0 : diameter,
        }}
        to={{
          diameter: selected ? diameter : 0,
        }}
      >
        {props => <Dot diameter={props.diameter} backgroundColor="black" />}
      </Spring>
    </View>
  )
}

const Dot: React.FC<{ diameter: number; backgroundColor: string }> = ({ diameter, backgroundColor }) => (
  <View
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <View
      style={{
        borderRadius: diameter / 2,
        width: diameter,
        height: diameter,
        backgroundColor,
      }}
    />
  </View>
)
