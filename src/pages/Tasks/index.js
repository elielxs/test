import React from 'react'
import { Helmet } from 'react-helmet';
import { Box, Container, Card } from '@material-ui/core';
import PerfectScrollbar from 'react-perfect-scrollbar';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import PhoneIcon from '@material-ui/icons/Phone';
import TabPanel from 'src/utils/components/TabPanel';
import AnnouncementIcon from '@material-ui/icons/Announcement';
import Returns from '../../components/returns/index';
import News from '../../components/news/index';

const Tasks = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Helmet>
        <title>Tarefas | CRM</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <Box sx={{ pt: 3 }}>
            <Card>
              <PerfectScrollbar>
                <Box sx={{ minWidth: 1050 }}>
                  <Tabs value={value} onChange={handleChange} aria-label="icon label tabs example">
                    <Tab icon={<PhoneIcon />} label="Retornos" />
                    <Tab icon={<AnnouncementIcon />} label="Novas" />
                  </Tabs>
                  <TabPanel value={value} index={0}>
                    <Returns></Returns>
                  </TabPanel>
                  <TabPanel value={value} index={1}>
                    <News></News>
                  </TabPanel>
                </Box>
              </PerfectScrollbar>

            </Card>
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default Tasks;