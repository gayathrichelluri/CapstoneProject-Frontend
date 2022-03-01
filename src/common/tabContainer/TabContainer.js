import React, {useState} from "react";
import {Tab, Tabs} from "@material-ui/core";

const TabContainer = ({tabs, tabIndicatorColor, setAction}) => {
  const [tab, setTab] = useState(0);

  const onTabChange = (event, value) => {
      setTab(value);
      setAction(tabs[value])
  }

  return (
      <Tabs
          value={tab}
          onChange={onTabChange}
          indicatorColor="primary"
          variant="fullWidth"
          TabIndicatorProps={{
            style: {
              backgroundColor: tabIndicatorColor,
            }
          }}

      >
        {tabs.map((tab, idx) => <Tab key={idx} label={tab} /> )}
      </Tabs>
  );
};

export default TabContainer;
