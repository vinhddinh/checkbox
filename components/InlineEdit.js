import { useState, useEffect, useRef } from "react";

export default function InlineEdit({ value, setValue, strikeThrough, onBlur }) {
  const [editingValue, setEditingValue] = useState(value);
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      setHeight(ref);
    }
  }, [editingValue]);

  const onChange = (event) => setEditingValue(event.target.value);

  const onKeyDown = (event) => {
    if (event.key === "Enter" && !(event.ctrlKey || event.shiftKey)) {
      event.target.blur();
    }
  };

  const setHeight = (ref) => {
    ref.current.style.height = "";
    ref.current.style.height = ref.current.scrollHeight + "px";
  };

  const onTextBlur = (event) => {
    // sends the value to the parent component
    if (onBlur) {
      onBlur(event.target.value);
    }
    setValue(event.target.value);
  };

  return (
    <textarea
      rows="1"
      aria-label="Field name"
      value={editingValue}
      onChange={onChange}
      onKeyDown={onKeyDown}
      onBlur={onTextBlur}
      className={strikeThrough ? "text-decoration-line-through" : ""}
      ref={ref}
    />
  );
}
