<!-- UploadSection.vue -->

<template>
    <!-- Main container for upload section, displayed when the current view is 'upload' -->
    <div v-if="currentView === 'upload'" class="upload-section">
      <!-- Heading for the upload section with specific styling -->  
      <p class="upload-text">upload</p>
  
      <!-- Container for file upload with styling -->
      <div class="upload-container">
        <!-- Label and button for file input -->
        <label for="fileInput" class="file-label">
          <span class="file-btn">파일 선택</span>
          <span class="selected-file">{{ selectedFileName }}</span>
        </label>

        <!-- The 'handleFileUpload' method is responsible for updating the component's data based on the selected file. -->
        <!-- The 'hidden-input' class is styling purpose for hiding the input visually when using a custom-styled button for file selection -->
        <input id="fileInput" type="file" @change="handleFileUpload" accept="video/*" class="hidden-input">
        
        <!-- Displayed when uploading is in progress -->
        <span v-if="isUploading" class="uploading-message">업로드 중...</span>
        
        <!-- Button to initiate file upload -->
        <button class="upload-btn" @click="uploadFile">upload</button>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    props: {
      // Prop for the current view to determine visibility
      currentView: String,
    },

    data() {
      return {
        selectedFileName: "No file selected",
        uploadedFile: null,
        isUploading: false,
      };
    },

    methods: {
      // Method to handle file selection  
      handleFileUpload(event) {
        this.uploadedFile = event.target.files[0];
        this.selectedFileName = this.uploadedFile ? this.uploadedFile.name : "No file selected";
      },
      // Method to initiate file upload

      uploadFile() {
        if (this.uploadedFile) {
          this.isUploading = true;
          
          // Creating FormData object and appending the file
          const formData = new FormData();
          formData.append("file", this.uploadedFile);
  
          // Actual server endpoint should be used here
          const uploadURL = "https://example.com/upload";
          
          // Sending POST request to upload the file
          axios.post(uploadURL, formData)
            .then(response => {
              
                // Log a success message from the server.
                console.log("File uploaded successfully:", response.data);
                // Additional logic can be added here based on the server's response.
            })
            .catch(error => {
              
                console.error("Error uploading file:", error);
              
              // Display a user-friendly alert informing about the upload error.
              alert("Error uploading file. Please try again.");
            })
            .finally(() => {
              
                // Set 'isUploading' to 'false' to indicate the end of the upload process.  
              this.isUploading = false;

            });
            
            // If no file is selected for upload, display an alert prompting the user to select a file.
        } else {
           alert("Please select a file to upload.");
        }
      },
    },
  };
  </script>
  
  
  <style scoped>
  /* Scoped styles for UploadSection.vue */

  /* Styling for the upload section */
.upload-section {
  text-align: left;
  margin-left: 2%;
  margin-right: 2%;
}

/* Styling for the heading within the upload section */
.upload-text {
  margin-left: 2%;
  font-size: 25px;
  font-weight: bold;
}

/* Styling for the container holding file upload elements */
.upload-container {
  background: rgb(255, 255, 255);
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 8px;
  border: 1px solid rgb(182, 185, 182);
  padding: 200px;
}

/* Styling for the label and button within the file upload container */
.file-label {
  border: 1px solid rgb(182, 185, 182);
  cursor: pointer;
  display: flex;
}

/* Styling for the button within the file upload container */
.file-btn {
  background: rgb(222, 227, 222);
  padding: 10px;
  margin-right: 10px;
  cursor: pointer;
}

/* Styling for the display of the selected file name */
.selected-file {
  margin-top: 10px;
  margin-right: 15px;
}

/* Styling for the hidden file input */
.hidden-input {
  display: none;
}

/* Styling for the message displayed during file upload */
.uploading-message {
  padding-top: 15px;
}

/* Styling for the button initiating file upload */
.upload-btn {
  padding: 5px;
  margin-top: 20px;
}

</style>