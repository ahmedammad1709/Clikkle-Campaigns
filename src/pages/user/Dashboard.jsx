import Sync from "@mui/icons-material/Sync";
import { Box, Divider, Grid, Paper } from "@mui/material";
import ActionIcon from "../../components/ActionIcon";
import Typography from "../../components/Typography";
import GoogleMap from "../../components/googleMap";
import SimpleLineChart from "../../components/charts/SimpleLineChart";
import BasicBarChart from "../../components/charts/BasicBarChart";
import BasicPie from "../../components/charts/BasicPiChart";
import { useTheme } from "../../styles/theme";

const ctorData = [0, 0.45, 20.45, 17.67, 3.5, 3.8, 10.5, 6.67, 4.6];
const ctrData = [0, 0.45, 15.45, 10.67, 0.5, 2.8, 10.5, 4.67, 2.6];
const openRate = [35, 32, 31, 28, 27, 25, 22, 20, 18];
const xLabelCtr = [
  "2020 Jan",
  "2020 Feb",
  "2020 Mar",
  "2020 Apr",
  "2020 May",
  "2020 July",
  "2020 Aug",
  "2020 Sept",
  "2020 Nov",
];
const emailSent = [250, 460, 500, 1200, 1500, 5000, 6000, 15000, 20000];
const emailOpenedUnique = [100, 200, 50, 400, 200, 100, 20, 300, 200];
const subData = [2000, 300, 2000, 5000, 4000, 6000, 6000, 8000, 8450];
const unSubData = [1000, 400, 600, 2000, 1200, 600, 800, 500, 900];
const draftData = [100, 300, 400, 200, 600, 700, 500, 600, 400];
const scheduledData = [20, 30, 700, 800, 30, 40, 400, 600, 300];
const completedData = [10, 30, 50, 60, 400, 300, 200, 300, 400];
const dataset = [
  {
    emailSent: 1259,
    openRate: 27,
    ctr: 4.6,
    ctor: 10.1,
    name: "Mark",
  },
  {
    emailSent: 1059,
    openRate: 20,
    ctr: 3.6,
    ctor: 11.1,
    name: "John",
  },
  {
    emailSent: 1000,
    openRate: 17,
    ctr: 3.6,
    ctor: 12.4,
    name: "Bob",
  },
  {
    emailSent: 500,
    openRate: 5.7,
    ctr: 2.6,
    ctor: 2.1,
    name: "Aj",
  },
];
const datasetCtor = [
  {
    emailSent: 12,
    openRate: 200,
    ctr: 100,
    ctor: 50.1,
    name: "Mark",
  },
  {
    emailSent: 10,
    openRate: 200,
    ctr: 90.56,
    ctor: 45.1,
    name: "John",
  },
  {
    emailSent: 6,
    openRate: 100,
    ctr: 80,
    ctor: 30,
    name: "Bob",
  },
  {
    emailSent: 5,
    openRate: 70,
    ctr: 40,
    ctor: 20,
    name: "Aj",
  },
];

