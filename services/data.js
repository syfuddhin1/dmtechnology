export const Accounts = [
  {
    name: "Cash At Bank",
    code: 108,
  },
  {
    name: "Accounts Receivable",
    code: 101,
  },
  {
    name: "Stock of Goods Singer",
    code: 102,
  },
  {
    name: "Stock of Goods Walton",
    code: 103,
  },{
    name: "Stock of goods Vivo",
    code: 109,
  },
  {
    name: "Service Charge of Singer",
    code: 104,
  },
  {
    name: "Service Charge of Walton",
    code: 105,
  },
  {
    name: "Service Charge of Vivo",
    code: 110,
  },
  {
    name: "Commission of Singer",
    code: 106,
  },
  {
    name: "Commission of Walton",
    code: 107,
  },
  {
    name: "Commission of Vivo",
    code: 111,
  },
];

export const getAccountsName = (code) => {
  const name = Accounts.find((account) => account.code == code);
  return name.name;
};
