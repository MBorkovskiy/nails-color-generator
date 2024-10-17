import { useEffect, useState } from "react";
import "./App.css";
import uuid from "react-uuid";
import a from "./assets/photoGalery/1.jpg";
import b from "./assets/photoGalery/2.jpg";
import c from "./assets/photoGalery/3.jpg";
import d from "./assets/photoGalery/4.jpg";
import e from "./assets/photoGalery/5.jpg";
import f from "./assets/photoGalery/6.jpg";
import g from "./assets/photoGalery/7.jpg";
import i from "./assets/photoGalery/8.jpg";
import j from "./assets/photoGalery/9.jpg";
import k from "./assets/photoGalery/10.jpg";
import l from "./assets/photoGalery/11.jpg";

interface ISavedColors {
  color: string;
  id: string;
}

const photoGalery = [a, b, c, d, e, f, g, i, j, k, l];

function App() {
  const [color, setColor] = useState("rgb(255, 0, 0)");
  const [countColor, setCountColor] = useState(0);
  const [speed, setSpeed] = useState(30);
  const [shouldSaveColor, setShouldSaveColor] = useState(false);
  const [shouldGenerate, setShouldGenerate] = useState(false);
  const [isAnimateButton, setIsAnimateButton] = useState(true);
  const [savedColors, setSavedColors] = useState<ISavedColors[]>([]);
  const [showPhotos, setShowPhotos] = useState(false);

  const generateColor = () => {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    setColor(`rgb(${r}, ${g}, ${b})`);
  };

  const setShouldGenerateHandler = () => {
    setShouldGenerate(true);
    setIsAnimateButton(false);
  };

  // const getPhotos = async () => {
  //   const response = await fetch(
  //     "https://api.unsplash.com/photos/?client_id=pk5eKqTjFO27-XyBzjxetLe-Ws30mAt78slHpUEsitQ"
  //   );
  //   const json = await response.json();
  //   console.log(json);
  // };

  // const mock = [
  //   {
  //     id: "q34XHlRDh6M",
  //     slug: "a-woman-sitting-on-a-wooden-bench-in-a-park-q34XHlRDh6M",
  //     alternative_slugs: {
  //       en: "a-woman-sitting-on-a-wooden-bench-in-a-park-q34XHlRDh6M",
  //       es: "una-mujer-sentada-en-un-banco-de-madera-en-un-parque-q34XHlRDh6M",
  //       ja: "公園の木製ベンチに座る女性-q34XHlRDh6M",
  //       fr: "une-femme-assise-sur-un-banc-en-bois-dans-un-parc-q34XHlRDh6M",
  //       it: "una-donna-seduta-su-una-panchina-di-legno-in-un-parco-q34XHlRDh6M",
  //       ko: "공원의-나무-벤치에-앉아있는-여자-q34XHlRDh6M",
  //       de: "eine-frau-die-auf-einer-holzbank-in-einem-park-sitzt-q34XHlRDh6M",
  //       pt: "uma-mulher-sentada-em-um-banco-de-madeira-em-um-parque-q34XHlRDh6M",
  //     },
  //     created_at: "2024-07-03T23:17:57Z",
  //     updated_at: "2024-10-17T09:23:33Z",
  //     promoted_at: null,
  //     width: 4000,
  //     height: 6000,
  //     color: "#0c260c",
  //     blur_hash: "LMD,+7s?Vsx]Dzelt5RP90JVkpnT",
  //     description: null,
  //     alt_description: "A woman sitting on a wooden bench in a park",
  //     breadcrumbs: [],
  //     urls: {
  //       raw: "https://images.unsplash.com/photo-1720048171419-b515a96a73b8?ixid=M3w2NjU4OTV8MXwxfGFsbHwxfHx8fHx8fHwxNzI5MTcxODE2fA&ixlib=rb-4.0.3",
  //       full: "https://images.unsplash.com/photo-1720048171419-b515a96a73b8?crop=entropy&cs=srgb&fm=jpg&ixid=M3w2NjU4OTV8MXwxfGFsbHwxfHx8fHx8fHwxNzI5MTcxODE2fA&ixlib=rb-4.0.3&q=85",
  //       regular:
  //         "https://images.unsplash.com/photo-1720048171419-b515a96a73b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NjU4OTV8MXwxfGFsbHwxfHx8fHx8fHwxNzI5MTcxODE2fA&ixlib=rb-4.0.3&q=80&w=1080",
  //       small:
  //         "https://images.unsplash.com/photo-1720048171419-b515a96a73b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NjU4OTV8MXwxfGFsbHwxfHx8fHx8fHwxNzI5MTcxODE2fA&ixlib=rb-4.0.3&q=80&w=400",
  //       thumb:
  //         "https://images.unsplash.com/photo-1720048171419-b515a96a73b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NjU4OTV8MXwxfGFsbHwxfHx8fHx8fHwxNzI5MTcxODE2fA&ixlib=rb-4.0.3&q=80&w=200",
  //       small_s3:
  //         "https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1720048171419-b515a96a73b8",
  //     },
  //     links: {
  //       self: "https://api.unsplash.com/photos/a-woman-sitting-on-a-wooden-bench-in-a-park-q34XHlRDh6M",
  //       html: "https://unsplash.com/photos/a-woman-sitting-on-a-wooden-bench-in-a-park-q34XHlRDh6M",
  //       download:
  //         "https://unsplash.com/photos/q34XHlRDh6M/download?ixid=M3w2NjU4OTV8MXwxfGFsbHwxfHx8fHx8fHwxNzI5MTcxODE2fA",
  //       download_location:
  //         "https://api.unsplash.com/photos/q34XHlRDh6M/download?ixid=M3w2NjU4OTV8MXwxfGFsbHwxfHx8fHx8fHwxNzI5MTcxODE2fA",
  //     },
  //     likes: 129,
  //     liked_by_user: false,
  //     current_user_collections: [],
  //     sponsorship: {
  //       impression_urls: [
  //         "https://secure.insightexpressai.com/adServer/adServerESI.aspx?script=false&bannerID=12236435&rnd=[timestamp]&redir=https://secure.insightexpressai.com/adserver/1pixel.gif",
  //       ],
  //       tagline: "Memory for every endeavor",
  //       tagline_url: "https://www.samsung.com/us/memory-storage/",
  //       sponsor: {
  //         id: "eySMK9KwmJU",
  //         updated_at: "2024-10-17T09:46:53Z",
  //         username: "samsungmemory",
  //         name: "Samsung Memory",
  //         first_name: "Samsung",
  //         last_name: "Memory",
  //         twitter_username: "SamsungSemiUS",
  //         portfolio_url: "http://www.samsung.com/us/computing/memory-storage/",
  //         bio: "Memory for every endeavor – get fast storage solutions that work seamlessly with your devices.",
  //         location: null,
  //         links: {
  //           self: "https://api.unsplash.com/users/samsungmemory",
  //           html: "https://unsplash.com/@samsungmemory",
  //           photos: "https://api.unsplash.com/users/samsungmemory/photos",
  //           likes: "https://api.unsplash.com/users/samsungmemory/likes",
  //           portfolio: "https://api.unsplash.com/users/samsungmemory/portfolio",
  //           following: "https://api.unsplash.com/users/samsungmemory/following",
  //           followers: "https://api.unsplash.com/users/samsungmemory/followers",
  //         },
  //         profile_image: {
  //           small:
  //             "https://images.unsplash.com/profile-1602741027167-c4d707fcfc85image?ixlib=rb-4.0.3&crop=faces&fit=crop&w=32&h=32",
  //           medium:
  //             "https://images.unsplash.com/profile-1602741027167-c4d707fcfc85image?ixlib=rb-4.0.3&crop=faces&fit=crop&w=64&h=64",
  //           large:
  //             "https://images.unsplash.com/profile-1602741027167-c4d707fcfc85image?ixlib=rb-4.0.3&crop=faces&fit=crop&w=128&h=128",
  //         },
  //         instagram_username: "samsungsemiconductor",
  //         total_collections: 1,
  //         total_likes: 0,
  //         total_photos: 880,
  //         total_promoted_photos: 38,
  //         total_illustrations: 0,
  //         total_promoted_illustrations: 0,
  //         accepted_tos: true,
  //         for_hire: false,
  //         social: {
  //           instagram_username: "samsungsemiconductor",
  //           portfolio_url:
  //             "http://www.samsung.com/us/computing/memory-storage/",
  //           twitter_username: "SamsungSemiUS",
  //           paypal_email: null,
  //         },
  //       },
  //     },
  //     topic_submissions: {},
  //     asset_type: "photo",
  //     user: {
  //       id: "eySMK9KwmJU",
  //       updated_at: "2024-10-17T09:46:53Z",
  //       username: "samsungmemory",
  //       name: "Samsung Memory",
  //       first_name: "Samsung",
  //       last_name: "Memory",
  //       twitter_username: "SamsungSemiUS",
  //       portfolio_url: "http://www.samsung.com/us/computing/memory-storage/",
  //       bio: "Memory for every endeavor – get fast storage solutions that work seamlessly with your devices.",
  //       location: null,
  //       links: {
  //         self: "https://api.unsplash.com/users/samsungmemory",
  //         html: "https://unsplash.com/@samsungmemory",
  //         photos: "https://api.unsplash.com/users/samsungmemory/photos",
  //         likes: "https://api.unsplash.com/users/samsungmemory/likes",
  //         portfolio: "https://api.unsplash.com/users/samsungmemory/portfolio",
  //         following: "https://api.unsplash.com/users/samsungmemory/following",
  //         followers: "https://api.unsplash.com/users/samsungmemory/followers",
  //       },
  //       profile_image: {
  //         small:
  //           "https://images.unsplash.com/profile-1602741027167-c4d707fcfc85image?ixlib=rb-4.0.3&crop=faces&fit=crop&w=32&h=32",
  //         medium:
  //           "https://images.unsplash.com/profile-1602741027167-c4d707fcfc85image?ixlib=rb-4.0.3&crop=faces&fit=crop&w=64&h=64",
  //         large:
  //           "https://images.unsplash.com/profile-1602741027167-c4d707fcfc85image?ixlib=rb-4.0.3&crop=faces&fit=crop&w=128&h=128",
  //       },
  //       instagram_username: "samsungsemiconductor",
  //       total_collections: 1,
  //       total_likes: 0,
  //       total_photos: 880,
  //       total_promoted_photos: 38,
  //       total_illustrations: 0,
  //       total_promoted_illustrations: 0,
  //       accepted_tos: true,
  //       for_hire: false,
  //       social: {
  //         instagram_username: "samsungsemiconductor",
  //         portfolio_url: "http://www.samsung.com/us/computing/memory-storage/",
  //         twitter_username: "SamsungSemiUS",
  //         paypal_email: null,
  //       },
  //     },
  //   },
  //   {
  //     id: "cqwgRjwNgBw",
  //     slug: "a-red-object-in-the-middle-of-a-black-sky-cqwgRjwNgBw",
  //     alternative_slugs: {
  //       en: "a-red-object-in-the-middle-of-a-black-sky-cqwgRjwNgBw",
  //       es: "un-objeto-rojo-en-medio-de-un-cielo-negro-cqwgRjwNgBw",
  //       ja: "黒い空の真ん中に浮かぶ赤い物体-cqwgRjwNgBw",
  //       fr: "un-objet-rouge-au-milieu-dun-ciel-noir-cqwgRjwNgBw",
  //       it: "un-oggetto-rosso-nel-mezzo-di-un-cielo-nero-cqwgRjwNgBw",
  //       ko: "검은-하늘-한가운데에-있는-빨간-물체-cqwgRjwNgBw",
  //       de: "ein-rotes-objekt-mitten-am-schwarzen-himmel-cqwgRjwNgBw",
  //       pt: "um-objeto-vermelho-no-meio-de-um-ceu-negro-cqwgRjwNgBw",
  //     },
  //     created_at: "2024-10-13T21:05:08Z",
  //     updated_at: "2024-10-17T12:59:08Z",
  //     promoted_at: null,
  //     width: 4622,
  //     height: 2727,
  //     color: "#262626",
  //     blur_hash: "L34-b9K31a].=KNaEz,@ACxG,@Ez",
  //     description:
  //       'Bubble Nebula. Emission nebula in Cassiopeia. 7100 light years away. Stellar wind from hot, central star pushes cold gases out in front to form a leading edge "bubble." The concentrated group of stars in lower left of the image is the open star cluster Messier 52.',
  //     alt_description: "A red object in the middle of a black sky",
  //     breadcrumbs: [],
  //     urls: {
  //       raw: "https://images.unsplash.com/photo-1728853487293-1a4c5c39b393?ixid=M3w2NjU4OTV8MHwxfGFsbHwyfHx8fHx8fHwxNzI5MTcxODE2fA&ixlib=rb-4.0.3",
  //       full: "https://images.unsplash.com/photo-1728853487293-1a4c5c39b393?crop=entropy&cs=srgb&fm=jpg&ixid=M3w2NjU4OTV8MHwxfGFsbHwyfHx8fHx8fHwxNzI5MTcxODE2fA&ixlib=rb-4.0.3&q=85",
  //       regular:
  //         "https://images.unsplash.com/photo-1728853487293-1a4c5c39b393?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NjU4OTV8MHwxfGFsbHwyfHx8fHx8fHwxNzI5MTcxODE2fA&ixlib=rb-4.0.3&q=80&w=1080",
  //       small:
  //         "https://images.unsplash.com/photo-1728853487293-1a4c5c39b393?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NjU4OTV8MHwxfGFsbHwyfHx8fHx8fHwxNzI5MTcxODE2fA&ixlib=rb-4.0.3&q=80&w=400",
  //       thumb:
  //         "https://images.unsplash.com/photo-1728853487293-1a4c5c39b393?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NjU4OTV8MHwxfGFsbHwyfHx8fHx8fHwxNzI5MTcxODE2fA&ixlib=rb-4.0.3&q=80&w=200",
  //       small_s3:
  //         "https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1728853487293-1a4c5c39b393",
  //     },
  //     links: {
  //       self: "https://api.unsplash.com/photos/a-red-object-in-the-middle-of-a-black-sky-cqwgRjwNgBw",
  //       html: "https://unsplash.com/photos/a-red-object-in-the-middle-of-a-black-sky-cqwgRjwNgBw",
  //       download:
  //         "https://unsplash.com/photos/cqwgRjwNgBw/download?ixid=M3w2NjU4OTV8MHwxfGFsbHwyfHx8fHx8fHwxNzI5MTcxODE2fA",
  //       download_location:
  //         "https://api.unsplash.com/photos/cqwgRjwNgBw/download?ixid=M3w2NjU4OTV8MHwxfGFsbHwyfHx8fHx8fHwxNzI5MTcxODE2fA",
  //     },
  //     likes: 58,
  //     liked_by_user: false,
  //     current_user_collections: [],
  //     sponsorship: null,
  //     topic_submissions: {
  //       nature: {
  //         status: "approved",
  //         approved_on: "2024-10-16T06:29:06Z",
  //       },
  //     },
  //     asset_type: "photo",
  //     user: {
  //       id: "Y6clyIsU0kY",
  //       updated_at: "2024-10-17T07:29:58Z",
  //       username: "sdbusch77",
  //       name: "Steve Busch",
  //       first_name: "Steve",
  //       last_name: "Busch",
  //       twitter_username: null,
  //       portfolio_url: "http://www.cosmosteve.com",
  //       bio: null,
  //       location: null,
  //       links: {
  //         self: "https://api.unsplash.com/users/sdbusch77",
  //         html: "https://unsplash.com/@sdbusch77",
  //         photos: "https://api.unsplash.com/users/sdbusch77/photos",
  //         likes: "https://api.unsplash.com/users/sdbusch77/likes",
  //         portfolio: "https://api.unsplash.com/users/sdbusch77/portfolio",
  //         following: "https://api.unsplash.com/users/sdbusch77/following",
  //         followers: "https://api.unsplash.com/users/sdbusch77/followers",
  //       },
  //       profile_image: {
  //         small:
  //           "https://images.unsplash.com/placeholder-avatars/extra-large.jpg?ixlib=rb-4.0.3&crop=faces&fit=crop&w=32&h=32",
  //         medium:
  //           "https://images.unsplash.com/placeholder-avatars/extra-large.jpg?ixlib=rb-4.0.3&crop=faces&fit=crop&w=64&h=64",
  //         large:
  //           "https://images.unsplash.com/placeholder-avatars/extra-large.jpg?ixlib=rb-4.0.3&crop=faces&fit=crop&w=128&h=128",
  //       },
  //       instagram_username: "sdbusch77",
  //       total_collections: 0,
  //       total_likes: 3,
  //       total_photos: 68,
  //       total_promoted_photos: 43,
  //       total_illustrations: 0,
  //       total_promoted_illustrations: 0,
  //       accepted_tos: true,
  //       for_hire: false,
  //       social: {
  //         instagram_username: "sdbusch77",
  //         portfolio_url: "http://www.cosmosteve.com",
  //         twitter_username: null,
  //         paypal_email: null,
  //       },
  //     },
  //   },
  //   {
  //     id: "Wnh9eG3drig",
  //     slug: "a-blurry-photo-of-a-train-passing-by-Wnh9eG3drig",
  //     alternative_slugs: {
  //       en: "a-blurry-photo-of-a-train-passing-by-Wnh9eG3drig",
  //       es: "una-foto-borrosa-de-un-tren-que-pasa-Wnh9eG3drig",
  //       ja: "通り過ぎる電車のぼやけた写真-Wnh9eG3drig",
  //       fr: "une-photo-floue-dun-train-qui-passe-Wnh9eG3drig",
  //       it: "una-foto-sfocata-di-un-treno-che-passa-Wnh9eG3drig",
  //       ko: "기차가-지나가는-흐릿한-사진-Wnh9eG3drig",
  //       de: "ein-verschwommenes-foto-eines-vorbeifahrenden-zuges-Wnh9eG3drig",
  //       pt: "uma-foto-borrada-de-um-trem-passando-Wnh9eG3drig",
  //     },
  //     created_at: "2024-10-12T17:57:02Z",
  //     updated_at: "2024-10-17T11:26:58Z",
  //     promoted_at: null,
  //     width: 6000,
  //     height: 4000,
  //     color: "#260c0c",
  //     blur_hash: "LYFz4_E|9]v#}[S2IpixGG$NWBRj",
  //     description: null,
  //     alt_description: "A blurry photo of a train passing by",
  //     breadcrumbs: [],
  //     urls: {
  //       raw: "https://images.unsplash.com/photo-1728755696561-f8fd6ff03630?ixid=M3w2NjU4OTV8MHwxfGFsbHwzfHx8fHx8fHwxNzI5MTcxODE2fA&ixlib=rb-4.0.3",
  //       full: "https://images.unsplash.com/photo-1728755696561-f8fd6ff03630?crop=entropy&cs=srgb&fm=jpg&ixid=M3w2NjU4OTV8MHwxfGFsbHwzfHx8fHx8fHwxNzI5MTcxODE2fA&ixlib=rb-4.0.3&q=85",
  //       regular:
  //         "https://images.unsplash.com/photo-1728755696561-f8fd6ff03630?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NjU4OTV8MHwxfGFsbHwzfHx8fHx8fHwxNzI5MTcxODE2fA&ixlib=rb-4.0.3&q=80&w=1080",
  //       small:
  //         "https://images.unsplash.com/photo-1728755696561-f8fd6ff03630?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NjU4OTV8MHwxfGFsbHwzfHx8fHx8fHwxNzI5MTcxODE2fA&ixlib=rb-4.0.3&q=80&w=400",
  //       thumb:
  //         "https://images.unsplash.com/photo-1728755696561-f8fd6ff03630?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NjU4OTV8MHwxfGFsbHwzfHx8fHx8fHwxNzI5MTcxODE2fA&ixlib=rb-4.0.3&q=80&w=200",
  //       small_s3:
  //         "https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1728755696561-f8fd6ff03630",
  //     },
  //     links: {
  //       self: "https://api.unsplash.com/photos/a-blurry-photo-of-a-train-passing-by-Wnh9eG3drig",
  //       html: "https://unsplash.com/photos/a-blurry-photo-of-a-train-passing-by-Wnh9eG3drig",
  //       download:
  //         "https://unsplash.com/photos/Wnh9eG3drig/download?ixid=M3w2NjU4OTV8MHwxfGFsbHwzfHx8fHx8fHwxNzI5MTcxODE2fA",
  //       download_location:
  //         "https://api.unsplash.com/photos/Wnh9eG3drig/download?ixid=M3w2NjU4OTV8MHwxfGFsbHwzfHx8fHx8fHwxNzI5MTcxODE2fA",
  //     },
  //     likes: 97,
  //     liked_by_user: false,
  //     current_user_collections: [],
  //     sponsorship: null,
  //     topic_submissions: {
  //       experimental: {
  //         status: "approved",
  //         approved_on: "2024-10-15T07:15:14Z",
  //       },
  //     },
  //     asset_type: "photo",
  //     user: {
  //       id: "U-LJIQYDScY",
  //       updated_at: "2024-10-17T12:52:49Z",
  //       username: "shaikhulud",
  //       name: "Maxim Tolchinskiy",
  //       first_name: "Maxim",
  //       last_name: "Tolchinskiy",
  //       twitter_username: "shaikhulud",
  //       portfolio_url: null,
  //       bio: "Podcaster. Photo freelancer.",
  //       location: "Kazan",
  //       links: {
  //         self: "https://api.unsplash.com/users/shaikhulud",
  //         html: "https://unsplash.com/@shaikhulud",
  //         photos: "https://api.unsplash.com/users/shaikhulud/photos",
  //         likes: "https://api.unsplash.com/users/shaikhulud/likes",
  //         portfolio: "https://api.unsplash.com/users/shaikhulud/portfolio",
  //         following: "https://api.unsplash.com/users/shaikhulud/following",
  //         followers: "https://api.unsplash.com/users/shaikhulud/followers",
  //       },
  //       profile_image: {
  //         small:
  //           "https://images.unsplash.com/profile-fb-1577024478-ae23d4066737.jpg?ixlib=rb-4.0.3&crop=faces&fit=crop&w=32&h=32",
  //         medium:
  //           "https://images.unsplash.com/profile-fb-1577024478-ae23d4066737.jpg?ixlib=rb-4.0.3&crop=faces&fit=crop&w=64&h=64",
  //         large:
  //           "https://images.unsplash.com/profile-fb-1577024478-ae23d4066737.jpg?ixlib=rb-4.0.3&crop=faces&fit=crop&w=128&h=128",
  //       },
  //       instagram_username: "shaikhulud",
  //       total_collections: 1,
  //       total_likes: 72,
  //       total_photos: 2205,
  //       total_promoted_photos: 65,
  //       total_illustrations: 0,
  //       total_promoted_illustrations: 0,
  //       accepted_tos: true,
  //       for_hire: false,
  //       social: {
  //         instagram_username: "shaikhulud",
  //         portfolio_url: null,
  //         twitter_username: "shaikhulud",
  //         paypal_email: null,
  //       },
  //     },
  //   },
  //   {
  //     id: "nR2FZasIxQ4",
  //     slug: "a-tall-building-with-lights-on-top-of-it-nR2FZasIxQ4",
  //     alternative_slugs: {
  //       en: "a-tall-building-with-lights-on-top-of-it-nR2FZasIxQ4",
  //       es: "un-edificio-alto-con-luces-en-la-parte-superior-nR2FZasIxQ4",
  //       ja: "ライトが点灯した高層ビル-nR2FZasIxQ4",
  //       fr: "un-grand-batiment-avec-des-lumieres-au-sommet-nR2FZasIxQ4",
  //       it: "un-edificio-alto-con-luci-in-cima-nR2FZasIxQ4",
  //       ko: "그-위에-조명이-있는-고층-건물-nR2FZasIxQ4",
  //       de: "ein-hohes-gebaude-mit-lichtern-auf-dem-dach-nR2FZasIxQ4",
  //       pt: "um-predio-alto-com-luzes-em-cima-dele-nR2FZasIxQ4",
  //     },
  //     created_at: "2024-10-10T13:38:43Z",
  //     updated_at: "2024-10-17T12:27:46Z",
  //     promoted_at: null,
  //     width: 3000,
  //     height: 2000,
  //     color: "#260c0c",
  //     blur_hash: "L65qkt1c}t9[9u-B9t$gW=t7WBaK",
  //     description: null,
  //     alt_description: "A tall building with lights on top of it",
  //     breadcrumbs: [],
  //     urls: {
  //       raw: "https://images.unsplash.com/photo-1728567409684-e42ba81a3c34?ixid=M3w2NjU4OTV8MHwxfGFsbHw0fHx8fHx8fHwxNzI5MTcxODE2fA&ixlib=rb-4.0.3",
  //       full: "https://images.unsplash.com/photo-1728567409684-e42ba81a3c34?crop=entropy&cs=srgb&fm=jpg&ixid=M3w2NjU4OTV8MHwxfGFsbHw0fHx8fHx8fHwxNzI5MTcxODE2fA&ixlib=rb-4.0.3&q=85",
  //       regular:
  //         "https://images.unsplash.com/photo-1728567409684-e42ba81a3c34?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NjU4OTV8MHwxfGFsbHw0fHx8fHx8fHwxNzI5MTcxODE2fA&ixlib=rb-4.0.3&q=80&w=1080",
  //       small:
  //         "https://images.unsplash.com/photo-1728567409684-e42ba81a3c34?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NjU4OTV8MHwxfGFsbHw0fHx8fHx8fHwxNzI5MTcxODE2fA&ixlib=rb-4.0.3&q=80&w=400",
  //       thumb:
  //         "https://images.unsplash.com/photo-1728567409684-e42ba81a3c34?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NjU4OTV8MHwxfGFsbHw0fHx8fHx8fHwxNzI5MTcxODE2fA&ixlib=rb-4.0.3&q=80&w=200",
  //       small_s3:
  //         "https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1728567409684-e42ba81a3c34",
  //     },
  //     links: {
  //       self: "https://api.unsplash.com/photos/a-tall-building-with-lights-on-top-of-it-nR2FZasIxQ4",
  //       html: "https://unsplash.com/photos/a-tall-building-with-lights-on-top-of-it-nR2FZasIxQ4",
  //       download:
  //         "https://unsplash.com/photos/nR2FZasIxQ4/download?ixid=M3w2NjU4OTV8MHwxfGFsbHw0fHx8fHx8fHwxNzI5MTcxODE2fA",
  //       download_location:
  //         "https://api.unsplash.com/photos/nR2FZasIxQ4/download?ixid=M3w2NjU4OTV8MHwxfGFsbHw0fHx8fHx8fHwxNzI5MTcxODE2fA",
  //     },
  //     likes: 86,
  //     liked_by_user: false,
  //     current_user_collections: [],
  //     sponsorship: null,
  //     topic_submissions: {},
  //     asset_type: "photo",
  //     user: {
  //       id: "ZEncYNLc9bE",
  //       updated_at: "2024-10-17T12:05:03Z",
  //       username: "5tep5",
  //       name: "Aleksandr Popov",
  //       first_name: "Aleksandr",
  //       last_name: "Popov",
  //       twitter_username: "5tep5",
  //       portfolio_url: "http://5tep5.com/",
  //       bio: "Street Photography",
  //       location: "Moscow",
  //       links: {
  //         self: "https://api.unsplash.com/users/5tep5",
  //         html: "https://unsplash.com/@5tep5",
  //         photos: "https://api.unsplash.com/users/5tep5/photos",
  //         likes: "https://api.unsplash.com/users/5tep5/likes",
  //         portfolio: "https://api.unsplash.com/users/5tep5/portfolio",
  //         following: "https://api.unsplash.com/users/5tep5/following",
  //         followers: "https://api.unsplash.com/users/5tep5/followers",
  //       },
  //       profile_image: {
  //         small:
  //           "https://images.unsplash.com/profile-fb-1502611037-1478664905d8.jpg?ixlib=rb-4.0.3&crop=faces&fit=crop&w=32&h=32",
  //         medium:
  //           "https://images.unsplash.com/profile-fb-1502611037-1478664905d8.jpg?ixlib=rb-4.0.3&crop=faces&fit=crop&w=64&h=64",
  //         large:
  //           "https://images.unsplash.com/profile-fb-1502611037-1478664905d8.jpg?ixlib=rb-4.0.3&crop=faces&fit=crop&w=128&h=128",
  //       },
  //       instagram_username: "5tep5",
  //       total_collections: 2,
  //       total_likes: 33,
  //       total_photos: 246,
  //       total_promoted_photos: 107,
  //       total_illustrations: 0,
  //       total_promoted_illustrations: 0,
  //       accepted_tos: true,
  //       for_hire: true,
  //       social: {
  //         instagram_username: "5tep5",
  //         portfolio_url: "http://5tep5.com/",
  //         twitter_username: "5tep5",
  //         paypal_email: null,
  //       },
  //     },
  //   },
  //   {
  //     id: "wF5d_SKJ-jI",
  //     slug: "a-group-of-jellyfish-swimming-in-the-water-wF5d_SKJ-jI",
  //     alternative_slugs: {
  //       en: "a-group-of-jellyfish-swimming-in-the-water-wF5d_SKJ-jI",
  //       es: "un-grupo-de-medusas-nadando-en-el-agua-wF5d_SKJ-jI",
  //       ja: "水中を泳ぐクラゲの群れ-wF5d_SKJ-jI",
  //       fr: "un-groupe-de-meduses-nageant-dans-leau-wF5d_SKJ-jI",
  //       it: "un-gruppo-di-meduse-che-nuotano-nellacqua-wF5d_SKJ-jI",
  //       ko: "물-속을-헤엄치는-해파리-무리-wF5d_SKJ-jI",
  //       de: "eine-gruppe-von-quallen-die-im-wasser-schwimmen-wF5d_SKJ-jI",
  //       pt: "um-grupo-de-aguas-vivas-nadando-na-agua-wF5d_SKJ-jI",
  //     },
  //     created_at: "2024-10-07T23:19:37Z",
  //     updated_at: "2024-10-17T12:55:05Z",
  //     promoted_at: null,
  //     width: 4000,
  //     height: 6000,
  //     color: "#0c2659",
  //     blur_hash: "LA1OLrf.iFcZa2eSiufTeocacag5",
  //     description: null,
  //     alt_description: "A group of jellyfish swimming in the water",
  //     breadcrumbs: [],
  //     urls: {
  //       raw: "https://images.unsplash.com/photo-1728343070484-0874149980d9?ixid=M3w2NjU4OTV8MHwxfGFsbHw1fHx8fHx8fHwxNzI5MTcxODE2fA&ixlib=rb-4.0.3",
  //       full: "https://images.unsplash.com/photo-1728343070484-0874149980d9?crop=entropy&cs=srgb&fm=jpg&ixid=M3w2NjU4OTV8MHwxfGFsbHw1fHx8fHx8fHwxNzI5MTcxODE2fA&ixlib=rb-4.0.3&q=85",
  //       regular:
  //         "https://images.unsplash.com/photo-1728343070484-0874149980d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NjU4OTV8MHwxfGFsbHw1fHx8fHx8fHwxNzI5MTcxODE2fA&ixlib=rb-4.0.3&q=80&w=1080",
  //       small:
  //         "https://images.unsplash.com/photo-1728343070484-0874149980d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NjU4OTV8MHwxfGFsbHw1fHx8fHx8fHwxNzI5MTcxODE2fA&ixlib=rb-4.0.3&q=80&w=400",
  //       thumb:
  //         "https://images.unsplash.com/photo-1728343070484-0874149980d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NjU4OTV8MHwxfGFsbHw1fHx8fHx8fHwxNzI5MTcxODE2fA&ixlib=rb-4.0.3&q=80&w=200",
  //       small_s3:
  //         "https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1728343070484-0874149980d9",
  //     },
  //     links: {
  //       self: "https://api.unsplash.com/photos/a-group-of-jellyfish-swimming-in-the-water-wF5d_SKJ-jI",
  //       html: "https://unsplash.com/photos/a-group-of-jellyfish-swimming-in-the-water-wF5d_SKJ-jI",
  //       download:
  //         "https://unsplash.com/photos/wF5d_SKJ-jI/download?ixid=M3w2NjU4OTV8MHwxfGFsbHw1fHx8fHx8fHwxNzI5MTcxODE2fA",
  //       download_location:
  //         "https://api.unsplash.com/photos/wF5d_SKJ-jI/download?ixid=M3w2NjU4OTV8MHwxfGFsbHw1fHx8fHx8fHwxNzI5MTcxODE2fA",
  //     },
  //     likes: 110,
  //     liked_by_user: false,
  //     current_user_collections: [],
  //     sponsorship: null,
  //     topic_submissions: {
  //       animals: {
  //         status: "approved",
  //         approved_on: "2024-10-08T15:02:15Z",
  //       },
  //     },
  //     asset_type: "photo",
  //     user: {
  //       id: "fk8mQYRRXZM",
  //       updated_at: "2024-10-17T13:18:04Z",
  //       username: "willianjusten",
  //       name: "Willian Justen de Vasconcellos",
  //       first_name: "Willian",
  //       last_name: "Justen de Vasconcellos",
  //       twitter_username: "Willian_justen",
  //       portfolio_url: "https://willianjusten.com.br/",
  //       bio: "I like to create experiments and learn about everything in photography, that's why I have many kinds of photos, maybe you like it, maybe not xD. Browse my photos and favourite photos via categories at unsplash.com/@willianjusten/collections",
  //       location: "Rio de Janeiro",
  //       links: {
  //         self: "https://api.unsplash.com/users/willianjusten",
  //         html: "https://unsplash.com/@willianjusten",
  //         photos: "https://api.unsplash.com/users/willianjusten/photos",
  //         likes: "https://api.unsplash.com/users/willianjusten/likes",
  //         portfolio: "https://api.unsplash.com/users/willianjusten/portfolio",
  //         following: "https://api.unsplash.com/users/willianjusten/following",
  //         followers: "https://api.unsplash.com/users/willianjusten/followers",
  //       },
  //       profile_image: {
  //         small:
  //           "https://images.unsplash.com/profile-1649874962342-ab97e4293533image?ixlib=rb-4.0.3&crop=faces&fit=crop&w=32&h=32",
  //         medium:
  //           "https://images.unsplash.com/profile-1649874962342-ab97e4293533image?ixlib=rb-4.0.3&crop=faces&fit=crop&w=64&h=64",
  //         large:
  //           "https://images.unsplash.com/profile-1649874962342-ab97e4293533image?ixlib=rb-4.0.3&crop=faces&fit=crop&w=128&h=128",
  //       },
  //       instagram_username: "will_justen",
  //       total_collections: 26,
  //       total_likes: 6145,
  //       total_photos: 997,
  //       total_promoted_photos: 346,
  //       total_illustrations: 0,
  //       total_promoted_illustrations: 0,
  //       accepted_tos: true,
  //       for_hire: false,
  //       social: {
  //         instagram_username: "will_justen",
  //         portfolio_url: "https://willianjusten.com.br/",
  //         twitter_username: "Willian_justen",
  //         paypal_email: null,
  //       },
  //     },
  //   },
  //   {
  //     id: "x9Kh98kFxiM",
  //     slug: "a-small-dog-with-a-red-cape-on-its-head-x9Kh98kFxiM",
  //     alternative_slugs: {
  //       en: "a-small-dog-with-a-red-cape-on-its-head-x9Kh98kFxiM",
  //       es: "un-perro-pequeno-con-una-capa-roja-en-la-cabeza-x9Kh98kFxiM",
  //       ja: "頭に赤いマントをかぶった小型犬-x9Kh98kFxiM",
  //       fr: "un-petit-chien-avec-une-cape-rouge-sur-la-tete-x9Kh98kFxiM",
  //       it: "un-cane-di-piccola-taglia-con-un-mantello-rosso-sulla-testa-x9Kh98kFxiM",
  //       ko: "머리에-빨간-망토를-두른-작은-개-x9Kh98kFxiM",
  //       de: "ein-kleiner-hund-mit-einem-roten-umhang-auf-dem-kopf-x9Kh98kFxiM",
  //       pt: "um-cachorro-pequeno-com-uma-capa-vermelha-na-cabeca-x9Kh98kFxiM",
  //     },
  //     created_at: "2024-10-14T19:50:38Z",
  //     updated_at: "2024-10-17T12:59:20Z",
  //     promoted_at: null,
  //     width: 6823,
  //     height: 4549,
  //     color: "#d94040",
  //     blur_hash: "LQMCDXS#{~R*oLa|S2j[#noLK4fQ",
  //     description: '"I vant to suck your blood"',
  //     alt_description: "A small dog with a red cape on its head",
  //     breadcrumbs: [],
  //     urls: {
  //       raw: "https://images.unsplash.com/photo-1728935367997-d9dd04a4d447?ixid=M3w2NjU4OTV8MHwxfGFsbHw2fHx8fHx8fHwxNzI5MTcxODE2fA&ixlib=rb-4.0.3",
  //       full: "https://images.unsplash.com/photo-1728935367997-d9dd04a4d447?crop=entropy&cs=srgb&fm=jpg&ixid=M3w2NjU4OTV8MHwxfGFsbHw2fHx8fHx8fHwxNzI5MTcxODE2fA&ixlib=rb-4.0.3&q=85",
  //       regular:
  //         "https://images.unsplash.com/photo-1728935367997-d9dd04a4d447?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NjU4OTV8MHwxfGFsbHw2fHx8fHx8fHwxNzI5MTcxODE2fA&ixlib=rb-4.0.3&q=80&w=1080",
  //       small:
  //         "https://images.unsplash.com/photo-1728935367997-d9dd04a4d447?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NjU4OTV8MHwxfGFsbHw2fHx8fHx8fHwxNzI5MTcxODE2fA&ixlib=rb-4.0.3&q=80&w=400",
  //       thumb:
  //         "https://images.unsplash.com/photo-1728935367997-d9dd04a4d447?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NjU4OTV8MHwxfGFsbHw2fHx8fHx8fHwxNzI5MTcxODE2fA&ixlib=rb-4.0.3&q=80&w=200",
  //       small_s3:
  //         "https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1728935367997-d9dd04a4d447",
  //     },
  //     links: {
  //       self: "https://api.unsplash.com/photos/a-small-dog-with-a-red-cape-on-its-head-x9Kh98kFxiM",
  //       html: "https://unsplash.com/photos/a-small-dog-with-a-red-cape-on-its-head-x9Kh98kFxiM",
  //       download:
  //         "https://unsplash.com/photos/x9Kh98kFxiM/download?ixid=M3w2NjU4OTV8MHwxfGFsbHw2fHx8fHx8fHwxNzI5MTcxODE2fA",
  //       download_location:
  //         "https://api.unsplash.com/photos/x9Kh98kFxiM/download?ixid=M3w2NjU4OTV8MHwxfGFsbHw2fHx8fHx8fHwxNzI5MTcxODE2fA",
  //     },
  //     likes: 28,
  //     liked_by_user: false,
  //     current_user_collections: [],
  //     sponsorship: null,
  //     topic_submissions: {
  //       animals: {
  //         status: "rejected",
  //       },
  //     },
  //     asset_type: "photo",
  //     user: {
  //       id: "dg4S8j5TzmE",
  //       updated_at: "2024-10-17T12:15:07Z",
  //       username: "karsten116",
  //       name: "Karsten Winegeart",
  //       first_name: "Karsten",
  //       last_name: "Winegeart",
  //       twitter_username: "karsten116",
  //       portfolio_url: null,
  //       bio: "IG - @karsten116",
  //       location: "Austin Texas",
  //       links: {
  //         self: "https://api.unsplash.com/users/karsten116",
  //         html: "https://unsplash.com/@karsten116",
  //         photos: "https://api.unsplash.com/users/karsten116/photos",
  //         likes: "https://api.unsplash.com/users/karsten116/likes",
  //         portfolio: "https://api.unsplash.com/users/karsten116/portfolio",
  //         following: "https://api.unsplash.com/users/karsten116/following",
  //         followers: "https://api.unsplash.com/users/karsten116/followers",
  //       },
  //       profile_image: {
  //         small:
  //           "https://images.unsplash.com/profile-1583427783052-3da8ceab5579image?ixlib=rb-4.0.3&crop=faces&fit=crop&w=32&h=32",
  //         medium:
  //           "https://images.unsplash.com/profile-1583427783052-3da8ceab5579image?ixlib=rb-4.0.3&crop=faces&fit=crop&w=64&h=64",
  //         large:
  //           "https://images.unsplash.com/profile-1583427783052-3da8ceab5579image?ixlib=rb-4.0.3&crop=faces&fit=crop&w=128&h=128",
  //       },
  //       instagram_username: "karsten116",
  //       total_collections: 2,
  //       total_likes: 1044,
  //       total_photos: 1111,
  //       total_promoted_photos: 623,
  //       total_illustrations: 0,
  //       total_promoted_illustrations: 0,
  //       accepted_tos: true,
  //       for_hire: true,
  //       social: {
  //         instagram_username: "karsten116",
  //         portfolio_url: null,
  //         twitter_username: "karsten116",
  //         paypal_email: null,
  //       },
  //     },
  //   },
  //   {
  //     id: "OhAGhO-gBq4",
  //     slug: "the-tower-bridge-sign-is-lit-up-at-night-OhAGhO-gBq4",
  //     alternative_slugs: {
  //       en: "the-tower-bridge-sign-is-lit-up-at-night-OhAGhO-gBq4",
  //       es: "el-letrero-del-tower-bridge-se-ilumina-por-la-noche-OhAGhO-gBq4",
  //       ja: "夜はタワーブリッジの看板がライトアップ-OhAGhO-gBq4",
  //       fr: "lenseigne-tower-bridge-est-illuminee-la-nuit-OhAGhO-gBq4",
  //       it: "linsegna-del-tower-bridge-e-illuminata-di-notte-OhAGhO-gBq4",
  //       ko: "타워-브릿지-간판은-밤에-점등됩니다-OhAGhO-gBq4",
  //       de: "das-schild-der-tower-bridge-ist-nachts-beleuchtet-OhAGhO-gBq4",
  //       pt: "o-sinal-da-tower-bridge-e-iluminado-a-noite-OhAGhO-gBq4",
  //     },
  //     created_at: "2023-11-24T13:03:27Z",
  //     updated_at: "2024-10-17T12:31:46Z",
  //     promoted_at: null,
  //     width: 4480,
  //     height: 6720,
  //     color: "#0c2626",
  //     blur_hash: "LD9tig9u4T,AEMx]nNIU01%MxuM{",
  //     description: null,
  //     alt_description: "the tower bridge sign is lit up at night",
  //     breadcrumbs: [],
  //     urls: {
  //       raw: "https://images.unsplash.com/photo-1700830960459-90d4dd355b7b?ixid=M3w2NjU4OTV8MHwxfGFsbHw3fHx8fHx8fHwxNzI5MTcxODE2fA&ixlib=rb-4.0.3",
  //       full: "https://images.unsplash.com/photo-1700830960459-90d4dd355b7b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w2NjU4OTV8MHwxfGFsbHw3fHx8fHx8fHwxNzI5MTcxODE2fA&ixlib=rb-4.0.3&q=85",
  //       regular:
  //         "https://images.unsplash.com/photo-1700830960459-90d4dd355b7b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NjU4OTV8MHwxfGFsbHw3fHx8fHx8fHwxNzI5MTcxODE2fA&ixlib=rb-4.0.3&q=80&w=1080",
  //       small:
  //         "https://images.unsplash.com/photo-1700830960459-90d4dd355b7b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NjU4OTV8MHwxfGFsbHw3fHx8fHx8fHwxNzI5MTcxODE2fA&ixlib=rb-4.0.3&q=80&w=400",
  //       thumb:
  //         "https://images.unsplash.com/photo-1700830960459-90d4dd355b7b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NjU4OTV8MHwxfGFsbHw3fHx8fHx8fHwxNzI5MTcxODE2fA&ixlib=rb-4.0.3&q=80&w=200",
  //       small_s3:
  //         "https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1700830960459-90d4dd355b7b",
  //     },
  //     links: {
  //       self: "https://api.unsplash.com/photos/the-tower-bridge-sign-is-lit-up-at-night-OhAGhO-gBq4",
  //       html: "https://unsplash.com/photos/the-tower-bridge-sign-is-lit-up-at-night-OhAGhO-gBq4",
  //       download:
  //         "https://unsplash.com/photos/OhAGhO-gBq4/download?ixid=M3w2NjU4OTV8MHwxfGFsbHw3fHx8fHx8fHwxNzI5MTcxODE2fA",
  //       download_location:
  //         "https://api.unsplash.com/photos/OhAGhO-gBq4/download?ixid=M3w2NjU4OTV8MHwxfGFsbHw3fHx8fHx8fHwxNzI5MTcxODE2fA",
  //     },
  //     likes: 85,
  //     liked_by_user: false,
  //     current_user_collections: [],
  //     sponsorship: null,
  //     topic_submissions: {},
  //     asset_type: "photo",
  //     user: {
  //       id: "2nKYgtlrW-k",
  //       updated_at: "2024-10-17T13:19:42Z",
  //       username: "kahveci",
  //       name: "Ahmet Kahveci",
  //       first_name: "Ahmet",
  //       last_name: "Kahveci",
  //       twitter_username: null,
  //       portfolio_url: null,
  //       bio: null,
  //       location: "Istanbul",
  //       links: {
  //         self: "https://api.unsplash.com/users/kahveci",
  //         html: "https://unsplash.com/@kahveci",
  //         photos: "https://api.unsplash.com/users/kahveci/photos",
  //         likes: "https://api.unsplash.com/users/kahveci/likes",
  //         portfolio: "https://api.unsplash.com/users/kahveci/portfolio",
  //         following: "https://api.unsplash.com/users/kahveci/following",
  //         followers: "https://api.unsplash.com/users/kahveci/followers",
  //       },
  //       profile_image: {
  //         small:
  //           "https://images.unsplash.com/profile-1647374134071-5eec350ef585image?ixlib=rb-4.0.3&crop=faces&fit=crop&w=32&h=32",
  //         medium:
  //           "https://images.unsplash.com/profile-1647374134071-5eec350ef585image?ixlib=rb-4.0.3&crop=faces&fit=crop&w=64&h=64",
  //         large:
  //           "https://images.unsplash.com/profile-1647374134071-5eec350ef585image?ixlib=rb-4.0.3&crop=faces&fit=crop&w=128&h=128",
  //       },
  //       instagram_username: "theahmetkahveci",
  //       total_collections: 0,
  //       total_likes: 74,
  //       total_photos: 22,
  //       total_promoted_photos: 3,
  //       total_illustrations: 0,
  //       total_promoted_illustrations: 0,
  //       accepted_tos: true,
  //       for_hire: true,
  //       social: {
  //         instagram_username: "theahmetkahveci",
  //         portfolio_url: null,
  //         twitter_username: null,
  //         paypal_email: null,
  //       },
  //     },
  //   },
  //   {
  //     id: "kby_BMUGelc",
  //     slug: "a-person-standing-on-a-cliff-looking-at-the-night-sky-kby_BMUGelc",
  //     alternative_slugs: {
  //       en: "a-person-standing-on-a-cliff-looking-at-the-night-sky-kby_BMUGelc",
  //       es: "una-persona-de-pie-en-un-acantilado-mirando-el-cielo-nocturno-kby_BMUGelc",
  //       ja: "崖の上に立って夜空を眺める人-kby_BMUGelc",
  //       fr: "une-personne-debout-sur-une-falaise-regardant-le-ciel-nocturne-kby_BMUGelc",
  //       it: "una-persona-in-piedi-su-una-scogliera-che-guarda-il-cielo-notturno-kby_BMUGelc",
  //       ko: "절벽에-서서-밤하늘을-바라보는-사람-kby_BMUGelc",
  //       de: "eine-person-die-auf-einer-klippe-steht-und-in-den-nachthimmel-schaut-kby_BMUGelc",
  //       pt: "uma-pessoa-em-pe-em-um-penhasco-olhando-para-o-ceu-noturno-kby_BMUGelc",
  //     },
  //     created_at: "2024-10-15T12:59:56Z",
  //     updated_at: "2024-10-17T08:53:11Z",
  //     promoted_at: null,
  //     width: 5412,
  //     height: 8118,
  //     color: "#405973",
  //     blur_hash: "L84f5ejEMxbH%%flV@fkWXkDjYj[",
  //     description: null,
  //     alt_description: "A person standing on a cliff looking at the night sky",
  //     breadcrumbs: [],
  //     urls: {
  //       raw: "https://images.unsplash.com/photo-1728997150636-91ef00ba7e59?ixid=M3w2NjU4OTV8MHwxfGFsbHw4fHx8fHx8fHwxNzI5MTcxODE2fA&ixlib=rb-4.0.3",
  //       full: "https://images.unsplash.com/photo-1728997150636-91ef00ba7e59?crop=entropy&cs=srgb&fm=jpg&ixid=M3w2NjU4OTV8MHwxfGFsbHw4fHx8fHx8fHwxNzI5MTcxODE2fA&ixlib=rb-4.0.3&q=85",
  //       regular:
  //         "https://images.unsplash.com/photo-1728997150636-91ef00ba7e59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NjU4OTV8MHwxfGFsbHw4fHx8fHx8fHwxNzI5MTcxODE2fA&ixlib=rb-4.0.3&q=80&w=1080",
  //       small:
  //         "https://images.unsplash.com/photo-1728997150636-91ef00ba7e59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NjU4OTV8MHwxfGFsbHw4fHx8fHx8fHwxNzI5MTcxODE2fA&ixlib=rb-4.0.3&q=80&w=400",
  //       thumb:
  //         "https://images.unsplash.com/photo-1728997150636-91ef00ba7e59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NjU4OTV8MHwxfGFsbHw4fHx8fHx8fHwxNzI5MTcxODE2fA&ixlib=rb-4.0.3&q=80&w=200",
  //       small_s3:
  //         "https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1728997150636-91ef00ba7e59",
  //     },
  //     links: {
  //       self: "https://api.unsplash.com/photos/a-person-standing-on-a-cliff-looking-at-the-night-sky-kby_BMUGelc",
  //       html: "https://unsplash.com/photos/a-person-standing-on-a-cliff-looking-at-the-night-sky-kby_BMUGelc",
  //       download:
  //         "https://unsplash.com/photos/kby_BMUGelc/download?ixid=M3w2NjU4OTV8MHwxfGFsbHw4fHx8fHx8fHwxNzI5MTcxODE2fA",
  //       download_location:
  //         "https://api.unsplash.com/photos/kby_BMUGelc/download?ixid=M3w2NjU4OTV8MHwxfGFsbHw4fHx8fHx8fHwxNzI5MTcxODE2fA",
  //     },
  //     likes: 85,
  //     liked_by_user: false,
  //     current_user_collections: [],
  //     sponsorship: null,
  //     topic_submissions: {
  //       travel: {
  //         status: "approved",
  //         approved_on: "2024-10-16T08:03:05Z",
  //       },
  //       nature: {
  //         status: "approved",
  //         approved_on: "2024-10-15T14:32:57Z",
  //       },
  //     },
  //     asset_type: "photo",
  //     user: {
  //       id: "KCLx1HrTFQ4",
  //       updated_at: "2024-10-16T21:31:27Z",
  //       username: "tianhao_wang",
  //       name: "Tianhao Wang",
  //       first_name: "Tianhao",
  //       last_name: "Wang",
  //       twitter_username: "BTBU1950",
  //       portfolio_url: null,
  //       bio: null,
  //       location: "Beijing, China",
  //       links: {
  //         self: "https://api.unsplash.com/users/tianhao_wang",
  //         html: "https://unsplash.com/@tianhao_wang",
  //         photos: "https://api.unsplash.com/users/tianhao_wang/photos",
  //         likes: "https://api.unsplash.com/users/tianhao_wang/likes",
  //         portfolio: "https://api.unsplash.com/users/tianhao_wang/portfolio",
  //         following: "https://api.unsplash.com/users/tianhao_wang/following",
  //         followers: "https://api.unsplash.com/users/tianhao_wang/followers",
  //       },
  //       profile_image: {
  //         small:
  //           "https://images.unsplash.com/profile-1706802991492-ecceda2bddcaimage?ixlib=rb-4.0.3&crop=faces&fit=crop&w=32&h=32",
  //         medium:
  //           "https://images.unsplash.com/profile-1706802991492-ecceda2bddcaimage?ixlib=rb-4.0.3&crop=faces&fit=crop&w=64&h=64",
  //         large:
  //           "https://images.unsplash.com/profile-1706802991492-ecceda2bddcaimage?ixlib=rb-4.0.3&crop=faces&fit=crop&w=128&h=128",
  //       },
  //       instagram_username: "tianhao.www",
  //       total_collections: 0,
  //       total_likes: 37,
  //       total_photos: 67,
  //       total_promoted_photos: 18,
  //       total_illustrations: 0,
  //       total_promoted_illustrations: 0,
  //       accepted_tos: true,
  //       for_hire: false,
  //       social: {
  //         instagram_username: "tianhao.www",
  //         portfolio_url: null,
  //         twitter_username: "BTBU1950",
  //         paypal_email: null,
  //       },
  //     },
  //   },
  //   {
  //     id: "KivvbI-DgWU",
  //     slug: "a-woman-with-a-red-veil-on-her-head-KivvbI-DgWU",
  //     alternative_slugs: {
  //       en: "a-woman-with-a-red-veil-on-her-head-KivvbI-DgWU",
  //       es: "una-mujer-con-un-velo-rojo-en-la-cabeza-KivvbI-DgWU",
  //       ja: "頭に赤いベールをかぶった女性-KivvbI-DgWU",
  //       fr: "une-femme-avec-un-voile-rouge-sur-la-tete-KivvbI-DgWU",
  //       it: "una-donna-con-un-velo-rosso-sulla-testa-KivvbI-DgWU",
  //       ko: "머리에-빨간-베일을-쓴-여자-KivvbI-DgWU",
  //       de: "eine-frau-mit-einem-roten-schleier-auf-dem-kopf-KivvbI-DgWU",
  //       pt: "uma-mulher-com-um-veu-vermelho-na-cabeca-KivvbI-DgWU",
  //     },
  //     created_at: "2024-10-14T13:58:45Z",
  //     updated_at: "2024-10-17T13:11:51Z",
  //     promoted_at: null,
  //     width: 4160,
  //     height: 6240,
  //     color: "#400c0c",
  //     blur_hash: "L38CB%|_+w$Q}txGwJw{xuX8n*n*",
  //     description: null,
  //     alt_description: "A woman with a red veil on her head",
  //     breadcrumbs: [],
  //     urls: {
  //       raw: "https://images.unsplash.com/photo-1728914298685-c1c9dc373069?ixid=M3w2NjU4OTV8MHwxfGFsbHw5fHx8fHx8fHwxNzI5MTcxODE2fA&ixlib=rb-4.0.3",
  //       full: "https://images.unsplash.com/photo-1728914298685-c1c9dc373069?crop=entropy&cs=srgb&fm=jpg&ixid=M3w2NjU4OTV8MHwxfGFsbHw5fHx8fHx8fHwxNzI5MTcxODE2fA&ixlib=rb-4.0.3&q=85",
  //       regular:
  //         "https://images.unsplash.com/photo-1728914298685-c1c9dc373069?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NjU4OTV8MHwxfGFsbHw5fHx8fHx8fHwxNzI5MTcxODE2fA&ixlib=rb-4.0.3&q=80&w=1080",
  //       small:
  //         "https://images.unsplash.com/photo-1728914298685-c1c9dc373069?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NjU4OTV8MHwxfGFsbHw5fHx8fHx8fHwxNzI5MTcxODE2fA&ixlib=rb-4.0.3&q=80&w=400",
  //       thumb:
  //         "https://images.unsplash.com/photo-1728914298685-c1c9dc373069?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NjU4OTV8MHwxfGFsbHw5fHx8fHx8fHwxNzI5MTcxODE2fA&ixlib=rb-4.0.3&q=80&w=200",
  //       small_s3:
  //         "https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1728914298685-c1c9dc373069",
  //     },
  //     links: {
  //       self: "https://api.unsplash.com/photos/a-woman-with-a-red-veil-on-her-head-KivvbI-DgWU",
  //       html: "https://unsplash.com/photos/a-woman-with-a-red-veil-on-her-head-KivvbI-DgWU",
  //       download:
  //         "https://unsplash.com/photos/KivvbI-DgWU/download?ixid=M3w2NjU4OTV8MHwxfGFsbHw5fHx8fHx8fHwxNzI5MTcxODE2fA",
  //       download_location:
  //         "https://api.unsplash.com/photos/KivvbI-DgWU/download?ixid=M3w2NjU4OTV8MHwxfGFsbHw5fHx8fHx8fHwxNzI5MTcxODE2fA",
  //     },
  //     likes: 63,
  //     liked_by_user: false,
  //     current_user_collections: [],
  //     sponsorship: null,
  //     topic_submissions: {
  //       experimental: {
  //         status: "unevaluated",
  //       },
  //       "fashion-beauty": {
  //         status: "approved",
  //         approved_on: "2024-10-16T08:09:59Z",
  //       },
  //       people: {
  //         status: "approved",
  //         approved_on: "2024-10-16T05:51:07Z",
  //       },
  //     },
  //     asset_type: "photo",
  //     user: {
  //       id: "_zfIvOnkMTA",
  //       updated_at: "2024-10-17T10:25:03Z",
  //       username: "redredorange",
  //       name: "Mery Khachatryan",
  //       first_name: "Mery",
  //       last_name: "Khachatryan",
  //       twitter_username: null,
  //       portfolio_url: "https://www.behance.net/redoranges",
  //       bio: null,
  //       location: "Armenia",
  //       links: {
  //         self: "https://api.unsplash.com/users/redredorange",
  //         html: "https://unsplash.com/@redredorange",
  //         photos: "https://api.unsplash.com/users/redredorange/photos",
  //         likes: "https://api.unsplash.com/users/redredorange/likes",
  //         portfolio: "https://api.unsplash.com/users/redredorange/portfolio",
  //         following: "https://api.unsplash.com/users/redredorange/following",
  //         followers: "https://api.unsplash.com/users/redredorange/followers",
  //       },
  //       profile_image: {
  //         small:
  //           "https://images.unsplash.com/profile-1704364251842-b39e68ea29e1image?ixlib=rb-4.0.3&crop=faces&fit=crop&w=32&h=32",
  //         medium:
  //           "https://images.unsplash.com/profile-1704364251842-b39e68ea29e1image?ixlib=rb-4.0.3&crop=faces&fit=crop&w=64&h=64",
  //         large:
  //           "https://images.unsplash.com/profile-1704364251842-b39e68ea29e1image?ixlib=rb-4.0.3&crop=faces&fit=crop&w=128&h=128",
  //       },
  //       instagram_username: "redredorange",
  //       total_collections: 1,
  //       total_likes: 0,
  //       total_photos: 83,
  //       total_promoted_photos: 17,
  //       total_illustrations: 0,
  //       total_promoted_illustrations: 0,
  //       accepted_tos: true,
  //       for_hire: true,
  //       social: {
  //         instagram_username: "redredorange",
  //         portfolio_url: "https://www.behance.net/redoranges",
  //         twitter_username: null,
  //         paypal_email: null,
  //       },
  //     },
  //   },
  //   {
  //     id: "XVKW4x2Eo5w",
  //     slug: "a-mountain-covered-in-snow-under-a-blue-sky-XVKW4x2Eo5w",
  //     alternative_slugs: {
  //       en: "a-mountain-covered-in-snow-under-a-blue-sky-XVKW4x2Eo5w",
  //       es: "una-montana-cubierta-de-nieve-bajo-un-cielo-azul-XVKW4x2Eo5w",
  //       ja: "青空の下雪に覆われた山-XVKW4x2Eo5w",
  //       fr: "une-montagne-recouverte-de-neige-sous-un-ciel-bleu-XVKW4x2Eo5w",
  //       it: "una-montagna-coperta-di-neve-sotto-un-cielo-azzurro-XVKW4x2Eo5w",
  //       ko: "푸른-하늘-아래-눈으로-뒤덮인-산-XVKW4x2Eo5w",
  //       de: "ein-schneebedeckter-berg-unter-blauem-himmel-XVKW4x2Eo5w",
  //       pt: "uma-montanha-coberta-de-neve-sob-um-ceu-azul-XVKW4x2Eo5w",
  //     },
  //     created_at: "2024-10-10T19:28:22Z",
  //     updated_at: "2024-10-17T08:53:51Z",
  //     promoted_at: null,
  //     width: 4002,
  //     height: 6000,
  //     color: "#a6a6a6",
  //     blur_hash: "LeIOkW%MtRkDD%Rjt8kC0LM|Rjoe",
  //     description: null,
  //     alt_description: "A mountain covered in snow under a blue sky",
  //     breadcrumbs: [],
  //     urls: {
  //       raw: "https://images.unsplash.com/photo-1728588267038-9f36d7a74588?ixid=M3w2NjU4OTV8MHwxfGFsbHwxMHx8fHx8fHx8MTcyOTE3MTgxNnw&ixlib=rb-4.0.3",
  //       full: "https://images.unsplash.com/photo-1728588267038-9f36d7a74588?crop=entropy&cs=srgb&fm=jpg&ixid=M3w2NjU4OTV8MHwxfGFsbHwxMHx8fHx8fHx8MTcyOTE3MTgxNnw&ixlib=rb-4.0.3&q=85",
  //       regular:
  //         "https://images.unsplash.com/photo-1728588267038-9f36d7a74588?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NjU4OTV8MHwxfGFsbHwxMHx8fHx8fHx8MTcyOTE3MTgxNnw&ixlib=rb-4.0.3&q=80&w=1080",
  //       small:
  //         "https://images.unsplash.com/photo-1728588267038-9f36d7a74588?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NjU4OTV8MHwxfGFsbHwxMHx8fHx8fHx8MTcyOTE3MTgxNnw&ixlib=rb-4.0.3&q=80&w=400",
  //       thumb:
  //         "https://images.unsplash.com/photo-1728588267038-9f36d7a74588?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NjU4OTV8MHwxfGFsbHwxMHx8fHx8fHx8MTcyOTE3MTgxNnw&ixlib=rb-4.0.3&q=80&w=200",
  //       small_s3:
  //         "https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1728588267038-9f36d7a74588",
  //     },
  //     links: {
  //       self: "https://api.unsplash.com/photos/a-mountain-covered-in-snow-under-a-blue-sky-XVKW4x2Eo5w",
  //       html: "https://unsplash.com/photos/a-mountain-covered-in-snow-under-a-blue-sky-XVKW4x2Eo5w",
  //       download:
  //         "https://unsplash.com/photos/XVKW4x2Eo5w/download?ixid=M3w2NjU4OTV8MHwxfGFsbHwxMHx8fHx8fHx8MTcyOTE3MTgxNnw",
  //       download_location:
  //         "https://api.unsplash.com/photos/XVKW4x2Eo5w/download?ixid=M3w2NjU4OTV8MHwxfGFsbHwxMHx8fHx8fHx8MTcyOTE3MTgxNnw",
  //     },
  //     likes: 92,
  //     liked_by_user: false,
  //     current_user_collections: [],
  //     sponsorship: null,
  //     topic_submissions: {
  //       travel: {
  //         status: "approved",
  //         approved_on: "2024-10-16T08:02:36Z",
  //       },
  //       wallpapers: {
  //         status: "approved",
  //         approved_on: "2024-10-16T08:01:18Z",
  //       },
  //       nature: {
  //         status: "approved",
  //         approved_on: "2024-10-16T05:53:39Z",
  //       },
  //     },
  //     asset_type: "photo",
  //     user: {
  //       id: "jSefUFdqxDI",
  //       updated_at: "2024-10-17T09:34:29Z",
  //       username: "danielsessler",
  //       name: "Daniel Seßler",
  //       first_name: "Daniel",
  //       last_name: "Seßler",
  //       twitter_username: null,
  //       portfolio_url: "http://danielsessler.photos",
  //       bio: "Thank you for visting my profile!\r\nIf you want to support me creating more photos for Unsplash you can help me with a small donation. But a thank you is enough as well 😊",
  //       location: "Munich",
  //       links: {
  //         self: "https://api.unsplash.com/users/danielsessler",
  //         html: "https://unsplash.com/@danielsessler",
  //         photos: "https://api.unsplash.com/users/danielsessler/photos",
  //         likes: "https://api.unsplash.com/users/danielsessler/likes",
  //         portfolio: "https://api.unsplash.com/users/danielsessler/portfolio",
  //         following: "https://api.unsplash.com/users/danielsessler/following",
  //         followers: "https://api.unsplash.com/users/danielsessler/followers",
  //       },
  //       profile_image: {
  //         small:
  //           "https://images.unsplash.com/profile-1634653553021-5ee00c501272image?ixlib=rb-4.0.3&crop=faces&fit=crop&w=32&h=32",
  //         medium:
  //           "https://images.unsplash.com/profile-1634653553021-5ee00c501272image?ixlib=rb-4.0.3&crop=faces&fit=crop&w=64&h=64",
  //         large:
  //           "https://images.unsplash.com/profile-1634653553021-5ee00c501272image?ixlib=rb-4.0.3&crop=faces&fit=crop&w=128&h=128",
  //       },
  //       instagram_username: "daniel.sessler",
  //       total_collections: 13,
  //       total_likes: 1012,
  //       total_photos: 553,
  //       total_promoted_photos: 207,
  //       total_illustrations: 0,
  //       total_promoted_illustrations: 0,
  //       accepted_tos: true,
  //       for_hire: false,
  //       social: {
  //         instagram_username: "daniel.sessler",
  //         portfolio_url: "http://danielsessler.photos",
  //         twitter_username: null,
  //         paypal_email: null,
  //       },
  //     },
  //   },
  // ];

  const saveColorHandler = () => {
    setSavedColors((prev) => {
      const result = [...prev, { color, id: uuid() }];
      localStorage.setItem("savedColors", JSON.stringify(result));
      return result;
    });
    setShouldSaveColor(false);
  };

  const deleteColorHandler = (id: string) => {
    const filteredSavedColors = savedColors.filter((el) => el.id !== id);
    setSavedColors(filteredSavedColors);
    localStorage.setItem("savedColors", JSON.stringify(filteredSavedColors));
  };

  useEffect(() => {
    if (localStorage.getItem("savedColors") !== null) {
      setSavedColors(JSON.parse(localStorage.getItem("savedColors")!));
    }
  }, []);

  useEffect(() => {
    const generatingColors = setTimeout(() => {
      if (countColor < 100 && shouldGenerate) {
        generateColor();
        setCountColor((prev) => prev + 1);
      }
    }, speed);
    return () => clearTimeout(generatingColors);
  }, [countColor, shouldGenerate]);

  useEffect(() => {
    if (countColor === 100) {
      setShouldGenerate(false);
      setCountColor(0);
      setIsAnimateButton(true);
      setShouldSaveColor(true);
    }
    setSpeed(() => {
      if (countColor > 95) {
        return 500;
      }
      return 30;
    });
  }, [countColor]);
  // ("https://images.unsplash.com/photo-1720048171419-b515a96a73b8?crop=entropy&cs=srgb&fm=jpg&ixid=M3w2NjU4OTV8MXwxfGFsbHwxfHx8fHx8fHwxNzI5MTcxODE2fA&ixlib=rb-4.0.3&q=85");
  // const getRoot = document.getElementById("root");
  // useEffect(() => {
  //   if (getRoot) {
  //     getRoot.style.backgroundImage =
  //       "url('https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1720048171419-b515a96a73b8')";
  //   }
  // }, []);

  return (
    <div className="wrapper">
      <div className="top-content">
        <h1>Не знаешь в какой цвет покрасить ноготки? Нажми на глазик 😘</h1>
        <div style={{ background: color }} className="item"></div>
        <button
          onClick={saveColorHandler}
          className={`shouldSaveColorButton ${shouldSaveColor ? "show" : ""}`}
        >
          Сохранить сгенерированный цвет?
        </button>
        <button
          onClick={setShouldGenerateHandler}
          className={`generate-button ${isAnimateButton ? "animation" : ""}`}
        ></button>
      </div>
      <div className="saved-colors-wrapper">
        <h2>Сохраненные цвета:</h2>
        <div className="saved-colors">
          {savedColors.length > 0 ? (
            savedColors.map(({ color, id }) => (
              <div
                style={{ background: color }}
                className="item"
                onClick={() => deleteColorHandler(id)}
              >
                Кликни чтобы удалить
              </div>
            ))
          ) : (
            <p>Пупс еще не сохранял цвета 😢 </p>
          )}
        </div>
      </div>

      <div className="photo-galery-wrapper">
        <h2 onClick={() => setShowPhotos((prev) => !prev)}>{`${
          showPhotos ? "Скрыть" : "Показать"
        } галерею фото`}</h2>
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
    </div>
  );
}

export default App;
