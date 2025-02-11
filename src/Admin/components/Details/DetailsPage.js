import { useState, useEffect } from "react";
import Details from "./Details";
import Header from "./Header";
import useStyles from "./styles";
import { GetApplications } from "../../api/details_page";
import StudentList from "./StudentList";

const DetailsPage = ({
  dashboardInfo,
  auth,
  match,
  token,
  setShowLoader,
  setError,
  setShowError,
  setSuccess,
  setShowSuccess,
  getDashboardInfo,
  setAuth,
  setToken,
}) => {
  const classes = useStyles();
  const [applicationsInfo, setapplicationsInfo] = useState(null);
  const [openingId, setopeningId] = useState(null);
  const [studentsApplied, setstudentsApplied] = useState(0);
  const [reqJobPosting, setreqJobPosting] = useState(null);

  const getApplicationsInfo = () => {
    if (token) {
      GetApplications(token, openingId)
        .then((res) => {
          const data = res;
          setapplicationsInfo(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    setopeningId(match.params.id);
    getApplicationsInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [match, token, openingId]);

  useEffect(() => {
    if (applicationsInfo != null && applicationsInfo.message === "Data Found") {
      setstudentsApplied(applicationsInfo.applications.length);
    }
  }, [applicationsInfo]);

  useEffect(() => {
    let reqJob = [];
    if (dashboardInfo && dashboardInfo[0]?.ongoing.length !== 0) {
      reqJob = dashboardInfo[0]?.ongoing.filter((elem) => {
        return elem.id === openingId;
      });
    }
    if (reqJob.length === 0 && dashboardInfo[0]?.previous.length !== 0) {
      reqJob = dashboardInfo[0]?.previous.filter((elem) => {
        return elem.id === openingId;
      });
    }
    setreqJobPosting(...reqJob);
  }, [dashboardInfo, openingId]);

  console.log(reqJobPosting);

  return (
    <div className={classes.container}>
      <Details />
      <div className={classes.rightContainer}>
        <Header
          studentsApplied={studentsApplied}
          token={token}
          openingId={openingId}
          reqJobPosting={reqJobPosting}
        />
        <StudentList applicationsInfo={applicationsInfo} />
      </div>
    </div>
  );
};

export default DetailsPage;
