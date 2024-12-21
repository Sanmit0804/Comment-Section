import React, { useState, useEffect, useRef } from "react";
import "./EmojiSelector.scss";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";

const EmojiSelector = () => {
  const [input, setInput] = useState("");
  const [texts, setTexts] = useState([]);
  const [isPickerVisible, setIsPickerVisible] = useState(false);

  // Ref for the emoji picker
  const pickerRef = useRef(null);

  // Handle clicks outside the emoji picker
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setIsPickerVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSubmit = () => {
    if (input.trim()) {
      setTexts([...texts, input]);
      setInput("");
    }
  };

  return (
    <div className="container">
      <div className="input-container">
        <div className="input-box">
          <input
            type="text"
            className="input-box-bar"
            value={input}
            placeholder="Type something..."
            onChange={(event) => setInput(event.target.value)}
          />
          <button
            className="input-box-emoji"
            onClick={() => setIsPickerVisible(true)}
          >
            🙂
          </button>
          <button className="input-box-post" onClick={handleSubmit}>
            Post
          </button>
          {isPickerVisible && (
            <div className="emoji-picker" ref={pickerRef}>
              <Picker
                data={data}
                previewPosition="none"
                onEmojiSelect={(e) => {
                  setInput(input + e.native);
                }}
              />
            </div>
          )}
        </div>
      </div>
      <div className="texts-container">
        {texts.map((text, index) => (
          <p key={index} className="text-item">
            {text}
          </p>
        ))}
      </div>
    </div>
  );
};

export default EmojiSelector;
