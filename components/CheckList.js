import { ListGroup, ListGroupItem, Container } from "react-bootstrap";
import { useState } from "react";

export function CheckListItem({ item }) {
  const [isComplete, setIsComplete] = useState(item.isComplete);

  function onChangeCheckBox(event) {
    setIsComplete(event.target.checked);
  }

  return (
    <ListGroupItem className="d-flex justify-content-between align-items-center border-start-0 border-top-0 border-end-0 border-bottom rounded-0 mb-2">
      <div class="d-flex align-items-center">
        <input
          class="form-check-input me-2"
          type="checkbox"
          defaultChecked={isComplete}
          onClick={onChangeCheckBox}
        />
        <span class={isComplete ? "text-decoration-line-through" : ""}>
          {item.title}
        </span>
      </div>
    </ListGroupItem>
  );
}

export default function CheckList({ items }) {
  return (
    <Container>
      <ListGroup>
        {items.map((item) => (
          <CheckListItem item={item} />
        ))}
      </ListGroup>
    </Container>
  );
}
