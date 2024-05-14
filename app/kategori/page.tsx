"use client";
import LeftTable from "./leftBoxComponent";
import SearchBox from "../searchBarComponent";
import LorenzCurveSVG from "./lorenzCurveComponent";
import NilaiGiniBoxComponent from "./nilaiGiniBoxComponent";
import LeftOverlayBox from "./leftTableOverlayComponent";
import DescStatisticsBox from "./descStatComponent";
import { useSearchParams } from 'next/navigation';
import { useState, Suspense } from "react";

export default function Page() {
  const searchParams = useSearchParams();
  const queryParam = searchParams.get('datetime') || '';

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
      {isOverlayOpen && <LeftOverlayBox onClose={closeOverlay} />}
      <div className="flex justify-center items-center px-16 bg-orange-50 max-md:px-5">
        <div className="flex flex-col mt-4 max-w-full w-[1299px]">
          <Suspense>
          <SearchBox />
          </Suspense>
          <div className="mt-8 max-md:max-w-full">
            <div className="flex gap-5 max-md:flex-col max-md:gap-0">
              <LeftTable onOpenOverlay={openOverlay} />
              <div className="flex flex-col ml-5 w-[68%] max-md:ml-0 max-md:w-full">
                <div className="flex flex-col grow max-md:mt-10 max-md:max-w-full">
                  <div className="px-px max-md:max-w-full">
                    <div className="flex gap-10 max-md:flex-col max-md:gap-0">
                      <NilaiGiniBoxComponent />
                      <LorenzCurveSVG attr="word_count"/>
                    </div>
                  </div>
                  <div className="px-px mt-12 max-md:mt-10 max-md:max-w-full">
                    <div className="flex gap-10 max-md:flex-col max-md:gap-0">
                      <DescStatisticsBox />
                      <LorenzCurveSVG attr="bluelinks_count"/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="self-end mt-4 text-2xl text-neutral-700 max-md:mt-10 max-md:max-w-full">
            Data diambil pada {queryParam} GMT+7
          </div>
        </div>
      </div>
    </main>
  );
};



