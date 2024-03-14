import { Fragment } from "react";
import ContainerCards from "../components/ContainerCards";

function Home() {
  return (
    <Fragment>
      <ContainerCards 
        title="Colección de productos"
        description= "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corporis vero laudantium doloremque? Laborum, optio assumenda cumque omnis ipsa dicta rerum! Tempore pariatur impedit distinctio vero in harum est dolor voluptatem."
        category="all"
      />
    </Fragment>
  );
}

export default Home;
