/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
import { ArtworkGridItem_artwork$ref } from "./ArtworkGridItem_artwork.graphql";
declare const _SaleArtworksGrid_sale$ref: unique symbol;
export type SaleArtworksGrid_sale$ref = typeof _SaleArtworksGrid_sale$ref;
export type SaleArtworksGrid_sale = {
    readonly __id: string;
    readonly saleArtworks: ({
        readonly pageInfo: {
            readonly hasNextPage: boolean;
            readonly startCursor: string | null;
            readonly endCursor: string | null;
        };
        readonly edges: ReadonlyArray<({
            readonly node: ({
                readonly artwork: ({
                    readonly id: string;
                    readonly __id: string;
                    readonly image: ({
                        readonly aspect_ratio: number;
                    }) | null;
                    readonly " $fragmentRefs": ArtworkGridItem_artwork$ref;
                }) | null;
            }) | null;
        }) | null> | null;
    }) | null;
    readonly " $refType": SaleArtworksGrid_sale$ref;
};



const node: ConcreteFragment = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Fragment",
  "name": "SaleArtworksGrid_sale",
  "type": "Sale",
  "metadata": {
    "connection": [
      {
        "count": "count",
        "cursor": "cursor",
        "direction": "forward",
        "path": [
          "saleArtworks"
        ]
      }
    ]
  },
  "argumentDefinitions": [
    {
      "kind": "LocalArgument",
      "name": "count",
      "type": "Int",
      "defaultValue": 10
    },
    {
      "kind": "LocalArgument",
      "name": "cursor",
      "type": "String",
      "defaultValue": null
    }
  ],
  "selections": [
    v0,
    {
      "kind": "LinkedField",
      "alias": "saleArtworks",
      "name": "__SaleArtworksGrid_saleArtworks_connection",
      "storageKey": null,
      "args": null,
      "concreteType": "SaleArtworkConnection",
      "plural": false,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "pageInfo",
          "storageKey": null,
          "args": null,
          "concreteType": "PageInfo",
          "plural": false,
          "selections": [
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "hasNextPage",
              "args": null,
              "storageKey": null
            },
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "startCursor",
              "args": null,
              "storageKey": null
            },
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "endCursor",
              "args": null,
              "storageKey": null
            }
          ]
        },
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "edges",
          "storageKey": null,
          "args": null,
          "concreteType": "SaleArtworkEdge",
          "plural": true,
          "selections": [
            {
              "kind": "LinkedField",
              "alias": null,
              "name": "node",
              "storageKey": null,
              "args": null,
              "concreteType": "SaleArtwork",
              "plural": false,
              "selections": [
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "name": "artwork",
                  "storageKey": null,
                  "args": null,
                  "concreteType": "Artwork",
                  "plural": false,
                  "selections": [
                    {
                      "kind": "ScalarField",
                      "alias": null,
                      "name": "id",
                      "args": null,
                      "storageKey": null
                    },
                    v0,
                    {
                      "kind": "LinkedField",
                      "alias": null,
                      "name": "image",
                      "storageKey": null,
                      "args": null,
                      "concreteType": "Image",
                      "plural": false,
                      "selections": [
                        {
                          "kind": "ScalarField",
                          "alias": null,
                          "name": "aspect_ratio",
                          "args": null,
                          "storageKey": null
                        }
                      ]
                    },
                    {
                      "kind": "FragmentSpread",
                      "name": "ArtworkGridItem_artwork",
                      "args": null
                    }
                  ]
                },
                v0,
                {
                  "kind": "ScalarField",
                  "alias": null,
                  "name": "__typename",
                  "args": null,
                  "storageKey": null
                }
              ]
            },
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "cursor",
              "args": null,
              "storageKey": null
            }
          ]
        }
      ]
    }
  ]
};
})();
(node as any).hash = 'e4c7ac4ae1b49ecfe147fb750d338019';
export default node;
