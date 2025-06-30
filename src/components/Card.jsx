const Card = ({ headingHTML, bg, headingStyle }) => {
  return (
    <div
      className={`
        w-[98%] h-[15rem]
        sm:w-[13.5rem] sm:h-[14.68rem]
        rounded-[0.96rem] p-4
        ${bg || "bg-white"}
        flex-shrink-0 mx-auto sm:mx-0
      `}
      style={{
        boxShadow: "3.131px 3.131px 28.177px 0px rgba(51, 59, 80, 0.12)",
      }}
    >
      <div
        className={`font-inter tracking-tight break-words leading-snug h-full flex flex-col ${headingStyle}`}
        dangerouslySetInnerHTML={{ __html: headingHTML }}
      />
    </div>
  );
};

export default Card;
