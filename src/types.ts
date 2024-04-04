export type Referral = {
    referral: {
        id: string;
        deposited: string;
        referrals: Referral;
    };
};

export type Transaction = {
    amount: string;
};
