import { color, Flex, space, Spacer } from "@artsy/palette"
import { StaticBackButton } from "lib/Components/Bidding/Components/BackButton"
import React, { useCallback, useMemo, useState } from "react"
import {
  Dimensions,
  FlatList,
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from "react-native"
import ImageZoom from "react-native-image-pan-zoom"
import ImageViewer from "react-native-image-zoom-viewer"
import { Spring } from "react-spring/dist/native.cjs.js"

interface ImageProps {
  imageURL: string
  aspectRatio: number
  width: number
  height: number
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
const windowHeight = Dimensions.get("window").height
const cardHeight = windowWidth >= 375 ? 340 : 290
const cardBoundingBox = { width: windowWidth, height: cardHeight }
const windowBoundingBox = { width: windowWidth, height: windowHeight }

function getMeasurements({
  item,
  boundingBox,
}: {
  item: ImageProps
  boundingBox: {
    width: number
    height: number
  }
}) {
  // aspect ratio = width / height
  // width = aspect ratio * height
  // height = width / aspect ratio
  let height = boundingBox.height
  let width = item.aspectRatio * boundingBox.height
  if (width > boundingBox.width) {
    width = boundingBox.width
    height = boundingBox.width / item.aspectRatio
  }

  const horizontalMargin = (boundingBox.width - width) / 2
  const verticalMargin = (boundingBox.height - height) / 2

  return {
    width,
    height,
    marginLeft: horizontalMargin,
    marginRight: horizontalMargin,
    marginTop: verticalMargin,
    marginBottom: verticalMargin,
  }
}

const lastPanTimestamp = 0

export function FullScreenCarousel({
  sources,
  onDismiss,
  imageIndex,
  onScroll,
}: CarouselProps & { imageIndex: number; onDismiss(): void; onScroll(): void }) {
  const images = useMemo(() => sources.map(({ imageURL }) => ({ url: imageURL })), [sources])
  const [zoomViewIsAtHorizontalBoundary, setZoomViewIsAtHorizontalBoundary] = useState(true)

  console.log({ zoomViewIsAtHorizontalBoundary })
  return (
    <Modal>
      {/*
      <ImageViewer
        index={imageIndex}
        imageUrls={images}
        backgroundColor="white"
        onSwipeDown={onDismiss}
        enableSwipeDown
      />
      */}
      <FlatList<ImageProps>
        data={sources}
        horizontal
        scrollEnabled={zoomViewIsAtHorizontalBoundary}
        showsHorizontalScrollIndicator={false}
        snapToInterval={windowWidth}
        decelerationRate="fast"
        keyExtractor={item => item.imageURL}
        onScroll={onScroll}
        renderItem={({ item, index }) => {
          const { width, height } = getMeasurements({
            item,
            boundingBox: windowBoundingBox,
          })
          return (
            <ScrollView bounces={false} overScrollMode="never" minimumZoomScale={1} maximumZoomScale={2} centerContent>
              <Image
                style={{
                  width,
                  height,
                }}
                source={{ uri: item.imageURL }}
              />
            </ScrollView>
          )
          // return (
          //     <ImageZoom
          //       cropWidth={Dimensions.get("window").width}
          //       cropHeight={Dimensions.get("window").height}
          //       imageWidth={width}
          //       imageHeight={height}
          //       setAtHorizontalBoundary={blah => {
          //         if (!blah && Date.now() - lastPanTimestamp < 500) {
          //           setZoomViewIsAtHorizontalBoundary(blah)
          //         } else if (blah) {
          //           setZoomViewIsAtHorizontalBoundary(blah)
          //         }
          //         lastPanTimestamp = Date.now()
          //       }}
          //     >
          //       <Image
          //         style={{
          //           width,
          //           height,
          //         }}
          //         source={{ uri: item.imageURL }}
          //       />
          //     </ImageZoom>
          // )
        }}
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
        const sizes = getMeasurements({ item, boundingBox: cardBoundingBox })
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
          let styles = getMeasurements({ item, boundingBox: cardBoundingBox })
          if (index > 0) {
            const prevStyles = getMeasurements({ item: sources[index - 1], boundingBox: cardBoundingBox })
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
      <Spring
        from={{
          diameter: selected ? 0 : diameter,
        }}
        to={{
          diameter: selected ? diameter : 0,
        }}
        config={{ tension: 180, friction: 12 }}
      >
        {props => (
          <>
            <Dot diameter={10 - diameter} backgroundColor={color("black10")} />
            <Dot diameter={props.diameter * 1.2} backgroundColor="black" />
          </>
        )}
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
