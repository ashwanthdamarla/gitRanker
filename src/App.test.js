import React from "react";
import { shallow, configure } from "enzyme";
import App from "./App";
import GitRanker from "./GitRanker";


describe("App", () => {
  it("App renders correctly", () => {
    shallow(<App />);
  });

  it("GitRanker Component exists in the App.", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(GitRanker)).toHaveLength(1);
  });
});
