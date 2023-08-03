/** @format */

import "../css/Home.css";
import Header from "../component/Header";

function Home() {
  return (
    <div className="home-container container">
      {/* background-video */}
      {/* Video làm nền */}
      <div className="video-container">
        <video autoPlay muted loop id="video-background">
          <source
            src={process.env.PUBLIC_URL + "/VIDEO-za-main-home.mp4"}
            type="video/mp4"
          />
          {/* Nếu trình duyệt không hỗ trợ video */}
          Your browser does not support the video tag.
        </video>
      </div>
      {/* header */}
      <Header />

      {/* Body */}
      <div className="container content">
        <h1>ARASAKA LANDING PAGE</h1>
        <hr />
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi
          quibusdam sunt quaerat ea similique voluptatum mollitia modi totam et
          voluptatem necessitatibus distinctio ad asperiores, eum perspiciatis
          accusantium amet. Dolores dicta eligendi asperiores ut deleniti quod
          veniam, non voluptate velit, dolore beatae possimus fugit officiis
          pariatur reprehenderit libero nemo doloremque nesciunt officia facilis
          quis aspernatur sunt ipsa aperiam! Cumque dolor debitis recusandae,
          esse doloremque iusto distinctio provident pariatur minima sit eum
          omnis eaque laborum repellat tempore molestiae nemo, odit voluptates!
          Iure, veniam reprehenderit quisquam asperiores ipsam fuga magnam
          minima necessitatibus. Ullam nulla similique quis est a modi dolores
          error mollitia quod.
        </p>
        <br />
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi
          quibusdam sunt quaerat ea similique voluptatum mollitia modi totam et
          voluptatem necessitatibus distinctio ad asperiores, eum perspiciatis
          accusantium amet. Dolores dicta eligendi asperiores ut deleniti quod
          veniam, non voluptate velit, dolore beatae possimus fugit officiis
          pariatur reprehenderit libero nemo doloremque nesciunt officia facilis
          quis aspernatur sunt ipsa aperiam! Cumque dolor debitis recusandae,
          esse doloremque iusto distinctio provident pariatur minima sit eum
          omnis eaque laborum repellat tempore molestiae nemo, odit voluptates!
          Iure, veniam reprehenderit quisquam asperiores ipsam fuga magnam
          minima necessitatibus. Ullam nulla similique quis est a modi dolores
          error mollitia quod.
        </p>
        <br />
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi
          quibusdam sunt quaerat ea similique voluptatum mollitia modi totam et
          voluptatem necessitatibus distinctio ad asperiores, eum perspiciatis
          accusantium amet. Dolores dicta eligendi asperiores ut deleniti quod
          veniam, non voluptate velit, dolore beatae possimus fugit officiis
          pariatur reprehenderit libero nemo doloremque nesciunt officia facilis
          quis aspernatur sunt ipsa aperiam! Cumque dolor debitis recusandae,
          esse doloremque iusto distinctio provident pariatur minima sit eum
          omnis eaque laborum repellat tempore molestiae nemo, odit voluptates!
          Iure, veniam reprehenderit quisquam asperiores ipsam fuga magnam
          minima necessitatibus. Ullam nulla similique quis est a modi dolores
          error mollitia quod.
        </p>
        <br />
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi
          quibusdam sunt quaerat ea similique voluptatum mollitia modi totam et
          voluptatem necessitatibus distinctio ad asperiores, eum perspiciatis
          accusantium amet. Dolores dicta eligendi asperiores ut deleniti quod
          veniam, non voluptate velit, dolore beatae possimus fugit officiis
          pariatur reprehenderit libero nemo doloremque nesciunt officia facilis
          quis aspernatur sunt ipsa aperiam! Cumque dolor debitis recusandae,
          esse doloremque iusto distinctio provident pariatur minima sit eum
          omnis eaque laborum repellat tempore molestiae nemo, odit voluptates!
          Iure, veniam reprehenderit quisquam asperiores ipsam fuga magnam
          minima necessitatibus. Ullam nulla similique quis est a modi dolores
          error mollitia quod.
        </p>
        <br />
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi
          quibusdam sunt quaerat ea similique voluptatum mollitia modi totam et
          voluptatem necessitatibus distinctio ad asperiores, eum perspiciatis
          accusantium amet. Dolores dicta eligendi asperiores ut deleniti quod
          veniam, non voluptate velit, dolore beatae possimus fugit officiis
          pariatur reprehenderit libero nemo doloremque nesciunt officia facilis
          quis aspernatur sunt ipsa aperiam! Cumque dolor debitis recusandae,
          esse doloremque iusto distinctio provident pariatur minima sit eum
          omnis eaque laborum repellat tempore molestiae nemo, odit voluptates!
          Iure, veniam reprehenderit quisquam asperiores ipsam fuga magnam
          minima necessitatibus. Ullam nulla similique quis est a modi dolores
          error mollitia quod.
        </p>
        <br />
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi
          quibusdam sunt quaerat ea similique voluptatum mollitia modi totam et
          voluptatem necessitatibus distinctio ad asperiores, eum perspiciatis
          accusantium amet. Dolores dicta eligendi asperiores ut deleniti quod
          veniam, non voluptate velit, dolore beatae possimus fugit officiis
          pariatur reprehenderit libero nemo doloremque nesciunt officia facilis
          quis aspernatur sunt ipsa aperiam! Cumque dolor debitis recusandae,
          esse doloremque iusto distinctio provident pariatur minima sit eum
          omnis eaque laborum repellat tempore molestiae nemo, odit voluptates!
          Iure, veniam reprehenderit quisquam asperiores ipsam fuga magnam
          minima necessitatibus. Ullam nulla similique quis est a modi dolores
          error mollitia quod.
        </p>
        <br />
      </div>
    </div>
  );
}

export default Home;
