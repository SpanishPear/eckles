import { HashLink as Link } from 'react-router-hash-link';
import React from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

import ContentCards from '../../component/ContentCards';
import makePage from '../../component/makePage';
import { Context, useContext } from '../../context';
import Youtube from '../../component/Youtube';
import { getYoutubeCodeFromUrl } from '../../util/content';
import TitleCard from '../../component/TitleCard';
import SectionHeader from '../../component/SectionHeader';

const ContentTutorialsSingle = () => {
  const { getters, setters } = useContext(Context);
  const navigate = useNavigate();
  const [ tutorial, setTutorial ] = React.useState(null);
  const params = useParams();

  console.log(params);
  React.useEffect(() => {
    const candidates = getters.content.content_tutorials.filter(c => c.key === params.tutid);
    if (candidates.length === 1) {
      setTutorial(candidates[0]);
    }
  }, [params.tutid]);

  React.useEffect(() => {
    if (tutorial !== null) {
      setters.setTitle(`Tutorial: ${tutorial.key}`);
    }
  }, [tutorial]);

  if (!tutorial) {
    return <></>;
  }

  return (
    <>
      <Button variant="outlined" size="small" onClick={() => navigate(-1)}>← Back</Button>

      <SectionHeader>
        {tutorial.topic().emoji} <b>{tutorial.key}</b> &nbsp; (part of <Link to={`/${getters.term}/content/tutorials/topic#${tutorial.topic().name}`}>{tutorial.topic().name}</Link> in {tutorial.topic().area().name})
      </SectionHeader>

      <Box sx={{ ml: 1, mb: 3 }}>
        <Typography variant="body1" gutterBottom>
          {tutorial.name}
        </Typography>
      </Box>

      <Box sx={{ ml: 1, mb: 3 }}>
        <Typography variant="body1" gutterBottom>
          This exercise is {tutorial.importance}
        </Typography>
      </Box>

      <Box sx={{ ml: 1, mb: 3 }}>
        <Typography variant="body1" gutterBottom>
          Duration: {tutorial.duration} minutes ⏱️
        </Typography>
      </Box>

      <Button variant="contained" size="large">
      	<a style={{ color: '#fff' }} target="_blank" href={`/redirect/?path=COMP6080/${getters.term}/students/_/exercises/-/tree/main/${tutorial.key}`}>
      	  View activity on gitlab
      	</a>
      </Button>

    </>
  );

  return <>hello</>;  
};

export default makePage(ContentTutorialsSingle, {
  loginRequired: true,
  title: '',
});;