function Dashboard() {
  // const [tourOpen,setTourOpen] = useState(null)
  // const navigate = useNavigate();
  // const handleNavigation = ()=>{
  // 	setTimeout(()=>{
  //      navigate('/create')
  // 	},5000)
  // }
  // const steps = [
  // 	{
  // 		selector: '.create',
  // 		content: () => (
  // 		  <div>
  // 			<h3>Welcome! Campaigns Dashboard </h3>
  // 			{/* {handleNavigation()} */}
  // 			<p> first step click on create button</p>
  // 		  </div>
  // 		),
  // 	  },
  //   ];
  //   useEffect(() => {
  //   const openValue =   localStorage.getItem('tourOpen')
  //   if(openValue){
  // 		setTourOpen(openValue==='true');
  //   }else{
  // 	setTourOpen(true);
  //   }
  // }, [ ]);
  const { mode } = useTheme();

  return (
    <Box>
      {/* {tourOpen && <GuidedTour steps={steps} open={tourOpen}/>} */}

      <Grid container spacing={1}>
        <Grid item md xs={12}>
          <Typography variant="h5" gutterBottom>
            Analytics Overview
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Manage your segments from here.{" "}
          </Typography>
        </Grid>
        <Grid item md xs={12} align="right">
          <ActionIcon color="primary" title="Sync" icon={<Sync />} />
        </Grid>
      </Grid>
      {/* <Divider sx={{ marginTop: 2, marginBottom: 3.15 }} /> */}
      <Grid
        container
        spacing={1}
        marginY={"1rem"}
        marginLeft={"0px"}
        marginRight={"0px"}
      >
        <Box
          sx={{
            width: "100%",
            boxShadow: "none",
            border: `1px solid ${mode === "dark" ? "#292929" : "#D6D6D6"}`,
            padding: { xs: 2, sm: 3 },
            borderRadius: 2,
          }}
        >
          <Grid
            container
            spacing={1}
            display={"flex"}
            justifyContent={"space-between"}
          >
            <Grid xs={12} md={2} item>
              <Typography>234,56</Typography>
              <Typography>Emails Sent</Typography>
            </Grid>
            <Grid item xs={12} md={2}>
              <Typography>19.89%</Typography>
              <Typography>Open Rate</Typography>
            </Grid>
            <Grid item xs={12} md={2}>
              <Typography>1.3%</Typography>
              <Typography>CTR</Typography>
            </Grid>
            <Grid item xs={12} md={2}>
              <Typography>6.7%</Typography>
              <Typography>CTOR</Typography>
            </Grid>
            <Grid item xs={12} md={2}>
              <Typography>26,56</Typography>
              <Typography>Emails Opened Unique</Typography>
            </Grid>
            <Grid item xs={12} md={2}>
              <Typography>234,56</Typography>
              <Typography>Emails Clicked Unique</Typography>
            </Grid>
          </Grid>
        </Box>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4} className="open-rate">
          <Box
            sx={{
              boxShadow: "none",
              border: `1px solid ${mode === "dark" ? "#292929" : "#D6D6D6"}`,
              padding: { xs: 2, sm: 3 },
              borderRadius: 2,
            }}
          >
            <Typography variant="h6">Open Rate, CTR & CTOR by Date</Typography>
            <div style={{ width: "100%", height: "400px" }}>
              <SimpleLineChart
                series={[
                  { data: openRate, label: "Open Rate" },
                  { data: ctorData, label: "CTOR" },
                  { data: ctrData, label: "CTR" },
                ]}
                xAxis={[{ scaleType: "point", data: xLabelCtr }]}
              />
            </div>
          </Box>
        </Grid>
        <Grid item xs={12} md={4} className="emails-sent">
          <Box
            sx={{
              boxShadow: "none",
              border: `1px solid ${mode === "dark" ? "#292929" : "#D6D6D6"}`,
              padding: { xs: 2, sm: 3 },
              borderRadius: 2,
            }}
          >
            <Typography variant="h6">Emails Sent and Unique Opens</Typography>
            <div style={{ width: "100%", height: "400px" }}>
              <SimpleLineChart
                series={[
                  { data: emailSent, label: "Emails Sent" },
                  { data: emailOpenedUnique, label: "Emails Opened Unique" },
                ]}
                xAxis={[{ scaleType: "point", data: xLabelCtr }]}
              />
            </div>
          </Box>
        </Grid>
        <Grid item xs={12} md={4} className="conversion-rate">
          <Box
            sx={{
              boxShadow: "none",
              border: `1px solid ${mode === "dark" ? "#292929" : "#D6D6D6"}`,
              padding: { xs: 2, sm: 3 },
              borderRadius: 2,
            }}
          >
            <Typography variant="h6">Conversion Rates</Typography>
            <div style={{ width: "100%", height: "400px" }}>
              <BasicBarChart
                series={[
                  { data: [1200], stack: "A", label: "Emails Sent" },
                  { data: [500], stack: "B", label: "Opened" },
                  { data: [230], stack: "C", label: "Opened Unique" },
                  { data: [200], stack: "D", label: "Links Clicked" },
                  { data: [100], stack: "E", label: "Clicked Unique" },
                ]}
              />
            </div>
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={2} marginY={"0.2rem"}>
        <Grid item xs={12} md={8} className="contacts-by-status">
          <Box
            sx={{
              boxShadow: "none",
              border: `1px solid ${mode === "dark" ? "#292929" : "#D6D6D6"}`,
              padding: { xs: 2, sm: 3 },
              borderRadius: 2,
            }}
          >
            <Typography variant="h6">Contacts by Status</Typography>
            <Grid container spacing={1}>
              <Grid item xs={12} md={6}>
                <GoogleMap />
              </Grid>
              <Grid item xs={12} md={6}>
                <div style={{ width: "100%", height: "400px" }}>
                  <BasicPie
                    series={[
                      {
                        data: [
                          { id: 0, value: 60, label: "Active", color: "green" },
                          {
                            id: 1,
                            value: 40,
                            label: "Unsubscribe",
                            color: "orange",
                          },
                        ],
                        highlightScope: {
                          faded: "global",
                          highlighted: "item",
                        },
                        faded: {
                          innerRadius: 30,
                          additionalRadius: -30,
                          color: "gray",
                        },
                      },
                    ]}
                  />
                </div>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={12} md={4} className="subscribers-un-subscriber">
          <Box
            sx={{
              boxShadow: "none",
              border: `1px solid ${mode === "dark" ? "#292929" : "#D6D6D6"}`,
              padding: { xs: 2, sm: 3 },
              borderRadius: 2,
            }}
          >
            <Typography variant="h6">Subscribers & UnSubscribers</Typography>

            <div style={{ width: "100%", height: "400px" }}>
              <SimpleLineChart
                series={[
                  { data: subData, label: "sub" },
                  { data: unSubData, label: "unSub" },
                ]}
                xAxis={[{ scaleType: "point", data: xLabelCtr }]}
              />
            </div>
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={2} marginY={"0.2rem"}>
        <Grid item xs={12} md={4} className="latest-sent">
          <Box
            sx={{
              boxShadow: "none",
              border: `1px solid ${mode === "dark" ? "#292929" : "#D6D6D6"}`,
              padding: { xs: 2, sm: 3 },
              borderRadius: 2,
            }}
          >
            <Typography variant="h6">
              Latest Sent Campaigns as of 13 Jan 2021
            </Typography>
            <div style={{ width: "100%", height: "400px" }}>
              <BasicBarChart
                dataset={dataset}
                xAxis={[{ scaleType: "band", dataKey: "name" }]}
                series={[
                  { dataKey: "emailSent", label: "Emails Sent" },
                  { dataKey: "openRate", label: "Open Rate" },
                  { dataKey: "ctr", label: "CTR" },
                  { dataKey: "ctor", label: "CTOR" },
                ]}
              />
            </div>
          </Box>
        </Grid>
        <Grid item xs={12} md={4} className="top-campaigns-by-ctor">
          <Box
            sx={{
              boxShadow: "none",
              border: `1px solid ${mode === "dark" ? "#292929" : "#D6D6D6"}`,
              padding: { xs: 2, sm: 3 },
              borderRadius: 2,
            }}
          >
            <Typography variant="h6">Top Campaigns by CTR</Typography>
            <div style={{ width: "100%", height: "400px" }}>
              <BasicBarChart
                dataset={datasetCtor}
                xAxis={[{ scaleType: "band", dataKey: "name" }]}
                series={[
                  { dataKey: "emailSent", label: "Emails Sent" },
                  { dataKey: "openRate", label: "Open Rate" },
                  { dataKey: "ctr", label: "CTR" },
                  { dataKey: "ctor", label: "CTOR" },
                ]}
              />
            </div>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              boxShadow: "none",
              border: `1px solid ${mode === "dark" ? "#292929" : "#D6D6D6"}`,
              padding: { xs: 2, sm: 3 },
              borderRadius: 2,
            }}
          >
            <Typography variant="h6">
              Campaigns by Last Date Sent & Status
            </Typography>
            <div style={{ width: "100%", height: "400px" }}>
              <SimpleLineChart
                series={[
                  {
                    data: draftData,
                    label: "Draft",
                    area: true,
                    curve: "natural",
                  },
                  {
                    data: scheduledData,
                    label: "Scheduled",
                    area: true,
                    curve: "natural",
                  },
                  {
                    data: completedData,
                    label: "Completed",
                    area: true,
                    curve: "natural",
                  },
                ]}
                xAxis={[{ scaleType: "point", data: xLabelCtr }]}
              />
            </div>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;
