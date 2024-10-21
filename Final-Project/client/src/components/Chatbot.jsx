import React, { useEffect } from "react";

const Chatbot = () => {
  useEffect(() => {
    // Inject Botpress script when the component mounts
    const injectBotpressScript = () => {
      const script = document.createElement("script");
      script.src = "https://cdn.botpress.cloud/webchat/v2/inject.js";
      script.async = true;
      document.body.appendChild(script);

      const configScript = document.createElement("script");
      configScript.src =
        "https://mediafiles.botpress.cloud/26a83f89-ace1-4045-92ba-95b836f75669/webchat/v2/config.js";
      configScript.async = true;
      document.body.appendChild(configScript);

      return () => {
        document.body.removeChild(script);
        document.body.removeChild(configScript);
      };
    };

    injectBotpressScript();
  }, []);

  return (
    <div className="flex gap-2 fixed bottom-0 m-6 z-20">
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded"
        onClick={() => window.botpress?.open()}
      >
        Open
      </button>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded"
        onClick={() => window.botpress?.close()}
      >
        Close
      </button>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded"
        onClick={() => window.botpress?.toggle()}
      >
        Toggle
      </button>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded"
        onClick={() =>
          window.botpress?.config({
            configuration: {
              botName: "New Webchat Title",
              botDescription: "Updated description",
            },
          })
        }
      >
        Configure
      </button>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded"
        onClick={() =>
          window.botpress?.sendEvent({
            type: "event-sent", // Arbitrary event type
          })
        }
      >
        Send Event
      </button>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded"
        onClick={() => window.botpress?.sendMessage("Hi! My name is John.")}
      >
        Send Message
      </button>
    </div>
  );
};

export default Chatbot;
