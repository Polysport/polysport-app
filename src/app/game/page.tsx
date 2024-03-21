export default function GamePage() {
  return (
    <div>
      <section className="desktop:px-32 mobile:px-4 mobile:pb-8 desktop:pb-10 relative overflow-hidden desktop:pt-36 mobile:pt-32">
        {/* banner */}
        <div className="absolute top-0 left-0 w-full h-screen z-[-1]">
          <img
            className="fixed w-screen h-screen top-0 left-0"
            src="/assets/images/bg_blur_web.png"
          />
          <img
            className="absolute right-0 top-0"
            src="/assets/images/decor/blur-1.png"
          />
          <img
            className="absolute left-0 top-0"
            src="/assets/images/decor/blur-2.png"
          />
          {/* <img class="fixed left-0 top-[25%]" src="/assets/images/decor/circle.png"/> */}
          <img
            className="fixed right-0 bottom-0"
            src="/assets/images/decor/big-pink-circle.png"
          />
          <img
            className="fixed left-0 bottom-0"
            src="/assets/images/decor/pink-circle.png"
          />
        </div>
        <div className="flex justify-center w-full mb-2 max-w-[900px] mx-auto">
          <img
            src="/assets/images/polysport_flip_card.png"
            alt="polysport flip card"
          />
        </div>
        <section className="bg-primary-gradient flex px-4 py-2 w-full overflow-auto rounded-xl">
          <div className="user-info-item">
            <img src="assets/images/top-1.png" alt="top-1" />
            <span>00x000</span>
            <span className="text-primary">0</span>
            <span className="text-primary">PLS</span>
          </div>
          <div className="user-info-item">
            <img src="assets/images/top-2.png" alt="top-2" />
            <span>00x000</span>
            <span className="text-primary">0</span>
            <span className="text-primary">PLS</span>
          </div>
          <div className="user-info-item">
            <img src="assets/images/top-3.png" alt="top-3" />
            <span>00x000</span>
            <span className="text-primary">0</span>
            <span className="text-primary">PLS</span>
          </div>
          <div className="user-info-item">
            <span>4</span>
            <span>00x000</span>
            <span className="text-primary">0</span>
            <span className="text-primary">PLS</span>
          </div>
          <div className="user-info-item">
            <span>5</span>
            <span>00x000</span>
            <span className="text-primary">0</span>
            <span className="text-primary">PLS</span>
          </div>
          <div className="user-info-item">
            <span>6</span>
            <span>00x000</span>
            <span className="text-primary">0</span>
            <span className="text-primary">PLS</span>
          </div>
        </section>
        <section className="flex desktop:gap-8 mobile:gap-2 mobile:flex-col desktop:flex-row">
          <div className="grow-[3] overflow-auto">
            <div className="mobile:hidden desktop:block">
              <section className="flex desktop:gap-4 mobile:gap-2 desktop:items-end mobile:items-center mt-4 mobile:flex-col-reverse desktop:flex-row">
                <div className="flex gap-4 mobile:flex-col desktop:flex-row">
                  <div className="game-info-item">
                    <label>Balances</label>
                    <div className="frame">
                      <span className="flex gap-2">
                        <span id="balancePoly">0.0</span> PLS{" "}
                        <img src="assets/images/wallet.png" alt="wallet" />
                      </span>
                    </div>
                  </div>
                  <div className="game-info-item">
                    <label>Reward Winner</label>
                    <div className="frame">
                      <span id="rewardWinner">0 PLS</span>
                    </div>
                  </div>
                  <div className="game-info-item">
                    <label>Number of click</label>
                    <div className="frame">
                      <span id="noClick">0</span>
                    </div>
                  </div>
                  <div className="game-info-item">
                    <label>Number of users</label>
                    <div className="frame">
                      <span id="noUsed">0</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-4 pb-2">
                  <img
                    src="/assets/images/trophy.png"
                    alt="trophy"
                    className="cursor-pointer"
                  />
                  <img
                    src="/assets/images/how-to-play.png"
                    alt="how-to-play"
                    className="cursor-pointer"
                  />
                  <img
                    id="iconWithdraw"
                    src="/assets/images/money-withdrawal.png"
                    alt="withdraw"
                    className="cursor-pointer"
                  />
                </div>
              </section>
            </div>
            <section className="mt-4 grid grid-cols-10 gap-2 min-w-[800px]">
              {new Array(50).fill("").map((e, idx) => (
                <div key={idx} className="card-game" id="card-game">
                  <div id="card-game-inner">
                    <div id="card-game-front relative">
                      {/* <img src="assets/images/card-back.png" /> */}
                      <img
                        className="absolute top-0 left-0 w-full h-full"
                        src="/assets/images/card-game-hover.jpg"
                      />
                      <img
                        className="absolute top-0 left-0 w-full h-full hover:opacity-0 transition-all duration-500"
                        src="/assets/images/card-game.jpg"
                      />
                    </div>
                    <div id="card-game-back">
                      <img src="assets/images/card-back.png" />
                    </div>
                  </div>
                </div>
              ))}
            </section>
          </div>
          <div className="grow-[2] my-0 -mx-12">
            <div className="flex justify-center gap-2">
              <div className="game-info-item" style={{ marginTop: 20 }}>
                <label style={{ color: "yellowgreen" }}>Pool Reward</label>
                <div className="frame">
                  <span
                    id="poolRewards"
                    style={{ color: "yellowgreen", fontWeight: "bold" }}
                  >
                    0 PLS
                  </span>
                </div>
              </div>
            </div>
            <div className="flex justify-center gap-2">
              <>
                <style
                  dangerouslySetInnerHTML={{
                    __html:
                      "\n   #gameBoardListNFT img, #btnBurnNFT{cursor: pointer;}\n",
                  }}
                />
                <section
                  className="flex flex-col items-center mt-24"
                  style={{ marginTop: 20 }}
                >
                  <img
                    id="mainChar"
                    src="/assets/images/card-back.png"
                    alt="NFT"
                    className="desktop:w-[182px] desktop:h-[250px] mobile:w-[150px] mobile:h-[200px]"
                  />
                  <div className="text-center text-white flex flex-col items-center mt-3">
                    <div className="flex justify-center items-center bg-[url('/assets/images/game-info-frame.png')] bg-no-repeat bg-cover bg-center w-[150px] h-[40px] relative">
                      <span
                        id="btnBurnNFT"
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full"
                      >
                        Burn NFT
                      </span>
                    </div>
                  </div>
                  <div className="mt-3">
                    <img src="/assets/images/my-nft.png" />
                  </div>
                  <div className="mt-3">
                    <div
                      id="gameBoardListNFT"
                      className="grid grid-cols-4 gap-2"
                    >
                      {/* <img src="assets/images/player-card/10.png" alt="NFT" class="desktop:w-[20px] desktop:h-[30px] mobile:w-[15px] mobile:h-[25px]" /> */}
                    </div>
                    {/* <div class="nft-pagination mt-2">
      <span class="active">1</span>
      <span>2</span>
      <span>3</span>
      <span>4</span>
      <span>5</span>
      <span>...</span>
      <span>10</span>
  </div> */}
                  </div>
                  {/*<div class="mobile:hidden desktop:block">
  <%- include('./pool-reward') %>
    </div>*/}
                </section>
              </>
            </div>
          </div>
        </section>
        {/* TODO */}
        {/* &lt;%- include('home/notification-dialog') %&gt; &lt;%-
        include('home/dialogs/withdraw') %&gt; &lt;%-
        include('home/dialogs/ranking') %&gt; &lt;%-
        include('home/dialogs/how-to') %&gt; &lt;%-
        include('home/dialogs/message') %&gt; &lt;%- include('home/overlay')
        %&gt; */}
        {/* shared/loading.ejs */}
        <div
          className="hidden items-center justify-center absolute top-0 left-0 w-full h-full z-[100] bg-[rgb(0,0,0,.9)]"
          id="loading-indicator"
        >
          <div role="status">
            <svg
              aria-hidden="true"
              className="w-24 h-24 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </section>
      <video id="win-nft">
        <source src="assets/win-nft.mp4" type="video/mp4" />
      </video>
      <div id="win-nft-overlay">
        <img alt="player" />
      </div>
    </div>
  );
}
