/**
 * File upload and drag-drop functionality
 * Updated to support all file types including documents
 */
class FileManager {
  constructor() {
    this.selectedFiles = [];
    
    this.initElements();
    this.initEventListeners();
  }

  initElements() {
    this.fileBtn = document.getElementById("fileBtn");
    this.fileInput = document.getElementById("fileInput");
    this.dropZone = document.getElementById("dropZone");
    this.filePreview = document.getElementById("filePreview");
  }

  initEventListeners() {
    this.fileBtn.addEventListener("click", () => this.fileInput.click());

    this.fileInput.addEventListener("change", (e) => {
      this.addFiles([...e.target.files]);
      this.fileInput.value = ""; // allow re-select same file
    });

    this.dropZone.addEventListener("dragover", (e) => {
      e.preventDefault();
      this.dropZone.classList.add("drag-over");
    });

    this.dropZone.addEventListener("dragleave", () => {
      this.dropZone.classList.remove("drag-over");
    });

    this.dropZone.addEventListener("drop", (e) => {
      e.preventDefault();
      this.dropZone.classList.remove("drag-over");
      this.addFiles([...e.dataTransfer.files]);
    });
  }

  addFiles(files) {
    files.forEach((file) => {
      if (!this.selectedFiles.some((f) => f.name === file.name && f.size === file.size)) {
        this.selectedFiles.push(file);
      }
    });
    this.renderFilePreview();
  }

  // Get file icon based on file type
  getFileIcon(file) {
    const extension = file.name.split('.').pop().toLowerCase();
    const iconMap = {
      'txt': '📄',
      'json': '📋',
      'pdf': '📕',
      'doc': '📘',
      'docx': '📘',
      'csv': '📊',
      'xml': '🗂️',
      'md': '📝',
      'rtf': '📄',
      'jpg': '🖼️',
      'jpeg': '🖼️',
      'png': '🖼️',
      'gif': '🖼️',
      'bmp': '🖼️',
      'svg': '🖼️'
    };
    return iconMap[extension] || '📎';
  }

  // Format file size for display
  formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  renderFilePreview() {
    this.filePreview.innerHTML = "";
    this.selectedFiles.forEach((file, index) => {
      const fileItem = document.createElement("div");
      fileItem.classList.add("file-item");

      if (file.type.startsWith("image/")) {
        // Image preview
        const img = document.createElement("img");
        img.src = URL.createObjectURL(file);
        img.style.maxWidth = "60px";
        img.style.maxHeight = "60px";
        img.style.objectFit = "cover";
        img.style.borderRadius = "4px";

        const removeBtn = document.createElement("button");
        removeBtn.classList.add("remove-file");
        removeBtn.innerHTML = "✕";
        removeBtn.onclick = () => this.removeFile(index);

        fileItem.appendChild(img);
        fileItem.appendChild(removeBtn);
      } else {
        // Document preview
        fileItem.classList.add("document-file");
        
        const fileInfo = document.createElement("div");
        fileInfo.classList.add("file-info");
        
        const fileIcon = document.createElement("div");
        fileIcon.classList.add("file-icon");
        fileIcon.textContent = this.getFileIcon(file);
        
        const fileDetails = document.createElement("div");
        fileDetails.classList.add("file-details");
        
        const fileName = document.createElement("div");
        fileName.classList.add("file-name");
        fileName.textContent = file.name;
        fileName.title = file.name; // tooltip for long names
        
        const fileSize = document.createElement("div");
        fileSize.classList.add("file-size");
        fileSize.textContent = this.formatFileSize(file.size);
        
        fileDetails.appendChild(fileName);
        fileDetails.appendChild(fileSize);
        
        const removeBtn = document.createElement("button");
        removeBtn.classList.add("remove-file");
        removeBtn.innerHTML = "✕";
        removeBtn.onclick = () => this.removeFile(index);

        fileInfo.appendChild(fileIcon);
        fileInfo.appendChild(fileDetails);
        fileItem.appendChild(fileInfo);
        fileItem.appendChild(removeBtn);
      }
      
      this.filePreview.appendChild(fileItem);
    });
  }

  removeFile(index) {
    this.selectedFiles.splice(index, 1);
    this.renderFilePreview();
  }

  getSelectedFiles() {
    return this.selectedFiles;
  }

  clearFiles() {
    this.selectedFiles = [];
    this.renderFilePreview();
  }

  // Read file content for text files
  async readFileContent(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = (e) => reject(e);
      
      // Read as text for document files
      if (file.type.startsWith('text/') || 
          file.name.endsWith('.txt') || 
          file.name.endsWith('.json') || 
          file.name.endsWith('.csv') || 
          file.name.endsWith('.xml') || 
          file.name.endsWith('.md')) {
        reader.readAsText(file);
      } else {
        // For other files, read as base64
        reader.readAsDataURL(file);
      }
    });
  }

  // Get files with their content for sending
  async getFilesWithContent() {
    const filesWithContent = [];
    
    for (const file of this.selectedFiles) {
      try {
        const content = await this.readFileContent(file);
        filesWithContent.push({
          name: file.name,
          size: file.size,
          type: file.type,
          content: content,
          isImage: file.type.startsWith('image/'),
          isDocument: !file.type.startsWith('image/')
        });
      } catch (error) {
        console.error(`Error reading file ${file.name}:`, error);
        filesWithContent.push({
          name: file.name,
          size: file.size,
          type: file.type,
          content: null,
          error: 'Failed to read file',
          isImage: file.type.startsWith('image/'),
          isDocument: !file.type.startsWith('image/')
        });
      }
    }
    
    return filesWithContent;
  }
}