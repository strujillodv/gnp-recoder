document.write('<h1 style="font-family: Courier New; font-size: 30px; color:red;margin-top:200px;">El proposito de esta ventana es dar permiso para acceder al microfono.</h1>');

var port = chrome.runtime.connect();

navigator.mediaDevices.getUserMedia({
  audio: true
}).then(function (stream) {
  var tracksLength = stream.getTracks().length;

  stream.getTracks().forEach(function (track) {
    track.stop();
  });

  if (tracksLength < 1) {
    throw new Error('Expected at least one track but received: ' + tracksLength);
  }

  port.postMessage({
    messageFromContentScript1234: true,
    startRecording: true,
    onlyMicrophone: true
  });
  window.close();
}).catch(function () {
  var html = '<h1 style="font-family: Courier New; font-size: 30px; color:red;margin-top:20px;">No se logro obtener permiso para acceder al microfono.</h1>';
  html += '<p style="font-family: Courier New; font-size: 25px; color:black;margin-top:20px;">En las siguientes paginas coceda acceso y remueva "RecordRTC" de la lista de bloqueo:</p>';
  html += '<pre style="font-family: Courier New; font-size: 25px; color:blue;margin-top:20px;">chrome://settings/content/camera?search=camera</pre>';
  html += '<pre style="font-family: Courier New; font-size: 25px; color:blue;margin-top:20px;">chrome://settings/content/microphone?search=microphone</pre>';

  if (e.message && e.message.toString().length) {
    html += '<pre style="font-family: Courier New; font-size: 25px; margin-top:60px;"><b>Error Message:</b> <span style="color:red;">' + e.message + '</span></pre>';
  }

  document.body.innerHTML = html;
});
