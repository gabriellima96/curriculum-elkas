import React from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSignInAlt, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import Header from "./components/Header";
import Content from "./components/Content";

library.add(faSignInAlt, faUserPlus);

const App = () => (
  <div className="App">
    <Header />
    <Content />
  </div>
);

export default App;
