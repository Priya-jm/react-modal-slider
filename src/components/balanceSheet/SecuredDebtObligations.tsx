import React from "react";
import { Grid, TextField } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import { useState } from "react";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  field: {
    width: "90%",
    marginTop: "1.3rem",
  },
}));
const InputRemoveAdd = (props: any) => {
  const [formValues, setFormValues] = useState([
    { obligatorName: "", securedDebtForObligator: "" },
  ]);
  const classes = useStyles();
  const handleChange = (i: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const newFormValues = [...formValues];
    newFormValues[i]["obligatorName"] = e.target.value;
    setFormValues(newFormValues);
    props.setSecuredDebtObligations(formValues);
  };
  const handleChangee = (i: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const newFormValues = [...formValues];
    newFormValues[i]["securedDebtForObligator"] = e.target.value;
    setFormValues(newFormValues);
    props.setSecuredDebtObligations(formValues);
  };

  const addFormFields = () => {
    setFormValues([
      ...formValues,
      { obligatorName: "", securedDebtForObligator: "" },
    ]);
  };

  const removeFormFields = (i: number) => {
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues);
  };
  return (
    <div>
      {formValues.map((element, index) => (
        <div className="form-inline" key={index} style={{ display: "flex" }}>
          <Grid container spacing={1}>
            <Grid item md={6}>
              <TextField
                value={element.obligatorName || ""}
                type="string"
                name="obligatorName"
                variant="outlined"
                required={
                  formValues[index].securedDebtForObligator ? true : false
                }
                className={classes.field}
                placeholder="Add obligatorName/names"
                onChange={(e: any) => handleChange(index, e)}
              />
            </Grid>
            <Grid item md={6}>
              <TextField
                value={element.securedDebtForObligator || ""}
                type="number"
                name="obligatorName"
                variant="outlined"
                required={formValues[index].obligatorName ? true : false}
                className={classes.field}
                placeholder="Add value"
                onChange={(e: any) => handleChangee(index, e)}
              />
            </Grid>
          </Grid>

          {formValues.length > 1 ? (
            <IconButton
              type="button"
              aria-label="delete"
              className={classes.margin}
              onClick={() => removeFormFields(index)}
            >
              <DeleteIcon fontSize="medium" />
            </IconButton>
          ) : null}
        </div>
      ))}
      <div className="button-section" style={{ textAlign: "right" }}>
        <IconButton
          className={classes.margin}
          type="button"
          onClick={() => addFormFields()}
        >
       
          <Button variant="outlined" startIcon={<AddIcon fontSize="medium" />}>
          Add
        </Button>
        </IconButton>
      
      </div>
    </div>
  );
};

export default InputRemoveAdd;
