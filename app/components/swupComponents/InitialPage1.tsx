import Swup from "swup";
const swup = new Swup();

import React from "react";

type Props = {};

const InitialPage1 = (props: Props) => {
  return (
    <main id="swup" className="transition-fade">
      <h1>Welcome</h1>
      <p>Lorem ipsum dolor sit amet.</p>
    </main>
  );
};

export default InitialPage1;
