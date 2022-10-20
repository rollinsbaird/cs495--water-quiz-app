import * as React from 'react';
import { useState } from 'react';
import { Grid, Box } from '@mui/material';
import NameCard from './Name_Card';

const faunadb = require('faunadb');
const client = new faunadb.Client({
  secret: process.env.REACT_APP_DB_KEY,
  endpoint: "https://db.fauna.com/",
});

var q = faunadb.query;
var data;
client.query(
  q.Paginate(
    q.Match(
      q.Index("all_quizzes")
    )
  )
)
.then(
  function (response) {
    data = response.data;
  },
  function () {
    console.log("Query failed!");
  }
);

// xs, extra-small: 0px
// sm, small: 600px
// md, medium: 900px
// lg, large: 1200px
// xl, extra-large: 1536px

const GridStyles = {
  width: "100%",
  backgroundColor: "lightblue",
  paddingRight: {
    xs: 10,
    sm: 10,
    md: 10,
    lg: 10,
    xl: 10,
  },
  paddingBottom: 10,
  marginTop: 2,
  marginLeft: "auto",
  marginRight: "auto",
}

const SelectQuiz = () => {
  const [quizzes, setQuizzes] = useState(data);

  return (
    <Box sx={{
      width: '100%',
      overflow: "auto",
    }}>
      <Grid container
        columns={{ xs: 2, md: 3, xl: 4 }}
        spacing={10}
        sx={GridStyles}>
        {Array.from(quizzes).map((quiz, index) => (
          <Grid item
            key={index}
            xs={2}
            sm={1}>
            <NameCard
              title={quiz[0]}
              description={quiz[1]}
              difficulty={quiz[2]}
              tags={quiz[3]} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default SelectQuiz;