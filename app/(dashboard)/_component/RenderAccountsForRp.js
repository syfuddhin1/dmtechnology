// General filter function
export const filterAccounts = (account, excludedCodes) => {
    return !excludedCodes.includes(account.code);
  };
  
  // General render function
 export const renderAccounts = (accounts, data, excludedCodes) => {
    return accounts
      .filter((account) => filterAccounts(account, excludedCodes))
      .map((account) => (
        <tr className="child-row19005_1" key={account.code}>
          <td align="left" className="text-left pl-10">
            {account.name}
          </td>
          <td align="center">-</td>
          <td align="right">{data?.month?.[account.code]}</td>
          <td align="right">{data?.year?.[account.code]}</td>
        </tr>
      ));
  };