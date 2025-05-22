
import {
  FLOWCHART_SHAPES
} from '@jsplumbtoolkit/browser-ui'

const term=FLOWCHART_SHAPES.shapes['terminus'].template;
const decisionTemplate=FLOWCHART_SHAPES.shapes['decision'].template;

/**
* Documentation on custom shape sets is here:

https://docs.jsplumbtoolkit.com/toolkit/7.x/lib/nodes-and-groups/shape-libraries#custom-shape-sets

*/

const MY_SHAPES = {

    id: 'AP',

    name: 'Åtgärdsplaner',

    shapes: {

        start: {

            type: 'start',

            label: 'Början',

            description: 'Början av en ÅP',

            template: term

        },

        desc: {

            type: 'desc',

            label: 'Beslutssteg',

            template: decisionTemplate,

        },

        ansikte:{
          type:"ansikte",
          label:"Ansikte",
          template:`<svg:g>
                      <svg:circle cx="{{width/2}}" cy="{{height/2}}" r="{{(width/2)}}"/>
                      <svg:path d="M {{width/4}} {{height*3/4}} L {{width*3/4}} {{height*3/4}}"/>
                      <svg:circle cx="{{width/4}}" cy="{{height/4}}" r="10"/>
                      <svg:circle cx="{{width*3/4}}" cy="{{height/4}}" r="10"/>
                      <svg:circle cx="{{width/2}}" cy="{{height/2}}" r="10"/>
                      </svg:g>`
        }

      }
};

export default MY_SHAPES
