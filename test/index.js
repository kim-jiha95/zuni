import "./styles.css";

document.getElementById("app").innerHTML = `

<table class="page">
  <tr>
    <td style="width:50%;" rowspan="4">
      <img src="3.png" style="width:200px;"/>
    </td>
  </tr>
  <tr>
    <td colspan="2">
      <button id="connect_button">Connect</button>
    </td>
  </tr>
  <tr style="height:60%;">
    <td style="width:25%;">
      CURRENT BLOCK
      <h5 id="current_block">110000</h5>
      PRICE
      <h5>100 KLAY</h5>
    </td>

    <td style="width:25%;">
      EVENT BLOCK
      <h5 id="current_block">110000</h5>
      PER TX
      <h5>1</h5>
    </td>
  </tr>
  <tr>
    <td colspan="2">
      <button id="mint_button">MINT</button>
    </td>
  </tr>
</table>
<!--연동하기 button_kaikas에 해당-->



`;
//chrome브라우저에 내 카이카스가 있는지 확인
console.log(typeof window.klaytn !== "undefined");
//버튼 찾았다.
const connectbutton = document.querySelector("#connect_button");
//버튼을 눌렸을 때 다음과 같은 반응을 한다
const onClickConnectButton = async () => {
  //window.klaytn.enable();
  const accounts = await window.klaytn.enable(); //카이카스 지갑 작동
  const account = accounts[0]; //월렛 주소중 제일 첫번째거가져오기

  console.log(account);
  document.querySelector("#connect_button").innerHTML = account;
};

connectbutton.addEventListener("click", onClickConnectButton);

const onClickMintButton = async () => {
  const accounts = await window.klaytn.enable();
  const account = accounts[0];

  if (window.klaytn.networkVersion !== 8217) {
    //8217 mainnet
    //1001 testnet
    alert("적절한 네트워크가 아닙니다.");
    return;
  }

  const SMART_CONTRACT_MAINNET = "0x62B132909db663330c60ec25274f5f778cC21fE0";
  const SMART_CONTRACT_TESTNET = "0xFc365f10dd0c296A0cfE91c03314d32Ce4aD4b9c";
  const transactionParameters = {
    to: SMART_CONTRACT_MAINNET,
    from: account,
    data:
      "0xa0712d680000000000000000000000000000000000000000000000000000000000000001",
    value: "0x56BC75E2D63100000", //100KLAY 작은 사이즈 타투
    gas: "0x3476A"
  };

  // 하고 싶은 일 블록체인에 요청하기
  // 블록체인에 가서 실제 물어보기
  window.klaytn.sendAsync(
    {
      method: "klay_sendTransaction",
      params: [transactionParameters],
      from: account
    },
    (receipt, result) => {
      console.log(receipt);
      console.log(result); //결과값은 이곳에 넣어주세요.
    }
  );
};

const mintbutton = document.querySelector("#mint_button");
mintbutton.addEventListener("click", onClickMintButton);