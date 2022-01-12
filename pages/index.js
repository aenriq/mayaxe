import Head from "next/head";
import Image from "next/image";
import profilePic from "../public/maya_self.png";

export default function Home() {
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
        <div className="artgrid"></div>
      </main>
    </div>
  );
}
