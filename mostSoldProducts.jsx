/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-no-target-blank */
import { Box, Container, Grid, Tab, Tabs, Typography } from "@mui/material";
import CategoriesStyle from "./style";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./categories.css";
import { useSelector } from "react-redux";
import { useGetHomepageQuery } from './api'; // Import the RTK Query hook

import MostSellCategoriesData from "./MostSellCategoriesData";
import Skeletoncard from "../Skeletoncard";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index, name) {
  return {
    id: `${index}`,
    name: name,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const MostSoldProduct = () => {
  const [value, setValue] = useState(0);
  const [filterProduct, setFilterProduct] = useState([]);
  const { data: homepageData, error, isLoading } = useGetHomepageQuery();

  const handleChange = (event, newValue) => {
    const selectedCategoryName = homepageData?.mostSellCat[newValue]?.name;
    setFilterProduct(
      homepageData?.mostSellProduct.filter(
        (item) => item.category.name === selectedCategoryName
      ) || []
    );
    setValue(newValue);
  };

  useEffect(() => {
    if (homepageData) {
      const selectedCategoryName = homepageData?.mostSellCat[0]?.name;
      const prod = homepageData?.mostSellProduct.filter(
        (item) => item.category.name === selectedCategoryName
      );
      setFilterProduct(prod);
    }
  }, [homepageData]);

  // console.log(filterProduct, "after on change");

  return (
    <Box sx={CategoriesStyle.mainBox}>
      <Container maxWidth="100%">
        <Typography sx={CategoriesStyle.CategoryTypo} data-aos="fade-down">
          Most Sold Products of Different Categories
        </Typography>
        <Typography
          mt={3}
          sx={CategoriesStyle.CategoryTypo2}
          data-aos="fade-up"
        >
          Across various categories, certain products reign supreme. Funnels,
          Websites, Dashboards, Logos
        </Typography>

        <Grid container>
          <Box sx={{ width: "100%", marginTop: { md: "3rem", xs: "3rem" } }}>
            <Box data-aos="fade-up">
              <Tabs
                scrollButtons
                allowScrollButtonsMobile
                variant="scrollable"
                TabIndicatorProps={{ sx: { display: "none" } }}
                sx={{
                  "& .MuiTabs-flexContainer": {
                    justifyContent: {
                      md: "space-around",
                      xs: "auto",
                      sm: "auto",
                      // lg: "space-around",
                    },
                    display: { sm: "flex", md: "flex" },
                    // flexDirection: { xs: "column" },
                    gap: 2,
                  },
                  "@media (max-width: 1380px)": {
                    "& .MuiTabs-flexContainer": {
                      justifyContent: "flex-start",
                    },
                  },
                }}
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                {homepageData?.mostSellCat?.map((item, index) => (
                  <Tab
                    label={item.name}
                    {...a11yProps(index, item.name)}
                    key={index}
                  />
                ))}
              </Tabs>
            </Box>

            {homepageData?.mostSellCat?.map((item, ind) => (
              <TabPanel value={value} index={ind} key={ind}>
                {isLoading ? (
                  <Skeletoncard cards={3} />
                ) : (
                  <Grid
                    container
                    spacing={3}
                    sx={{ marginTop: { md: "0.4rem", xs: "0.5rem" } }}
                  >
                    <MostSellCategoriesData filterProduct={filterProduct} />
                  </Grid>
                )}
              </TabPanel>
            ))}
          </Box>
        </Grid>
      </Container>
    </Box>
  );
};

export default MostSoldProduct;
