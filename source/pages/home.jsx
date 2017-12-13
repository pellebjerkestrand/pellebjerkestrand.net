import React from 'react';

import Card from '../components/card';
import Link from '../components/link';
import LinkItems from '../components/link-items';
import Name from '../components/name';
import Slide from '../components/slide';
import Title from '../components/title';

const Home = () => (
  <div className="home">
    <Slide>
      <Card>
        <Name>Pelle Bjerkestrand</Name>
        <Title>Programmer</Title>
        <LinkItems>
          <Link url="https://twitter.com/notpelle">Twitter</Link>
          <Link url="https://www.linkedin.com/in/bjerkestrand">LinkedIn</Link>
        </LinkItems>
      </Card>
    </Slide>
  </div>
);

export default Home;
