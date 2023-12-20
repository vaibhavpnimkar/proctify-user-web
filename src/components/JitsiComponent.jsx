// StudentComponent.js
import React, { useEffect } from 'react';

const JitsiComponent = () => {
  useEffect(() => {
    const domain = 'meet.jit.si';
    const roomName = 'your-room-name'; // Replace with your desired room name
    const options = {
      roomName,
      width: '100%',
      height: '100%',
      parentNode: document.getElementById('jitsi-student-container'),
      configOverwrite: {
        startWithAudioMuted: false,
        startWithVideoMuted: false,
        startAudioOnly: true, // Automatically start in audio-only mode
        disableInviteFunction: true, // Disable invite functionality
        prejoinPageEnabled: false

      },
      interfaceConfigOverwrite: {
        filmStripOnly: true, // Show only the film strip (video thumbnails)
      },
      userInfo: {
        displayName: 'Student #' + '14s', // Set the display name for the student
      },
      onload: () => {
        // Hide the participant count using CSS
        const head = document.head || document.getElementsByTagName('head')[0];
        const style = document.createElement('style');
        style.type = 'text/css';
        style.appendChild(document.createTextNode('.participants-pane { display: none !important; }'));
        style.appendChild(document.createTextNode('.toolbar-button { display: none !important; }'));
        style.appendChild(document.createTextNode('.invite-more-container { display: none !important; }'));
        const api = window.JitsiMeetExternalAPI;
        
        // Disable the invite functionality
    //    api.executeCommand('toggleInvite');
        
        // Optionally, hide the invite button
        const inviteButton = document.querySelector('.button-icon-link');
        if (inviteButton) {
          inviteButton.style.display = 'none';
        }


        head.appendChild(style);
      },
    };

    const api = new window.JitsiMeetExternalAPI(domain, options);

    return () => {
      api.dispose();
    };
  }, []);

  return (
    <div>
      <div id="jitsi-student-container"></div>
      <div>
        <h2>Exam Page</h2>
        {/* Add your exam content here */}
      </div>
    </div>
  );
};

export default JitsiComponent;
