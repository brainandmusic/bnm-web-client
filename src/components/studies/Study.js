import React from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

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
        <Box paddingTop={2}>
          {children}
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
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}


const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    width: '100%',
  },
  divider: {
    marginBottom: theme.spacing(2)
  }
}))

function Study() {
  const { studyId } = useParams();
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper className={classes.root}>
      <Typography component="h1" variant="subtitle1" gutterBottom>
        Study Title
      </Typography>
      <Typography component="h2" variant="h4" gutterBottom>
        Dummy Title
      </Typography>
      <Divider className={classes.divider} />
      <Typography component="h1" variant="subtitle1" gutterBottom>
        Study Description
      </Typography>
      <Typography component="h2" variant="body1" gutterBottom>
        Dummy Description
      </Typography>
      <Divider className={classes.divider} />
      <Typography component="h1" variant="subtitle1" gutterBottom>
        Experiments
      </Typography>
      <Typography component="h2" variant="body1" gutterBottom>
        a list of experiments that this study includes are shown here.
        probably will replace this typography with other div or list elements.
      </Typography>
      <Tabs
        value={value}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChange}
        aria-label="study tabs"
        variant="scrollable"
        scrollButtons="auto"
      >
        <Tab label="Team Members" {...a11yProps(0)} />
        <Tab label="Experiments" {...a11yProps(1)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        In this page, admin can add/remove team members as set their rights.
        </TabPanel>
      <TabPanel value={value} index={1}>
        In addition, admin can add/ remove experiments from the study.
        So there should be two tabs.
        Note: this won't affect the existence of the experiments themselves.
        </TabPanel>
      <div>
      </div>
    </Paper>
  );
}

export default Study;
