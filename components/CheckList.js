import { ListGroup, ListGroupItem, Container } from "react-bootstrap";
import { useState } from "react";

export function CheckListItem({ item }) {
  const [isComplete, setIsComplete] = useState(item.isComplete);

  function onChangeCheckBox(event) {
    setIsComplete(event.target.checked);
  }

  return (
    <ListGroupItem className="d-flex justify-content-between align-items-center border-start-0 border-top-0 border-end-0 border-bottom rounded-0 mb-2">
      <div className="d-flex align-items-center">
        <CheckBox defaultChecked={isComplete} onChange={onChangeCheckBox} />
        <InlineEdit value={item.title} setValue={() => {}} />
      </div>
    </ListGroupItem>
  );
}

export default function CheckList({ items }) {
  return (
    <Container>
      <ListGroup>
        {items.map((item) => (
          <CheckListItem item={item} key={item.id} />
        ))}
      </ListGroup>
    </Container>
  );
}

function CheckBox({ defaultChecked, onChange }) {
  // checkbox without highlighting
  return (
    <input
      className="form-check-input me-2"
      type="checkbox"
      defaultChecked={defaultChecked}
      onClick={onChange}
    />
  );
}

const InlineEdit = ({ value, setValue }) => {
  const [editingValue, setEditingValue] = useState(value);

  const onChange = (event) => setEditingValue(event.target.value);

  const onKeyDown = (event) => {
    if (event.key === "Enter" || event.key === "Escape") {
      event.target.blur();
    }
  };

  const onBlur = (event) => {
    if (event.target.value.trim() === "") {
      setEditingValue(value);
    } else {
      setValue(event.target.value);
    }
  };

  return (
    <input
      type="text"
      aria-label="Field name"
      value={editingValue}
      onChange={onChange}
      onKeyDown={onKeyDown}
      onBlur={onBlur}
    />
  );
};
