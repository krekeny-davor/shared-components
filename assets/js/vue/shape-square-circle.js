import Tools from '../tools.js';
import ShapeElements from '../shape-elements.js';

const defaultStart = '1s';
const smallCircleRadius = 70;
const smallCircleDuration = '0.8s';
const smallCircleWait = '5s';

const bigCircleRadius = 155;
const bigCircleWait = '0.1s';

const tagName = 'shape-square-circle';

const smallCircleData = () => {
  const id = '__small-circle';
  const name = id + '-anim';

  return {
    id,
    name,
  };
};

const bigCircleData = () => {
  const id = '__big-circle';
  const name = id + '-anim';

  return {
    id,
    name,
  };
};

export default {
  tagName: tagName,
  computed: {
    tagNameId() {
      return `${Tools.uuid()}${tagName}`;
    },
    classList() {
      return ['shape-square-circle', 'vue-component'];
    },
    begin() {
      return this.start ? this.start : defaultStart;
    },
    rectColor() {
      return this.backgroundColor ? this.backgroundColor : '#673ab7';
    },
    pathColor() {
      return this.circleColor ? this.circleColor : '#fcd116';
    },
    bigCircleId() {
      return this.tagNameId + '__big-circle-id';
    },
    bigCircleReference() {
      return '#' + this.bigCircleId;
    },
    bigCircleBegin() {
      return `${this.smallCircleAnimationName}.end+${bigCircleWait}`;
    },
    bigCircleAnimationName() {
      return this.bigCircleId + '-anim';
    },
    smallCircleId() {
      return this.tagNameId + '__small-circle-id';
    },
    smallCircleReference() {
      return '#' + this.smallCircleId;
    },
    smallCircleBegin() {
      return `${this.begin};${this.bigCircleAnimationName}.end+${smallCircleWait}`;
    },
    smallCircleAnimationName() {
      return this.smallCircleId + '-anim';
    },
    bigCircle() {
      const { id, name } = bigCircleData();
      const smallCircle = smallCircleData();

      const tagNameId = `${this.tagNameId}${id}`;
      const tagNameName = `${this.tagNameId}${name}`;

      return {
        id: tagNameId,
        ref: `#${tagNameId}`,
        step: [
          {
            begin: `${this.tagNameId}${smallCircle.name}.end+0.01s`,
            name: tagNameName,
          },
          {
            begin: `${this.tagNameId}${smallCircle.name}2.end+0.01s`,
            name: tagNameName + '2',
          },
        ],
      };
    },
    smallCircle() {
      const { id, name } = smallCircleData();
      const bigCircle = bigCircleData();

      const tagNameId = `${this.tagNameId}${id}`;
      const tagNameName = `${this.tagNameId}${name}`;

      return {
        id: tagNameId,
        ref: `#${tagNameId}`,
        step: [
          {
            begin: `${this.begin};${this.tagNameId}${bigCircle.name}2.end+20s`,
            name: tagNameName,
          },
          {
            begin: `${this.tagNameId}${bigCircle.name}.end+0.1s`,
            name: tagNameName + '2',
          },
          {
            begin: `${this.tagNameId}${bigCircle.name}.end+0.8s`,
            name: tagNameName + '3',
          },
        ],
      };
    },
    width() {
      return 400;
    },
    height() {
      return this.width;
    },
    clipPathId() {
      return `${this.shapeElements?.getStepId('clip-path')}`;
    },
    clipPathUrl() {
      return `clip-path: url(#${this.clipPathId})`;
    },
    sequence() {
      return this.shapeElements?.getSequence();
    },

    shapeElements() {
      if (!this.shapeElementsInstance)
        this.shapeElementsInstance = new ShapeElements({ tagName, elements: this.elements, begin: this.begin });

      return this.shapeElementsInstance;
    },
  },
  data() {
    return {
      elements: [
        {
          name: 'smallCircle',
          grow: {
            start: true,
            waitFor: 'bigCircle.reset',
            delay: '20s',
          },
          shrink: {
            waitFor: 'bigCircle.shrink',
            delay: '0.1s',
          },
          reset: {
            waitFor: 'bigCircle.shrink',
            delay: '0.8s',
          },
        },
        {
          name: 'bigCircle',
          shrink: {},
          reset: {},
        },
      ],
      shapeElementsInstance: null,
    };
  },
  props: {
    backgroundColor: String,
    circleColor: String,
    start: String,
  },
  template: `
    <g :class="classList">
      <clipPath :id="clipPathId">
        <rect x="0" y="0" :width="width" :height="height" />
      </clipPath>
      <g :style="clipPathUrl">
        <rect :fill="rectColor" :width="width" :height="height" x="0" y="0" />
        <circle :fill="pathColor" :id="bigCircle.id" cx="200" cy="200" r="${bigCircleRadius}" :test="sequence?.bigCircle.id">
          <animate
            :id="bigCircle.step[0].name"
            :href="bigCircle.ref"
            attributeName="r"
            from="${bigCircleRadius}"
            :to="0"
            :begin="bigCircle.step[0].begin"
            dur="0.2s"
            fill="freeze"
          />
          <animate
            :id="bigCircle.step[1].name"
            :href="bigCircle.ref"
            attributeName="r"
            from="0"
            to="${bigCircleRadius}"
            :begin="bigCircle.step[1].begin"
            dur="0.6s"
            fill="freeze"
            keyTimes="0; 0.35; 0.70; 0.85; 1"
            values="0;${bigCircleRadius / 1.1};${bigCircleRadius / 1.15};${bigCircleRadius / 1.1};${bigCircleRadius}"
          />
        </circle>
        <circle :fill="rectColor" aafill="#ff0000" :id="smallCircle.id" cx="200" cy="200" r="${smallCircleRadius}">
          <animate
            :id="smallCircle.step[0].name"
            :href="smallCircle.ref"
            attributeName="r"
            from="${smallCircleRadius}"
            :to="width"
            to="200"
            :begin="smallCircle.step[0].begin"
            dur="${smallCircleDuration}"
            fill="freeze"
          />
          <animate
            :id="smallCircle.step[1].name"
            :href="smallCircle.ref"
            attributeName="r"
            :from="width"
            to="0"
            :begin="smallCircle.step[1].begin"
            dur="0.2s"
            fill="freeze"
          />
          <animate
            :id="smallCircle.step[2].name"
            :href="smallCircle.ref"
            attributeName="r"
            from="0"
            to="${smallCircleRadius}"
            :begin="smallCircle.step[2].begin"
            dur="0.6s"
            fill="freeze"
            keyTimes="0; 0.35; 0.70; 0.85; 1"
            values="0;${smallCircleRadius / 1.1};${smallCircleRadius / 1.15};${
    smallCircleRadius / 1.1
  };${smallCircleRadius}"
          />
        </circle>
      </g>
    </g>`,
};
