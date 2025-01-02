import React, { useEffect, useState } from "react";
import './Chatbot.css'; // Adjust the path if necessary

const Chatbot = () => {
  const [botpressLoaded, setBotpressLoaded] = useState(false);

  useEffect(() => {
    // Inject Botpress script when the component mounts
    const injectBotpressScript = () => {
      // Main Botpress script
      const script = document.createElement("script");
      script.src = "https://cdn.botpress.cloud/webchat/v2.2/inject.js"; // Updated script source
      script.async = true;
      script.onload = () => {
        setBotpressLoaded(true); // Set loaded state to true once script is loaded
      };
      document.body.appendChild(script);

      // Configuration script
      const configScript = document.createElement("script");
      configScript.src = "https://files.bpcontent.cloud/2024/10/24/15/20241024153351-83MMV45V.js"; // Updated config source
      configScript.async = true;
      document.body.appendChild(configScript);

      return () => {
        // Cleanup script elements when component unmounts
        document.body.removeChild(script);
        document.body.removeChild(configScript);
      };
    };

    injectBotpressScript();
  }, []);

  const handleButtonClick = (action) => {
    if (!botpressLoaded) {
      console.error("Botpress is not loaded yet.");
      return; // Prevent action if Botpress is not loaded
    }

    switch (action) {
      case 'open':
        window.botpress.open();
        break;
      case 'close':
        window.botpress.close();
        break;
      case 'toggle':
        window.botpress.toggle();
        break;
      case 'configure':
        window.botpress.config({
          configuration: {
            botName: "New Webchat Title",
            botDescription: "Updated description",
          },
        });
        break;
      case 'sendEvent':
        window.botpress.sendEvent({
          type: "event-sent", // Arbitrary event type
        });
        break;
      case 'sendMessage':
        window.botpress.sendMessage("Hi! My group no is 12.");
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex gap-2 fixed bottom-0 m-6 z-20">
      <button className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded" onClick={() => handleButtonClick('open')}>
        Open
      </button>
      <button className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded" onClick={() => handleButtonClick('close')}>
        Close
      </button>
      <button className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded" onClick={() => handleButtonClick('toggle')}>
        Toggle
      </button>
      <button className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded" onClick={() => handleButtonClick('configure')}>
        Configure
      </button>
      <button className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded" onClick={() => handleButtonClick('sendEvent')}>
        Send Event
      </button>
      <button className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded" onClick={() => handleButtonClick('sendMessage')}>
        Send Message
      </button>
    </div>
  );
};

export default Chatbot;
