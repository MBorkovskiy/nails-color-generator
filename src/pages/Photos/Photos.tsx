import { useState } from "react";
import a from "../../assets/photoGalery/1.jpg";
import b from "../../assets/photoGalery/2.jpg";
import c from "../../assets/photoGalery/3.jpg";
import d from "../../assets/photoGalery/4.jpg";
import e from "../../assets/photoGalery/5.jpg";
import f from "../../assets/photoGalery/6.jpg";
import g from "../../assets/photoGalery/7.jpg";
import i from "../../assets/photoGalery/8.jpg";
import j from "../../assets/photoGalery/9.jpg";
import k from "../../assets/photoGalery/10.jpg";
import l from "../../assets/photoGalery/11.jpg";

const photoGalery = [a, b, c, d, e, f, g, i, j, k, l];

export const Photos = () => {
  const [showPhotos, setShowPhotos] = useState(false);
  return (
    <div className="photo-galery-wrapper">
      <h1 onClick={() => setShowPhotos((prev) => !prev)}>{`${
        showPhotos ? "Скрыть" : "Показать"
      } галерею фото`}</h1>
      <div
        className={`container x mandatory-scroll-snapping ${
          showPhotos ? "show-photos" : ""
        }`}
      >
        {photoGalery.map((img) => (
          <div>
            <img src={img} alt="image" />
          </div>
        ))}
      </div>
    </div>
  );
};
