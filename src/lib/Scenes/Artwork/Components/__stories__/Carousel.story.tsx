import { storiesOf } from "@storybook/react-native"
import React from "react"

import { Carousel } from "../Carousel"
const images = [
  { imageURL: "https://d32dm0rphc51dk.cloudfront.net/GZAyAwIBNitUUogXsAoaBw/larger.jpg", aspectRatio: 1.5 },
  { imageURL: "https://d32dm0rphc51dk.cloudfront.net/GkBR99xMC__SWyi4j5kJdw/larger.jpg", aspectRatio: 1.1 },
  { imageURL: "https://d32dm0rphc51dk.cloudfront.net/zDbgyKt6x3yGoUHFkO--Aw/larger.jpg", aspectRatio: 0.9 },
  { imageURL: "https://d32dm0rphc51dk.cloudfront.net/Eejy0FSVyqJ8NlSe8j8j6Q/larger.jpg", aspectRatio: 1.2 },
  { imageURL: "https://d32dm0rphc51dk.cloudfront.net/aLHd1-5iDe3eTcSb04QwtA/larger.jpg", aspectRatio: 0.67 },
  { imageURL: "https://d32dm0rphc51dk.cloudfront.net/66Lg4kZ4tjMD5nGfPOFUyA/larger.jpg", aspectRatio: 1.8 },
  { imageURL: "https://d32dm0rphc51dk.cloudfront.net/WcGcGFg5y4pnqZAacbDu3w/larger.jpg", aspectRatio: 3.5 },
  { imageURL: "https://d32dm0rphc51dk.cloudfront.net/6Oq63DESPbMW4W4mM3b01g/larger.jpg", aspectRatio: 0.5 },
  { imageURL: "https://d32dm0rphc51dk.cloudfront.net/cyb8k0si34ih-Qf_X5m7JA/larger.jpg", aspectRatio: 1.0 },
  { imageURL: "https://d32dm0rphc51dk.cloudfront.net/PGB4v5DaCME2JjlVJclZ8g/larger.jpg", aspectRatio: 1.5 },
]

storiesOf("Carousel").add("normal", () => {
  return <Carousel sources={images} />
})
