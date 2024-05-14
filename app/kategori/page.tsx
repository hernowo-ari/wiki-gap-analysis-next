"use client";
import LeftTable from "./leftBoxComponent";
import SearchBox from "../searchBarComponent";
import LorenzCurveSVG from "./lorenzCurveComponent";
import NilaiGiniBoxComponent from "./nilaiGiniBoxComponent";
import LeftOverlayBox from "./leftTableOverlayComponent";
import DescStatisticsBox from "./descStatComponent";
import { useState, Suspense } from "react";
import FetchedDateComponent from "./fetchedDateComponent";

export default function Page() {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  const openOverlay = () => {
    setIsOverlayOpen(true);
  };

  const closeOverlay = () => {
    setIsOverlayOpen(false);
  };

  return (
    <main>
      <div className="flex justify-center mt-2">
        <h1 className="text-3xl font-bold">WikiGapAnalysis</h1>
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        {isOverlayOpen && <LeftOverlayBox onClose={closeOverlay} />}
      </Suspense>

      <div className="flex justify-center items-center px-16 bg-orange-50 max-md:px-5">
        <div className="flex flex-col mt-4 max-w-full w-[1299px]">

          <Suspense fallback={<div>Loading...</div>}>
            <SearchBox />
          </Suspense>

          <div className="mt-8 max-md:max-w-full">
            <div className="flex gap-5 max-md:flex-col max-md:gap-0">

              <Suspense fallback={<div>Loading...</div>}>
                <LeftTable onOpenOverlay={openOverlay} />
              </Suspense>

              <div className="flex flex-col ml-5 w-[68%] max-md:ml-0 max-md:w-full">
                <div className="flex flex-col grow max-md:mt-10 max-md:max-w-full">
                  <div className="px-px max-md:max-w-full">
                    <div className="flex gap-10 max-md:flex-col max-md:gap-0">

                      <Suspense fallback={<div>Loading...</div>}>
                        <NilaiGiniBoxComponent />
                      </Suspense>

                      <Suspense fallback={<div>Loading...</div>}>
                        <LorenzCurveSVG attr="word_count" />
                      </Suspense>

                    </div>
                  </div>
                  <div className="px-px mt-12 max-md:mt-10 max-md:max-w-full">
                    <div className="flex gap-10 max-md:flex-col max-md:gap-0">

                      <Suspense fallback={<div>Loading...</div>}>
                        <DescStatisticsBox />
                      </Suspense>

                      <Suspense fallback={<div>Loading...</div>}>
                        <LorenzCurveSVG attr="bluelinks_count" />
                      </Suspense>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Suspense fallback={<div>Loading...</div>}>
            <FetchedDateComponent />
          </Suspense>
        </div>
      </div>
    </main>
  );
};
