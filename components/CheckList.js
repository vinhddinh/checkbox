import {
  ListGroup,
  ListGroupItem,
  Form,
  Container,
  Col,
  CloseButton,
} from "react-bootstrap";
import InlineEdit from "/components/InlineEdit.js";
import { useState, useEffect } from "react";

export function CheckListItem({ item, onBlur }) {
  const [itemState, setItemState] = useState(item);
  const timezoneOffset = new Date().getTimezoneOffset() * 60000;

  // Handles item being updated e.g. title change, completed change...
  useEffect(() => {
    if (itemState?.id) {
      updateItem();
    }
  }, [itemState]);

  // Handles the item being deleted
  if (!itemState) {
    return null;
  }

  const createdDate = new Date(new Date(itemState.createdAt) - timezoneOffset)
    .toISOString()
    .slice(0, 10);
  const dueDate = new Date(new Date(itemState.dueDate) - timezoneOffset)
    .toISOString()
    .slice(0, 10);

  // set due date color based on how close it is to today
  const today = new Date(new Date() - timezoneOffset)
    .toISOString()
    .slice(0, 10);
  const daysUntilDue = Math.floor(
    (new Date(dueDate) - new Date(today)) / (1000 * 60 * 60 * 24)
  );

  let dueDateColor = "";
  if (!itemState.completed) {
    if (itemState.dueDate) {
      if (daysUntilDue < 0) {
        dueDateColor = "bg-danger";
      } else if (daysUntilDue < 7) {
        dueDateColor = "bg-warning";
      }
    }
  }

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

  function dueDateSubmit(event) {
    setItemState({
      ...itemState,
      dueDate: new Date(event.target.value).toISOString(),
    });
  }

  return (
    <ListGroupItem className="d-flex justify-content-between align-items-center border-start-0 border-top-0 border-end-0 border-bottom rounded-0 mb-2">
      <Container className="d-flex justify-content-between align-items-center">
        <CheckBox
          defaultChecked={itemState.completed}
          onChange={() => {
            setItemState({ ...itemState, completed: !itemState.completed });
          }}
        />
        <InlineEdit
          placeholder="New Task"
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
        <Col>
          <Form.Control
            type="date"
            name="dueDate"
            defaultValue={itemState.dueDate ? dueDate : ""}
            className={dueDateColor}
            onChange={dueDateSubmit}
          />
          <Form.Control
            type="date"
            name="createdAt"
            value={itemState.createdAt ? createdDate : ""}
            disabled
          />
        </Col>
      </Container>
      <CloseButton onClick={deleteItem} />
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
          <CheckListItem item={item} key={item.id} session={session} />
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
