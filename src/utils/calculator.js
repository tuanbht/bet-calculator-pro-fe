class Calculator {
  mMise;
  mCoteA;
  mCoteB;
  mCoteC;
  mNouvelleCote;
  mCoteDoubleChance;
  mMiseA;
  mMiseB;
  mMiseC;
  mMiseAArr;
  mMiseBArr;
  mMiseCArr;
  mGainA;
  mGainB;
  mGainC;
  mGainAArr;
  mGainBArr;
  mGainCArr;
  mGainDoubleChance;
  mBeneficeA;
  mBeneficeB;
  mBeneficeC;
  mBeneficeAArr;
  mBeneficeBArr;
  mBeneficeCArr;
  mBeneficeDoubleChance;
  mRendementA;
  mRendementB;
  mRendementC;
  mRendementAArr;
  mRendementBArr;
  mRendementCArr;
  mRendementDoubleChance;
  mIndiceSurebet;
  mMiseFinale;
  mMiseFinaleArr;
  mValeurTest;
  mTauxRendement;
  mCommissionBookmaker;
  mProbabiliteA;
  mProbabiliteB;
  mProbabiliteC;
  mValueBetA;
  mTauxA;
  mValueBetB;
  mTauxB;
  mValueBetC;
  mTauxC;

  constructor(mise, coteA, coteB, coteC) {
    this.mMise = mise;
    this.mCoteA = coteA;
    this.mCoteB = coteB;
    this.mCoteC = coteC;
  }

  distribute() {
    this.mMiseB = this.mMise / this.mCoteB;
    this.mMiseA = this.mMise - this.mMiseB;

    this.mMiseBArr = Math.round(this.mMiseB);
    this.mMiseAArr = Math.round(this.mMiseA);

    this.mMiseFinale = this.mMiseA + this.mMiseB;
    this.mMiseFinaleArr = this.mMiseAArr + this.mMiseBArr;

    this.mGainA = this.mCoteA * this.mMiseA;
    this.mGainB = this.mCoteB * this.mMiseB;

    this.mGainAArr = this.mCoteA * this.mMiseAArr;
    this.mGainBArr = this.mCoteB * this.mMiseBArr;

    this.mBeneficeA = this.mGainA - this.mMise;
    this.mBeneficeB = this.mGainB - this.mMise;

    this.mBeneficeAArr = this.mGainAArr - this.mMise;
    this.mBeneficeBArr = this.mGainBArr - this.mMise;

    this.mRendementA = this.mBeneficeA / (this.mMiseA + this.mMiseB);
    this.mRendementB = this.mBeneficeB / (this.mMiseA + this.mMiseB);

    this.mRendementAArr = this.mBeneficeAArr / (this.mMiseAArr + this.mMiseBArr);
    this.mRendementBArr = this.mBeneficeBArr / (this.mMiseAArr + this.mMiseBArr);

    this.mNouvelleCote = this.mRendementA + 1;
  }

  doubleChance() {
    this.mCoteDoubleChance = 1 / (1 / this.mCoteA + 1 / this.mCoteB);

    this.mGainDoubleChance = this.mCoteDoubleChance * this.mMise;

    this.mMiseA = 1 / (this.mCoteA / this.mGainDoubleChance);
    this.mMiseB = 1 / (this.mCoteB / this.mGainDoubleChance);

    this.mMiseAArr = Math.round(this.mMiseA);
    this.mMiseBArr = Math.round(this.mMiseB);

    this.mMiseFinale = this.mMiseA + this.mMiseB;
    this.mMiseFinaleArr = this.mMiseAArr + this.mMiseBArr;

    this.mGainA = this.mCoteA * this.mMiseA;
    this.mGainB = this.mCoteB * this.mMiseB;

    this.mGainAArr = this.mCoteA * this.mMiseAArr;
    this.mGainBArr = this.mCoteB * this.mMiseBArr;

    this.mBeneficeA = this.mGainA - this.mMise;
    this.mBeneficeB = this.mGainB - this.mMise;

    this.mBeneficeAArr = this.mGainAArr - this.mMise;
    this.mBeneficeBArr = this.mGainBArr - this.mMise;

    this.mRendementA = this.mBeneficeA / this.mMise;
    this.mRendementB = this.mBeneficeB / this.mMise;

    this.mRendementAArr = this.mBeneficeAArr / this.mMise;
    this.mRendementBArr = this.mBeneficeBArr / this.mMise;
  }

  sureBet3Signals() {
    this.mIndiceSurebet = 1 / (1 / this.mCoteA + 1 / this.mCoteB + 1 / this.mCoteC);

    this.mMiseA =
      this.mMise *
      (this.mMise / this.mCoteA / (this.mMise / this.mCoteA + this.mMise / this.mCoteB + this.mMise / this.mCoteC));
    this.mMiseB =
      this.mMise *
      (this.mMise / this.mCoteB / (this.mMise / this.mCoteA + this.mMise / this.mCoteB + this.mMise / this.mCoteC));
    this.mMiseC =
      this.mMise *
      (this.mMise / this.mCoteC / (this.mMise / this.mCoteA + this.mMise / this.mCoteB + this.mMise / this.mCoteC));

    this.mMiseAArr = Math.round(this.mMiseA);
    this.mMiseBArr = Math.round(this.mMiseB);
    this.mMiseCArr = Math.round(this.mMiseC);

    this.mMiseFinale = this.mMiseA + this.mMiseB + this.mMiseC;
    this.mMiseFinaleArr = this.mMiseAArr + this.mMiseBArr + this.mMiseCArr;

    this.mGainA = this.mCoteA * this.mMiseA;
    this.mGainB = this.mCoteB * this.mMiseB;
    this.mGainC = this.mCoteC * this.mMiseC;

    this.mGainAArr = this.mCoteA * this.mMiseAArr;
    this.mGainBArr = this.mCoteB * this.mMiseBArr;
    this.mGainCArr = this.mCoteC * this.mMiseCArr;

    this.mBeneficeA = this.mGainA - (this.mMiseA + this.mMiseB + this.mMiseC);
    this.mBeneficeB = this.mGainB - (this.mMiseA + this.mMiseB + this.mMiseC);
    this.mBeneficeC = this.mGainC - (this.mMiseA + this.mMiseB + this.mMiseC);

    this.mBeneficeAArr = this.mGainAArr - (this.mMiseAArr + this.mMiseBArr + this.mMiseCArr);
    this.mBeneficeBArr = this.mGainBArr - (this.mMiseAArr + this.mMiseBArr + this.mMiseCArr);
    this.mBeneficeCArr = this.mGainCArr - (this.mMiseAArr + this.mMiseBArr + this.mMiseCArr);

    this.mRendementA = this.mBeneficeA / (this.mMiseA + this.mMiseB + this.mMiseC);
    this.mRendementB = this.mBeneficeB / (this.mMiseA + this.mMiseB + this.mMiseC);
    this.mRendementC = this.mBeneficeC / (this.mMiseA + this.mMiseB + this.mMiseC);

    this.mRendementAArr = this.mBeneficeAArr / (this.mMiseAArr + this.mMiseBArr + this.mMiseCArr);
    this.mRendementBArr = this.mBeneficeBArr / (this.mMiseAArr + this.mMiseBArr + this.mMiseCArr);
    this.mRendementCArr = this.mBeneficeCArr / (this.mMiseAArr + this.mMiseBArr + this.mMiseCArr);
  }

  surebet2Signals() {
    this.mIndiceSurebet = 1 / (1 / this.mCoteA + 1 / this.mCoteB);

    this.mMiseA = this.mMise * (this.mMise / this.mCoteA / (this.mMise / this.mCoteA + this.mMise / this.mCoteB));
    this.mMiseB = this.mMise * (this.mMise / this.mCoteB / (this.mMise / this.mCoteA + this.mMise / this.mCoteB));

    this.mMiseAArr = Math.round(this.mMiseA);
    this.mMiseBArr = Math.round(this.mMiseB);

    this.mMiseFinale = this.mMiseA + this.mMiseB;
    this.mMiseFinaleArr = this.mMiseAArr + this.mMiseBArr;

    this.mGainA = this.mCoteA * this.mMiseA;
    this.mGainB = this.mCoteB * this.mMiseB;

    this.mGainAArr = this.mCoteA * this.mMiseAArr;
    this.mGainBArr = this.mCoteB * this.mMiseBArr;

    this.mBeneficeA = this.mGainA - (this.mMiseA + this.mMiseB);
    this.mBeneficeB = this.mGainB - (this.mMiseA + this.mMiseB);

    this.mBeneficeAArr = this.mGainAArr - (this.mMiseAArr + this.mMiseBArr);
    this.mBeneficeBArr = this.mGainBArr - (this.mMiseAArr + this.mMiseBArr);

    this.mRendementA = this.mBeneficeA / (this.mMiseA + this.mMiseB);
    this.mRendementB = this.mBeneficeB / (this.mMiseA + this.mMiseB);

    this.mRendementAArr = this.mBeneficeAArr / (this.mMiseAArr + this.mMiseBArr);
    this.mRendementBArr = this.mBeneficeBArr / (this.mMiseAArr + this.mMiseBArr);
  }

  surebet2Win1Refund() {
    this.mIndiceSurebet = 1 / (1 / this.mCoteA + 1 / this.mCoteB + 1 / this.mCoteC);

    this.mMiseA =
      this.mMise *
      (this.mMise / this.mCoteA / (this.mMise / this.mCoteA + this.mMise / this.mCoteB + this.mMise / this.mCoteC));
    this.mMiseB =
      this.mMise *
      (this.mMise / this.mCoteB / (this.mMise / this.mCoteA + this.mMise / this.mCoteB + this.mMise / this.mCoteC));

    this.mMiseC = (this.mMiseA + this.mMiseB) / (this.mCoteC - 1);

    this.mMiseAArr = Math.round(this.mMiseA);
    this.mMiseBArr = Math.round(this.mMiseB);
    this.mMiseCArr = Math.round(this.mMiseC);

    this.mMiseFinale = this.mMiseA + this.mMiseB + this.mMiseC;

    this.mMiseFinaleArr = this.mMiseAArr + this.mMiseBArr + this.mMiseCArr;

    this.mGainA = this.mCoteA * this.mMiseA;
    this.mGainB = this.mCoteB * this.mMiseB;
    this.mGainC = this.mCoteC * this.mMiseC;

    this.mGainAArr = this.mCoteA * this.mMiseAArr;
    this.mGainBArr = this.mCoteB * this.mMiseBArr;
    this.mGainCArr = this.mCoteC * this.mMiseCArr;

    this.mBeneficeA = this.mGainA - this.mMiseFinale;
    this.mBeneficeB = this.mGainB - this.mMiseFinale;
    this.mBeneficeC = this.mGainC - this.mMiseFinale;

    this.mBeneficeAArr = this.mGainAArr - this.mMiseFinaleArr;
    this.mBeneficeBArr = this.mGainBArr - this.mMiseFinaleArr;
    this.mBeneficeCArr = this.mGainCArr - this.mMiseFinaleArr;

    this.mRendementA = this.mBeneficeA / this.mMiseFinale;
    this.mRendementB = this.mBeneficeB / this.mMiseFinale;
    this.mRendementC = this.mBeneficeC / this.mMiseFinale;

    this.mRendementAArr = this.mBeneficeAArr / this.mMiseFinaleArr;
    this.mRendementBArr = this.mBeneficeBArr / this.mMiseFinaleArr;
    this.mRendementCArr = this.mBeneficeCArr / this.mMiseFinaleArr;
  }

  surebet1Win2Refund() {
    this.mIndiceSurebet = 1 / (1 / this.mCoteA + 1 / this.mCoteB + 1 / this.mCoteC);

    this.mMiseA =
      this.mMise *
      (this.mMise / this.mCoteA / (this.mMise / this.mCoteA + this.mMise / this.mCoteB + this.mMise / this.mCoteC));

    this.mMiseB = (this.mMiseA * this.mCoteC) / ((this.mCoteB - 1) * (this.mCoteC - 1) - 1);
    this.mMiseC = (this.mMiseA * this.mCoteB) / ((this.mCoteC - 1) * (this.mCoteB - 1) - 1);

    this.mMiseAArr = Math.round(this.mMiseA);
    this.mMiseBArr = Math.round(this.mMiseB);
    this.mMiseCArr = Math.round(this.mMiseC);

    this.mMiseFinale = this.mMiseA + this.mMiseB + this.mMiseC;

    this.mMiseFinaleArr = this.mMiseAArr + this.mMiseBArr + this.mMiseCArr;

    this.mGainA = this.mCoteA * this.mMiseA;
    this.mGainB = this.mCoteB * this.mMiseB;
    this.mGainC = this.mCoteC * this.mMiseC;

    this.mGainAArr = this.mCoteA * this.mMiseAArr;
    this.mGainBArr = this.mCoteB * this.mMiseBArr;
    this.mGainCArr = this.mCoteC * this.mMiseCArr;

    this.mBeneficeA = this.mGainA - this.mMiseFinale;
    this.mBeneficeB = this.mGainB - this.mMiseFinale;
    this.mBeneficeC = this.mGainC - this.mMiseFinale;

    this.mBeneficeAArr = this.mGainAArr - this.mMiseFinaleArr;
    this.mBeneficeBArr = this.mGainBArr - this.mMiseFinaleArr;
    this.mBeneficeCArr = this.mGainCArr - this.mMiseFinaleArr;

    this.mRendementA = this.mBeneficeA / this.mMiseFinale;
    this.mRendementB = this.mBeneficeB / this.mMiseFinale;
    this.mRendementC = this.mBeneficeC / this.mMiseFinale;

    this.mRendementAArr = this.mBeneficeAArr / this.mMiseFinaleArr;
    this.mRendementBArr = this.mBeneficeBArr / this.mMiseFinaleArr;
    this.mRendementCArr = this.mBeneficeCArr / this.mMiseFinaleArr;
  }

  miniRisk1() {
    this.mIndiceSurebet = 1 / (1 / this.mCoteA + 1 / this.mCoteB + 1 / this.mCoteC);

    this.mMiseA =
      (this.mMise * ((this.mMise + this.mValeurTest) / this.mCoteA)) /
      ((this.mMise + this.mValeurTest) / this.mCoteA + this.mMise / this.mCoteB + this.mMise / this.mCoteC);
    this.mMiseC =
      (this.mMise * (this.mMise / this.mCoteC)) /
      ((this.mMise + this.mValeurTest) / this.mCoteA + this.mMise / this.mCoteB + this.mMise / this.mCoteC);
    this.mMiseB = (this.mMiseA + this.mMiseC) / (this.mCoteB - 1);

    this.mMiseFinale = this.mMiseA + this.mMiseB + this.mMiseC;

    this.mMiseAArr = Math.round(this.mMiseA);
    this.mMiseBArr = Math.round(this.mMiseB);
    this.mMiseCArr = Math.round(this.mMiseC);

    this.mMiseFinaleArr = this.mMiseAArr + this.mMiseBArr + this.mMiseCArr;

    this.mGainA = this.mCoteA * this.mMiseA;
    this.mGainB = this.mCoteB * this.mMiseB;
    this.mGainC = this.mCoteC * this.mMiseC;

    this.mGainAArr = this.mCoteA * this.mMiseAArr;
    this.mGainBArr = this.mCoteB * this.mMiseBArr;
    this.mGainCArr = this.mCoteC * this.mMiseCArr;

    this.mBeneficeA = this.mGainA - this.mMiseFinale;
    this.mBeneficeB = this.mGainB - this.mMiseFinale;
    this.mBeneficeC = this.mGainC - this.mMiseFinale;

    this.mBeneficeAArr = this.mGainAArr - this.mMiseFinaleArr;
    this.mBeneficeBArr = this.mGainBArr - this.mMiseFinaleArr;
    this.mBeneficeCArr = this.mGainCArr - this.mMiseFinaleArr;

    this.mRendementA = this.mBeneficeA / this.mMiseFinale;
    this.mRendementB = this.mBeneficeB / this.mMiseFinale;
    this.mRendementC = this.mBeneficeC / this.mMiseFinale;

    this.mRendementAArr = this.mBeneficeAArr / this.mMiseFinaleArr;
    this.mRendementBArr = this.mBeneficeBArr / this.mMiseFinaleArr;
    this.mRendementCArr = this.mBeneficeCArr / this.mMiseFinaleArr;
  }

  miniRisk2() {
    const valeurTest = this.mValeurTest / 100;

    this.mIndiceSurebet = 1 / (1 / this.mCoteA + 1 / this.mCoteB + 1 / this.mCoteC);

    this.mMiseA =
      this.mMise *
      (this.mMise / this.mCoteA / (this.mMise / this.mCoteA + this.mMise / this.mCoteB + this.mMise / this.mCoteC));
    this.mMiseC =
      this.mMise *
      (this.mMise /
        this.mCoteC /
        ((this.mMise + this.mMise * valeurTest) / this.mCoteA + this.mMise / this.mCoteB + this.mMise / this.mCoteC));
    this.mMiseB = (this.mMiseA + this.mMiseC) / (this.mCoteB - 1);

    this.mMiseFinale = this.mMiseA + this.mMiseB + this.mMiseC;

    this.mMiseAArr = Math.round(this.mMiseA);
    this.mMiseBArr = Math.round(this.mMiseB);
    this.mMiseCArr = Math.round(this.mMiseC);

    this.mMiseFinaleArr = this.mMiseAArr + this.mMiseBArr + this.mMiseCArr;

    this.mGainA = this.mCoteA * this.mMiseA;
    this.mGainB = this.mCoteB * this.mMiseB;
    this.mGainC = this.mCoteC * this.mMiseC;

    this.mGainAArr = this.mCoteA * this.mMiseAArr;
    this.mGainBArr = this.mCoteB * this.mMiseBArr;
    this.mGainCArr = this.mCoteC * this.mMiseCArr;

    this.mBeneficeA = this.mGainA - this.mMiseFinale;
    this.mBeneficeB = this.mGainB - this.mMiseFinale;
    this.mBeneficeC = this.mGainC - this.mMiseFinale;

    this.mBeneficeAArr = this.mGainAArr - this.mMiseFinaleArr;
    this.mBeneficeBArr = this.mGainBArr - this.mMiseFinaleArr;
    this.mBeneficeCArr = this.mGainCArr - this.mMiseFinaleArr;

    this.mRendementA = this.mBeneficeA / this.mMiseFinale;
    this.mRendementB = this.mBeneficeB / this.mMiseFinale;
    this.mRendementC = this.mBeneficeC / this.mMiseFinale;

    this.mRendementAArr = this.mBeneficeAArr / this.mMiseFinaleArr;
    this.mRendementBArr = this.mBeneficeBArr / this.mMiseFinaleArr;
    this.mRendementCArr = this.mBeneficeCArr / this.mMiseFinaleArr;
  }

  commissionBookmaker3Signals() {
    this.mTauxRendement = 1 / (1 / this.mCoteA + 1 / this.mCoteB + 1 / this.mCoteC);
    this.mCommissionBookmaker = 1 - this.mTauxRendement;
  }

  commissionBookmaker2Signals() {
    this.mTauxRendement = 1 / (1 / this.mCoteA + 1 / this.mCoteB);
    this.mCommissionBookmaker = 1 - this.mTauxRendement;
  }

  valueBet(mEstimationCoteA, mEstimationCoteB, mEstimationCoteC) {
    const dblTauxVersement = 1 / (1 / this.mCoteA + 1 / this.mCoteB + 1 / this.mCoteC);

    this.mProbabiliteA = (1 / this.mCoteA) * dblTauxVersement;
    this.mProbabiliteB = (1 / this.mCoteB) * dblTauxVersement;
    this.mProbabiliteC = (1 / this.mCoteC) * dblTauxVersement;

    if (mEstimationCoteA / 100 - this.mProbabiliteA <= 0) {
      this.mCoteEstimeeA = -1;
      this.mValueBetA = 'Non';
      this.mTauxA = -1;
    } else {
      this.mCoteEstimeeA = 1 / (mEstimationCoteA / 100);
      this.mValueBetA = 'Oui';
      this.mTauxA = this.mCoteA - this.mCoteEstimeeA;
    }

    if (mEstimationCoteB / 100 - this.mProbabiliteB <= 0) {
      this.mCoteEstimeeB = -1;
      this.mValueBetB = 'Non';
      this.mTauxB = -1;
    } else {
      this.mCoteEstimeeB = 1 / (mEstimationCoteB / 100);
      this.mValueBetB = 'Oui';
      this.mTauxB = this.mCoteB - this.mCoteEstimeeB;
    }

    if (mEstimationCoteC / 100 - this.mProbabiliteC <= 0) {
      this.mCoteEstimeeC = -1;
      this.mValueBetC = 'Non';
      this.mTauxC = -1;
    } else {
      this.mCoteEstimeeC = 1 / (mEstimationCoteC / 100);
      this.mValueBetC = 'Oui';
      this.mTauxC = this.mCoteC - this.mCoteEstimeeC;
    }
  }
}

