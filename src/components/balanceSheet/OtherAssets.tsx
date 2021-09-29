import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { useState } from "react";
export default function OtherAssets(props: any) {
  const [FFAndEVal, setFFAndEVal] = useState(NaN);
  const [goodwillAndIntangiblesVal, setgoodwillAndIntangiblesVal] =
    useState(NaN);
  const [OtherAssetsVal, setOtherAssetsVal] = useState(NaN);
  return (
    <div>
      <Grid container spacing={1}>
        <Grid item md={3}>
          <Typography>FF&E</Typography>
        </Grid>
        <Grid item md={9}>
          <Grid container spacing={1}>
            <Grid item md={6}>
              <TextField
                label=""
                placeholder="Add Value"
                variant="outlined"
                type="number"
                required
                error={FFAndEVal < 0 ? true : false}
                helperText={
                  FFAndEVal < 0 ? "Number should be greator or equal to 0" : ""
                }
                onChange={(e) => {
                  setFFAndEVal(parseInt(e.target.value));
                  props.setOtherAssetsObj({
                    ...props.otherAssetsObj,
                    FFAndE: e.target.value,
                  });
                }}
                style={{width: '100%'}}
              />{" "}
            </Grid>
            <Grid item md={6}>
              {" "}
              {(FFAndEVal || FFAndEVal === 0) && (
                <TextField
                  label=""
                  variant="outlined"
                  placeholder="Add note(optional)"
                  type="string"
                  onChange={(e) => {
                    const FFAndEValnote = e.target.value;
                    props.setOtherAssetsObj({
                      ...props.otherAssetsObj,
                      FFAndENote: FFAndEValnote,
                    });
                  }}
                  style={{width: '100%'}}
                />
              )}{" "}
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={3}>
          <Typography>Goodwill & Intangibles</Typography>
        </Grid>
        <Grid item md={9}>
          <Grid container spacing={1}>
            <Grid item md={6}>
              <TextField
                label=""
                placeholder="Add Value"
                variant="outlined"
                required
                type="number"
                error={goodwillAndIntangiblesVal < 0 ? true : false}
                helperText={
                  goodwillAndIntangiblesVal < 0
                    ? "Number should be greator or equal to 0"
                    : ""
                }
                onChange={(e) => {
                  setgoodwillAndIntangiblesVal(parseInt(e.target.value));
                  props.setOtherAssetsObj({
                    ...props.otherAssetsObj,
                    goodwillAndIntangibles: e.target.value,
                  });
                }}
                style={{width: '100%'}}
              />
            </Grid>
            <Grid item md={6}>
              {" "}
              {(goodwillAndIntangiblesVal || goodwillAndIntangiblesVal === 0) && (
                <TextField
                  label=""
                  variant="outlined"
                  placeholder="Add note(optional)"
                  type="string"
                  onChange={(e) => {
                    let goodwillAndIntangiblesValnote = e.target.value;
                    props.setOtherAssetsObj({
                      ...props.otherAssetsObj,
                      goodwillAndIntangiblesNote: goodwillAndIntangiblesValnote,
                    });
                  }}
                  style={{width: '100%'}}
                />
              )}
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={3}>
          <Typography>Other Assets</Typography>
        </Grid>
        <Grid item md={9}>
          <Grid container spacing={1}>
            <Grid item md={6}>
              <TextField
                label=""
                placeholder="Add Value"
                variant="outlined"
                type="number"
                required
                error={OtherAssetsVal < 0 ? true : false}
                helperText={
                  OtherAssetsVal < 0
                    ? "Number should be greator or equal to 0"
                    : ""
                }
                onChange={(e) => {
                  setOtherAssetsVal(parseInt(e.target.value));
                  props.setOtherAssetsObj({
                    ...props.otherAssetsObj,
                    otherAssets: e.target.value,
                  });
                }}
                style={{width: '100%'}}
              />
            </Grid>
            <Grid item md={6}>
              {(OtherAssetsVal || OtherAssetsVal === 0) && (
                <TextField
                  label=""
                  variant="outlined"
                  placeholder="Add note(optional)"
                  type="string"
                  onChange={(e) => {
                    let otherAssetsNoteVal = e.target.value;
                    props.setOtherAssetsObj({
                      ...props.otherAssetsObj,
                      otherAssetsNote: otherAssetsNoteVal,
                    });
                  }}
                  style={{width: '100%'}}
                />
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
