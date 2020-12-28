import React, {useContext} from 'react'
import {useHttp} from '../../hooks/http.hook'
import {AuthContext} from '../../context/AuthContext'

export const Camera = () => {
  
  const {request} = useHttp()
  const auth = useContext(AuthContext)

  var width = 220;    
  var height = 0;     
 
  var streaming = false;

  var video = null;
  var canvas = null;

  const startup =  () => {
    access()
    video = document.getElementById('video');
    canvas = document.getElementById('canvas');

    navigator.mediaDevices.getUserMedia({video: true})
    .then(function(stream) {
      video.srcObject = stream;
      video.play();
      
    })
    .catch(function(err) {
      console.log("An error occurred: " + err);
    });

    video.addEventListener('canplay', function(ev){
      if (!streaming) {
        height = video.videoHeight / (video.videoWidth/width);
      
        if (isNaN(height)) {
          height = width / (4/3);
        }
        canvas.setAttribute('width', width);
        canvas.setAttribute('height', height);
        streaming = true;
      }
    }, false);
    setInterval(() =>  {
      takepicture()
      
    }, 25000);
  }

  const takepicture = () => {
    var context = canvas.getContext('2d');
    if (width && height) {
      canvas.width = width;
      canvas.height = height;
      context.drawImage(video, 0, 0, width, height);
    
      var data = canvas.toDataURL('image/png').replace('data:image/png;base64,' , '')
      
      photoLoad(data)
    } 
  }
 
  const photoLoad = async (data) =>{
    try {
      console.log({data})
      await request('/api/student-page/load-photo', 'POST', {data},
      {
        Authorization: `Bearer ${auth.token}`
      })
    } catch (e) {
      
    }
  } 
  const access = () =>{
    var inputs = document.querySelectorAll('input[type=radio]');
    for (var i = 0;  i < inputs.length; i++) {
        inputs[i].disabled = false
        
      }
  }

  return(
    
      <>
      <div className="camera">
        <video width="240px" height="220px"id="video">Video stream not available.</video>
        <button
        onClick={startup}
        className="btn grey lighten-1 black-text"
        >Розпочати відео</button>
        <div>Щоб розпочати проходження тесту, увімкніть відео</div>
      </div>
      <canvas id="canvas" className="canvas"></canvas>
      
      </>
      

  )
}