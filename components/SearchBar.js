import { InputGroup, FormControl } from "react-bootstrap";

export default function SearchBar({ onChange, onFocus }) {
  return (
    <InputGroup className="mb-3">
      <FormControl
        placeholder="Search"
        aria-label="Search"
        aria-describedby="basic-addon1"
        onChange={onChange}
        onFocus={onFocus}
      />
    </InputGroup>
  );
}
