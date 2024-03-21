import "@/styles/mint.css";

export default function MintPage() {
  return (
    <div className="flex flex-col  justify-center items-center desktop:px-32 mobile:px-4 mobile:pb-8 desktop:pb-10 relative overflow-hidden desktop:pt-36 mobile:pt-32 gap-8 text-white">
      <div className="absolute top-0 left-0 opacity-10 -z-10">
        <img src="/assets/bg-1.svg" alt="" />
      </div>
      <div className="absolute bottom-0 right-0 opacity-10 -z-10 rotate-180">
        <img src="/assets/bg-1.svg" alt="" />
      </div>
      <div className="max-w-[1280px] max-sm:w-full mx-auto px-2">
        <img
          className="banner-mint object-cover w-full"
          src="/assets/images/banner-mint-page.png"
        />
      </div>
      <div>
        <p className="sm:text-center font-medium text-[18px] max-sm:text-[12px] max-sm:text-center">
          There are 3 types of Boxes with 3 different prices from 100 PLS to 300
          PLS to mint NFTs with different rarities as shown in the table below
        </p>
        <p className="sm:text-center font-medium text-[18px] max-sm:text-[12px] max-sm:text-center">
          (Use PLS to Mint NFTs on the Polygon network according to each type of
          Box.)
        </p>
      </div>
      <div className="flex gap-[20px] max-md:gap-[10px] flex-wrap justify-center">
        <div className="relative cursor-pointer w-[250px] bg-gradient-to-t from-white/10 to-white/5 rounded-[15px]">
          {/* <img class="z-[1] absolute top-0 left-0" src="/assets/images/nft-wrapper.png" /> */}
          <div className="relative z-[2] px-4 py-[10px] ">
            <div className="flex justify-center shadow-box-mint rounded-2xl">
              <img src="/assets/box/3.gif" />
            </div>
            <div>
              <p className="text-[18px] font-semibold text-center text-stroke">
                Brozen Box
              </p>
              <p className="text-[18px] font-semibold text-center">100 PLS</p>
            </div>
            {/* <div>
              <img src="/assets/images/player-card/bronze.png" />
          </div> */}
            {/* <div class="flex justify-center mt-2 ">
              <div class="relative shadow-btn">
                  <img src="/assets/images/btn-mint-hover.png" />
                  <img type="1"
                      class="btnBuyNFT absolute w-full h-full top-0 left-0 hover:opacity-0 transition-all duration-300"
                      src="/assets/images/btn-mint.png" />
              </div>
          </div> */}
            <div
              id="bronzeMint"
              className="w-fit mx-auto mt-[16px] shadow-btn py-[12px] px-[50px] border !border-[#B920ED] rounded-[16px] bg-gradient-to-br from-[#2824E6] to-[#E40FAC]"
            >
              <p className="text-[16px] font-semibold">Mint</p>
            </div>
          </div>
        </div>
        <div className="relative cursor-pointer w-[250px] bg-gradient-to-t from-white/10 to-white/5 rounded-[15px]">
          {/* <img class="z-[1] absolute top-0 left-0" src="/assets/images/nft-wrapper.png" /> */}
          <div className="relative z-[2] px-4 py-[10px]">
            <div className="flex justify-center shadow-box-mint rounded-2xl">
              <img src="/assets/box/2.gif" />
            </div>
            <div>
              <p className="text-[18px] font-semibold text-center text-stroke">
                Silver Box
              </p>
              <p className="text-[18px] font-semibold text-center">200 PLS</p>
            </div>
            {/* <div>
              <img src="/assets/images/player-card/age.png" />
          </div> */}
            {/* <div class="flex justify-center mt-2 ">
              <div class="relative shadow-btn">
                  <img src="/assets/images/btn-mint-hover.png" />
                  <img type="2"
                      class="btnBuyNFT absolute w-full h-full top-0 left-0 hover:opacity-0 transition-all duration-300"
                      src="/assets/images/btn-mint.png" />
              </div>
          </div> */}
            <div
              id="silverMint"
              className="w-fit mx-auto mt-[16px] shadow-btn py-[12px] px-[50px] border !border-[#B920ED] rounded-[16px] bg-gradient-to-br from-[#2824E6] to-[#E40FAC]"
            >
              <p className="text-[16px] font-semibold">Mint</p>
            </div>
          </div>
        </div>
        <div className="relative cursor-pointer w-[250px] bg-gradient-to-t from-white/10 to-white/5 rounded-[15px]">
          {/* <img class="z-[1] absolute top-0 left-0" src="/assets/images/nft-wrapper.png" /> */}
          <div className="relative z-[2] px-4 py-[10px]">
            <div className="flex justify-center shadow-box-mint rounded-2xl">
              <img src="/assets/box/1.gif" />
            </div>
            <div>
              <p className="text-[18px] font-semibold text-center text-stroke">
                Gold Box
              </p>
              <p className="text-[18px] font-semibold text-center">300 PLS</p>
            </div>
            {/* <div>
              <img src="/assets/images/player-card/gold.png" />
          </div> */}
            {/* <div class="flex justify-center mt-2 ">
              <div class="relative shadow-btn">
                  <img src="/assets/images/btn-mint-hover.png" />
                  <img type="3"
                      class="btnBuyNFT absolute w-full h-full top-0 left-0 hover:opacity-0 transition-all duration-300"
                      src="/assets/images/btn-mint.png" />
              </div>
          </div> */}
            <div
              id="goldMint"
              className="w-fit mx-auto mt-[16px] shadow-btn py-[12px] px-[50px] border !border-[#B920ED] rounded-[16px] bg-gradient-to-br from-[#2824E6] to-[#E40FAC]"
            >
              <p className="text-[16px] font-semibold">Mint</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
