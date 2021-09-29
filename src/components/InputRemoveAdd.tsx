import React from "react";
import { TextField } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import { useState } from "react";

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
const InputRemoveAdd = () => {
  const [formValues, setFormValues] = useState([{ name: "" }]);
  const classes = useStyles();
  const handleChange = (i: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const newFormValues = [...formValues];
    newFormValues[i]["name"] = e.target.value;
    setFormValues(newFormValues);
  };

  const addFormFields = () => {
    setFormValues([...formValues, { name: "" }]);
  };

  const removeFormFields = (i: number) => {
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    alert(JSON.stringify(formValues));
  };

  return (
    <div>
      {formValues.map((element, index) => (
        <div className="form-inline" key={index}>
          <TextField
            value={element.name || ""}
            type="text"
            name="name"
            className={classes.field}
            label="Name"
            variant="outlined"
            color="primary"
            onChange={(e: any) => handleChange(index, e)}
          />
          {index ? (
            <IconButton
              type="button"
              aria-label="delete"
              className={classes.margin}
              onClick={() => removeFormFields(index)}
            >
              <DeleteIcon fontSize="large" />
            </IconButton>
          ) : null}
        </div>
      ))}
      <div className="button-section">
        <IconButton
          className={classes.margin}
          type="button"
          onClick={() => addFormFields()}
        >
          <AddIcon fontSize="large" />
        </IconButton>
        <IconButton
          aria-label="delete"
          className={classes.margin}
          type="submit"
          onClick={handleSubmit}
        >
          Submit
        </IconButton>
      </div>
    </div>
  );
};

export default InputRemoveAdd;
