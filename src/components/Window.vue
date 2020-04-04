<template>
  <div class="window">
    <div class="content">
      <slot v-for="item in items"  :name="item"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Window",

    props: ["title", "items"],

    data: function() {
      return {
        selected: this.items[0]
      }
    },

    /*methods: {
      setSelected: function(item) {
        this.selected = item
      },

      autoSwitch: function() {
        let num = 0

        setInterval(() => {
          num++
          if (num >= this.items.length) num = 0
          this.selected = this.items[num]
        }, 60000)
      }
    },

    mounted: function() {
      // this.autoSwitch()
    }*/
  }
</script>

<style scoped lang="scss">
  .window {
    display: grid;
    background-color: var(--color-window);
    border: 1px solid var(--color-border);
    grid-template-rows: auto auto minmax(0, 1fr);
  }

  header,
  nav {
    border-bottom: 1px solid var(--color-border);
    text-transform: uppercase;
  }

  nav {
    display: flex;
    flex-wrap: wrap;
  }

  nav span {
    margin: calc(var(--spacing) / 2);
    font-weight: bold;
    cursor: pointer;
    font-size: .8rem;
    color: var(--color-text);

    &.selected,
    &:hover {
      color: var(--color-highlight);
    }
  }

  header,
  nav,
  .content {
    padding: var(--spacing);
  }

  .content {
    overflow: auto;
  }
</style>
