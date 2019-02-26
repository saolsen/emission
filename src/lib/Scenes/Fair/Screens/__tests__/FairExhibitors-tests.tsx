import { MockRelayRenderer } from "lib/tests/MockRelayRenderer"
import { renderUntil } from "lib/tests/renderUntil"
import React from "react"
import { graphql } from "react-relay"
import { fairFixture } from "../../__fixtures__/fairExhibitors"
import { FairExhibitors } from "../FairExhibitors"

jest.unmock("react-relay")

it("renders properly", async () => {
  const tree = await renderUntil(
    wrapper => {
      return wrapper.find("FairExhibitors").length > 0
    },
    <MockRelayRenderer
      Component={FairExhibitors}
      query={graphql`
        query FairExhibitorsTestsQuery {
          fair(id: "art-basel-in-miami-beach-2018") {
            exhibitors_grouped_by_name {
              letter
              exhibitors {
                name
                id
                profile_id
              }
            }
          }
        }
      `}
      mockData={{
        fair: fairFixture,
      }}
    />
  )
  const htmlDom = tree.text()

  // Title
  expect(htmlDom).toContain("Exhibitors")

  // A "random" set of the exhibitors, we should show the letter
  // and all the exhibitors
  console.log(fairFixture.exhibitors_grouped_by_name)
  const exhibitors = fairFixture.exhibitors_grouped_by_name[1]
  expect(htmlDom).toContain(exhibitors.letter)

  // The fixtured data is too big for me to hand-edit all of the exhibitors
  // data into the shape we ask for
  const anyExhibitors = exhibitors.exhibitors as any[]

  // Because this uses flatlist you can't ask for all of the
  // exhibitors in the array
  expect(htmlDom).toContain(anyExhibitors[0].name)
  expect(htmlDom).toContain(anyExhibitors[1].name)
  expect(htmlDom).toContain(anyExhibitors[2].name)
})
