<!-- App.vue -->

<template>
  <!-- Root element of the App component -->
  <div>
     <!-- Header component -->
    <Header @change-view="changeView" />

    <!-- Main container -->
    <div class="main-container">
      <!-- Upload section component -->
      <UploadSection :currentView="currentView" />

      <!-- Stream section component -->
      <StreamSection :streamingURL="streamingURL" :currentView="currentView" />
    </div>
  </div>
</template>

<script>
// Import necessary components
import Header from './Head.vue';
import UploadSection from './UploadSection.vue';
import StreamSection from './StreamSection.vue';

// Define component logic
export default {
  components: {
    Header,
    UploadSection,
    StreamSection,
  },
  data() {
    // Initialize data properties
    return {
      currentView: 'upload',// Set initial view
      streamingURL: '',// Initialize streaming URL
    };
  },
  methods: {
    // Method to change the current view/page
    changeView(page) {
      this.currentView = page;
    },
  },
};
</script>

<style>
/* Main container : Stacking vertically and horizontally */
.main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

</style>