import { useState } from "react";

function Collapsible({ header, children }) {
  const [open, setOpen] = useState(true);
  const toggleCollapseHandler = () => {
    setOpen((prevState) => !prevState);
  };
  return (
    <div>
      {/* Collapse Header ----Start---- */}
      <div onClick={toggleCollapseHandler}>{header} ›</div>
      {/* Collapse Header ----End---- */}

      {/* Collapse Body ----Start---- */}
      <div style={{ display: open ? "block" : "none" }}>{children}</div>
      {/* Collapse Body ----End---- */}
    </div>
  );
}

export default Collapsible;
