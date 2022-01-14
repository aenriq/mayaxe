import Head from "next/head";
import Image from "next/image";
import profilePic from "../public/maya_self.png";
import { queryNotionDB } from "../external-calls/notion";

export default function Home({ imgList }) {
  // console.log(imgList);
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="avatar">
          <Image src={profilePic} width={150} height={150} />
          <div>Maya Enriquez</div>
        </div>
        <div className="artgrid">
          {imgList.map((item, index) => {
            //console.log(item);
            return <img key={index} src={item[0]} />;
          })}
        </div>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const imgList = await queryNotionDB();
  return {
    props: {
      imgList,
    },
  };
}
