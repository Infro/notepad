
let chunks = [];
let blob = null;
let formData = null;
function toClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
}

navigator.mediaDevices.getUserMedia({"audio": "true"})
    .then(function (stream) {
        const audioContext = new AudioContext();
        const source = audioContext.createMediaStreamSource(stream);
        mediaRecorder = new MediaRecorder(stream);

        const recordButton = document.querySelector('#record');
        recordButton.addEventListener('click', function () {
            if (!isRecording) {
                mediaRecorder.start();
                isRecording = true;
                recordButton.textContent = 'Stop Recording';
            } else {
                mediaRecorder.stop();
                isRecording = false;
                recordButton.textContent = 'Start Recording';
            }
        });

        mediaRecorder.addEventListener('dataavailable', function (event) {
            chunks.push(event.data);
        });
        mediaRecorder.addEventListener('stop', function () {
            blob = new Blob(chunks, { 'type': 'audio/mp3; codecs=opus' });
            formData = new FormData();
            formData.append('file', blob, 'audio.mp3');
            formData.append('model', model);

            fetch('https://api.openai.com/v1/audio/transcriptions', {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${openai.key}` },
                body: formData
            })
                .then(response => {
                    console.log(response);
                    toClipboard(response.json().text);
                })
                .catch(error => console.error(error));
        });
    })
    .catch(function (error) {
        console.error('Error accessing microphone', error);
    });

