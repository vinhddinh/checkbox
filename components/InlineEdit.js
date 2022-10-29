import { useState } from "react";

export default function InlineEdit({ value, setValue, strikeThrough, onBlur }) {
  const [editingValue, setEditingValue] = useState(value);

  const onChange = (event) => setEditingValue(event.target.value);

  const onKeyDown = (event) => {
    if (event.key === "Enter" && (event.ctrlKey || event.metaKey)) {
      event.target.blur();
    }
  };

  const onInput = (event) => {
    event.target.style.height = "";
    event.target.style.height = event.target.scrollHeight + "px";
  };

  const onTextBlur = (event) => {
    // guards against empty strings
    if (event.target.value.trim() === "") {
      setEditingValue(value);
    } else {
      setValue(event.target.value);
    }

    // sends the value to the parent component
    if (onBlur) {
      onBlur(event.target.value);
    }
  };

  return (
    <textarea
      rows="1"
      aria-label="Field name"
      value={editingValue}
      onChange={onChange}
      onKeyDown={onKeyDown}
      onInput={onInput}
      onBlur={onTextBlur}
      className={strikeThrough ? "text-decoration-line-through" : ""}
    />
  );
}
