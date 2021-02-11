import React from "react";
import { shallow, configure } from "enzyme";
import GitRanker from "./GitRanker";
import { Button } from "@material-ui/core";

describe("GitRanker", () => {
  it("GitRanker renders correctly", () => {
    shallow(<GitRanker />);
  });

  it("GitRanker renders with props loaded successful.", () => {
    const wrapper = shallow(
      <GitRanker
        id="c0441ab6-3e45-414b-87e8-b6956345328b"
        profile="dkulkarni"
      />
    );
    expect(wrapper.state("configData")).toEqual(
      "c0441ab6-3e45-414b-87e8-b6956345328b"
    );
    expect(wrapper.state("profile")).toEqual("dkulkarni");
  });

  it("GitRanker button exists.", () => {
    const wrapper = shallow(
      <GitRanker
        id="c0441ab6-3e45-414b-87e8-b6956345328b"
        profile="dkulkarni"
      />
    );
    const fetchButton = wrapper.find(Button);
    expect(fetchButton).toBeTruthy();
  });

  it("GitRanker Loading Text on Button Click render successful.", () => {
    const wrapper = shallow(
      <GitRanker
        id="c0441ab6-3e45-414b-87e8-b6956345328b"
        profile="dkulkarni"
      />
    );
    wrapper.setState({ loading: true });
    const fetchButton = wrapper.find(Button);

    expect(
      fetchButton.text().includes("Crunching 50 million developers...")
    ).toBe(true);
  });

  it("GitRanker fetch API and check if data is updated.", async () => {
    const wrapper = shallow(
      <GitRanker
        id="c0441ab6-3e45-414b-87e8-b6956345328b"
        profile="dkulkarni"
      />
    );
    await wrapper.instance().getRankData();
    wrapper.update();
    expect(wrapper.state("rankData")).toBeTruthy();
  });
});
