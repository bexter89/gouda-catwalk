import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  IconButton,
  styled,
  Typography,
  ButtonGroup,
  Button,
  CardContent,
  CardMedia,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  question: {
    fontWeight: 'bold',
  },
  questionButtons: {
    justifyContent: 'flex-end',
    float: 'right',
  },
  loadAnswers: {
    marginLeft: '10%',
  },
}));

const QABlock = ({ questionObj }) => {
  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  // TODO: conditionally render only 2 answers, then use a button to show all answers
  // TODO: Report btn -> functionality to report the question

  const classes = useStyles();
  // style={{ boxShadow: 'none' }} <- add this to the card to remov ethe shadow
  return (
    <Card>
      <CardHeader />
      <CardContent>
        <Typography
          className={classes.question}
          variant="h5"
          color="textPrimary"
        >
          {`Q: ${questionObj.question_body}`}
          <ButtonGroup
            className={classes.questionButtons}
            variant="text"
            size="small"
            color="secondary"
          >
            <Button>Helpful? Yes({questionObj.question_helpfulness})</Button>
            <Button>Add Answer</Button>
          </ButtonGroup>
        </Typography>
        {Object.entries(questionObj.answers).map((element, key) => (
          <Typography key={key}>{`A: ${element[1].body}`}</Typography>
        ))}
      </CardContent>
      <Button className={classes.loadAnswers} variant="text">
        TODO: LOAD MORE ANSWERS
      </Button>
    </Card>
  );
};

export default QABlock;

/* questionObj
{
  "question_id": 425842,
  "question_body": "Who provides the chairs for the chair force?",
  "question_date": "2021-09-13T00:00:00.000Z",
  "asker_name": "Winnie the Pooh",
  "question_helpfulness": 0,
  "reported": false,
  "answers": {
      "3989501": {
          "id": 3989501,
          "body": "Close your eyes, and let the force guide you",
          "date": "2021-09-13T00:00:00.000Z",
          "answerer_name": "Bre Bre",
          "helpfulness": 0,
          "photos": []
      }
  }
}
*/
