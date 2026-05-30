
import { useState } from "react";

const Counter = () => {
  const [inc, setInc] = useState(0);

  return (
    <button className="btn" onClick={() => setInc((prev) => prev + 1)}>
      Add - {inc}
    </button>
  );
};

export default Counter;
