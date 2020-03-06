# vue-threejs-birds

vue-threejs-birds is vue module for ["flocking birds animation" from threejs](https://threejs.org/examples/webgl_gpgpu_birds.html). Props have been extracted to customize options.

[Original source code](https://github.com/mrdoob/three.js/blob/master/examples/webgl_gpgpu_birds.html).

## Usage

Install

```
npm install --save vue-threejs-birds
```

Then import it into YourComponent.vue and use it like a normal vue component.

```vue
<template>
  <vue-threejs-birds :quantity="quantity" :canvasBgColor="canvasBgColor" />
</template>

<script>
  import VueThreejsBirds from 'vue-threejs-birds'
  export default {
    components: {
      VueThreejsBirds
    },
    data() {
      return {
        quantity: 2,
        canvasBgColor: 0x000000
      }
    }
  }
</script>
```

### Emitting event to handle window resize

Emit a custom event so the canvas can rerender on resize. Emitting a 'resized' event like this registers a single 'resize' event listener and you can add other logic to the event handler (other components can also have their own resize handlers). [More info on custom events.](https://vuejs.org/v2/guide/components-custom-events.html#Event-Names)

> Todo: Extract other event handlers

```vue
<template>
  <vue-threejs-birds />
</template>

<script>
  import VueThreejsBirds from './Birds'
  export default {
    components: {
      VueThreejsBirds
    },
    methods: {
      handleResize() {
        this.$root.$emit('resized')
        //do other stuff
      }
    },
    mounted() {
      window.addEventListener('resize', this.handleResize)
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.handleResize)
    }
  }
</script>
```

## Options

Here is a list of all the props that can be customized

1. **`canvasBgAlpha`**: Background color transparency. Default is 1 or opaque. Range is 0-1 Eg. `{ canvasBgAlpha: 0.5 }`
2. **`canvasBgColor`**: All colors can be Hexadecimal numbers or a string (`"rgb(255, 0, 0)", "#ff0000", "rgb(100%, 0%, 0%)", "hsl(0, 100%, 50%)"`). The background color for the canvas. Eg. `{ canvasBgColor: 0xffffff }`

> Note: Passing alpha with the color like "rgb(255, 0, 0, 0.5)" will ignore the alpha component.

3. **`color1` and `color2`**: You can choose two colors for the birds which will rendered based on the colorEffect. `{ color1: 0xfff, color2: 0x000000 }`
4. **`colorEffect`**: colorEffect should be a number between 0-4 which map to the following. Eg usage `{ colorEffect: 1 }`

```js
colorEffectMap = {
  0: 'lerp',
  1: 'lerpGradient',
  2: 'variance',
  3: 'varianceGradient',
  4: 'mix'
}
```

5. **`effectController`**: Bird movement options.

```
effectController: {
  separation: 20.0,
  alignment: 20.0,
  cohesion: 20.0,
  freedom: 0.75
}
```

6. **`quantity`**: Number between 1-5. Total birds will be 2<sup>quantity</sup> x 2<sup>quantity</sup>.

7. **`wingsSpan`**: Wingspan of the birds. Eg `{ wingsSpan: 20 }`

### Dimensions

Canvas will default to 100% viewport width and 100% viewport height on mount and window resize.

8. **`minWidth`**: Minimun width of the canvas.
9. **`minHeight`**: Minimun height of the canvas.
10. **`fixedHeight`**: Height will not change. If `minHeight > fixedHeight`, `fixedHeight` will set to `minHeight`
11. **`fixedWidth`**: Width will not change. If `minWidth > fixedWidth`, `fixedWidth` will set to `minWidth`

Here are all the props that can be passed with their respective prop types.

```vue
<script>
  props: {
    canvasBgColor: [String, Number],
    color1: [String, Number],
    color2: [String, Number],
    colorEffect: {
      default: 0,
      type: Number,
      required: false
    },

    effectController: {
      default: () => ({
        separation: 20.0,
        alignment: 20.0,
        cohesion: 20.0,
        freedom: 0.75
      }),
      type: Object,
      required: false
    },
    fixedHeight: {
      type: Number,
      default: null,
      required: false
    },
    fixedWidth: {
      type: Number,
      default: null,
      required: false
    },
    minHeight: {
      type: Number,
      default: null,
      required: false
    },
    minWidth: {
      type: Number,
      default: null,
      required: false
    },
    quantity: {
      default: 32,
      type: Number,
      required: false
    },
    wingsSpan: {
      type: Number,
      default: 20,
      required: false
    }
  },
</script>
```
