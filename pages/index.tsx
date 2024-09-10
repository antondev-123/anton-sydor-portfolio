import Header from "../components/Header/Header";
import Startup from "../components/Header/StartupLogo/Startup";
import MyName from "../components/Home/MyName/MyName";
import { useContext, useEffect, useState, useRef } from "react";
import SocialMediaArround from "../components/Home/SocialMediaArround/SocialMediaArround";
import AboutMe from "../components/Home/AboutMe/AboutMe";
import ThisCantBeReached from "../components/Home/ThisSiteCantBeReached/ThisCantBeReached";
import WhereIHaveWorked from "../components/Home/WhereIHaveWorked/WhereIHaveWorked";
import Education from "../components/Home/Education/Education";
import SomethingIveBuilt from "../components/Home/SomethingIveBuilt/SomethingIveBuilt";
import GetInTouch from "../components/Home/GetInTouch/GetInTouch";
import Footer from "../components/Footer/Footer";
import AppContext from "../components/AppContextFolder/AppContext";
import Aos from "aos";
import "aos/dist/aos.css";
import Head from "next/head";
import ScreenSizeDetector from "../components/CustomComponents/ScreenSizeDetector";
export default function Home() {
  const [ShowElement, setShowElement] = useState(false);
  const [ShowThisCantBeReached, setShowThisCantBeReached] = useState(true);
  const [ShowMe, setShowMe] = useState(false);
  // context Variable to clearInterval
  const context = useContext(AppContext);
  const homeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    clearInterval(context.sharedState.userdata.timerCookieRef.current);
    if (typeof window !== "undefined") {
      window.removeEventListener(
        "resize",
        context.sharedState.userdata.windowSizeTracker.current
      );
      window.removeEventListener(
        "mousemove",
        context.sharedState.userdata.mousePositionTracker.current,
        false
      );
      window.removeEventListener(
        "resize",
        context.sharedState.typing.eventInputLostFocus
      );
      document.removeEventListener(
        "keydown",
        context.sharedState.typing.keyboardEvent
      );
    }
    setTimeout(() => {
      setShowElement(true);
    }, 4500);

    setTimeout(() => {
      setShowThisCantBeReached(false);
    }, 5400);
    setTimeout(() => {
      setShowElement(false);
      setShowMe(true);
      context.sharedState.finishedLoading = true;
      context.setSharedState(context.sharedState);
    }, 10400);
  }, [context, context.sharedState]);

  useEffect(() => {
    Aos.init({ duration: 500, once: true });
  }, []);

  const meta = {
    title: "Anton Sydor - Web Developer",
    description: `I've been working on Web development for 10 years straight. Get in touch with me to know more.`,
    image: "/myPortfolio.png",
    icon: "/favicon.ico",
    type: "website",
  };
  const isProd = process.env.NODE_ENV === "production";

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <link rel="icon" href={meta.icon} sizes="any" />
        <meta name="robots" content="follow, index" />
        <meta content={meta.description} name="description" />
        <meta property="og:url" content={`anton-sydor.netlify.app`} />
        <link rel="canonical" href={`anton-sydor.netlify.app`} />
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content="Anton Sydor" />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@titofabdo" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.image} />
      </Head>
      <div className="relative flex flex-col items-center snap-mandatory min-h-screen bg-AAprimary w-full ">
        {context.sharedState.finishedLoading ? (
          <></>
        ) : ShowThisCantBeReached ? (
          <ThisCantBeReached />
        ) : (
          <></>
        )}
        {context.sharedState.finishedLoading ? (
          <></>
        ) : ShowElement ? (
          <Startup />
        ) : (
          <></>
        )}
        <Header
          finishedLoading={context.sharedState.finishedLoading}
          sectionsRef={homeRef}
        />
        <MyName finishedLoading={context.sharedState.finishedLoading} />
        <SocialMediaArround
          finishedLoading={context.sharedState.finishedLoading}
        />
        {context.sharedState.finishedLoading ? <AboutMe /> : <></>}
        {context.sharedState.finishedLoading ? <WhereIHaveWorked /> : <></>}
        {context.sharedState.finishedLoading ? <Education /> : <></>}
        {context.sharedState.finishedLoading ? <SomethingIveBuilt /> : <></>}
        {context.sharedState.finishedLoading ? <GetInTouch /> : <></>}
        {context.sharedState.finishedLoading ? (
          <Footer
            githubUrl={"https://github.com/antondev-123/anton-sydor-portfolio"}
            hideSocialsInDesktop={true}
          />
        ) : (
          <></>
        )}
        {!isProd && <ScreenSizeDetector />}
      </div>
    </>
  );
}
