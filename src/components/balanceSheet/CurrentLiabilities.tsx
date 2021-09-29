import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { useState } from "react";
export default function CurrentLiabilities(props: any) {
  const [accountPayableVal, setaccountPayableVal] = useState(NaN);
  const [accruedLiabilitiesVal, setaccruedLiabilitiesVal] = useState(NaN);
  const [otherCurrentLiabilitiesVal, setotherCurrentLiabilitiesVal] =
    useState(NaN);
  const [otherCurrentLiablitiesValnote, setotherCurrentLiablitiesValnote] =
    useState("");
  return (
    <Grid container spacing={1}>
      <Grid item md={3}>
        <Typography>Accounts Payable</Typography>
      </Grid>
      <Grid item md={9}>
        <Grid container spacing={1}>
          <Grid item md={6}>
            <TextField
              label=""
              variant="outlined"
              placeholder="Add Value"
              type="number"
              required
              error={accountPayableVal < 0 ? true : false}
              helperText={
                accountPayableVal < 0
                  ? "Number should be greator or equal to 0"
                  : ""
              }
              onChange={(e) => {
                setaccountPayableVal(parseInt(e.target.value));
                props.setCurrentLiabilitiesObj({
                  ...props.currentLiabilitiesObj,
                  accountsPayable: e.target.value,
                });
              }}
              style={{width: '100%'}}
            />
          </Grid>
          <Grid item md={6}>
            {accountPayableVal || accountPayableVal === 0 ? (
              <TextField
                label=""
                variant="outlined"
                type="string"
                placeholder="Add note(optional)"
                onChange={(e) => {
                  let accountPayableValnote = e.target.value;
                  props.setCurrentLiabilitiesObj({
                    ...props.currentLiabilitiesObj,
                    accountsPayableNote: accountPayableValnote,
                  });
                }}
                style={{width: '100%'}}
              />
            ) : (
              ""
            )}
          </Grid>
        </Grid>
      </Grid>
      <Grid item md={3}>
        <Typography>Accrued Liabilities</Typography>
      </Grid>
      <Grid item md={9}>
        <Grid container spacing={1}>
          <Grid item md={6}>
            <TextField
              label=""
              variant="outlined"
              placeholder="Add Value"
              type="number"
              required
              error={accruedLiabilitiesVal < 0 ? true : false}
              helperText={
                accruedLiabilitiesVal < 0
                  ? "Number should be greator or equal to 0"
                  : ""
              }
              onChange={(e) => {
                setaccruedLiabilitiesVal(parseInt(e.target.value));
                props.setCurrentLiabilitiesObj({
                  ...props.currentLiabilitiesObj,
                  accruedLiabilities: e.target.value,
                });
              }}
              style={{width: '100%'}}
            />
          </Grid>
          <Grid item md={6}>
            {accruedLiabilitiesVal || accruedLiabilitiesVal === 0 ? (
              <TextField
                label=""
                variant="outlined"
                placeholder="Add note(optional)"
                type="string"
                onChange={(e) => {
                  let accruedLiabilitiesValnote = e.target.value;
                  props.setCurrentLiabilitiesObj({
                    ...props.currentLiabilitiesObj,
                    accruedLiabilitiesNote: accruedLiabilitiesValnote,
                  });
                }}
                style={{width: '100%'}}
              />
            ) : (
              ""
            )}
          </Grid>
        </Grid>
      </Grid>
      <Grid item md={3}>
        <Typography>Other Current Liabilities</Typography>
      </Grid>
      <Grid item md={9}>
        <Grid container spacing={1}>
          <Grid item md={6}>
            <TextField
              label=""
              variant="outlined"
              placeholder="Add Value"
              type="number"
              error={otherCurrentLiabilitiesVal < 0 ? true : false}
              helperText={
                otherCurrentLiabilitiesVal < 0
                  ? "Number should be greator or equal to 0"
                  : ""
              }
              onChange={(e) => {
                setotherCurrentLiabilitiesVal(parseInt(e.target.value));
                props.setCurrentLiabilitiesObj({
                  ...props.currentLiabilitiesObj,
                  otherCurrentLiabilities: e.target.value,
                });
              }}
              style={{width: '100%'}}
            />
          </Grid>
          <Grid item md={6}>
            {(otherCurrentLiabilitiesVal ||
              otherCurrentLiabilitiesVal === 0) && (
              <TextField
                label=""
                variant="outlined"
                type="string"
                placeholder="Add note(required)"
                required
                value={otherCurrentLiablitiesValnote.trimStart()}
                onChange={(e) => {
                  setotherCurrentLiablitiesValnote(e.target.value);
                  props.setCurrentLiabilitiesObj({
                    ...props.currentLiabilitiesObj,
                    otherCurrentLiabilitiesNote: e.target.value,
                  });
                }}
                style={{width: '100%'}}
              />
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
