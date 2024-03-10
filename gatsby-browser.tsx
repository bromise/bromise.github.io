import * as React from "react"
import type { GatsbyBrowser } from "gatsby"

// custom typefaces
import '@fontsource-variable/montserrat';
import '@fontsource/merriweather';
// normalize CSS across browsers
import './src/normalize.css';
// custom CSS styles
import './src/style.css';

// Highlighting for code blocks
import 'prismjs/themes/prism.css';

export const wrapPageElement: GatsbyBrowser["wrapPageElement"] = ({
  element,
}) => {
  return (
    <>
      {element}
    </>
  )
}
