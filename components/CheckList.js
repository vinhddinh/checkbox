import { ListGroupItem } from "react-bootstrap";
import { ToggleButtonCheckboxProps } from "react-bootstrap";

export default function CheckListItem({ item }) {
  // change the state of the item when the checkbox is clicked
  return (
    <ListGroupItem className="d-flex justify-content-between align-items-center border-start-0 border-top-0 border-end-0 border-bottom rounded-0 mb-2">
      <div class="d-flex align-items-center">
        <input class="form-check-input me-2" type="checkbox" />
        <span className={item.isComplete ? "text-decoration-line-through" : ""}>
          {" "}
          {item.text}{" "}
        </span>
      </div>
    </ListGroupItem>
  );
}
