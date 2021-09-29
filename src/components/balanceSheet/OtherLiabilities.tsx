import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { useState } from "react";
export default function OtherLiabilities(props: any) {
  const [otherCapitalCommitmentsVal, setotherCapitalCommitmentsVal] =
    useState(NaN);
  const [otherLiabilitiesVal, setotherLiabilitiesVal] = useState(NaN);
  const [otherCapitalCommitmentsValnote, setotherCapitalCommitmentsValnote] =
    useState("");
  const [otherLiabilitiesValnote, setotherLiabilitiesValnote] = useState("");
  return (
    <Grid container spacing={1}>
      <Grid item md={3}>
        <Typography>Other Capital Commitments</Typography>
      </Grid>
      <Grid item md={9}>
        <Grid container spacing={1}>
          <Grid item md={6}>
            <TextField
              label=""
              variant="outlined"
              type="number"
              placeholder="Add Value"
              error={otherCapitalCommitmentsVal < 0 ? true : false}
              helperText={
                otherCapitalCommitmentsVal < 0
                  ? "Number should be greator or equal to 0"
                  : ""
              }
              onChange={(e) => {
                setotherCapitalCommitmentsVal(parseInt(e.target.value));
                props.setOtherCapitalCommitments(e.target.value);
              }}
              style={{width: '100%'}}
            />
          </Grid>
          <Grid item md={6}>
            {otherCapitalCommitmentsVal || otherCapitalCommitmentsVal === 0 ? (
              <TextField
                label=""
                variant="outlined"
                type="string"
                required
                placeholder="Add note(required)"
                value={otherCapitalCommitmentsValnote.trimStart()}
                onChange={(e) => {
                  setotherCapitalCommitmentsValnote(e.target.value);
                  props.setOtherCapitalCommitmentsNotes(e.target.value);
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
        <Typography>Other Liabilities</Typography>
      </Grid>
      <Grid item md={9}>
        <Grid container spacing={1}>
          <Grid item md={6}>
            <TextField
              label=""
              variant="outlined"
              placeholder="Add Value"
              type="number"
              error={otherLiabilitiesVal < 0 ? true : false}
              helperText={
                otherLiabilitiesVal < 0
                  ? "Number should be greator or equal to 0"
                  : ""
              }
              onChange={(e) => {
                setotherLiabilitiesVal(parseInt(e.target.value));
                props.setOtherLiabilities(e.target.value);
              }}
              style={{width: '100%'}}
            />
          </Grid>
          <Grid item md={6}>
            {otherLiabilitiesVal || otherLiabilitiesVal === 0 ? (
              <TextField
                label=""
                variant="outlined"
                type="string"
                required
                placeholder="Add note(required)"
                value={otherLiabilitiesValnote.trimStart()}
                onChange={(e) => {
                  setotherLiabilitiesValnote(e.target.value);
                  props.setOtherLiabilitiesNotes(e.target.value);
                }}
                style={{width: '100%'}}
              />
            ) : (
              ""
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
