import React from "react";

import Card from "../components/card";
import Link from "../components/link";
import Links from "../components/links";
import Name from "../components/name";
import Slide from "../components/slide";
import Title from "../components/title";

const Home = () => (
  <Slide>
    <Card>
      <Name>Pelle Bjerkestrand</Name>
      <Title>Programmer</Title>
      <Links>
        <Link icon="🐥" text="Twitter" url="https://twitter.com/notpelle" />
      </Links>
    </Card>
  </Slide>
);

export default Home;
