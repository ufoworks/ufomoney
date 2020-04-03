<template>
  <div class="custom-select">
    <slot />
  </div>
</template>
<script>
export default {
  name: 'custom-select'
}
</script>
<style lang="postcss" scoped>
/* Container used for styling the custom select, the buttom class below adds the bg gradient, corners, etc. */
.custom-select {
  position: relative;
  display: block;
  padding: 0;
  outline: 0;
  @apply rounded border border-gray bg-white;
}
.custom-select > select {
  width: 100%;
  margin: 0;
  background: transparent;
  border: 0;
  outline: 0;
  appearance: none;
  -webkit-appearance: none;
  font-size: 1em;
  color: getcolor(light);
  padding: 0.9rem 2rem 0.9rem 1rem;
  line-height: 1.3;
}

.custom-select::after {
  content: "";
  position: absolute;
  width: 16px;
  height: 9px;
  top: 50%;
  right: 1em;
  margin-top: -5px;
  background-image: url("../assets/images/select-arrow.svg");
  background-repeat: no-repeat;
  background-size: 100%;
  z-index: 2;
  pointer-events: none;
}

/* ------------------------------------  */
/* START OF UGLY BROWSER-SPECIFIC HACKS */
/* ----------------------------------  */

/* OPERA - Pre-Blink nix the custom arrow, go with a native select button to keep it simple. Targeted via this hack http://browserhacks.com/#hack-a3f166304aafed524566bc6814e1d5c7 */
x:-o-prefocus,
.custom-select::after {
  display: none;
}

/* IE 10/11+ - This hides native dropdown button arrow so it will have the custom appearance, IE 9 and earlier get a native select - targeting media query hack via http://browserhacks.com/#hack-28f493d247a12ab654f6c3637f6978d5 - looking for better ways to achieve this targeting */
/* The second rule removes the odd blue bg color behind the text in the select button in IE 10/11 and sets the text color to match the focus style's - fix via http://stackoverflow.com/questions/17553300/change-ie-background-color-on-unopened-focused-select-box */
@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
  .custom-select select::-ms-expand {
    display: none;
  }
  .custom-select select:focus::-ms-value {
    background: transparent;
    color: white;
  }
  .custom-select select > option {
    color: black;
  }
}

/* FIREFOX won't let us hide the native select arrow, so we have to make it wider than needed and clip it via overflow on the parent container. The percentage width is a fallback since FF 4+ supports calc() so we can just add a fixed amount of extra width to push the native arrow out of view. We're applying this hack across all FF versions because all the previous hacks were too fragile and complex. You might want to consider not using this hack and using the native select arrow in FF. Note this makes the menus wider than the select button because they display at the specified width and aren't clipped. Targeting hack via http://browserhacks.com/#hack-758bff81c5c32351b02e10480b5ed48e */
/* Show only the native arrow */
@-moz-document url-prefix() {
  .custom-select {
    overflow: hidden;
  }
  .custom-select select {
    width: 120%;
    width: -moz-calc(100% + 3em);
    width: calc(100% + 3em);
  }
}

/* Firefox focus has odd artifacts around the text, this kills that. See https://developer.mozilla.org/en-US/docs/Web/CSS/:-moz-focusring */
.custom-select select:-moz-focusring {
  color: transparent;
  text-shadow: 0 0 0 getcolor(brand);
}
/* ------------------------------------  */
/*  END OF UGLY BROWSER-SPECIFIC HACKS  */
/* ------------------------------------  */
</style>
