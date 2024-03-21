let outsideClickListener = null;

function init() {
  // const cardGames = Array.from(document.getElementsByClassName("card-game"));
  // cardGames.forEach((it) => {
  //   it.addEventListener("click", function () {
  //     flipCard(this, "assets/images/player-card/player-1/big.png");
  //   });
  // });
   listenCloseButtonNotificationDialog();
   listenOpenMobileNav();
   listenCloseMobileNav();
}

init();

function listenOpenMobileNav() {
  document
    .getElementById("open-mobile-nav")
    .addEventListener("click", function () {
      console.log(1);
      document.getElementById("mobile-nav").classList.add("block");
      document.getElementById("mobile-nav").classList.remove("hidden");
    });
}

function listenCloseMobileNav() {
  document
    .getElementById("close-mobile-nav")
    .addEventListener("click", function () {
      document.getElementById("mobile-nav").classList.add("hidden");
      document.getElementById("mobile-nav").classList.remove("block");
    });
}

function openLoading() {
  document.getElementById("loading-indicator").classList.remove("hidden");
  document.getElementById("loading-indicator").classList.add("flex");
  document.body.style.overflow = "hidden";
}

function closeLoading() {
  document.getElementById("loading-indicator").classList.add("hidden");
  document.getElementById("loading-indicator").classList.remove("flex");
  document.body.style.overflow = "auto";
}

function flipCard(el, img) {
  const cardGameInner = el.querySelector("#card-game #card-game-inner");
  const cardGameBackImg = el.querySelector("#card-game-back img");

  if (cardGameInner.style.transform !== "rotateY(180deg)") {
    cardGameInner.style.transform = "rotateY(180deg)";
    cardGameBackImg.src = img;
  }
}

function flopCard(el) {
  const cardGameInner = el.querySelector("#card-game #card-game-inner");
  const cardGameBackImg = el.querySelector("#card-game-back img");

  cardGameInner.style.transform = "";
  cardGameBackImg.src = "";
}

function openWinDialog(img, total) {
  document.getElementById("notification-dialog").classList.remove("hidden");
  document.getElementById("notification-dialog").classList.add("flex");
  document.getElementById("notification-dialog-title").innerText = 'Congratulations!';
  document.getElementById("notification-dialog-player-card").src = img;
  document.getElementById("notification-dialog-total").innerText = total;
  document.body.style.overflow = "hidden";
  listenCloseButtonNotificationDialog();

  const listener = document.body.addEventListener('click', function(event) {
    console.log(event);
    console.log(event.target);
    if (!document.querySelector('#notification-dialog .notification-dialog').contains(event.target)) {
      closeNotificationDialog();
      document.body.removeEventListener('click', listener);
    }
  })
}

function openLoseDialog(img, total) {
  document.getElementById("notification-dialog").classList.remove("hidden");
  document.getElementById("notification-dialog").classList.add("flex");
  document.getElementById("notification-dialog-title").innerText = 'Better luck next time';
  document.getElementById("notification-dialog-player-card").src = img;
  document.getElementById("notification-dialog-total").innerText = total;
  document.body.style.overflow = "hidden";
  listenCloseButtonNotificationDialog();

  const listener = document.body.addEventListener('click', function(event) {
    console.log(event);
    console.log(event.target);
    if (!document.querySelector('#notification-dialog .notification-dialog').contains(event.target)) {
      closeNotificationDialog();
      document.body.removeEventListener('click', listener);
    }
  })
}

function openLoseDialog_Msg(img, msg) {
  document.getElementById("notification-dialog").classList.remove("hidden");
  document.getElementById("notification-dialog").classList.add("flex");
  document.getElementById("notification-dialog-title").innerText = msg;
  document.getElementById("notification-dialog-player-card").src = img;
  document.getElementById("notification-dialog-total").innerText = "";
  document.body.style.overflow = "hidden";
  listenCloseButtonNotificationDialog();

  const listener = document.body.addEventListener('click', function(event) {
    console.log(event);
    console.log(event.target);
    if (!document.querySelector('#notification-dialog .notification-dialog').contains(event.target)) {
      closeNotificationDialog();
      document.body.removeEventListener('click', listener);
    }
  })
}

function closeNotificationDialog() {
  document.getElementById("notification-dialog").classList.remove("flex");
  document.getElementById("notification-dialog").classList.add("hidden");
  document.body.style.overflow = "auto";
}

function listenCloseButtonNotificationDialog() {
  document.getElementById('notification-dialog-close-button').addEventListener('click', function() {
    closeNotificationDialog();
  })
}

function showWinNFT(cardUrl) {
  const winNFTEl = document.getElementById('win-nft');
  const winNFTOverlayEl = document.getElementById('win-nft-overlay');
  winNFTEl.style.display = 'block';
  winNFTEl.style.opacity = .5;
  winNFTOverlayEl.style.display = 'block';
  document.body.style.overflow = "hidden";

  const timeout = setInterval(() => {
    if (winNFTEl.style.opacity < 1) {
      winNFTEl.style.opacity = parseFloat(winNFTEl.style.opacity) + 0.01;
    } else {
      clearInterval(timeout);
    }
  }, 100)
  winNFTEl.play();

  setTimeout(() => {
    const winNFTImg = document.querySelector('#win-nft-overlay img');
    winNFTImg.src = cardUrl || "assets/images/player-card/player-1/big.png";
    winNFTImg.style.opacity = 1;
    winNFTImg.style.display = 'block';
  }, 5000);
}

