import { useRef, useState } from "react";
import { TiLocationArrow } from "react-icons/ti";

//componente
const BentoTilt = ({ children, className = "" }) => {
  const [transformStyle, setTransformStyle] = useState("");
  const itemRef = useRef();

  const handleMouseMove = (e) => {
    if (!itemRef.current) return; //sale
    //get porperties of the position of the card:
    const { left, top, width, height } =
      itemRef.current.getBoundingClientRect();

    const relativeX = (e.clientX - left) / width;
    const relativeY = (e.clientY - top) / height;

    const tiltX = (relativeY - 0.5) * 5;
    const tiltY = (relativeX - 0.5) * -5;

    const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(0.95, 0.95, 0.95)`;

    setTransformStyle(newTransform);
  };

  const handleMouseLeave = () => {
    setTransformStyle("");
  };
  return (
    <div
      className={className}
      ref={itemRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle }}
    >
      {children}
    </div>
  );
};

//componente
const BentoCard = ({
  src,
  title,
  description,
  textClassName = "text-blue-50",
  overlayClassName = "",
}) => {
  return (
    <div className="relative size-full">
      {src.endsWith(".mp4") ? (
        <video
          src={src}
          loop
          muted
          autoPlay
          className="absolute left-0 top-0 size-full object-cover object-center"
        />
      ) : (
        <img
          src={src}
          className="absolute left-0 top-0 size-full object-cover object-center"
        />
      )}
      {overlayClassName && (
        <div className={`absolute left-0 top-0 size-full z-10 ${overlayClassName}`} />
      )}
      <div className={`relative z-20 flex size-full flex-col justify-between p-5 ${textClassName}`}>
        <div>
          <h1 className="bento-title special-font">{title}</h1>
          {description && (
            <p className="mt-3 max-w-64 text-xs md:text-base">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
};

const Features = () => {
  return (
    <section id="features" className="bg-black pb-52">
      <div className="container mx-auto px-3 md:px-10">
        <div className="px-5 py-32">
          <p className="font-circular-web text-lg text-blue-50">
            Neon Capabilities
          </p>
          <p className="max-w-md font-circular-web text-lg text-blue-50 opacity-50">
            Trade by chatting. Neon handles order placement, market discovery,
            portfolio insights, and live data—so you can act fast with clarity.
          </p>
        </div>
        <BentoTilt className="border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]">
          <BentoCard
            src="img/polymarkets.png"
            textClassName="text-white"
            overlayClassName="bg-black/50"
            title={
              <>
                Core Trades
              </>
            }
            description="Place buy/sell orders, close positions, and redeem winnings. Approve USDC once, then trade freely."
          />
        </BentoTilt>

        <div className="grid h-[135vh] grid-cols-2 grid-rows-3 gap-7">
          <BentoTilt className="bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2">
            <BentoCard
              src="img/market.jpg"
              textClassName="text-white"
              overlayClassName="bg-black/50"
              title={
                <>
                  Market Discovery
                </>
              }
              description="Search topics, explain markets, see trending markets, and get quick price checks."
            />
          </BentoTilt>

          <BentoTilt className="bento-tilt_1 row-spam-1 ms-32 md:col-span-1 md:ms-0">
            <BentoCard
              src="img/portfolio.jpg"
              textClassName="text-white"
              overlayClassName="bg-black/50"
              title={
                <>
                  Portfolio
                </>
              }
              description="View positions, P&L, balances, and get nudges like risk checks and price alerts."
            />
          </BentoTilt>

          <BentoTilt className="bento-tilt_1 me-14 md:col-span-1 md:me-0">
            <BentoCard
              src="img/price.jpg"
              title={
                <>
                  Data & Analytics
                </>
              }
              description="Order book snapshots, price history, and market sync to keep your view current."
            />
          </BentoTilt>

          <BentoTilt className="bento-tilt_2  ">
            <div className="flex size-full flex-col justify-between bg-violet-300 p-5">
              <h1 className="bento-title special-font max-w-64">
                MPesa, Twitter, WhatsApp
              </h1>
              <TiLocationArrow className="m-5 scale-[5] self-end" />
            </div>
          </BentoTilt>
          <BentoTilt className="bento-tilt_2">
            <video
              src="videos/feature-5.mp4"
              loop
              muted
              autoPlay
              className="size-full object-cover object-center"
            />
          </BentoTilt>
        </div>
      </div>
    </section>
  );
};

export default Features;
