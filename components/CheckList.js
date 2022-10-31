import { ListGroup, ListGroupItem, Container } from "react-bootstrap";
import { InlineEdit } from "/components";
import { useState, useEffect } from "react";

export function CheckListItem({ item, onBlur }) {
  const [itemState, setItemState] = useState(item);

  const updateItem = async () => {
    const response = await fetch(`/api/todos?id=${itemState.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(itemState),
    });
  };

  const deleteItem = async () => {
    const res = await fetch(`/api/todos?id=${itemState.id}`, {
      method: "DELETE",
    });
    if (res.status === 200) {
      setItemState(null);
    }
  };

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
        <InlineEdit
          placeholder="Description"
          value={item.description}
          setValue={(value) =>
            setItemState({ ...itemState, description: value })
          }
          strikeThrough={itemState.completed}
          onBlur={onBlur}
        />
        
        <CloseButton onClick={deleteItem} />
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
