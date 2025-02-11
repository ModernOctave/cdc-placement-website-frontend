import useStyles from "./styles";
import React from "react";
import StudentCard from "./StudentCard";
import { Grid, Typography } from "@material-ui/core";

const StudentList = ({ applicationsInfo }) => {
  const classes = useStyles();

  console.log(applicationsInfo);

  return (
    <div className={classes.studentCardContainer}>
      <Grid container spacing={2}>
        {applicationsInfo && applicationsInfo?.applications.length === 0 ? (
          <Grid item xs={12} s={12} md={12} lg={12}>
            <Typography
              style={{
                textAlign: "center",
              }}
            >
              No students have applied
            </Typography>
          </Grid>
        ) : (
          applicationsInfo?.applications.map((elem) => {
            return (
              <Grid key={elem.id} item xs={6} s={6} md={6} lg={4}>
                <StudentCard
                  name={elem.student_details.name}
                  batch={elem.student_details.batch}
                  branch={elem.student_details.branch}
                />
              </Grid>
            );
          })
        )}
      </Grid>
    </div>
  );
};

export default StudentList;
