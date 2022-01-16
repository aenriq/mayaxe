import Head from "next/head";
import Image from "next/image";
import profilePic from "../public/maya_self.png";
import { queryNotionDB } from "../external-calls/notion";
import { useState, useRef, useEffect } from "react";

export default function Home({ imgList }) {
  const [modal, setModal] = useState(false);
  const [images, setimages] = useState([]);
  const imgClick = (index) => {
    setModal(true);
    const findImg = imgList[index];
    setimages(findImg);
    console.log(findImg);
  };

  const modalRef = useRef(null);
  const handleModalClick = (e) => {
    if (modalRef.current && modalRef.current.contains(e.target)) {
      return;
    }
    setModal(false);
  };

  // we watch the state change of the modal state
  // hide the overflow when the modal is open
  // remove overflow when modal closed
  useEffect(() => {
    if (modal) {
      document.body.style.overflow = "hidden";
      return;
    }
    document.body.style.overflow = "";
  }, [modal]);

  return (
    <div className="container">
      {modal && (
        <div className="modalwrapper" onClick={(e) => handleModalClick(e)}>
          <div ref={modalRef} className="modalcontainer">
            <img src={images[0]}></img>
          </div>
        </div>
      )}
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className={`${modal ? "blur avatar" : "avatar"}`}>
          <Image src={profilePic} width={150} height={150} />
          <div>Maya Enriquez</div>
        </div>
        <div className={`${modal ? "blur artgrid" : "artgrid"}`}>
          {imgList &&
            imgList.map((item, index) => (
              <img key={index} src={item[0]} onClick={() => imgClick(index)} />
            ))}
        </div>
      </main>
    </div>
  );
}

export async function getServerProps() {
  const imgList = await queryNotionDB();
  return {
    props: {
      imgList,
    },
  };
}
