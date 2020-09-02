import React, { useEffect, useState } from 'react';
import axios from "axios";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import NumberFormat from "react-number-format";
import TextField from '@material-ui/core/TextField';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import ReactLoading from 'react-loading';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import CancelIcon from '@material-ui/icons/Cancel';
import RestoreIcon from '@material-ui/icons/Restore';

// tab
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <div className="tab_country">{children}</div>
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
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
}

const useStylesTab = makeStyles((theme) => ({
  root: {
    margin: '0px auto',
    flexGrow: 1,
    width: "99%",
    marginTop: 25,
    backgroundColor: theme.palette.background.paper,
  },
}));
//

const useStylesFrom = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));
const useStyles = makeStyles({
  root1: {
    width: 250,
  },
  media1: {
    height: 140,
  },
  root: {
    width: "32.5%",
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

function Home() {
  const [latest, setLatest] = useState([]);
  const [results, setResults] = useState([]);
  const [searchCountries, setSearchCountries] = useState("");
  const classes = useStyles();
  const classesForm = useStylesFrom();
  const classesTab = useStylesTab();
  const [value, setValue] = React.useState(0);

  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    axios
      .all([
        axios.get("https://corona.lmao.ninja/v2/all"),
        axios.get("https://corona.lmao.ninja/v2/countries"),
      ])
      .then((responseArr) => {
        setLatest(responseArr[0].data);
        setResults(responseArr[1].data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const date = new Date(parseInt(latest.updated));
  const lastUpdated = date.toString();

  let array = []
  let asia_array = [];
  let euro_array = [];
  let africa_array = [];
  let north_ame_array = [];
  let south_ame_array = [];
  let australia_array = [];
  let other_array = [];
  results.forEach(element => {
    array.push(element.continent)
    if (element.continent === "Asia") {
      asia_array.push(element)
    } else if (element.continent === "Europe") {
      euro_array.push(element)
    } else if (element.continent === "Africa") {
      africa_array.push(element)
    } else if (element.continent === "North America") {
      north_ame_array.push(element)
    } else if (element.continent === "South America") {
      south_ame_array.push(element)
    } else if (element.continent === "Australia/Oceania") {
      australia_array.push(element)
    } else {
      other_array.push(element)
    }
  });
  if (value === 0) {
    asia_array = asia_array.filter((item) => {
      return searchCountries !== ""
        ? item.country.toLowerCase().includes(searchCountries.toLowerCase())
        : item;
    });
  } else if (value === 1) {
    euro_array = euro_array.filter((item) => {
      return searchCountries !== ""
        ? item.country.toLowerCase().includes(searchCountries.toLowerCase())
        : item;
    });
  } else if (value === 2) {
    africa_array = africa_array.filter((item) => {
      return searchCountries !== ""
        ? item.country.toLowerCase().includes(searchCountries.toLowerCase())
        : item;
    });
  } else if (value === 3) {
    north_ame_array = north_ame_array.filter((item) => {
      return searchCountries !== ""
        ? item.country.toLowerCase().includes(searchCountries.toLowerCase())
        : item;
    });
  } else if (value === 4) {
    south_ame_array = south_ame_array.filter((item) => {
      return searchCountries !== ""
        ? item.country.toLowerCase().includes(searchCountries.toLowerCase())
        : item;
    });
  } else if (value === 5) {
    australia_array = australia_array.filter((item) => {
      return searchCountries !== ""
        ? item.country.toLowerCase().includes(searchCountries.toLowerCase())
        : item;
    });
  } else {
    other_array = other_array.filter((item) => {
      return searchCountries !== ""
        ? item.country.toLowerCase().includes(searchCountries.toLowerCase())
        : item;
    });
  }
  const countries_asia = asia_array.map((data, i) => {
    return (
      <Card className={classes.root1} style={{ marginTop: 15, margin: 10 }} key={i}>
        <CardActionArea>
          <CardMedia
            className={classes.media1}
            image={data.countryInfo.flag}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {data.country}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p" style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#3a3a3a", fontWeight: 550 }}>Cases</span> <span style={{ color: "#006cf7" }}>{data.cases}</span>
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p" style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#3a3a3a", fontWeight: 550 }}>Deaths</span> <span style={{ color: "red" }}>{data.deaths}</span>
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p" style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#3a3a3a", fontWeight: 550 }}>Recovered</span> <span style={{ color: "green" }}>{data.recovered}</span>
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p" style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#3a3a3a", fontWeight: 550 }}>Today's cases</span> <span style={{ color: "#006cf7" }}>{data.todayCases}</span>
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p" style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#3a3a3a", fontWeight: 550 }}>Today's deaths</span> <span style={{ color: "red" }}>{data.todayDeaths}</span>
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p" style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#3a3a3a", fontWeight: 550 }}>Active</span> <span style={{ color: "#f16502" }}>{data.active}</span>
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p" style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#3a3a3a", fontWeight: 550 }}>Critical</span> <span>{data.critical}</span>
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  });
  const countries_euro = euro_array.map((data, i) => {
    return (
      <Card className={classes.root1} style={{ marginTop: 15, margin: 10 }} key={i}>
        <CardActionArea>
          <CardMedia
            className={classes.media1}
            image={data.countryInfo.flag}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {data.country}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p" style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#3a3a3a", fontWeight: 550 }}>Cases</span> <span style={{ color: "#006cf7" }}>{data.cases}</span>
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p" style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#3a3a3a", fontWeight: 550 }}>Deaths</span> <span style={{ color: "red" }}>{data.deaths}</span>
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p" style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#3a3a3a", fontWeight: 550 }}>Recovered</span> <span style={{ color: "green" }}>{data.recovered}</span>
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p" style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#3a3a3a", fontWeight: 550 }}>Today's cases</span> <span style={{ color: "#006cf7" }}>{data.todayCases}</span>
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p" style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#3a3a3a", fontWeight: 550 }}>Today's deaths</span> <span style={{ color: "red" }}>{data.todayDeaths}</span>
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p" style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#3a3a3a", fontWeight: 550 }}>Active</span> <span style={{ color: "#f16502" }}>{data.active}</span>
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p" style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#3a3a3a", fontWeight: 550 }}>Critical</span> <span>{data.critical}</span>
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  });
  const countries_africa = africa_array.map((data, i) => {
    return (
      <Card className={classes.root1} style={{ marginTop: 15, margin: 10 }} key={i}>
        <CardActionArea>
          <CardMedia
            className={classes.media1}
            image={data.countryInfo.flag}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {data.country}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p" style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#3a3a3a", fontWeight: 550 }}>Cases</span> <span style={{ color: "#006cf7" }}>{data.cases}</span>
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p" style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#3a3a3a", fontWeight: 550 }}>Deaths</span> <span style={{ color: "red" }}>{data.deaths}</span>
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p" style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#3a3a3a", fontWeight: 550 }}>Recovered</span> <span style={{ color: "green" }}>{data.recovered}</span>
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p" style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#3a3a3a", fontWeight: 550 }}>Today's cases</span> <span style={{ color: "#006cf7" }}>{data.todayCases}</span>
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p" style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#3a3a3a", fontWeight: 550 }}>Today's deaths</span> <span style={{ color: "red" }}>{data.todayDeaths}</span>
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p" style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#3a3a3a", fontWeight: 550 }}>Active</span> <span style={{ color: "#f16502" }}>{data.active}</span>
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p" style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#3a3a3a", fontWeight: 550 }}>Critical</span> <span>{data.critical}</span>
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  });
  const countries_north_ame = north_ame_array.map((data, i) => {
    return (
      <Card className={classes.root1} style={{ marginTop: 15, margin: 10 }} key={i}>
        <CardActionArea>
          <CardMedia
            className={classes.media1}
            image={data.countryInfo.flag}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {data.country}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p" style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#3a3a3a", fontWeight: 550 }}>Cases</span> <span style={{ color: "#006cf7" }}>{data.cases}</span>
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p" style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#3a3a3a", fontWeight: 550 }}>Deaths</span> <span style={{ color: "red" }}>{data.deaths}</span>
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p" style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#3a3a3a", fontWeight: 550 }}>Recovered</span> <span style={{ color: "green" }}>{data.recovered}</span>
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p" style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#3a3a3a", fontWeight: 550 }}>Today's cases</span> <span style={{ color: "#006cf7" }}>{data.todayCases}</span>
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p" style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#3a3a3a", fontWeight: 550 }}>Today's deaths</span> <span style={{ color: "red" }}>{data.todayDeaths}</span>
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p" style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#3a3a3a", fontWeight: 550 }}>Active</span> <span style={{ color: "#f16502" }}>{data.active}</span>
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p" style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#3a3a3a", fontWeight: 550 }}>Critical</span> <span>{data.critical}</span>
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  });
  const countries_south_ame = south_ame_array.map((data, i) => {
    return (
      <Card className={classes.root1} style={{ marginTop: 15, margin: 10 }} key={i}>
        <CardActionArea>
          <CardMedia
            className={classes.media1}
            image={data.countryInfo.flag}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {data.country}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p" style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#3a3a3a", fontWeight: 550 }}>Cases</span> <span style={{ color: "#006cf7" }}>{data.cases}</span>
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p" style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#3a3a3a", fontWeight: 550 }}>Deaths</span> <span style={{ color: "red" }}>{data.deaths}</span>
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p" style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#3a3a3a", fontWeight: 550 }}>Recovered</span> <span style={{ color: "green" }}>{data.recovered}</span>
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p" style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#3a3a3a", fontWeight: 550 }}>Today's cases</span> <span style={{ color: "#006cf7" }}>{data.todayCases}</span>
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p" style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#3a3a3a", fontWeight: 550 }}>Today's deaths</span> <span style={{ color: "red" }}>{data.todayDeaths}</span>
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p" style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#3a3a3a", fontWeight: 550 }}>Active</span> <span style={{ color: "#f16502" }}>{data.active}</span>
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p" style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#3a3a3a", fontWeight: 550 }}>Critical</span> <span>{data.critical}</span>
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  });
  const countries_australia = australia_array.map((data, i) => {
    return (
      <Card className={classes.root1} style={{ marginTop: 15, margin: 10 }} key={i}>
        <CardActionArea>
          <CardMedia
            className={classes.media1}
            image={data.countryInfo.flag}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {data.country}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p" style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#3a3a3a", fontWeight: 550 }}>Cases</span> <span style={{ color: "#006cf7" }}>{data.cases}</span>
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p" style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#3a3a3a", fontWeight: 550 }}>Deaths</span> <span style={{ color: "red" }}>{data.deaths}</span>
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p" style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#3a3a3a", fontWeight: 550 }}>Recovered</span> <span style={{ color: "green" }}>{data.recovered}</span>
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p" style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#3a3a3a", fontWeight: 550 }}>Today's cases</span> <span style={{ color: "#006cf7" }}>{data.todayCases}</span>
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p" style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#3a3a3a", fontWeight: 550 }}>Today's deaths</span> <span style={{ color: "red" }}>{data.todayDeaths}</span>
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p" style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#3a3a3a", fontWeight: 550 }}>Active</span> <span style={{ color: "#f16502" }}>{data.active}</span>
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p" style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#3a3a3a", fontWeight: 550 }}>Critical</span> <span>{data.critical}</span>
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  });
  const countries_other = other_array.map((data, i) => {
    return (
      <Card className={classes.root1} style={{ marginTop: 15, margin: 10 }} key={i}>
        <CardActionArea>
          <CardMedia
            className={classes.media1}
            image={data.countryInfo.flag}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {data.country}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p" style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#3a3a3a", fontWeight: 550 }}>Cases</span> <span style={{ color: "#006cf7" }}>{data.cases}</span>
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p" style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#3a3a3a", fontWeight: 550 }}>Deaths</span> <span style={{ color: "red" }}>{data.deaths}</span>
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p" style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#3a3a3a", fontWeight: 550 }}>Recovered</span> <span style={{ color: "green" }}>{data.recovered}</span>
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p" style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#3a3a3a", fontWeight: 550 }}>Today's cases</span> <span style={{ color: "#006cf7" }}>{data.todayCases}</span>
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p" style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#3a3a3a", fontWeight: 550 }}>Today's deaths</span> <span style={{ color: "red" }}>{data.todayDeaths}</span>
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p" style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#3a3a3a", fontWeight: 550 }}>Active</span> <span style={{ color: "#f16502" }}>{data.active}</span>
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p" style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#3a3a3a", fontWeight: 550 }}>Critical</span> <span>{data.critical}</span>
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  });
  var d = new Date();
  return (
    <div className="App">
      {results === 0 || latest.length === 0 ?
        <div style={{ display: "flex", justifyContent: "center", minHeight: "100vh", zIndex: 10, alignItems: "center" }}>
          <ReactLoading type="spinningBubbles" color="#006cf7" height={200} width={200} />
        </div> :
        <div>
          <h1 className="title_corona">COVID-19 Information</h1>
          <div className="content_corona">
            {d.toLocaleString().includes("2/9/") &&
              <div className="marquee">
                <p style={{ fontSize: 50 }}>Chúc mừng ngày quốc khánh Việt Nam <img style={{ width: 50 }} src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/1280px-Flag_of_Vietnam.svg.png" alt="viet-nam" /> (2/9)</p>
              </div>}
            <h2>The world</h2>
            <div style={{ display: "flex", justifyContent: 'space-between', padding: "0px 10px" }}>
              <Card className={classes.root} variant="outlined" style={{ border: "1px solid rgb(0, 108, 247)", background: "#006cf70a" }}>
                <CardContent>
                  <Typography variant="h5" component="h2">
                    <AssignmentIndIcon style={{ fontSize: 70, color: "rgb(0, 108, 247)" }} />
                  </Typography>
                  <Typography variant="h5" component="h2">
                    Cases
              </Typography>
                  <Typography variant="body2" component="p">
                    <NumberFormat
                      value={latest.cases}
                      displayType={"text"}
                      thousandSeparator={true}
                      style={{ fontSize: "30px" }}
                    />
                  </Typography>
                  <Typography className={classes.pos} color="textSecondary">
                    <small>Last updated: {lastUpdated}</small>
                  </Typography>
                </CardContent>
              </Card>
              <Card className={classes.root} variant="outlined" style={{ border: "1px solid red", background: "#ff000005" }}>
                <CardContent>
                  <Typography variant="h5" component="h2">
                    <CancelIcon style={{ fontSize: 70, color: "red" }} />
                  </Typography>
                  <Typography variant="h5" component="h2">
                    Deaths
              </Typography>
                  <Typography variant="body2" component="p">
                    <NumberFormat
                      value={latest.deaths}
                      displayType={"text"}
                      thousandSeparator={true}
                      style={{ fontSize: "30px" }}
                    />
                  </Typography>
                  <Typography className={classes.pos} color="textSecondary">
                    <small>Last updated: {lastUpdated}</small>
                  </Typography>
                </CardContent>
              </Card>
              <Card className={classes.root} variant="outlined" style={{ border: "1px solid green", background: "#0080000d" }}>
                <CardContent>
                  <Typography variant="h5" component="h2">
                    <RestoreIcon style={{ fontSize: 70, color: "green" }} />
                  </Typography>
                  <Typography variant="h5" component="h2">
                    Recovered
              </Typography>
                  <Typography variant="body2" component="p">
                    <NumberFormat
                      value={latest.recovered}
                      displayType={"text"}
                      thousandSeparator={true}
                      style={{ fontSize: "30px" }}
                    />
                  </Typography>
                  <Typography className={classes.pos} color="textSecondary">
                    <small>Last updated: {lastUpdated}</small>
                  </Typography>
                </CardContent>
              </Card>
            </div>
            <div className={classesTab.root}>
              <h2>Continents</h2>
              <AppBar position="static" color="default">
                <Tabs
                  value={value}
                  onChange={handleChangeTab}
                  variant="fullWidth"
                  scrollButtons="on"
                  indicatorColor="primary"
                  textColor="primary"
                  aria-label="scrollable force tabs example"
                >
                  <Tab label="Asia"  {...a11yProps(0)} />
                  <Tab label="Europe" {...a11yProps(1)} />
                  <Tab label="Africa" {...a11yProps(2)} />
                  <Tab label="North America" {...a11yProps(6)} />
                  <Tab label="South America"  {...a11yProps(4)} />
                  <Tab label="Australia/Oceania"  {...a11yProps(5)} />
                  <Tab label="Other" {...a11yProps(6)} />
                </Tabs>
              </AppBar>
              <TabPanel value={value} index={0}>
                <div style={{ display: "flex", justifyContent: 'center', padding: "10px 10px", width: "100%" }}>
                  <form className={classesForm.root} noValidate autoComplete="off">
                    <TextField id="outlined-basic" label="Search" variant="outlined" onChange={(e) => setSearchCountries(e.target.value)} />
                  </form>
                </div>
                {countries_asia}
              </TabPanel>
              <TabPanel value={value} index={1}>
                <div style={{ display: "flex", justifyContent: 'center', padding: "10px 10px", width: "100%" }}>
                  <form className={classesForm.root} noValidate autoComplete="off">
                    <TextField id="outlined-basic" label="Search" variant="outlined" onChange={(e) => setSearchCountries(e.target.value)} />
                  </form>
                </div>
                {countries_euro}
              </TabPanel>
              <TabPanel value={value} index={2}>
                <div style={{ display: "flex", justifyContent: 'center', padding: "10px 10px", width: "100%" }}>
                  <form className={classesForm.root} noValidate autoComplete="off">
                    <TextField id="outlined-basic" label="Search" variant="outlined" onChange={(e) => setSearchCountries(e.target.value)} />
                  </form>
                </div>
                {countries_africa}
              </TabPanel>
              <TabPanel value={value} index={3}>
                <div style={{ display: "flex", justifyContent: 'center', padding: "10px 10px", width: "100%" }}>
                  <form className={classesForm.root} noValidate autoComplete="off">
                    <TextField id="outlined-basic" label="Search" variant="outlined" onChange={(e) => setSearchCountries(e.target.value)} />
                  </form>
                </div>
                {countries_north_ame}
              </TabPanel>
              <TabPanel value={value} index={4}>
                <div style={{ display: "flex", justifyContent: 'center', padding: "10px 10px", width: "100%" }}>
                  <form className={classesForm.root} noValidate autoComplete="off">
                    <TextField id="outlined-basic" label="Search" variant="outlined" onChange={(e) => setSearchCountries(e.target.value)} />
                  </form>
                </div>
                {countries_south_ame}
              </TabPanel>
              <TabPanel value={value} index={5}>
                <div style={{ display: "flex", justifyContent: 'center', padding: "10px 10px", width: "100%" }}>
                  <form className={classesForm.root} noValidate autoComplete="off">
                    <TextField id="outlined-basic" label="Search" variant="outlined" onChange={(e) => setSearchCountries(e.target.value)} />
                  </form>
                </div>
                {countries_australia}
              </TabPanel>
              <TabPanel value={value} index={6}>
                <div style={{ display: "flex", justifyContent: 'center', padding: "10px 10px", width: "100%" }}>
                  <form className={classesForm.root} noValidate autoComplete="off">
                    <TextField id="outlined-basic" label="Search" variant="outlined" onChange={(e) => setSearchCountries(e.target.value)} />
                  </form>
                </div>
                {countries_other}
              </TabPanel>
            </div>
          </div>
          <div >
            <div style={{
              margin: "0 0 5px 0", padding: 0, width: 30, position: "fixed", left: 0, top: "50%", transform: "translateY(-50%)",
              border: "1px solid #282c34", background: "#fff", padding: 5, borderRadius: 2
            }}>
              <a href='https://rakapit.dockyard.biz' target='_blank'><img border='0' src='https://www.humancrest.co.jp/uploads/news/img_path15e86dc9f63c6c.png' width='30' /></a>
            </div></div>
        </div>
      }
    </div >
  );
}

export default Home;
