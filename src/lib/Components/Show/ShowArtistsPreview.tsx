import { Serif, Spacer } from "@artsy/palette"
import { ShowArtistsPreview_show } from "__generated__/ShowArtistsPreview_show.graphql"
import { ArtistListItemContainer as ArtistListItem } from "lib/Components/ArtistListItem"
import { CaretButton } from "lib/Components/Buttons/CaretButton"
import Switchboard from "lib/NativeModules/SwitchBoard"
import { Schema, Track, track as _track } from "lib/utils/track"
import { get, take } from "lodash"
import React from "react"
import { TouchableOpacity } from "react-native"
import { createFragmentContainer, graphql } from "react-relay"

interface Props {
  show: ShowArtistsPreview_show
  onViewAllArtistsPressed: () => void
  Component: any
}

const track: Track<Props> = _track

@track()
export class ShowArtistsPreview extends React.Component<Props> {
  @track((_props, _state, args) => {
    const [, id, _id] = args
    return {
      action_name: Schema.ActionNames.ListArtist,
      action_type: Schema.ActionTypes.Tap,
      owner_id: _id,
      owner_slug: id,
      owner_type: Schema.OwnerEntityTypes.Artist,
    } as any
  })
  handlePress(url: string, _slug: string, _id: string) {
    Switchboard.presentNavigationViewController(this.props.Component || this, url)
  }

  render() {
    const { show, onViewAllArtistsPressed, Component } = this.props
    const artistsShown = 5
    const artists = get(show, "artists", []).concat(get(show, "artists_without_artworks", []))
    const items: ShowArtistsPreview_show["artists"] = take(artists, artistsShown)

    return (
      <>
        <Serif size="5">Artists</Serif>
        <Spacer m={1} />
        {items.map((artist, idx, arr) => {
          const { href, id, _id } = artist
          return (
            <React.Fragment key={id}>
              <TouchableOpacity onPress={() => this.handlePress(href, id, _id)}>
                <ArtistListItem artist={artist} Component={Component} />
              </TouchableOpacity>
              {idx < arr.length - 1 && <Spacer m={1} />}
            </React.Fragment>
          )
        })}
        {artists.length > artistsShown && (
          <>
            <Spacer m={1} />
            <CaretButton text={`View all ${artists.length} artists`} onPress={() => onViewAllArtistsPressed()} />
          </>
        )}
      </>
    )
  }
}

export const ShowArtistsPreviewContainer = createFragmentContainer(ShowArtistsPreview, {
  show: graphql`
    fragment ShowArtistsPreview_show on Show {
      _id
      id

      # Comes from CMS
      artists {
        _id
        id
        href
        ...ArtistListItem_artist
      }

      # Comes from stubbed data
      artists_without_artworks {
        _id
        id
        href
        ...ArtistListItem_artist
      }
    }
  `,
})
