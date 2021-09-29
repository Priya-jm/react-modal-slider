import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import useStyles from './styles';

type CardSummaryProps = {
  label: string;
  value: string | number;
};

const CardSummary: React.FC<CardSummaryProps> = (props) => {
  const { label, value } = props;
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent>
        <div>
          <div>
            <Typography variant='h5' align='center'>
              {label}
            </Typography>
          </div>
          <p>{value}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardSummary;
