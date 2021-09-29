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
    { obligatorName: "", unsecuredDebtForObligator: "" },
  ]);
  const classes = useStyles();
  const handleChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newFormValues = [...formValues];
    newFormValues[index]["obligatorName"] = e.target.value;
    // newFormValues[index]["value"] = e.target.value;
    setFormValues(newFormValues);
  };
  const handleChangee = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newFormValues = [...formValues];
    // newFormValues[index]["name"] = e.target.value;
    newFormValues[index]["unsecuredDebtForObligator"] = e.target.value;
    setFormValues(newFormValues);
    props.setUnsecuredDebtObligations(formValues);
  };

  const addFormFields = () => {
    setFormValues([
      ...formValues,
      { obligatorName: "", unsecuredDebtForObligator: "" },
    ]);
  };

  const removeFormFields = (index: number) => {
    let newFormValues = [...formValues];
    newFormValues.splice(index, 1);
    setFormValues(newFormValues);
  };

  return (
    <div>
      {formValues.map((element, index) => (
        <div className="form-inline" key={index}  style={{ display: "flex" }}>
          <Grid container spacing={1}>
            <Grid item md={6}>
              <TextField
                value={element.obligatorName || ""}
                type="string"
                name="name"
                variant="outlined"
                className={classes.field}
                required={
                  formValues[index].unsecuredDebtForObligator ? true : false
                }
                placeholder="Add obligatorName/names"
                onChange={(e: any) => handleChange(index, e)}
              />
            </Grid>
            <Grid item md={6}>
              <TextField
                value={element.unsecuredDebtForObligator || ""}
                type="number"
                name="name"
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
