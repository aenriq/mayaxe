import Head from "next/head";
import Image from "next/image";
import profilePic from "../public/maya_self.png";
import { queryNotionDB } from "../external-calls/notion";
import { useState, useRef, useEffect } from "react";

export default function Home({ imgList, imgTitle }) {
  const [modal, setModal] = useState(false);
  const [images, setimages] = useState([]);
  const [index, setIndex] = useState(0);

  const imgClick = (index) => {
    setModal(true);
    const findImg = imgList[index];
    setimages(findImg);
  };

  const modalRef = useRef(null);
  const handleModalClick = (e) => {
    if (modalRef.current && modalRef.current.contains(e.target)) {
      return;
    }
    setIndex(0);
    setModal(false);
  };

  // we watch the state change of the modal state
  // hide the overflow when the modal is open
  // remove overflow when modal closed
  useEffect(() => {
    document.body.classList.toggle("bodyDuringModal", modal);
  }, [modal]);

  return (
    <div className="container">
      {modal && (
        <div className="modalwrapper" onClick={(e) => handleModalClick(e)}>
          <div ref={modalRef} className="modalcontainer">
            <img
              className="modalimage"
              onClick={() => {
                setIndex((index + 1) % images.length);
              }}
              src={images[index]}
            />
            <div className="modalfooter">
              <div>
                {index + 1}/{images.length}
              </div>
              <div
                className="modalfooterclose"
                onClick={() => {
                  setModal(false);
                  setIndex(0);
                }}
              >
                X
              </div>
            </div>
          </div>
        </div>
      )}

      <Head>
        <title>Mayas Portfolio</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className={`${modal ? "blur avatar" : "avatar"}`}>
          <Image src={profilePic} width={150} height={150} />
          <div>Maya Enriquez</div>
          <div className="user-details">
            {/* <div>About / CV</div> */}
            <div>
              <a href="mailto: Menrique@risd.edu">Contact</a>
            </div>
          </div>
        </div>
        <div className={`${modal ? "blur artgrid" : "artgrid"}`}>
          {imgList &&
            imgList.map((item, index) => (
              <div className="image-container">
                <img
                  key={index}
                  src={item[0]}
                  onClick={() => imgClick(index)}
                />
                <div className="image-details">{imgTitle[index]}</div>
              </div>
            ))}
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps() {
  const data = await queryNotionDB();
  const imgList = data.imgArr;
  const imgTitle = data.imgTitle;
  return {
    props: {
      imgList,
      imgTitle,
    },
  };
}
