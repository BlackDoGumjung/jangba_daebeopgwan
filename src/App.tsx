import { useEffect, useState } from "react";
import { commonVerdicts, otakuVerdicts, stockVerdicts, foodVerdicts, loadingMessages } from "./data/verdicts";
import { CATEGORY_WEIGHTS, conversions, VERDICT_LABELS } from "./data/config";
type VerdictType = keyof typeof commonVerdicts | keyof typeof otakuVerdicts | keyof typeof stockVerdicts | keyof typeof foodVerdicts;
import LOGO from "./assets/jangba_daebeopgwan.png";
import STAMP_PNG from "./assets/confirm.png";

interface VerdictResult {
  caseNumber: string;
  type: VerdictType;
  label: string;
  comment: string;
  opCost: string;
}

type ProductCategory = "COMMON" | "STOCK" | "OTAKU" | "FOOD";

const CATEGORY_LABELS = {
  COMMON: commonVerdicts,
  STOCK: stockVerdicts,
  OTAKU: otakuVerdicts,
  FOOD: foodVerdicts,
};
const MESSAGE_DURATION = 500;
const TOTAL_LOADING_TIME = loadingMessages.length * MESSAGE_DURATION;
const INTERVAL = 100;
const increment = 100 / (TOTAL_LOADING_TIME / INTERVAL);

function App() {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [result, setResult] = useState<VerdictResult | null>(null);
  const [category, setCategory] = useState<ProductCategory>("COMMON");
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  const [showStamp, setShowStamp] = useState(false);

  useEffect(() => {
    if (!isLoading) return;

    setMessageIndex(0);

    const interval = setInterval(() => {
      setMessageIndex((prev) => {
        if (prev >= loadingMessages.length - 1) {
          return prev;
        }

        return prev + 1;
      });
    }, 500);

    return () => clearInterval(interval);
  }, [isLoading]);

  const createResult = () => {
    const randomType = getWeightedVerdict() as VerdictType;

    const resultVerdictComment = CATEGORY_LABELS[category];
    const comments = resultVerdictComment[randomType];
    const randomComment = comments[Math.floor(Math.random() * comments.length)];

    setResult({
      caseNumber: `${new Date().getFullYear()}-장바-${Math.floor(Math.random() * 9999)}`,
      type: randomType,
      label: VERDICT_LABELS[randomType],
      comment: randomComment,
      opCost: generateCostInfo(parseFloat(price) || 0),
    });
  };

  const generateCostInfo = (price: number) => {
    const random = conversions[Math.floor(Math.random() * conversions.length)];

    return random.formatter(price / random.unitPrice);
  };

  const handleJudge = () => {
    setIsLoading(true);
    setProgress(0);

    const progressInterval = setInterval(() => {
      setProgress((prev) => Math.min(prev + increment, 100));
    }, INTERVAL);

    setTimeout(() => {
      clearInterval(progressInterval);
      setProgress(100);

      setResult(null);
      setShowStamp(true);
      setTimeout(() => {
        createResult();
        setShowStamp(false);
        setIsLoading(false);
      }, 2000);

      setIsLoading(false);
    }, TOTAL_LOADING_TIME);
  };
  const getWeightedVerdict = () => {
    const random = Math.random() * 100;

    let cumulative = 0;

    for (const item of CATEGORY_WEIGHTS[category]) {
      cumulative += item.weight;

      if (random <= cumulative) {
        return item.type;
      }
    }

    return "WAIT";
  };

  return (
    <div className="container">
      <h1>장바 대법관 v0.1</h1>
      <img src={LOGO} alt="장바 대법관" className="logo" />
      카테고리 :{" "}
      <select className="select-bar" value={category} onChange={(e) => setCategory(e.target.value as ProductCategory)}>
        <option value="COMMON">일반</option>
        <option value="STOCK">주식</option>
        <option value="OTAKU">오타쿠</option>
        <option value="FOOD">식품</option>
      </select>
      품목 :<input placeholder="상품명" value={productName} onChange={(e) => setProductName(e.target.value)} />
      한화 기준 : <input placeholder="가격" value={price} onChange={(e) => setPrice(e.target.value)} />
      <button onClick={handleJudge}>판결 요청</button>
      {isLoading && (
        <div className="progress-wrapper">
          <div className="progress-bar">
            <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>
      )}
      <div>{loadingMessages[messageIndex]}</div>
      {showStamp && (
        <div className="stamp-overlay">
          <img src={STAMP_PNG} alt="판결확정" className="stamp-animation" />
        </div>
      )}
      {!isLoading && result && (
        <div className="result-card">
          <div className="court-header">대한민국 장바구니 대법원</div>

          <hr />

          <div className="court-section">
            <div className="court-label">사건번호 : </div>
            <div>{result.caseNumber}</div>
          </div>

          <div className="court-section">
            <div className="court-label">사건명 : </div>
            <div>{productName} 구매 여부</div>
          </div>

          <div className="court-section">
            <div className="court-label">주문 : </div>
            <div className="verdict">{result.label}</div>
          </div>

          <div className="court-section">
            <div className="court-label">이유 : </div>
            <div className="comment">{result.comment}</div>
          </div>

          <div className="court-section">
            <div className="court-label">예상 기회비용 : </div>
            <div>{result.opCost}</div>
          </div>

          <div className="court-footer">장바 대법관™</div>
        </div>
      )}
    </div>
  );
}

export default App;
