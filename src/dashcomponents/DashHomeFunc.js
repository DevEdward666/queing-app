import {
  Container,
  InputAdornment,
  makeStyles,
  useTheme,
  TextField,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import img from "../images/browser.png";
import {
  action_set_data,
  action_set_app,
  action_get_apk,
  action_get_pages_search,
} from "../Services/Actions/Dashboard_Actions";
import SearchIcon from "@material-ui/icons/Search";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";

import Grid from "@material-ui/core/Grid";
import Rating from "@material-ui/lab/Rating";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}
function DashHomeFunc() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [starvalue, setStarValue] = React.useState(4.5);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };
  const auth = window.localStorage.getItem("tokenizer");
  const [deps, setdeps] = useState([]);
  const [ApkAppName, setApkAppName] = useState("");
  const dispatch = useDispatch();
  const [image, setimage] = useState([]);
  const pages = useSelector((state) => state.Dashboard_Reducer.data);
  const apps = useSelector((state) => state.Dashboard_Reducer.AppData);
  const handleOnchange = (event) => {
    dispatch(action_get_pages_search(event.target.value));
  };
  const handleInstallAppClick = (card) => {
    window.location.href = `${process.env.REACT_APP_BASE_URL}/api/ns/getapkdashboard?apkname=${card.AppApkName}`;
  };

  const handleImageLoaded = async (pagename) => {
    let mounted = true;
    const encodedValue = encodeURIComponent(pagename);
    var url = `${process.env.REACT_APP_BASE_URL}/api/ns/getimage?joborderid=${encodedValue}`;
    var bearer_token = auth;
    var bearer = "Bearer " + bearer_token;
    await fetch(url, {
      method: "POST",
      withCredentials: true,
      headers: {
        Authorization: bearer,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw Error("Error Fetching Data");
        }
        return response.blob();
      })
      .then((res) => {
        console.log(res);
        setimage(URL.createObjectURL(res));

        mounted = false;
        //setimage(URL.createObjectURL(res));
      })
      .catch((err) => {
        throw Error(err.message);
      });
  };

  useEffect(() => {
    dispatch(action_set_data());
    dispatch(action_set_app());
  }, [dispatch]);
  const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
      alignContent: "right",
      width: "100%",
    },
    Gridroot: {
      flexGrow: 1,
    },
    root: {
      backgroundColor: theme.palette.background.paper,
      width: 500,
    },
    CardRoot: {
      backgroundColor: theme.palette.background.paper,
      width: 150,

      marginBottom: 50,
      elevation: 6,
    },
    media: {
      height: 100,
      width: 100,
      objectFit: "contain",
      alignSelf: "center",
      alignItems: "center",
      margin: "auto",
      display: "block",
    },
    textClass: {
      fontSize: 12,
      fontWeight: "bold",
    },
    textChildClass: {
      fontSize: 10,
      fontWeight: "bold",
    },
  }));
  const classes = useStyles();
  return (
    <div className="container">
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="Web Apps" {...a11yProps(0)} />
          <Tab label="Android APK" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <div className="container">
            <Container fixed>
              <TextField
                className={classes.margin}
                id="input-with-icon-textfield"
                placeholder="Search Pages"
                onChange={handleOnchange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <div className="row">
                {/* <img src={image} style={{ width: 50, height: 50 }} /> */}
                {pages?.map((card) => (
                  <div className="col-md-4 " key={card.id}>
                    {/* {handleImageLoaded(card.name)} */}
                    {/* <div className="title" style={{ color: "black" }}>
                {card.name}
              </div> */}
                    <a href={card.url}>
                      <div
                        className="content"
                        style={{ backgroundColor: "white" }}
                      >
                        <div className="icon">
                          <div
                            className="title"
                            style={{ color: "black", fontSize: 12 }}
                          >
                            {card.name}
                          </div>
                          <img
                            alt=""
                            style={{ objectFit: "contain" }}
                            height="100%"
                            width="100%"
                            src={`${process.env.REACT_APP_BASE_URL}/${card.scheme}`}
                          />
                        </div>
                      </div>
                    </a>
                  </div>
                ))}
              </div>
            </Container>
          </div>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <div className="row">
            {apps?.map((card) => (
              <div className="col-md-2 ">
                <Card className={classes.CardRoot}>
                  <CardActionArea>
                    <CardMedia
                      className={classes.media}
                      image={`${process.env.REACT_APP_BASE_URL}/${card.AppImage}`}
                    />
                    <CardContent>
                      <Typography className={classes.textClass}>
                        {card.AppName}
                      </Typography>
                      <Typography className={classes.textChildClass}>
                        {card.AppVersion}
                      </Typography>
                      {/* <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        Lizards are a widespread group of squamate reptiles,
                        with over 6,000 species, ranging across all continents
                        except Antarctica
                      </Typography> */}
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Grid container className={classes.Gridroot} spacing={2}>
                      <Grid item xs={12}>
                        <Button
                          size="small"
                          color="primary"
                          value={card.AppApkName}
                          text={card.AppApkName}
                          onClick={() => handleInstallAppClick(card)}
                        >
                          Download
                        </Button>
                      </Grid>
                      <Grid item xs={12}>
                        <Box
                          component="fieldset"
                          mb={3}
                          borderColor="transparent"
                        >
                          <Rating
                            name="simple-controlled"
                            value={starvalue}
                            onChange={(event, newValue) => {
                              setStarValue(newValue);
                            }}
                          />
                        </Box>
                      </Grid>
                    </Grid>
                  </CardActions>
                </Card>
              </div>
            ))}
          </div>
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}
export default DashHomeFunc;
