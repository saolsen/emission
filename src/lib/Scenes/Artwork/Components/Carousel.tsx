import { Flex } from "@artsy/palette"
import React, { useMemo, useRef } from "react"
import { Dimensions, FlatList, PanResponder, Text, View } from "react-native"

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

export function Carousel({ sources }: CarouselProps) {
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
  console.log({ offsets })
  return (
    <View>
      <FlatList<ImageProps>
        data={sources}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToOffsets={offsets}
        decelerationRate="fast"
        renderItem={({ item, index }) => {
          let styles = getMeasurements(item)
          if (index > 0) {
            const prevStyles = getMeasurements(sources[index - 1])
            styles = { ...styles, marginLeft: Math.max(styles.marginLeft - prevStyles.marginLeft, 0) }
          }
          return (
            <Flex
              alignItems="center"
              justifyContent="center"
              key={index}
              style={{
                ...styles,
                backgroundColor: index % 2 ? "palevioletred" : "blue",
              }}
            />
          )
        }}
      />
    </View>
  )
}
