/**
 * File upload and drag-drop functionality
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

  renderFilePreview() {
    this.filePreview.innerHTML = "";
    this.selectedFiles.forEach((file, index) => {
      if (file.type.startsWith("image/")) {
        const fileItem = document.createElement("div");
        fileItem.classList.add("file-item");

        const img = document.createElement("img");
        img.src = URL.createObjectURL(file);

        const removeBtn = document.createElement("button");
        removeBtn.classList.add("remove-file");
        removeBtn.innerHTML = "✕";
        removeBtn.onclick = () => this.removeFile(index);

        fileItem.appendChild(img);
        fileItem.appendChild(removeBtn);
        this.filePreview.appendChild(fileItem);
      }
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
}
