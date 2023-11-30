<!-- Header.vue -->

<template>
    <!-- Main container for the header -->
    <div>
      <!-- Logo container with a semi-transparent white background and a bottom border -->  
      <div class="logo-container">
         <!-- Large-sized text for the logo with specific paddings -->
        <p class="logo-text">VIDEO STREAMING</p>
      </div>

       <!-- Navigation container with centered content and padding -->
      <div class="navigation-container">
        <!-- Button box for the 'upload' page with specific styling -->
        <div class="button-box" @click="goTo('upload')">
          <!-- Text for the 'upload' button with adjusted styles -->
          <p class="navigation-text">upload</p>
        </div>

        <!-- Button box for the 'stream' page with specific styling -->
        <div class="button-box" @click="goTo('stream')">
          <!-- Text for the 'streaming' button with adjusted styles --> 
          <p class="navigation-text">streaming</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'HeaderSection',
    methods: {
      // Method to emit a change-view event based on the selected page  
      goTo(page) {
        console.log("Navigating to:", page);
        this.$emit("change-view", page);
      },
    },
  };
  </script>
  
  <style scoped>
  /* Scoped styles for Header.vue */

/* Styling for the logo container */  
.logo-container {
  display: flex;
  background-color: rgba(255, 255, 255, 0.5);
  align-items: center;
  border-bottom: 2px solid rgb(202, 197, 197);
}

/* Styling for the logo text */
.logo-text {
  font-size: 50px;
  padding-left: 5%;
  padding-bottom: 2%;
  padding-top: 1%;
  margin: 0;
}

/* Styling for the navigation container */
.navigation-container {
  display: flex;
  justify-content: center;
  padding: 5px;
  margin-top: 5px; 
  
}

/* Styling for the navigation text (button text) */
.navigation-text {
  font-size: 22px; 
  margin: 0; 
  font-weight: bold; 
  color: #000; 
}

/* Styling for the button box */
.button-box {
  display: flex;
  border: 2px solid #333; 
  margin: 5px; 
  cursor: pointer; 
  padding: 5px 15px; 
  background-color: #fff; 
}

</style>
  