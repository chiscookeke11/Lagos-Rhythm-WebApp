"use client";
import React, { useEffect, useRef, useState } from "react";
import Button from "./common/Button";
import HTMLFlipBook from "react-pageflip";

const PageCover = React.forwardRef((props: any, ref: any) => {
  return (
    <div className="page page-cover" ref={ref} data-density="hard">
      <div className="page-content">
        <h2>{props.children}</h2>
      </div>
    </div>
  );
});
PageCover.displayName = "PageCover"; // For React forwardRef

export default function PopularThings() {
  const flipBookRef = useRef<any>(null);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [orientation, setOrientation] = useState("");
  const [state, setState] = useState("");

 useEffect(() => {
  if (flipBookRef.current && flipBookRef.current.pageFlip) {
    const pageFlip = flipBookRef.current.pageFlip();
    if (pageFlip) {
      setTotalPages(pageFlip.getPageCount());
    }
  }
}, []);


  const nextPage = () => {
    if (flipBookRef.current) {
      flipBookRef.current.pageFlip().flipNext();
    }
  };

  const prevPage = () => {
    if (flipBookRef.current) {
      flipBookRef.current.pageFlip().flipPrev();
    }
  };

  const onFlip = (e: any) => {
    setPage(e.data);
  };

  const onChangeOrientation = (e: any) => {
    setOrientation(e.data);
  };

  const onChangeState = (e: any) => {
    setState(e.data);
  };

  return (
    <section className="w-full bg-[#EB662B0D] py-[8%] px-[5%] flex flex-col md:flex-row items-center justify-center gap-10 md:gap-20 font-inter">
      <div className="w-full max-w-[440px] flex flex-col items-start gap-7">
        <h2 className="font-bold text-[#05073C] text-3xl mb-1">
          Interesting things to do
        </h2>
        <p className="text-sm font-normal text-[#05073C]">
          There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.
        </p>
        <Button
          label="See All"
          type="button"
          variant="primary"
          className="w-full !bg-[#EB662B] text-white !py-4"
        />
      </div>

      <div className="w-full max-w-2xl h-full gap-4 py-2">
        <HTMLFlipBook
          width={300}
          height={400}
          size="stretch"
          minWidth={315}
          maxWidth={1000}
          minHeight={400}
          maxHeight={1536}
          maxShadowOpacity={0.5}
          showCover={true}
          mobileScrollSupport={true}
          className="image-slider"
          startPage={0}
          style={{ backgroundColor: "wheat" }}
          drawShadow={true}
          flippingTime={1000}
          usePortrait={true}
          startZIndex={0}
          autoSize={true}
          clickEventForward={true}
          useMouseEvents={true}
          swipeDistance={30}
          showPageCorners={true}
          disableFlipByClick={false}
          onFlip={onFlip}
          onChangeOrientation={onChangeOrientation}
          onChangeState={onChangeState}
          ref={flipBookRef}
        >
          <PageCover>START</PageCover>
          <div className="page">Page 1</div>
          <div className="page">Page 2</div>
          <div className="page">Page 3</div>
          <div className="page">Page 4</div>
          <PageCover>THE END</PageCover>
        </HTMLFlipBook>

        <div className="mt-4 flex items-center gap-4 justify-between">
          <button onClick={prevPage} className="px-4 py-2 bg-[#EB662B] text-white rounded">
            Previous Page
          </button>
          <span>
            Page {page + 1} of {totalPages}
          </span>
          <button onClick={nextPage} className="px-4 py-2 bg-[#EB662B] text-white rounded">
            Next Page
          </button>
        </div>

        <div className="text-sm text-gray-500 mt-2">
          State: <i>{state}</i>, Orientation: <i>{orientation}</i>
        </div>
      </div>
    </section>
  );
}
