import { Flex } from "@artsy/palette"
import { Artwork_artwork } from "__generated__/Artwork_artwork.graphql"
import { ArtworkQuery } from "__generated__/ArtworkQuery.graphql"
import Separator from "lib/Components/Separator"
import { defaultEnvironment } from "lib/relay/createEnvironment"
import renderWithLoadProgress from "lib/utils/renderWithLoadProgress"
import React from "react"
import { ScrollView, View } from "react-native"
import { createFragmentContainer, graphql, QueryRenderer } from "react-relay"
import { ArtworkActionsFragmentContainer as ArtworkActions } from "./Components/ArtworkActions"
import { ArtworkAvailabilityFragmentContainer as ArtworkAvailability } from "./Components/ArtworkAvailability"
import { Carousel } from "./Components/Carousel"
import { SellerInfoFragmentContainer as SellerInfo } from "./Components/SellerInfo"

interface Props {
  artwork: Artwork_artwork
}

const images = [
  { imageURL: "https://d32dm0rphc51dk.cloudfront.net/aLHd1-5iDe3eTcSb04QwtA/larger.jpg", aspectRatio: 0.67 },
  { imageURL: "https://d32dm0rphc51dk.cloudfront.net/GZAyAwIBNitUUogXsAoaBw/larger.jpg", aspectRatio: 1.5 },
  { imageURL: "https://d32dm0rphc51dk.cloudfront.net/GkBR99xMC__SWyi4j5kJdw/larger.jpg", aspectRatio: 1.5 },
  { imageURL: "https://d32dm0rphc51dk.cloudfront.net/zDbgyKt6x3yGoUHFkO--Aw/larger.jpg", aspectRatio: 1.5 },
  { imageURL: "https://d32dm0rphc51dk.cloudfront.net/Eejy0FSVyqJ8NlSe8j8j6Q/larger.jpg", aspectRatio: 1.5 },
  { imageURL: "https://d32dm0rphc51dk.cloudfront.net/66Lg4kZ4tjMD5nGfPOFUyA/larger.jpg", aspectRatio: 1.5 },
  { imageURL: "https://d32dm0rphc51dk.cloudfront.net/WcGcGFg5y4pnqZAacbDu3w/larger.jpg", aspectRatio: 1.5 },
  { imageURL: "https://d32dm0rphc51dk.cloudfront.net/6Oq63DESPbMW4W4mM3b01g/larger.jpg", aspectRatio: 1.5 },
  { imageURL: "https://d32dm0rphc51dk.cloudfront.net/cyb8k0si34ih-Qf_X5m7JA/larger.jpg", aspectRatio: 1.5 },
  { imageURL: "https://d32dm0rphc51dk.cloudfront.net/PGB4v5DaCME2JjlVJclZ8g/larger.jpg", aspectRatio: 1.5 },
]

export class Artwork extends React.Component<Props> {
  render() {
    console.log("Them props", this.props)
    return (
      <ScrollView>
        <Carousel sources={images} />
        <Flex alignItems="center" mt={2}>
          <ArtworkActions artwork={this.props.artwork} />
        </Flex>
        <Separator />
        <Flex width="100%">
          <ArtworkAvailability artwork={this.props.artwork} />
          <SellerInfo artwork={this.props.artwork} />
        </Flex>
      </ScrollView>
    )
  }
}

export const ArtworkContainer = createFragmentContainer(Artwork, {
  artwork: graphql`
    fragment Artwork_artwork on Artwork {
      ...ArtworkActions_artwork
      ...ArtworkAvailability_artwork
      ...SellerInfo_artwork
    }
  `,
})

export const ArtworkRenderer: React.SFC<{ artworkID: string }> = ({ artworkID }) => {
  return (
    <QueryRenderer<ArtworkQuery>
      environment={defaultEnvironment}
      query={graphql`
        query ArtworkQuery($artworkID: String!) {
          artwork(id: $artworkID) {
            ...Artwork_artwork
          }
        }
      `}
      variables={{ artworkID }}
      render={renderWithLoadProgress(ArtworkContainer)}
    />
  )
}
