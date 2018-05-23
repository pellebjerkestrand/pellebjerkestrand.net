import React from 'react';

import Card from '../components/card';
import Link from '../components/link';
import LinkItems from '../components/link-items';
import Name from '../components/name';
import Slide from '../components/slide';
import Title from '../components/title';

const Home = () => (
  <Slide>
    <Card>
      <Name>Pelle Bjerkestrand</Name>
      <Title>Programmer</Title>
      <LinkItems>
        <Link icon="🐥" text="Twitter" url="https://twitter.com/notpelle" />
        <Link
          icon="👨‍💻"
          text="LinkedIn"
          url="https://www.linkedin.com/in/bjerkestrand"
        />
      </LinkItems>
    </Card>
  </Slide>
);

export default Home;
