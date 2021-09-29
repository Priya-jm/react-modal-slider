import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { useState } from "react";
export default function CurrentAssets(props: any) {
  const [cashAndEquivalentsVal, setcashAndEquivalentsVal] = useState(NaN);
  const [accountsReceivableVal, setaccountsReceivableVal] = useState(NaN);
  const [inventoriesVal, setinventoriesVal] = useState(NaN);
  const [otherCurrentAssetsVal, setotherCurrentAssetsVal] = useState(NaN);
  const [otherCurrentAssetsValNote, setotherCurrentAssetsValNote] =
    useState("");
  return (
    <Grid container spacing={1}>
      <Grid item md={3}>
        <Typography>
          Cash & Equivalents
        </Typography>
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
              error={cashAndEquivalentsVal < 0 ? true: false}
              helperText={
                cashAndEquivalentsVal < 0
                  ? "Number should be greator or equal to 0"
                  : ""
              }
              onChange={(e) => {
                setcashAndEquivalentsVal(parseInt(e.target.value));
                props.setCurrentAssetsObj({
                  ...props.currentAssetsObj,
                  cashAndEquivalents: e.target.value,
                });
              }}
              style={{width: '100%'}}
            />
          </Grid>
          <Grid item md={6}>
            {(cashAndEquivalentsVal || cashAndEquivalentsVal === 0) && (
              <TextField
                label=""
                placeholder="Add notes(optional)"
                variant="outlined"
                type="string"
                onChange={(e) => {
                  const currentAssetsObjValNote = e.target.value;
                  props.setCurrentAssetsObj({
                    ...props.currentAssetsObj,
                    cashAndEquivalentsNote: currentAssetsObjValNote,
                  });
              
                }}
                style={{width: '100%'}}
              />
            )}
          </Grid>
        </Grid>
      </Grid>
      <Grid item md={3}>
        <Typography>
          Accounts Receivable
        </Typography>
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
              error={accountsReceivableVal < 0 ? true : false}
              helperText={
                accountsReceivableVal < 0
                  ? "Number should be greator or equal to 0"
                  : ""
              }
              onChange={(e) => {
                setaccountsReceivableVal(parseInt(e.target.value));
                props.setCurrentAssetsObj({
                  ...props.currentAssetsObj,
                  accountsReceivable: e.target.value,
                });
              }}
              style={{width: '100%'}}
            />
          </Grid>
          <Grid item md={6}>
            {(accountsReceivableVal || accountsReceivableVal === 0) && (
              <TextField
                label=""
                placeholder="Add notes(optional)"
                variant="outlined"
                type="string"
                onChange={(e) => {
                  const accountsReceivableValNote = e.target.value;
                  props.setCurrentAssetsObj({
                    ...props.currentAssetsObj,
                    accountsReceivableNote: accountsReceivableValNote,
                  });
                }}
                style={{width: '100%'}}
              />
            )}
          </Grid>
        </Grid>
      </Grid>
      <Grid item md={3}>
        <Typography>Inventories</Typography>
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
              error={inventoriesVal < 0 ? true : false}
              helperText={
                inventoriesVal < 0
                  ? "Number should be greator or equal to 0"
                  : ""
              }
              onChange={(e) => {
                setinventoriesVal(parseInt(e.target.value));
                props.setCurrentAssetsObj({
                  ...props.currentAssetsObj,
                  inventories: e.target.value,
                });
              }}
              style={{width: '100%'}}
            />
          </Grid>
          <Grid item md={6}>
            {(inventoriesVal || inventoriesVal === 0) && (
              <TextField
                label=""
                placeholder="Add notes(optional)"
                variant="outlined"
                type="string"
                onChange={(e) => {
                  const inventoriesValNote = e.target.value;
                  props.setCurrentAssetsObj({
                    ...props.currentAssetsObj,
                    inventoriesNote: inventoriesValNote,
                  });
                }}
                style={{width: '100%'}}
              />
            )}
          </Grid>
        </Grid>
      </Grid>
      <Grid item md={3}>
        <Typography>
          Other Current Assets
        </Typography>
      </Grid>
      <Grid item md={9}>
        <Grid container spacing={1}>
          <Grid item md={6}>
            <TextField
              label=""
              placeholder="Add Value"
              variant="outlined"
              type="number"
              error={otherCurrentAssetsVal < 0 ? true : false}
              helperText={
                otherCurrentAssetsVal < 0
                  ? "Number should be greator or equal to 0"
                  : ""
              }
              onChange={(e) => {
                setotherCurrentAssetsVal(parseInt(e.target.value));
                props.setCurrentAssetsObj({
                  ...props.currentAssetsObj,
                  otherCurrentAssets: e.target.value,
                });
              }}
              style={{width: '100%'}}
            />
          </Grid>
          <Grid item md={6}>
            {(otherCurrentAssetsVal || otherCurrentAssetsVal === 0) && (
              <TextField
                label=""
                variant="outlined"
                required
                placeholder="Add notes(required)"
                type="notes"
                value={otherCurrentAssetsValNote.trimStart()}
                onChange={(e) => {
                  setotherCurrentAssetsValNote(e.target.value);
                  props.setCurrentAssetsObj({
                    ...props.currentAssetsObj,
                    otherCurrentAssetsNote: e.target.value,
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