function closeWinNFT() {
  const winNFTEl = document.getElementById('win-nft');
  document.body.style.overflow = "auto";
  winNFTEl.style.display = 'none';
  const winNFTOverlay = document.querySelector('#win-nft-overlay');
  winNFTOverlay.style.display = 'none';
  const winNFTImg = document.querySelector('#win-nft-overlay img');
  winNFTImg.style.display = 'none';
  winNFTEl.pause();
}

function openWithDrawDialog() {
  document.getElementById("overlay").classList.remove("hidden");
  document.getElementById("overlay").classList.add("block");
  document.getElementById("withdraw-dialog").classList.remove("hidden");
  document.getElementById("withdraw-dialog").classList.add("block");
  document.body.style.overflow = "hidden";

  const listener = document.body.addEventListener('click', function(event) {
    if (!document.getElementById('withdraw-dialog').contains(event.target)) {
      closeWithdrawDialog();
      document.body.removeEventListener('click', listener);
    }
  })
}

function closeWithdrawDialog() {
  document.getElementById("withdraw-dialog").classList.remove("block");
  document.getElementById("withdraw-dialog").classList.add("hidden");
  document.getElementById("overlay").classList.remove("block");
  document.getElementById("overlay").classList.add("hidden");
  document.body.style.overflow = "auto";
}

function openRankingDialog() {
  document.getElementById("overlay").classList.remove("hidden");
  document.getElementById("overlay").classList.add("block");
  document.getElementById("ranking-dialog").classList.remove("hidden");
  document.getElementById("ranking-dialog").classList.add("flex");
  document.body.style.overflow = "hidden";

  const listener = document.body.addEventListener('click', function(event) {
    if (!document.getElementById('ranking-dialog').contains(event.target)) {
      closeRankingDialog();
      document.body.removeEventListener('click', listener);
    }
  })
}

function closeRankingDialog() {
  document.getElementById("ranking-dialog").classList.remove("flex");
  document.getElementById("ranking-dialog").classList.add("hidden");
  document.getElementById("overlay").classList.remove("block");
  document.getElementById("overlay").classList.add("hidden");
  document.body.style.overflow = "auto";
}

function openHowToDialog() {
  document.getElementById("overlay").classList.remove("hidden");
  document.getElementById("overlay").classList.add("block");
  document.getElementById("how-to-dialog").classList.remove("hidden");
  document.getElementById("how-to-dialog").classList.add("block");
  document.body.style.overflow = "hidden";

  const listener = document.body.addEventListener('click', function(event) {
    if (!document.getElementById('how-to-dialog').contains(event.target)) {
      closeHowToDialog();
      document.body.removeEventListener('click', listener);
    }
  })
}

function closeHowToDialog() {
  document.getElementById("how-to-dialog").classList.remove("block");
  document.getElementById("how-to-dialog").classList.add("hidden");
  document.getElementById("overlay").classList.remove("block");
  document.getElementById("overlay").classList.add("hidden");
  document.body.style.overflow = "auto";
}

function openMessageDialog(title, message, isSuccess = false) {
  document.getElementById("overlay").classList.remove("hidden");
  document.getElementById("overlay").classList.add("block");
  document.getElementById("message-dialog").classList.remove("hidden");
  document.getElementById("message-dialog").classList.add("block");
  document.getElementById("message-dialog-title").innerText = title;
  document.getElementById("message-dialog-message").innerText = message;
  document.body.style.overflow = "hidden";

  if (isSuccess) {
    document.getElementById("message-dialog").classList.add("success");
    document.getElementById("message-dialog").classList.remove("failed");
  } else {
    document.getElementById("message-dialog").classList.add("failed");
    document.getElementById("message-dialog").classList.remove("success");
  }

  const closeIconListener = document.getElementById('message-dialog-close-icon').addEventListener('click', function() {
    closeMessageDialog();
    document.body.removeEventListener('click', listener);
    document.getElementById('message-dialog-close-icon').removeEventListener('click', closeIconListener);
  })

  const listener = document.body.addEventListener('click', function(event) {
    if (!document.getElementById('message-dialog').contains(event.target)) {
      closeMessageDialog();
      document.body.removeEventListener('click', listener);
      document.getElementById('message-dialog-close-icon').removeEventListener('click', closeIconListener);
    }
  })
}

function closeMessageDialog() {
  document.getElementById("message-dialog").classList.remove("block");
  document.getElementById("message-dialog").classList.add("hidden");
  document.getElementById("overlay").classList.remove("block");
  document.getElementById("overlay").classList.add("hidden");
  document.body.style.overflow = "auto";
}