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
}

export const calculateDistributor = (mise, coteA, coteB, coteC) => {
  const calculator = new Calculator(mise, coteA, coteB, coteC);
  calculator.distribute();
  return calculator;
};

export const calculateDoubleChance = (mise, coteA, coteB, coteC) => {
  const calculator = new Calculator(mise, coteA, coteB, coteC);
  calculator.doubleChance();
  return calculator;
};
