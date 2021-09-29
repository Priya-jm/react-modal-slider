import React, { useState, useEffect } from "react";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
  CardHeader,
} from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../reducers/loaderSlice";
import { getBorrowerSummary } from "../../services/Api/profile";
import { UserSummaryDataInterface } from "../../interfaces/UserSummaryInterface";
import { LIMIT_ID } from "../../constants/text";

const useStyles = makeStyles((theme) => ({
  cardStyle: {
    boxShadow: "none",
    border: "1px solid #ccc",
  },
  table: {
    minWidth: 650,
    '& strong': {
      fontWeight: 500,
    },
  },
  pagination: {
    marginTop: theme.spacing(2),
    justifyContent: "center",
    display: "flex",
  },
  bgcolor: {
    backgroundColor: "rgb(248, 249, 251)",
    color: "black",
  },
}));

const Summary = () => {
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [userSummary, setUserSummary] = useState(
    [] as unknown as UserSummaryDataInterface[]
  );

  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    const fetchSummary = async (): Promise<void> => {
      dispatch(showLoading());
      try {
        const res = await getBorrowerSummary(page);
        setTotalPage(res.metadata[0].totalPage);
        setUserSummary(
          res.userSubmissions.map((submissionData) => {
            return {
              id: submissionData._id,
              submissionDate: preapareDate(submissionData.updatedAt),
            };
          })
        );
      } catch (err) {
        console.log(err);
      }
      dispatch(hideLoading());
    };

    fetchSummary();
    // eslint-disable-next-line
  }, [page]);

  const preapareDate = (dateString: string): string => {
    return moment(dateString).format("MMM Do YYYY").toString();
  };

  const handlePagination = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  return (
    <div>
      <Card className={classes.cardStyle}>
        <CardHeader title="Attestation History" className={classes.bgcolor} />
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Sr.no</TableCell>
                <TableCell align="center">Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userSummary && userSummary.length > 0 ? (
                userSummary.map((data, index) => (
                  <TableRow key={data.id}>
                    <TableCell align="center" component="th" scope="row">
                      <strong>
                        Attestation - {(page - 1) * LIMIT_ID + 1 + index}
                      </strong>
                    </TableCell>
                    <TableCell align="center">{data.submissionDate}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={2}
                    align="center"
                    component="th"
                    scope="row"
                  >
                    You have not done any submission yet.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
      {userSummary && userSummary.length > 0 ? (
        <div className={classes.pagination}>
          <Pagination
            count={totalPage}
            page={page}
            onChange={handlePagination}
            color="primary"
          />
        </div>
      ) : null}
    </div>
  );
};

export default Summary;
