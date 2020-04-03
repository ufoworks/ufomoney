<template>
  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 160.5 50.9" style="enable-background:new 0 0 160.5 50.9" xml:space="preserve">
    <circle ref="pupil" cx="117.1" cy="25.5" r="11" fill="#689496"/>
    <g>
      <path d="M21.3,50.9c-6.6,0-11.8-1.8-15.6-5.5S0,36.3,0,29V0.8h10.8v27.9c0,4,0.9,7.1,2.8,9.1s4.5,3.1,7.8,3.1s5.9-1,7.8-3
        S32,33,32,29V0.8h10.8v27.8c0,3.8-0.5,7-1.5,9.8s-2.5,5.1-4.3,6.9c-1.9,1.9-4.2,3.2-6.8,4.1C27.6,50.4,24.6,50.9,21.3,50.9z"/>
      <path d="M50.4,0.8h37.5v9.8H61.3v10.6h23.5V31H61.3v19.1H50.4V0.8z"/>
      <path ref="inner" d="M117,50.9c-3.8,0-7.3-0.7-10.5-2s-5.9-3.1-8.3-5.4c-2.3-2.3-4.1-4.9-5.4-8s-1.9-6.4-1.9-9.9v-0.1c0-3.5,0.7-6.8,2-9.9
        s3.1-5.8,5.5-8.1s5.1-4.2,8.3-5.5c3.2-1.3,6.7-2,10.5-2s7.3,0.7,10.5,2s5.9,3.1,8.3,5.4c2.3,2.3,4.1,4.9,5.4,8
        c1.3,3.1,1.9,6.4,1.9,9.9v0.1c0,3.5-0.7,6.8-2,9.9s-3.1,5.8-5.5,8.1s-5.1,4.2-8.3,5.5C124.3,50.3,120.8,50.9,117,50.9z M117.1,40.9
        c2.2,0,4.2-0.4,6-1.2s3.4-1.9,4.7-3.3c1.3-1.4,2.3-3,3-4.9c0.7-1.9,1.1-3.8,1.1-5.9v-0.1c0-2.1-0.4-4.1-1.1-6
        c-0.7-1.9-1.8-3.5-3.1-4.9c-1.3-1.4-2.9-2.5-4.7-3.3c-1.8-0.8-3.8-1.2-6-1.2s-4.2,0.4-6,1.2s-3.4,1.9-4.6,3.3c-1.3,1.4-2.3,3-3,4.9
        s-1.1,3.8-1.1,5.9v0.1c0,2.1,0.4,4.1,1.1,6c0.7,1.9,1.8,3.5,3.1,4.9s2.9,2.5,4.7,3.3C112.9,40.5,114.9,40.9,117.1,40.9z"/>
    </g>
    <circle cx="154.2" cy="44.6" r="6.3"/>
  </svg>
</template>

<script>
export default {
  mounted () {
    this.pupil = this.$refs.pupil
    this.inner = this.$refs.inner
    const innerEyeWidth = this.inner.getBoundingClientRect().width
    const innerEyeHeight = this.inner.getBoundingClientRect().height
    const pupilWidth = this.pupil.getBoundingClientRect().width
    const pupilHeight = this.pupil.getBoundingClientRect().height
    this.xMovement = (innerEyeWidth - pupilWidth) / 2
    this.yMovement = (innerEyeHeight - pupilHeight) / 2

    window.addEventListener('mousemove', this.updateEyePosition)
  },
  methods: {
    updateEyePosition (event) {
      const rect = this.inner.getBoundingClientRect()
      const posX = ((event.clientX - rect.left) / window.innerWidth) * this.xMovement
      const posY = ((event.clientY - rect.top) / window.innerHeight) * this.yMovement
      this.pupil.style.transform = `translate(${posX}px, ${posY}px)`
    }
  }
}
</script>
