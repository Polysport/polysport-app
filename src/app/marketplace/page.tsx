export default function MarketplacePage() {
  return (
    <div>
      {/* banner */}
      <div className="absolute top-0 left-0 w-full h-screen">
        <img
          className="absolute right-0 top-[5%]"
          src="/assets/images/decor/decor-1.png"
        />
        <img
          className="absolute left-[5%] top-[25%]"
          src="/assets/images/decor/decor-circle.png"
        />
        <img
          className="absolute left-[25%] top-[65%]"
          src="/assets/images/decor/coin-1.png"
        />
        <img
          className="absolute right-[15%] top-[85%]"
          src="/assets/images/decor/star-2.png"
        />
        <img
          className="absolute right-0 top-[65%]"
          src="/assets/images/decor/decor-1.png"
        />
        <img
          className="absolute left-0 top-1/2"
          src="/assets/images/decor/decor-2.png"
        />
        <img
          className="absolute left-0 top-[150vh]"
          src="/assets/images/decor/decor-3.png"
        />
        <img
          className="absolute right-0 top-[180vh]"
          src="/assets/images/decor/decor-4.png"
        />
      </div>

      {/* intro */}
      <div className="flex desktop:flex-row mobile:flex-col justify-around items-center desktop:px-32 mobile:px-4 mobile:pb-8 desktop:pb-0 relative overflow-hidden desktop:pt-36 mobile:pt-32 gap-8 text-white">
        <div className="desktop:w-1/2">
          <div>
            <span className="desktop:text-[58px] mobile:text-[28px] font-bold text-white">
              Discover, collect, and sell extraordinary{" "}
              <span className="nfts">NFTs</span>
            </span>
            <br />
          </div>
          <div className="mt-16">
            <div className="text-white">
              NFT is the world's first and largest NFT marketplace
            </div>
            <div className="flex gap-4 mt-4">
              <button className="button-mint-and-burn text-white width-[250px] rounded-3xl px-4 py-2 font-bold">
                Burn
              </button>
              <button
                // onclick="location.href='./mint'"
                className="button-document text-white width-[250px] rounded-3xl px-4 py-2 font-bold"
              >
                Mint
              </button>
              <button
                // onclick="location.href='./onsale'"
                className="button-document text-white width-[250px] rounded-3xl px-4 py-2 font-bold"
              >
                Explore selling NFTs
              </button>
            </div>
          </div>
          <div className="flex gap-4 mt-12 text-xl">
            <div>
              <span>240k+</span>
              <br />
              <span>Total Sale</span>
            </div>
            <div>
              <span>100k+</span>
              <br />
              <span>Auctions</span>
            </div>
            <div>
              <span>240k+</span>
              <br />
              <span>Artists</span>
            </div>
          </div>
        </div>
        <div>
          <div className="desktop:w-[547px] desktop:h-[597px] mobile:w-[250px] mobile:h-[350px]">
            <img src="/assets/images/marketplace-intro.png" />
          </div>
        </div>
      </div>

      {/* top volume */}
      <div className="desktop:px-32 mobile:px-8 mobile:pb-8 desktop:pb-0 relative overflow-hidden text-white desktop:flex-row mobile:flex-col">
        <div className="text-center desktop:text-[36px] mobile:text-2xl text-primary font-bold">
          <h5>Top Volume</h5>
        </div>
        <div className="flex gap-2 mt-8 overflow-auto">
          <div className="flex gap-3 items-center top-volume min-w-[240px]">
            <img
              src="/assets/images/top-volume.png"
              className="mobile:w-[64px] mobile:h-[64px]"
            />
            <div>
              <b className="text-xl">Polysport</b>
              <br />
              <span>MATIC 600,000</span>
            </div>
          </div>
          <div className="flex gap-3 items-center top-volume min-w-[240px]">
            <img
              src="/assets/images/top-volume.png"
              className="mobile:w-[64px] mobile:h-[64px]"
            />
            <div>
              <b className="text-xl">Polysport</b>
              <br />
              <span>MATIC 600,000</span>
            </div>
          </div>
          <div className="flex gap-3 items-center top-volume min-w-[240px]">
            <img
              src="/assets/images/top-volume.png"
              className="mobile:w-[64px] mobile:h-[64px]"
            />
            <div>
              <b className="text-xl">Polysport</b>
              <br />
              <span>MATIC 600,000</span>
            </div>
          </div>
          <div className="flex gap-3 items-center top-volume min-w-[240px]">
            <img
              src="/assets/images/top-volume.png"
              className="mobile:w-[64px] mobile:h-[64px]"
            />
            <div>
              <b className="text-xl">Polysport</b>
              <br />
              <span>MATIC 600,000</span>
            </div>
          </div>
          <div className="flex gap-3 items-center top-volume min-w-[240px]">
            <img
              src="/assets/images/top-volume.png"
              className="mobile:w-[64px] mobile:h-[64px]"
            />
            <div>
              <b className="text-xl">Polysport</b>
              <br />
              <span>MATIC 600,000</span>
            </div>
          </div>
        </div>
      </div>

      {/* trending */}
      <div className="text-white desktop:px-32 mobile:px-8 mt-16">
        <div className="flex justify-between">
          <h5 className="text-2xl text-primary font-bold">Trending</h5>
          <button className="button-explore-all px-4 py-2 rounded">
            Explore all
          </button>
        </div>
        <div className="flex mt-8 overflow-auto gap-4">
          <div className="bg-group-card rounded-xl p-4 min-w-[350px]">
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-card-bg rounded-xl">
                <img
                  className="w-[155px] h-[155px]"
                  src="/assets/images/trending-card/player-1.png"
                />
              </div>
              <div className="bg-card-bg rounded-xl">
                <img
                  className="w-[155px] h-[155px]"
                  src="/assets/images/trending-card/player-1.png"
                />
              </div>
              <div className="bg-card-bg rounded-xl">
                <img
                  className="w-[155px] h-[155px]"
                  src="/assets/images/trending-card/player-1.png"
                />
              </div>
              <div className="bg-card-bg rounded-xl">
                <img
                  className="w-[155px] h-[155px]"
                  src="/assets/images/trending-card/player-1.png"
                />
              </div>
            </div>
            <div className="mt-4">
              <img src="/assets/images/trending-card/user-details.png" />
            </div>
          </div>
          <div className="bg-group-card rounded-xl p-4 min-w-[350px]">
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-card-bg rounded-xl">
                <img
                  className="w-[155px] h-[155px]"
                  src="/assets/images/trending-card/player-1.png"
                />
              </div>
              <div className="bg-card-bg rounded-xl">
                <img
                  className="w-[155px] h-[155px]"
                  src="/assets/images/trending-card/player-1.png"
                />
              </div>
              <div className="bg-card-bg rounded-xl">
                <img
                  className="w-[155px] h-[155px]"
                  src="/assets/images/trending-card/player-1.png"
                />
              </div>
              <div className="bg-card-bg rounded-xl">
                <img
                  className="w-[155px] h-[155px]"
                  src="/assets/images/trending-card/player-1.png"
                />
              </div>
            </div>
            <div className="mt-4">
              <img src="/assets/images/trending-card/user-details.png" />
            </div>
          </div>
          <div className="bg-group-card rounded-xl p-4 min-w-[350px]">
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-card-bg rounded-xl">
                <img
                  className="w-[155px] h-[155px]"
                  src="/assets/images/trending-card/player-1.png"
                />
              </div>
              <div className="bg-card-bg rounded-xl">
                <img
                  className="w-[155px] h-[155px]"
                  src="/assets/images/trending-card/player-1.png"
                />
              </div>
              <div className="bg-card-bg rounded-xl">
                <img
                  className="w-[155px] h-[155px]"
                  src="/assets/images/trending-card/player-1.png"
                />
              </div>
              <div className="bg-card-bg rounded-xl">
                <img
                  className="w-[155px] h-[155px]"
                  src="/assets/images/trending-card/player-1.png"
                />
              </div>
            </div>
            <div className="mt-4">
              <img src="/assets/images/trending-card/user-details.png" />
            </div>
          </div>
          <div className="bg-group-card rounded-xl p-4 min-w-[350px]">
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-card-bg rounded-xl">
                <img
                  className="w-[155px] h-[155px]"
                  src="/assets/images/trending-card/player-1.png"
                />
              </div>
              <div className="bg-card-bg rounded-xl">
                <img
                  className="w-[155px] h-[155px]"
                  src="/assets/images/trending-card/player-1.png"
                />
              </div>
              <div className="bg-card-bg rounded-xl">
                <img
                  className="w-[155px] h-[155px]"
                  src="/assets/images/trending-card/player-1.png"
                />
              </div>
              <div className="bg-card-bg rounded-xl">
                <img
                  className="w-[155px] h-[155px]"
                  src="/assets/images/trending-card/player-1.png"
                />
              </div>
            </div>
            <div className="mt-4">
              <img src="/assets/images/trending-card/user-details.png" />
            </div>
          </div>
          <div className="bg-group-card rounded-xl p-4 min-w-[350px]">
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-card-bg rounded-xl">
                <img
                  className="w-[155px] h-[155px]"
                  src="/assets/images/trending-card/player-1.png"
                />
              </div>
              <div className="bg-card-bg rounded-xl">
                <img
                  className="w-[155px] h-[155px]"
                  src="/assets/images/trending-card/player-1.png"
                />
              </div>
              <div className="bg-card-bg rounded-xl">
                <img
                  className="w-[155px] h-[155px]"
                  src="/assets/images/trending-card/player-1.png"
                />
              </div>
              <div className="bg-card-bg rounded-xl">
                <img
                  className="w-[155px] h-[155px]"
                  src="/assets/images/trending-card/player-1.png"
                />
              </div>
            </div>
            <div className="mt-4">
              <img src="/assets/images/trending-card/user-details.png" />
            </div>
          </div>
        </div>
      </div>

      {/* volume ranking */}
      <div className="text-white desktop:px-32 mobile:px-8 mt-16">
        <div className="flex justify-between">
          <h5 className="text-2xl text-primary font-bold">Volume rankings</h5>
          <button className="button-explore-all px-4 py-2 rounded">
            Explore all
          </button>
        </div>
        <div className="flex mt-8 overflow-auto gap-4">
          <div className="bg-group-card rounded-xl p-4 min-w-[350px]">
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-card-bg rounded-xl">
                <img
                  className="w-[155px] h-[155px]"
                  src="/assets/images/trending-card/player-1.png"
                />
              </div>
              <div className="bg-card-bg rounded-xl">
                <img
                  className="w-[155px] h-[155px]"
                  src="/assets/images/trending-card/player-1.png"
                />
              </div>
              <div className="bg-card-bg rounded-xl">
                <img
                  className="w-[155px] h-[155px]"
                  src="/assets/images/trending-card/player-1.png"
                />
              </div>
              <div className="bg-card-bg rounded-xl">
                <img
                  className="w-[155px] h-[155px]"
                  src="/assets/images/trending-card/player-1.png"
                />
              </div>
            </div>
            <div className="mt-4">
              <img src="/assets/images/trending-card/user-details.png" />
            </div>
          </div>
          <div className="bg-group-card rounded-xl p-4 min-w-[350px]">
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-card-bg rounded-xl">
                <img
                  className="w-[155px] h-[155px]"
                  src="/assets/images/trending-card/player-1.png"
                />
              </div>
              <div className="bg-card-bg rounded-xl">
                <img
                  className="w-[155px] h-[155px]"
                  src="/assets/images/trending-card/player-1.png"
                />
              </div>
              <div className="bg-card-bg rounded-xl">
                <img
                  className="w-[155px] h-[155px]"
                  src="/assets/images/trending-card/player-1.png"
                />
              </div>
              <div className="bg-card-bg rounded-xl">
                <img
                  className="w-[155px] h-[155px]"
                  src="/assets/images/trending-card/player-1.png"
                />
              </div>
            </div>
            <div className="mt-4">
              <img src="/assets/images/trending-card/user-details.png" />
            </div>
          </div>
          <div className="bg-group-card rounded-xl p-4 min-w-[350px]">
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-card-bg rounded-xl">
                <img
                  className="w-[155px] h-[155px]"
                  src="/assets/images/trending-card/player-1.png"
                />
              </div>
              <div className="bg-card-bg rounded-xl">
                <img
                  className="w-[155px] h-[155px]"
                  src="/assets/images/trending-card/player-1.png"
                />
              </div>
              <div className="bg-card-bg rounded-xl">
                <img
                  className="w-[155px] h-[155px]"
                  src="/assets/images/trending-card/player-1.png"
                />
              </div>
              <div className="bg-card-bg rounded-xl">
                <img
                  className="w-[155px] h-[155px]"
                  src="/assets/images/trending-card/player-1.png"
                />
              </div>
            </div>
            <div className="mt-4">
              <img src="/assets/images/trending-card/user-details.png" />
            </div>
          </div>
          <div className="bg-group-card rounded-xl p-4 min-w-[350px]">
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-card-bg rounded-xl">
                <img
                  className="w-[155px] h-[155px]"
                  src="/assets/images/trending-card/player-1.png"
                />
              </div>
              <div className="bg-card-bg rounded-xl">
                <img
                  className="w-[155px] h-[155px]"
                  src="/assets/images/trending-card/player-1.png"
                />
              </div>
              <div className="bg-card-bg rounded-xl">
                <img
                  className="w-[155px] h-[155px]"
                  src="/assets/images/trending-card/player-1.png"
                />
              </div>
              <div className="bg-card-bg rounded-xl">
                <img
                  className="w-[155px] h-[155px]"
                  src="/assets/images/trending-card/player-1.png"
                />
              </div>
            </div>
            <div className="mt-4">
              <img src="/assets/images/trending-card/user-details.png" />
            </div>
          </div>
          <div className="bg-group-card rounded-xl p-4 min-w-[350px]">
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-card-bg rounded-xl">
                <img
                  className="w-[155px] h-[155px]"
                  src="/assets/images/trending-card/player-1.png"
                />
              </div>
              <div className="bg-card-bg rounded-xl">
                <img
                  className="w-[155px] h-[155px]"
                  src="/assets/images/trending-card/player-1.png"
                />
              </div>
              <div className="bg-card-bg rounded-xl">
                <img
                  className="w-[155px] h-[155px]"
                  src="/assets/images/trending-card/player-1.png"
                />
              </div>
              <div className="bg-card-bg rounded-xl">
                <img
                  className="w-[155px] h-[155px]"
                  src="/assets/images/trending-card/player-1.png"
                />
              </div>
            </div>
            <div className="mt-4">
              <img src="/assets/images/trending-card/user-details.png" />
            </div>
          </div>
        </div>
      </div>

      {/* create mint nft */}
      <div className="text-white py-16 pb-32 mobile:px-8">
        <div className="text-center desktop:text-[36px] mobile:text-2xl text-primary font-bold">
          <h5 className="text-primary">Create MINT NFT</h5>
        </div>
        <div className="flex gap-8 mt-8 mobile:flex-col desktop:flex-row">
          <div className="flex items-center flex-col create-mint-nft-item desktop:min-h-[360px] mobile:min-h-[250px] px-4 py-8 border-t-2 border-b-2 rounded-xl">
            <div className="relative desktop:h-[20%] mobile:h-[50px] w-full">
              <img
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90px] h-[90px]"
                src="/assets/images/sphere.png"
              />
              <img
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                src="/assets/images/create.png"
              />
            </div>
            <span className="desktop:text-[32px] mobile:text-xl mt-8">
              Create
            </span>
            <p className="mt-8 text-sm text-gray">
              Lorem Ipsum has been the industry's standard dummy text ever since
              the 1500s, when an unknown printer took a galley of type and
              scrambled it to make a type specimen book.
            </p>
            <span className="mt-8 text-primary">Get Started</span>
          </div>
          <div className="flex items-center flex-col create-mint-nft-item desktop:min-h-[360px] mobile:min-h-[250px] px-4 py-8 border-t-2 border-b-2 rounded-xl">
            <div className="relative desktop:h-[20%] mobile:h-[50px] w-full">
              <img
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90px] h-[90px]"
                src="/assets/images/sphere.png"
              />
              <img
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                src="/assets/images/mint.png"
              />
            </div>
            <span className="desktop:text-[32px] mobile:text-xl mt-8">
              Mint NFT
            </span>
            <p className="mt-8 text-sm text-gray">
              Lorem Ipsum has been the industry's standard dummy text ever since
              the 1500s, when an unknown printer took a galley of type and
              scrambled it to make a type specimen book.
            </p>
            <span className="mt-8 text-primary">Get Started</span>
          </div>
          <div className="flex items-center flex-col create-mint-nft-item desktop:min-h-[360px] mobile:min-h-[250px] px-4 py-8 border-t-2 border-b-2 rounded-xl">
            <div className="relative desktop:h-[20%] mobile:h-[50px] w-full">
              <img
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90px] h-[90px]"
                src="/assets/images/sphere.png"
              />
              <img
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                src="/assets/images/buy-sell.png"
              />
            </div>
            <span className="desktop:text-[32px] mobile:text-xl mt-8">
              Buy, Sell NFT
            </span>
            <p className="mt-8 text-sm text-gray">
              Lorem Ipsum has been the industry's standard dummy text ever since
              the 1500s, when an unknown printer took a galley of type and
              scrambled it to make a type specimen book.
            </p>
            <span className="mt-8 text-primary">Get Started</span>
          </div>
        </div>
      </div>
    </div>
  );
}