export const calculateDistributor = (mise, coteA, coteB) => {
  const calculator = new Calculator(mise, coteA, coteB, 0);
  calculator.distribute();
  return calculator;
};

export const calculateDoubleChance = (mise, coteA, coteB) => {
  const calculator = new Calculator(mise, coteA, coteB, 0);
  calculator.doubleChance();
  return calculator;
};

export const calculateSurebet3Signals = (mise, coteA, coteB, coteC) => {
  const calculator = new Calculator(mise, coteA, coteB, coteC);
  calculator.sureBet3Signals();
  return calculator;
};

export const calculateSurebet2Signals = (mise, coteA, coteB) => {
  const calculator = new Calculator(mise, coteA, coteB, 0);
  calculator.surebet2Signals();
  return calculator;
};

export const calculateSurebet2Win1Refund = (mise, coteA, coteB, coteC) => {
  const calculator = new Calculator(mise, coteA, coteB, coteC);
  calculator.surebet2Win1Refund();
  return calculator;
};

export const calculateSurebet1Win2Refund = (mise, coteA, coteB, coteC) => {
  const calculator = new Calculator(mise, coteA, coteB, coteC);
  calculator.surebet1Win2Refund();
  return calculator;
};

export const calculateMiniRisk1 = (mise, coteA, coteB, coteC, valeurTest) => {
  const calculator = new Calculator(mise, coteA, coteB, coteC);
  calculator.mValeurTest = valeurTest;
  calculator.miniRisk1();
  return calculator;
};

export const calculateMiniRisk2 = (mise, coteA, coteB, coteC, valeurTest) => {
  const calculator = new Calculator(mise, coteA, coteB, coteC);
  calculator.mValeurTest = valeurTest;
  calculator.miniRisk2();
  return calculator;
};
