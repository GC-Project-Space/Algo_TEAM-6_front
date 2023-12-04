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
          <span class="selected-file">{{ fileName }}</span>
        </label>

        <!-- The 'handleFileUpload' method is responsible for updating the component's data based on the selected file. -->
        <!-- The 'hidden-input' class is styling purpose for hiding the input visually when using a custom-styled button for file selection -->
        <input id="fileInput" type="file" @change="handleFileUpload" accept="video/*" class="hidden-input">
        
        <!-- Displayed when uploading is in progress -->
        <span v-if="isUploading" class="uploading-message">업로드 중...</span>
        
        <!-- Button to initiate file upload -->
        <button class="upload-btn" @click="uploadFile">upload</button>

        <!-- Button to abort file upload -->
        <button class="upload-btn" @click="abortFileUpload">abort</button>
      </div>
    </div>
  </template>
  
  <script>
  import { postInitiateUpload, postUploadSignedUrl, postCompleteUpload, postAbortUpload } from '@/api/s3Api';
  
  export default {
    props: {
      // Prop for the current view to determine visibility
      currentView: String,
    },

    data() {
      return {
        fileName: "No file selected",
        file: null,
        fileSize: 0,
        isUploading: false,
      };
    },

    methods: {
      // Method to handle file selection  
      handleFileUpload(event) {
        this.file = event.target.files[0];
        this.fileName = this.file ? this.file.name : "No file selected";
        this.fileSize = this.file ? this.file.size : 0;
      },
      // Method to initiate file upload

      async uploadFile() {
        if (!this.file) { alert("Please select a file to upload."); return; } 
        if (this.fileSize > 3 * 1024 * 1024 * 1024) { alert("File size exceeds 100MB."); return;}
        
        let start = new Date();
        let multiUploadArray = [];

        // 1. Initiate upload
        let res = await postInitiateUpload(this.file.name, this.file.type, this.fileSize);
        console.log(`res: ${res.data}`);
        const uploadId = res.data.result.uploadId;
        const newFilename = res.data.result.newFileName; // new filename for s3
        console.log(`uploadId: ${uploadId}, newFilename: ${newFilename}`);

        // 1-1 data save on section storage
        sessionStorage.setItem('uploadId', uploadId);
        sessionStorage.setItem('newFilename', newFilename);

        // 1-2 chunk size
        const chunkSize = 50 * 1024 * 1024; // 50MB
        const chunkCount = Math.floor(this.fileSize / chunkSize) + 1;
        console.log(`chunkCount: ${chunkCount}`);

        for (let uploadCount = 1; uploadCount < chunkCount + 1; uploadCount++) {
          // file slice
          let start = (uploadCount - 1) * chunkSize;
          let end = uploadCount * chunkSize;
          let fileBlob = uploadCount < chunkCount ? this.file.slice(start, end) : this.file.slice(start);
          
          // 2. get signed url
          let getSignedUrlRes = await postUploadSignedUrl(newFilename, uploadCount, uploadId);
          const signedUrl = getSignedUrlRes.data.result.signedUrl;
          console.log(`signedUrl: ${signedUrl}`);

          // 3. upload file
          let uploadChunck = await fetch(signedUrl, {
            method: 'PUT',
            body: fileBlob
          });
          console.log(`uploadChunck: ${uploadChunck}`);

          let EtagHeader = uploadChunck.headers.get('ETag').replaceAll('"', '');
          console.log(`EtagHeader: ${EtagHeader}`);

          let uploadPartDetails = {
                    awsETag: EtagHeader,
                    partNumber: uploadCount
                };

          multiUploadArray.push(uploadPartDetails);
        }

        // 4. complete upload
        let completeUploadRes = await postCompleteUpload(newFilename, uploadId, multiUploadArray);
        let end = new Date();

        console.log(`total time: ${end - start}ms`);
        console.log(`completeUploadRes: ${completeUploadRes}`);
      },

      abortFileUpload() {
        const uploadId = sessionStorage.getItem('uploadId');
        const newFilename = sessionStorage.getItem('newFilename');

        postAbortUpload(newFilename, uploadId)
          .then((r) => console.log(r.data))
          .catch((err) => console.error(err));
        clearInterval();
      }
    }
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