function Main() {
  return (
    <div className="flex justify-center items-center px-16 py-20 bg-orange-50 max-md:px-5">
      <div className="flex flex-col mt-8 max-w-full w-[1299px]">
        {/* Search Bar*/}
        <div className="mt-8 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0">
            {/* leftBox */}
            <div className="flex flex-col ml-5 w-[68%] max-md:ml-0 max-md:w-full">
              <div className="flex flex-col grow max-md:mt-10 max-md:max-w-full">
                <div className="px-px max-md:max-w-full">
                  <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                    {/* nilai Gini */}
                    {/* lorenzCurve1 */}
                  </div>
                </div>
                <div className="px-px mt-12 max-md:mt-10 max-md:max-w-full">
                  <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                    {/* lorenzCurve2*/}
                    {/*NER */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="self-end mt-12 text-2xl text-neutral-700 max-md:mt-10 max-md:max-w-full">
          Data diambil pada tanggal XX/XX/XXXX
        </div>
      </div>
    </div>
  );
};

function NER() {
  return (
  <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
    <div className="shrink-0 mx-auto max-w-full bg-amber-100 rounded-xl border-2 border-solid shadow-sm border-neutral-700 h-[300px] w-[400px] max-md:mt-10" />
  </div>
  );
};

function MyComponent() {
  return (
    <div className="flex justify-center items-center px-16 py-20 bg-orange-50 max-md:px-5">
      <div className="flex flex-col mt-8 max-w-full w-[1299px]">
        <div className="flex gap-4 px-9 py-4 bg-white rounded-2xl border border-solid border-neutral-700 max-md:flex-wrap max-md:px-5 max-md:max-w-full">
          <div className="flex flex-col">
            <div className="flex flex-col justify-center items-center px-1.5 w-8 h-8 rounded-full bg-neutral-700">
              <div className="shrink-0 bg-white rounded-full h-[21px] w-[21px]" />
            </div>
            <div className="shrink-0 bg-neutral-700 h-[17px]" />
          </div>
          <div className="flex gap-2 text-2xl whitespace-nowrap text-neutral-700">
            <div className="flex flex-col justify-center">
              <div className="justify-center items-center w-10 h-10 bg-orange-300 rounded-xl border border-solid border-neutral-700">
                EN
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <div className="justify-center items-center w-10 h-10 bg-white rounded-xl border border-solid border-neutral-700">
                ID
              </div>
            </div>
          </div>
          <div className="flex-auto my-auto text-2xl text-neutral-700 max-md:max-w-full">
            National Heroes Of Jamaica
          </div>
        </div>
        <div className="mt-8 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0">
            <div className="flex flex-col w-[32%] max-md:ml-0 max-md:w-full">
              <div className="flex flex-col grow px-9 pt-12 pb-20 mx-auto w-full text-base bg-white rounded-xl border border-solid border-neutral-700 text-neutral-700 max-md:px-5 max-md:mt-10">
                <div className="text-3xl font-bold">
                  Informasi Kekayaan
                  <br />
                  Artikel
                </div>
                <div className="mt-12 text-2xl max-md:mt-10">Marcus Garvey</div>
                <div className="flex gap-5 mt-1.5">
                  <div>Jumlah Kata</div>
                  <div className="flex-auto">21373</div>
                </div>
                <div className="flex gap-3.5 mt-2">
                  <div className="grow">Jumlah Blue-links </div>
                  <div className="flex-auto">516</div>
                </div>
                <div className="mt-7 text-2xl">Nanny of the Maroons</div>
                <div className="flex gap-5 mt-1.5">
                  <div>Jumlah Kata</div>
                  <div className="flex-auto">3614</div>
                </div>
                <div className="flex gap-3.5 mt-2">
                  <div className="grow">Jumlah Blue-links </div>
                  <div className="flex-auto">70</div>
                </div>
                <div className="mt-6 text-2xl">Norman Manley</div>
                <div className="flex gap-5 mt-1.5">
                  <div>Jumlah Kata</div>
                  <div className="flex-auto">3262</div>
                </div>
                <div className="flex gap-3.5 mt-2">
                  <div className="grow">Jumlah Blue-links </div>
                  <div className="flex-auto">123</div>
                </div>
                <div className="mt-7 text-2xl">National Heroes Park</div>
                <div className="flex gap-5 mt-2.5">
                  <div>Jumlah Kata</div>
                  <div className="flex-auto">2393</div>
                </div>
                <div className="flex gap-3.5 mt-2">
                  <div className="grow">Jumlah Blue-links </div>
                  <div className="flex-auto">228</div>
                </div>
                <div className="mt-7 text-2xl">Alexander Bustamante</div>
                <div className="flex gap-5 mt-2.5">
                  <div>Jumlah Kata</div>
                  <div className="flex-auto">1990</div>
                </div>
                <div className="flex gap-3.5 mt-2">
                  <div className="grow">Jumlah Blue-links </div>
                  <div className="flex-auto">102</div>
                </div>
              </div>
            </div>
            <div className="flex flex-col ml-5 w-[68%] max-md:ml-0 max-md:w-full">
              <div className="flex flex-col grow max-md:mt-10 max-md:max-w-full">
                <div className="px-px max-md:max-w-full">
                  <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                    <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
                      <div className="flex flex-col px-10 py-11 mx-auto w-full bg-white rounded-xl border border-solid shadow-sm border-neutral-700 text-neutral-700 max-md:px-5 max-md:mt-10">
                        <div className="mx-6 text-4xl max-md:mx-2.5">
                          Nilai Indeks Gini
                        </div>
                        <div className="flex gap-5 justify-between mt-11 text-2xl max-md:mt-10">
                          <div className="flex flex-col">
                            <div>Jumlah Kata</div>
                            <div className="mt-12 max-md:mt-10">
                              Jumlah Blue-links
                            </div>
                            <div className="mt-12 max-md:mt-10">
                              Jumlah Entitas
                            </div>
                          </div>
                          <div className="flex flex-col self-start whitespace-nowrap">
                            <div>0.4567</div>
                            <div className="mt-12 max-md:mt-10">0.5324</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
                      {/* <img
                        loading="lazy"
                        srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/907944ede8e1193388dffd7e6fcf047a4ef8f12856e31c5f248099992bc40a54?apiKey=5e90e3660dd946439d8c7e2986abba03&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/907944ede8e1193388dffd7e6fcf047a4ef8f12856e31c5f248099992bc40a54?apiKey=5e90e3660dd946439d8c7e2986abba03&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/907944ede8e1193388dffd7e6fcf047a4ef8f12856e31c5f248099992bc40a54?apiKey=5e90e3660dd946439d8c7e2986abba03&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/907944ede8e1193388dffd7e6fcf047a4ef8f12856e31c5f248099992bc40a54?apiKey=5e90e3660dd946439d8c7e2986abba03&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/907944ede8e1193388dffd7e6fcf047a4ef8f12856e31c5f248099992bc40a54?apiKey=5e90e3660dd946439d8c7e2986abba03&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/907944ede8e1193388dffd7e6fcf047a4ef8f12856e31c5f248099992bc40a54?apiKey=5e90e3660dd946439d8c7e2986abba03&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/907944ede8e1193388dffd7e6fcf047a4ef8f12856e31c5f248099992bc40a54?apiKey=5e90e3660dd946439d8c7e2986abba03&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/907944ede8e1193388dffd7e6fcf047a4ef8f12856e31c5f248099992bc40a54?apiKey=5e90e3660dd946439d8c7e2986abba03&"
                        className="grow w-full border-2 border-solid aspect-[1.33] border-neutral-700 max-md:mt-10"
                      /> */}
                      <LorenzCurveSVG attr="word_count"/>
                    </div>
                  </div>
                </div>
                <div className="px-px mt-12 max-md:mt-10 max-md:max-w-full">
                  <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                    <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
                      <img
                        loading="lazy"
                        srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/9fd8c6de1ee2615819bc6850f4a098bcaa8ae0b8cc094e5ca137bdf1ba559222?apiKey=5e90e3660dd946439d8c7e2986abba03&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/9fd8c6de1ee2615819bc6850f4a098bcaa8ae0b8cc094e5ca137bdf1ba559222?apiKey=5e90e3660dd946439d8c7e2986abba03&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/9fd8c6de1ee2615819bc6850f4a098bcaa8ae0b8cc094e5ca137bdf1ba559222?apiKey=5e90e3660dd946439d8c7e2986abba03&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/9fd8c6de1ee2615819bc6850f4a098bcaa8ae0b8cc094e5ca137bdf1ba559222?apiKey=5e90e3660dd946439d8c7e2986abba03&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/9fd8c6de1ee2615819bc6850f4a098bcaa8ae0b8cc094e5ca137bdf1ba559222?apiKey=5e90e3660dd946439d8c7e2986abba03&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/9fd8c6de1ee2615819bc6850f4a098bcaa8ae0b8cc094e5ca137bdf1ba559222?apiKey=5e90e3660dd946439d8c7e2986abba03&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/9fd8c6de1ee2615819bc6850f4a098bcaa8ae0b8cc094e5ca137bdf1ba559222?apiKey=5e90e3660dd946439d8c7e2986abba03&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/9fd8c6de1ee2615819bc6850f4a098bcaa8ae0b8cc094e5ca137bdf1ba559222?apiKey=5e90e3660dd946439d8c7e2986abba03&"
                        className="grow w-full border-2 border-solid aspect-[1.33] border-neutral-700 max-md:mt-10"
                      />
                    </div>
                    <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
                      <div className="shrink-0 mx-auto max-w-full bg-amber-100 rounded-xl border-2 border-solid shadow-sm border-neutral-700 h-[300px] w-[400px] max-md:mt-10" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="self-end mt-12 text-2xl text-neutral-700 max-md:mt-10 max-md:max-w-full">
          Data diambil pada tanggal XX/XX/XXXX
        </div>
      </div>
    </div>
  );
}


