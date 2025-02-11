import API_ENDPOINT from "../../api/api_endpoint";

const GetApplications = (token, opening_id) => {
  return new Promise((myResolve, myReject) => {
    if (token) {
      fetch(
        API_ENDPOINT + "api/admin/getApplications/?opening_id=" + opening_id,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + token,
          },
        }
      )
        .then((result) => {
          if (result.status === 200) myResolve(result.json());
          else throw new Error("Error " + result.status);
        })
        .catch((err) => {
          myReject(false);
        });
    } else {
      myReject(false);
    }
  });
};

const ExportAsExcel = (token, opening_id) => {
  return new Promise((myResolve, myReject) => {
    console.log(opening_id);
    if (token) {
      fetch(API_ENDPOINT + "api/admin/generateCSV/", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ opening_id: opening_id }),
      })
        .then((result) => {
          console.log(result);
          if (result.status === 200) myResolve(result.json());
          else throw new Error("Error " + result.status);
        })
        .catch((err) => {
          console.log("here noe ");
          console.log(err);
          myReject(false);
        });
    } else {
      console.log("hrerer ");
      return myReject(false);
    }
  });
};

export { GetApplications, ExportAsExcel };
