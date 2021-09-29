import React from "react";
import { Typography, makeStyles, Snackbar, Button } from "@material-ui/core";
import { useState } from "react";
import CurrentAssets from "./CurrentAssets";
import CurrentLiabilities from "./CurrentLiabilities";
import SecuredDebtObligations from "./SecuredDebtObligations";
import UnsecuredDebtObligations from "./UnsecuredDebtObligations";
import OtherAssets from "./OtherAssets";
import OtherLiabilities from "./OtherLiabilities";
import FileUpload from "../FileUpload";
import { submitFinancialReview } from "../../services/Api/userSubmission";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../reducers/loaderSlice";
import { useHistory, useLocation } from "react-router";
import { DASHBOARD } from "../../constants/routes";

// type Inputs = {
//   email: string;
//   password: string;
// };

const useStyles = makeStyles((theme) => ({
  typoGraphy: {
    textAlign: "center",
    marginBottom: "10px",
  },
  root: {
    flexGrow: 1,
  },
}));
export default function Form() {
  const classes = useStyles();
  const [currentAssetsObj, setCurrentAssetsObj] = useState<any>({
    cashAndEquivalents: "",
    cashAndEquivalentsNote: "",
    accountsReceivable: "",
    accountsReceivableNote: "",
    inventories: "",
    inventoriesNote: "",
    otherCurrentAssets: "",
    otherCurrentAssetsNote: "",
  });
  const [otherAssetsObj, setOtherAssetsObj] = useState<any>({
    FFAndE: "",
    FFAndENote: "",
    goodwillAndIntangibles: "",
    goodwillAndIntangiblesNote: "",
    otherAssets: "",
    otherAssetsNote: "",
  });
  const [currentLiabilitiesObj, setCurrentLiabilitiesObj] = useState<any>({
    accountsPayable: "",
    accountsPayableNote: "",
    accruedLiabilities: "",
    accruedLiabilitiesNote: "",
    otherCurrentLiabilities: "",
    otherCurrentLiabilitiesNote: "",
  });
  const [otherCapitalCommitments, setOtherCapitalCommitments] = useState("");
  const [otherCapitalCommitmentsNotes, setOtherCapitalCommitmentsNotes] =
    useState("");
  const [otherLiabilities, setOtherLiabilities] = useState<any>(0);
  const [otherLiabilitiesNotes, setOtherLiabilitiesNotes] = useState<any>(0);
  const [securedDebtObligations, setSecuredDebtObligations] = useState<any>([]);
  const [unsecuredDebtObligations, setUnsecuredDebtObligations] = useState([]);
  const [fileDataList, setFileDataList] = useState([]) as any;
  const [toastFlag, setToastFlag] = useState(false);
  const [errorMessage, setErrorMsg] = useState("");
  const [uploadErr, setUploadErr] = useState("");
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const supportedFormats = {
    "image/jpeg": 1,
    "image/png": 1,
    "image/heif": 1,
    "application/pdf": 1,
  } as any;
  const fileCanBeUploaded = 4;
  const handleFileUpload = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (evt.target!.files!.length + fileDataList.length > fileCanBeUploaded) {
      setErrorMsg(`Only upload upto ${fileCanBeUploaded} files at a time `);
      setToastFlag(true);
      return;
    }
    const fileList = evt.target!.files! as unknown as any[];
    let newFileDataList = [...fileDataList];
    for (const file of fileList) {
      if (!supportedFormats[file.type]) {
        setErrorMsg(
          `Unsupported document is provided. Supported document formats are PDF, JPG, PNG, HEIC.`
        );
        setToastFlag(true);
        setFileDataList([]);
        return;
      }
      if (file.size > 20 * 1000000) {
        setErrorMsg(`File Size should be less than 20MB.`);
        setToastFlag(true);
        setFileDataList([]);
        return;
      }
      newFileDataList = [...newFileDataList, file];
    }

    setFileDataList(newFileDataList);
  };

  const handleDelete = (index: number) => {
    const updatedFileList = [...fileDataList];
    updatedFileList.splice(index, 1);
    setFileDataList(updatedFileList);
  };
  const prepareData = () => {
    let isError = false;
    const formData = new FormData();
    Object.keys(currentAssetsObj).forEach((element) => {
      if (currentAssetsObj[element] < 0) {
        isError = true;
      }
      if (currentAssetsObj[element]) {
        formData.append(
          `assets[currentAssets][${element}]`,
          currentAssetsObj[element]
        );
      }
    });
    Object.keys(otherAssetsObj).forEach((element) => {
      if (otherAssetsObj[element] < 0) isError = true;
      if (otherAssetsObj[element])
        formData.append(
          `assets[otherAssets][${element}]`,
          otherAssetsObj[element]
        );
    });
    Object.keys(currentLiabilitiesObj).forEach((element) => {
      if (currentLiabilitiesObj[element] < 0) isError = true;
      if (currentLiabilitiesObj[element])
        formData.append(
          `liabilities[currentLiabilities][${element}]`,
          currentLiabilitiesObj[element]
        );
    });
    if (parseInt(otherLiabilities) < 0 || parseInt(otherCapitalCommitments) < 0)
      isError = true;
    if (otherLiabilities)
      formData.append(`liabilities[otherLiabilities]`, otherLiabilities);
    if (otherLiabilitiesNotes)
      formData.append(
        `liabilities[otherLiabilitiesNote]`,
        otherLiabilitiesNotes
      );
    if (otherCapitalCommitments)
      formData.append(
        `liabilities[otherCapitalCommitments]`,
        otherCapitalCommitments
      );
    if (otherCapitalCommitmentsNotes)
      formData.append(
        `liabilities[otherCapitalCommitmentsNote]`,
        otherCapitalCommitmentsNotes
      );
    securedDebtObligations.forEach((element: any, index: number) => {
      if (element.securedDebtForObligator < 0) isError = true;
      if (element.securedDebtForObligator) {
        formData.append(
          `liabilities[securedDebtObligations][${index}][securedDebtForObligator]`,
          element.securedDebtForObligator
        );
        formData.append(
          `liabilities[securedDebtObligations][${index}][obligatorName]`,
          element.obligatorName
        );
      }
    });
    unsecuredDebtObligations.forEach((element: any, index: number) => {
      if (element.unsecuredDebtForObligator < 0) isError = true;
      if (element.unsecuredDebtForObligator) {
        formData.append(
          `liabilities[unsecuredDebtObligations][${index}][unsecuredDebtForObligator]`,
          element.unsecuredDebtForObligator
        );
        formData.append(
          `liabilities[unsecuredDebtObligations][${index}][obligatorName]`,
          element.obligatorName
        );
      }
    });
    if (fileDataList.length === 0) {
      isError = true;
      setUploadErr("This is required field.");
    }
    fileDataList.forEach((element: any, index: number) => {
      if (element) formData.append(`balanceSheet`, element);
    });
    return { dataObj: formData, isError };
  };
  const onTrigger = async (e: any) => {
    e.preventDefault();
    prepareData();
    dispatch(showLoading());

    const { dataObj, isError } = prepareData();
    try {
      const { attestationId }: any = location.state;
      if (!isError) {
        await submitFinancialReview(attestationId, dataObj);
        history.push(DASHBOARD);
      }
    } catch (err: any) {
      setToastFlag(true);
      setErrorMsg(err?.response?.data?.message || "Internal Server Error");
    } finally {
      dispatch(hideLoading());
    }
  };
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div
        style={{
          width: "70%",
          margin: "30px",
          padding: "20px",
        }}
      >
        <form onSubmit={onTrigger}>
          <Typography variant="h4" style={{ textAlign: "center" }}>
            Net Assets
          </Typography>
          <div
            style={{
              marginTop: "20px",
              border: "2px solid #ccc",
              padding: "20px",
            }}
          >
            <Typography variant="h6" className={classes.typoGraphy}>
              Current Assets
            </Typography>
            <CurrentAssets
              setCurrentAssetsObj={setCurrentAssetsObj}
              currentAssetsObj={currentAssetsObj}
            />
          </div>
          <div
            style={{
              marginTop: "20px",
              border: "2px solid #ccc",
              padding: "20px",
            }}
          >
            <Typography variant="h6" className={classes.typoGraphy}>
              Other Assets
            </Typography>
            <OtherAssets
              otherAssetsObj={otherAssetsObj}
              setOtherAssetsObj={setOtherAssetsObj}
            />
          </div>
          <Typography
            variant="h4"
            className={classes.typoGraphy}
            style={{ marginTop: "33px" }}
          >
            Liabilities
          </Typography>
          <div
            style={{
              marginTop: "20px",
              border: "2px solid #ccc",
              padding: "20px",
            }}
          >
            <Typography variant="h6" className={classes.typoGraphy}>
              Current Liabilities
            </Typography>
            <CurrentLiabilities
              currentLiabilitiesObj={currentLiabilitiesObj}
              setCurrentLiabilitiesObj={setCurrentLiabilitiesObj}
            />
          </div>
          <div
            style={{
              marginTop: "20px",
              border: "2px solid #ccc",
              padding: "20px",
            }}
          >
            <Typography variant="h6" className={classes.typoGraphy}>
              Secured Debt Obligations{" "}
            </Typography>
            <SecuredDebtObligations
              securedDebtObligations={securedDebtObligations}
              setSecuredDebtObligations={setSecuredDebtObligations}
            />
          </div>
          <div
            style={{
              marginTop: "20px",
              border: "2px solid #ccc",
              padding: "20px",
            }}
          >
            <Typography variant="h6" className={classes.typoGraphy}>
              Unsecured Debt Obligations{" "}
            </Typography>
            <UnsecuredDebtObligations
              unsecuredDebtObligations={unsecuredDebtObligations}
              setUnsecuredDebtObligations={setUnsecuredDebtObligations}
            />
          </div>
          <div
            style={{
              marginTop: "20px",
              border: "2px solid #ccc",
              padding: "20px",
            }}
          >
            <OtherLiabilities
              otherLiabilities={otherLiabilities}
              setOtherLiabilities={setOtherLiabilities}
              otherCapitalCommitments={otherCapitalCommitments}
              setOtherCapitalCommitments={setOtherCapitalCommitments}
              otherCapitalCommitmentsNotes={otherCapitalCommitmentsNotes}
              setOtherCapitalCommitmentsNotes={setOtherCapitalCommitmentsNotes}
              otherLiabilitiesNotes={otherLiabilitiesNotes}
              setOtherLiabilitiesNotes={setOtherLiabilitiesNotes}
            />
          </div>
          <div
            style={{
              marginTop: "20px",
              border: "2px solid #ccc",
              padding: "20px",
            }}
          >
            <FileUpload
              fileDataList={fileDataList}
              handleChange={handleFileUpload}
              handleDelete={handleDelete}
              buttonText="Upload Files"
            />
            {uploadErr.length > 0 && (
              <div
                style={{
                  fontSize: "0.75rem",
                  marginTop: "5px",
                  fontFamily: "Heebo,Verdana,sans-serif",
                  color: "#f44336",
                }}
              >
                {uploadErr}
              </div>
            )}
          </div>
          <Button type="submit" variant="outlined" color="primary">
            Submit
          </Button>
        </form>
      </div>
      <Snackbar
        autoHideDuration={5 * 1000}
        open={toastFlag}
        message={errorMessage}
        onClose={() => setToastFlag(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      />
    </div>
  );
}
