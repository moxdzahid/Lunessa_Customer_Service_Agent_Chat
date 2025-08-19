/**
 * Voice recognition functionality
 */
class VoiceHandler {
  constructor(chatCore) {
    this.chatCore = chatCore;
    this.isRecording = false;
    this.recognition = null;
    
    this.initElements();
    this.initSpeechRecognition();
  }

  initElements() {
    this.voiceBtn = document.getElementById("voiceBtn");
  }

  initSpeechRecognition() {
    if ("webkitSpeechRecognition" in window) {
      this.recognition = new webkitSpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
      this.recognition.lang = "en-US";

      this.recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        this.chatCore.messageInput.value = transcript;
        this.chatCore.autoResize();
        this.stopRecording();
      };

      this.recognition.onerror = () => this.stopRecording();
      this.recognition.onend = () => this.stopRecording();
    }
  }

  toggleVoiceInput() {
    if (this.chatCore.chatEnded || this.chatCore.isProcessing) return;

    if (this.isRecording) {
      this.stopRecording();
    } else {
      this.startRecording();
    }
  }

  startRecording() {
    if (this.recognition && !this.chatCore.chatEnded && !this.chatCore.isProcessing) {
      this.isRecording = true;
      this.voiceBtn.classList.add("recording");
      this.recognition.start();
    }
  }

  stopRecording() {
    this.isRecording = false;
    this.voiceBtn.classList.remove("recording");
    if (this.recognition) {
      this.recognition.stop();
    }
  }

  updateVoiceButton() {
    this.voiceBtn.disabled = this.chatCore.chatEnded || this.chatCore.isProcessing;
  }
}
