import { DEFAULT_TEXT_COLOR, DEFAULT_OUTLINE, DEFAULT_FILL, DEFAULT_OUTLINE_WIDTH } from './constants';
import MY_SHAPES from './shapes';
import './style.css'

import {
  FLOWCHART_SHAPES,
  BASIC_SHAPES,
  ShapeLibraryImpl,
  newInstance,
  OrthogonalConnector,
  ShapeLibraryPalette,
  type BrowserElement,
  PlainArrowOverlay
} from '@jsplumbtoolkit/browser-ui'

const canvas = document.querySelector<Element>('#canvas') as Element
const palette = document.querySelector<Element>('#palette') as HTMLElement

// shape library contains the shapes that the app can use.
const shapeLibrary = new ShapeLibraryImpl([MY_SHAPES, FLOWCHART_SHAPES, BASIC_SHAPES]);

// create an instance of JsPlumb Toolkit
const model = newInstance()

// render the model.
const surface = model.render(canvas, {
  // read/write element sizes from/to the model (as opposed to letting CSS control sizing)
  useModelForSizes:true,
  // on data load, zoom so it all fits
  zoomToFit:true,
  // inject the shape library to render our nodes. We show labels, which are extracted from the `text` property of each node.
  shapes: {
    library: shapeLibrary,
    showLabels: true,
    labelAttribute: "text"
  },
  view: {
    // map a template to use for all nodes
    nodes: {
      default: {
        // note the jtk-shape tag here - it's what renders the appropriate SVG
        template: `<div style="color:{{textColor}}" class="flowchart-object flowchart-{{type}}" data-jtk-target="true">
                    <jtk-shape/>
                    <div class="jtk-connect" data-jtk-source="true"/>
                </div>`
      }
    },
    edges:{
      // appearance for all edges - orthogonal connector, an arrow at the target
      default:{
        connector: {
          type: OrthogonalConnector.type,
          options: {
            cornerRadius: 3
          }
        },
        overlays:[
          {
            type:PlainArrowOverlay.type,
            options:{
              location:1
            }
          }
        ]
      }
    }
  },
  // route edges around verticess
  defaults: {
    edgesAvoidVertices:true
  }
})

// attach a palette. it displays the shapes in the shape library we set on the surface.
new ShapeLibraryPalette ({
  container:palette,
  initialSet:MY_SHAPES.id,
  surface,
  dataGenerator:(el: BrowserElement) => {
    // payload for a newly dragged element
    return {
      textColor:DEFAULT_TEXT_COLOR,
      outline:DEFAULT_OUTLINE,
      fill:DEFAULT_FILL,
      outlineWidth:DEFAULT_OUTLINE_WIDTH,
      text:el.getAttribute("title")        // use the title from the shape, which may be different based on the shape set.
    }
  }
})

// load some data
model.load({url:"dataset.json"})
