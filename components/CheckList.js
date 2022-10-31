import { ListGroup, ListGroupItem, Container } from "react-bootstrap";
import { InlineEdit } from "/components";
import { useState, useEffect } from "react";

export function CheckListItem({ item, onBlur }) {
  const [itemState, setItemState] = useState(item);

  useEffect(() => {
    console.log(itemState);
  }, [itemState]);

  return (
    <ListGroupItem className="d-flex justify-content-between align-items-center border-start-0 border-top-0 border-end-0 border-bottom rounded-0 mb-2">
      <div className="d-flex align-items-center">
        <CheckBox
          defaultChecked={itemState.completed}
          onChange={() => {
            setItemState({ ...itemState, completed: !itemState.completed });
          }}
        />
        <InlineEdit
          value={item.title}
          setValue={(value) => setItemState({ ...itemState, title: value })}
          strikeThrough={itemState.completed}
          onBlur={onBlur}
        />
        <span>{item.id}</span>
      </div>
    </ListGroupItem>
  );
}

export default function CheckList({ items, session }) {
  if (!items) {
    return <div>loading...</div>;
  }
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
