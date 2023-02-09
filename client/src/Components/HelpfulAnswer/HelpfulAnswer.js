import React from "react";
import { useState } from "react";
function HelpfulAnswer() {
  const [helpfulCount, setHelpfulCount] = useState(5);
  return <input type="text">helpful? {helpfulCount}</input>;
}

export default HelpfulAnswer;
