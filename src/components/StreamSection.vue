<!-- StreamSection.vue -->

<template>
    <!-- Main container for video streaming section, displayed when the current view is 'stream' -->
    <div v-if="currentView === 'stream'" class="stream-section">
      <!-- Heading for the video streaming section with specific styling -->  
      <h2 class="upload-text">Video Streaming</h2>
      
      <!-- Video player with controls, width, and height settings -->
      <video controls width="640" height="360">
        <!-- Dynamic source binding based on the streaming URL prop -->
        <source :src="streamingURL" type="application/x-mpegURL">
        <!-- Fallback text if the browser does not support the video tag -->
        Your browser does not support the video tag.
      </video>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      // Prop for the streaming URL  
      streamingURL: String,
      // Prop for the current view to determine visibility
      currentView: String,
    },
  };
  </script>
  
  <style scoped>
  /* Scoped styles for StreamSection.vue */

  /* Styling for the video streaming section */
  .stream-section {
 
  padding-top: 2%;
  margin: 0 auto;
}

  </style>